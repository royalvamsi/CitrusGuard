from typing import Dict, Any, Literal
import torch
import cv2
import numpy as np
from fastapi import UploadFile

from app.core.model_manager import ModelManager
from app.utils.preprocess import preprocess_image
from app.utils.class_map import CLASS_MAP
from app.services.leaf_inference_service import LeafInferenceService


class UnifiedInferenceService:
    """
    Unified inference service providing a single entry point for both
    Fruit Deep Learning (ResNet-34) and Leaf Classical ML (Random Forest).
    """

    def __init__(self):
        self.leaf_extractor = LeafInferenceService()

    async def predict_fruit(self, file: UploadFile) -> Dict[str, Any]:
        """Runs PyTorch ResNet-34 inference on uploaded fruit image."""
        image_bytes = await file.read()
        tensor = preprocess_image(image_bytes)

        model = ModelManager.load_fruit_model()
        model.eval()

        with torch.inference_mode():
            outputs = model(tensor)
            probabilities = torch.softmax(outputs, dim=1)
            predicted = torch.argmax(probabilities, dim=1).item()
            confidence = probabilities[0][predicted].item()

        class_name = CLASS_MAP.get(predicted, f"class_{predicted}")
        probs_list = probabilities[0].tolist()
        probabilities_dict = {
            CLASS_MAP.get(idx, f"class_{idx}"): round(probs_list[idx], 4)
            for idx in range(len(probs_list))
        }

        return {
            "class_id": predicted,
            "predicted_class": class_name,
            "confidence": round(confidence, 4),
            "probabilities": probabilities_dict
        }

    async def predict_leaf(self, file: UploadFile) -> Dict[str, Any]:
        """Runs 110-dim feature extraction and 300-tree Random Forest inference on leaf image."""
        image_bytes = await file.read()
        nparr = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if image is None:
            raise ValueError("Uploaded file could not be decoded into an image.")

        features = self.leaf_extractor.extract_features_from_image(image)
        prediction = ModelManager.predict_leaf(features)

        return {
            "class_id": prediction["class_id"],
            "predicted_class": prediction["predicted_class"],
            "confidence": prediction["confidence"],
            "probabilities": prediction["probabilities"]
        }
