import cv2
import numpy as np
from fastapi import UploadFile
from typing import Dict, Any
from skimage.feature import graycomatrix, graycoprops, local_binary_pattern

from app.core.leaf_model_loader import LeafModelLoader


class LeafInferenceService:

    @staticmethod
    def extract_features_from_image(image_bgr: np.ndarray) -> np.ndarray:
        """
        Extracts the 110-dimensional handcrafted feature vector matching the training pipeline:
        - 96 HSV Color Histogram features
        - 4 Gray-Level Co-occurrence Matrix (GLCM) texture descriptors
        - 10 Local Binary Pattern (LBP) texture descriptors
        """
        if image_bgr is None or image_bgr.size == 0:
            raise ValueError("Invalid image buffer passed to feature extraction.")

        # Resize to standardized training resolution
        resized = cv2.resize(image_bgr, (256, 256))

        # 1. HSV Color Histogram (32 bins * 3 channels = 96 features)
        hsv = cv2.cvtColor(resized, cv2.COLOR_BGR2HSV)
        hist_h = cv2.calcHist([hsv], [0], None, [32], [0, 256])
        hist_s = cv2.calcHist([hsv], [1], None, [32], [0, 256])
        hist_v = cv2.calcHist([hsv], [2], None, [32], [0, 256])
        hist_features = np.concatenate((hist_h, hist_s, hist_v)).flatten()

        # 2. GLCM Texture Descriptors (4 features)
        gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)
        glcm = graycomatrix(gray, distances=[1], angles=[0], levels=256, symmetric=True, normed=True)
        contrast = graycoprops(glcm, 'contrast')[0, 0]
        correlation = graycoprops(glcm, 'correlation')[0, 0]
        energy = graycoprops(glcm, 'energy')[0, 0]
        homogeneity = graycoprops(glcm, 'homogeneity')[0, 0]
        glcm_features = np.array([contrast, correlation, energy, homogeneity])

        # 3. Local Binary Patterns (10 features)
        radius = 1
        n_points = 8 * radius
        lbp_bins = n_points + 2
        lbp = local_binary_pattern(gray, n_points, radius, method="uniform")
        lbp_hist, _ = np.histogram(lbp.ravel(), bins=lbp_bins, range=(0, lbp_bins))
        lbp_hist = lbp_hist.astype("float")
        lbp_hist /= (lbp_hist.sum() + 1e-6)

        features = np.concatenate((hist_features, glcm_features, lbp_hist))
        return features

    async def predict(self, file: UploadFile) -> Dict[str, Any]:
        """
        Processes uploaded image file, extracts features, and runs Random Forest inference.
        """
        image_bytes = await file.read()
        nparr = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if image is None:
            raise ValueError("Uploaded file could not be decoded into an image.")

        features = self.extract_features_from_image(image)
        prediction = LeafModelLoader.predict(features)

        return {
            "class_id": prediction["class_id"],
            "predicted_class": prediction["predicted_class"],
            "confidence": prediction["confidence"],
            "probabilities": prediction["probabilities"]
        }
