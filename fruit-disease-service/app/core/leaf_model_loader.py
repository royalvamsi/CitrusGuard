"""
Backward-compatibility adapter for LeafModelLoader.
Delegates to the unified ModelManager.
"""
from typing import Dict, Any, List, Tuple
import numpy as np
from app.core.model_manager import ModelManager


class LeafModelLoader:
    """Delegates to ModelManager to maintain compatibility with existing inference code."""

    @classmethod
    @property
    def _trees(cls) -> List[Tuple[np.ndarray, np.ndarray]]:
        return ModelManager._leaf_trees

    @classmethod
    @property
    def _classes(cls) -> List[str]:
        return ModelManager._leaf_classes

    @classmethod
    def load_model(cls) -> Tuple[List[Tuple[np.ndarray, np.ndarray]], List[str]]:
        return ModelManager.load_leaf_model()

    @classmethod
    def is_loaded(cls) -> bool:
        return ModelManager.is_leaf_loaded()

    @classmethod
    def predict(cls, features: np.ndarray) -> Dict[str, Any]:
        return ModelManager.predict_leaf(features)
