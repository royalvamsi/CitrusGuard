from fastapi import APIRouter
from app.core.model_manager import ModelManager

router = APIRouter()


@router.get("/health")
def health_check():
    fruit_loaded = ModelManager.is_fruit_loaded()
    leaf_loaded = ModelManager.is_leaf_loaded()

    return {
        "status": "ok",
        "model_loaded": fruit_loaded and leaf_loaded,
        "fruit_model_loaded": fruit_loaded,
        "leaf_model_loaded": leaf_loaded
    }