import sys
import logging
from pathlib import Path
from typing import Dict, Any, List, Tuple, Optional
import numpy as np
import torch
from joblib.numpy_pickle import NumpyUnpickler

logger = logging.getLogger("citrusguard.model_manager")

# Ensure project root is on sys.path
SERVICE_ROOT = Path(__file__).resolve().parents[2]
WORKSPACE_ROOT = SERVICE_ROOT.parent
if str(SERVICE_ROOT) not in sys.path:
    sys.path.insert(0, str(SERVICE_ROOT))

from models.resnet_model import FruitResNet


class MockObject:
    """Safe placeholder to deserialize sklearn objects without requiring C-extensions or matching versions."""
    def __init__(self, *args, **kwargs):
        pass

    def __setstate__(self, state):
        self.state = state
        if isinstance(state, dict):
            self.__dict__.update(state)


class SafeJoblibUnpickler(NumpyUnpickler):
    def find_class(self, module, name):
        if 'sklearn' in module:
            return MockObject
        return super().find_class(module, name)


class ModelManager:
    """
    Unified Model Manager for CitrusGuard Dual Engine.
    Coordinates:
      1. Fruit Disease Model: PyTorch ResNet-34 deep learning architecture.
      2. Leaf Disease Model: 300 Decision Trees Random Forest running pure NumPy inference.
    """
    # Fruit model state
    _fruit_model: Optional[FruitResNet] = None
    _fruit_model_path: Path = SERVICE_ROOT / "artifacts" / "best_model.pt"
    _fruit_num_classes: int = 4

    # Leaf model state
    _leaf_trees: Optional[List[Tuple[np.ndarray, np.ndarray]]] = None
    _leaf_classes: Optional[List[str]] = None
    _leaf_model_path: Path = WORKSPACE_ROOT / "leaf-disease-service" / "dataset" / "classical_ml" / "final_rf_model.pkl"
    _leaf_encoder_path: Path = WORKSPACE_ROOT / "leaf-disease-service" / "dataset" / "classical_ml" / "rf_label_encoder.pkl"
    _leaf_is_loaded: bool = False

    @classmethod
    def load_fruit_model(cls) -> FruitResNet:
        """Loads and returns the PyTorch Fruit ResNet-34 model."""
        if cls._fruit_model is None:
            if not cls._fruit_model_path.exists():
                raise FileNotFoundError(f"Fruit model checkpoint not found at: {cls._fruit_model_path}")

            model = FruitResNet(num_classes=cls._fruit_num_classes)
            checkpoint = torch.load(cls._fruit_model_path, map_location="cpu")

            if isinstance(checkpoint, dict) and "model_state" in checkpoint:
                state_dict = checkpoint["model_state"]
            else:
                state_dict = checkpoint

            model.load_state_dict(state_dict)
            model.eval()
            cls._fruit_model = model
            logger.info("Fruit ResNet-34 model loaded successfully.")

        return cls._fruit_model

    @classmethod
    def load_leaf_model(cls) -> Tuple[List[Tuple[np.ndarray, np.ndarray]], List[str]]:
        """Loads and parses the 300 Decision Trees into NumPy arrays for high-speed inference."""
        if cls._leaf_is_loaded:
            return cls._leaf_trees, cls._leaf_classes

        if not cls._leaf_model_path.exists():
            raise FileNotFoundError(f"Leaf Random Forest model not found at {cls._leaf_model_path}")
        if not cls._leaf_encoder_path.exists():
            raise FileNotFoundError(f"Leaf label encoder not found at {cls._leaf_encoder_path}")

        # 1. Unpickle Random Forest model safely
        with open(cls._leaf_model_path, "rb") as f:
            unpickler = SafeJoblibUnpickler(str(cls._leaf_model_path), f, True)
            rf_obj = unpickler.load()

        estimators = getattr(rf_obj, "estimators_", None)
        if estimators is None and hasattr(rf_obj, "state") and isinstance(rf_obj.state, dict):
            estimators = rf_obj.state.get("estimators_")

        cls._leaf_trees = []
        for est in estimators:
            tree_obj = getattr(est, "tree_", None)
            if tree_obj is None and hasattr(est, "state") and isinstance(est.state, dict):
                tree_obj = est.state.get("tree_")

            nodes = getattr(tree_obj, "nodes", None)
            values = getattr(tree_obj, "values", None)

            if (nodes is None or values is None) and hasattr(tree_obj, "state") and isinstance(tree_obj.state, dict):
                nodes = tree_obj.state.get("nodes")
                values = tree_obj.state.get("values")

            cls._leaf_trees.append((nodes, values))

        # 2. Unpickle Label Encoder
        with open(cls._leaf_encoder_path, "rb") as f:
            le_unpickler = SafeJoblibUnpickler(str(cls._leaf_encoder_path), f, True)
            le_obj = le_unpickler.load()

        classes_arr = getattr(le_obj, "classes_", None)
        if classes_arr is None and hasattr(le_obj, "state") and isinstance(le_obj.state, dict):
            classes_arr = le_obj.state.get("classes_")

        cls._leaf_classes = [str(c) for c in classes_arr]
        cls._leaf_is_loaded = True
        logger.info("Leaf Random Forest (300 trees) loaded successfully.")

        return cls._leaf_trees, cls._leaf_classes

    @classmethod
    def load_all(cls) -> Dict[str, bool]:
        """Eagerly loads both models into memory."""
        results = {"fruit_model": False, "leaf_model": False}
        try:
            cls.load_fruit_model()
            results["fruit_model"] = True
        except Exception as e:
            logger.error(f"Failed to load Fruit model: {e}")

        try:
            cls.load_leaf_model()
            results["leaf_model"] = True
        except Exception as e:
            logger.error(f"Failed to load Leaf model: {e}")

        return results

    @classmethod
    def is_fruit_loaded(cls) -> bool:
        return cls._fruit_model is not None

    @classmethod
    def is_leaf_loaded(cls) -> bool:
        return cls._leaf_is_loaded

    @classmethod
    def predict_leaf(cls, features: np.ndarray) -> Dict[str, Any]:
        """
        Runs pure NumPy inference across the 300 Decision Trees.
        Matches scikit-learn's predict_proba() exactly with 92.49% empirical test accuracy.
        """
        if not cls._leaf_is_loaded:
            cls.load_leaf_model()

        x = features.flatten().astype(np.float64)
        num_classes = len(cls._leaf_classes)
        probs = np.zeros(num_classes, dtype=np.float64)

        for nodes, values in cls._leaf_trees:
            node_id = 0
            while True:
                feat = nodes["feature"][node_id]
                if feat < 0:  # Leaf node
                    val = values[node_id, 0]
                    val_sum = val.sum()
                    if val_sum > 0:
                        probs += val / val_sum
                    break
                if x[feat] <= nodes["threshold"][node_id]:
                    node_id = nodes["left_child"][node_id]
                else:
                    node_id = nodes["right_child"][node_id]

        probs /= len(cls._leaf_trees)
        pred_idx = int(np.argmax(probs))
        pred_class = cls._leaf_classes[pred_idx]
        confidence = float(probs[pred_idx])

        probabilities_dict = {
            cls._leaf_classes[i].lower().replace(" ", ""): round(float(probs[i]), 4)
            for i in range(num_classes)
        }

        standard_name = pred_class.lower().replace(" ", "")

        return {
            "class_id": pred_idx,
            "predicted_class": standard_name,
            "display_name": pred_class,
            "confidence": round(confidence, 4),
            "probabilities": probabilities_dict
        }

    @classmethod
    def get_system_metadata(cls) -> Dict[str, Any]:
        """Returns consolidated metadata for both engines."""
        fruit_params = sum(p.numel() for p in cls._fruit_model.parameters()) if cls._fruit_model else 0
        leaf_classes_count = len(cls._leaf_classes) if cls._leaf_classes else 0
        trees_count = len(cls._leaf_trees) if cls._leaf_trees else 0

        return {
            "engine": "CitrusGuard Unified Model Manager",
            "fruit_engine": {
                "model_name": "FruitResNet",
                "architecture": "ResNet-34 (PyTorch)",
                "loaded": cls.is_fruit_loaded(),
                "total_parameters": fruit_params,
                "classes": ["blackspot", "canker", "greening", "healthy"],
                "accuracy": "84.00%"
            },
            "leaf_engine": {
                "model_name": "LeafRandomForest",
                "architecture": "Random Forest (300 Trees, Pure NumPy Traversal)",
                "loaded": cls.is_leaf_loaded(),
                "total_trees": trees_count,
                "classes": cls._leaf_classes or [],
                "feature_dimension": 110,
                "accuracy": "92.49%"
            }
        }
