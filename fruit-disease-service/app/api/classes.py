from fastapi import APIRouter
from app.utils.class_map import CLASS_MAP

router = APIRouter()

LEAF_CLASSES = {
    0: "Anthracnose",
    1: "Black spot",
    2: "Canker",
    3: "Greening",
    4: "Healthy",
    5: "Melanose"
}


@router.get("/classes")
def get_classes():
    return {
        "classes": CLASS_MAP,
        "fruit_classes": CLASS_MAP,
        "leaf_classes": LEAF_CLASSES
    }


@router.get("/classes/fruit")
def get_fruit_classes():
    return {"classes": CLASS_MAP}


@router.get("/classes/leaf")
def get_leaf_classes():
    return {"classes": LEAF_CLASSES}