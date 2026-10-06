from typing import Dict
from pydantic import BaseModel


class PredictionResponse(BaseModel):

    class_id: int
    predicted_class: str
    confidence: float
    probabilities: Dict[str, float]