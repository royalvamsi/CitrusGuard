"""
Backward-compatibility adapter for ModelLoader.
Delegates to the unified ModelManager.
"""
from app.core.model_manager import ModelManager


class ModelLoader:
    """Delegates to ModelManager.load_fruit_model() to maintain compatibility."""

    @classmethod
    @property
    def _model(cls):
        return ModelManager._fruit_model

    @classmethod
    def load_model(cls):
        return ModelManager.load_fruit_model()