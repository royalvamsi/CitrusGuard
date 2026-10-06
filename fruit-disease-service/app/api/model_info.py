from fastapi import APIRouter
from app.core.model_manager import ModelManager

router = APIRouter()


@router.get("/model-info")
def model_info():
    fruit_model = ModelManager.load_fruit_model()
    fruit_params = sum(p.numel() for p in fruit_model.parameters())

    trees, leaf_classes = ModelManager.load_leaf_model()

    return {
        "model_name": "CitrusGuard Dual Engine",
        "architecture": "ResNet-34 + Random Forest (300 Trees)",
        "num_classes": 10,
        "total_parameters": fruit_params,
        "models": {
            "fruit": {
                "model_name": "FruitResNet",
                "architecture": "ResNet-34 (Transfer Learning)",
                "num_classes": 4,
                "total_parameters": fruit_params,
                "accuracy": "84.00%"
            },
            "leaf": {
                "model_name": "LeafRandomForest",
                "architecture": "Random Forest (300 Trees on 110-dim HSV+GLCM+LBP)",
                "num_classes": len(leaf_classes),
                "num_trees": len(trees),
                "accuracy": "92.49%"
            }
        }
    }