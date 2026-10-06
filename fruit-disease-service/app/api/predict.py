from fastapi import APIRouter, UploadFile, File, HTTPException, status
from PIL import UnidentifiedImageError

from app.services.inference_service import InferenceService
from app.schema.prediction_schema import PredictionResponse


router = APIRouter()

service = InferenceService()

ALLOWED_CONTENT_TYPES = {
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
}
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB limit


@router.post("/predict", response_model=PredictionResponse)
async def predict_disease(file: UploadFile = File(...)):

    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No filename provided in upload."
        )

    file_ext = ""
    if "." in file.filename:
        file_ext = "." + file.filename.rsplit(".", 1)[1].lower()

    if file_ext not in ALLOWED_EXTENSIONS and file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Unsupported file format '{file.content_type or file_ext}'. "
                f"Allowed formats: JPEG, PNG, WebP."
            )
        )

    try:
        content = await file.read()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to read uploaded file: {str(e)}"
        )

    if len(content) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded image file is empty (0 bytes)."
        )

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds maximum allowed size of {MAX_FILE_SIZE // (1024 * 1024)} MB."
        )

    # Rewind file pointer for service to read
    await file.seek(0)

    try:
        result = await service.predict(file)
        return result
    except (UnidentifiedImageError, ValueError) as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Uploaded file could not be decoded as a valid image: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Inference error during processing: {str(e)}"
        )