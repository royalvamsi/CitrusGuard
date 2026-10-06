from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.predict import router as predict_router
from app.api.predict_leaf import router as predict_leaf_router
from app.api.health import router as health_router
from app.api.model_info import router as model_router
from app.api.classes import router as classes_router

from app.core.model_manager import ModelManager


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Eagerly load both CitrusGuard engines
    load_status = ModelManager.load_all()
    print(f"CitrusGuard Dual Engine initialized successfully: {load_status}")
    yield


app = FastAPI(
    title="CitrusGuard Dual Disease Classification API",
    description="Unified API for Citrus Fruit and Leaf Disease Detection using ResNet-34 and Random Forest classifiers.",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router)
app.include_router(predict_leaf_router)
app.include_router(health_router)
app.include_router(model_router)
app.include_router(classes_router)