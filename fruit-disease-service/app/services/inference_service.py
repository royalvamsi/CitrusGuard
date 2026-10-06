from typing import Dict, Any
import torch
from fastapi import UploadFile

from app.core.model_loader import ModelLoader
from app.utils.preprocess import preprocess_image
from app.utils.class_map import CLASS_MAP


class InferenceService:

    def __init__(self):
        self._model = None

    @property
    def model(self):
        if self._model is None:
            self._model = ModelLoader.load_model()
        return self._model

    async def predict(self, file: UploadFile) -> Dict[str, Any]:

        image_bytes = await file.read()

        tensor = preprocess_image(image_bytes)

        model = self.model
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