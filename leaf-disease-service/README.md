# Leaf Disease Classification Service

A machine learning-based service for classifying leaf diseases using classical techniques. The service uses a Random Forest classifier trained on extracted features from leaf images to identify diseases such as Anthracnose, Black Spot, Canker, Greening, Healthy, and Melanose.

## Dataset

The dataset is organized into training and testing sets:

- `train/`: Training images organized by disease class
- `test/`: Testing images organized by disease class

Classes:
- Anthracnose
- Black spot
- Canker
- Greening
- Healthy
- Melanose

## Features

The model extracts features from images using:
- HSV color histograms
- Gray Level Co-occurrence Matrix (GLCM) properties (contrast, correlation, energy, homogeneity)
- Local Binary Patterns (LBP)

## Installation

1. Navigate to the leaf-disease-service directory.

2. Install required Python packages:
   ```
   pip install pandas scikit-learn opencv-python scikit-image joblib numpy
   ```

## Usage

### Training the Model

Run the training script to train the Random Forest model:

```bash
cd dataset/classical_ml
python train_random_forest.py
```

This will:
- Load pre-extracted features from `train_features.csv` and `test_features.csv`
- Train a Random Forest classifier
- Save the model as `final_rf_model.pkl` and label encoder as `rf_label_encoder.pkl`

### Feature Extraction

To extract features from new images:

```bash
python extract_features_new.py
```

### Prediction

To predict disease from a new leaf image:

```bash
python predict_rf.py
```

### Evaluation

- `confusion_matrix_rf.py`: Generate confusion matrix
- `feature_importance_rf.py`: Analyze feature importance
- `tune_rf.py`: Hyperparameter tuning
- `compare_models.py`: Compare different models
- `ensemble_rf_xgb.py`: Ensemble with XGBoost

## Model Files

- `final_rf_model.pkl`: Trained Random Forest model
- `rf_label_encoder.pkl`: Label encoder for classes
- `model_new.pkl`: Alternative model
- `final_rf_tuned.pkl`: Tuned model
- `label_encoder.pkl`: Alternative encoder

## Requirements

- Python 3.x
- Libraries: pandas, scikit-learn, opencv-python, scikit-image, joblib, numpy

## Results

The following accuracies were achieved on the test set:

- Logistic Regression: 86.38%
- KNN: 85.92%
- SVM: 84.98%
- XGBoost: 92.02%
- Random Forest: 92.49%

The Random Forest model is the primary model used in this service.

## Contributing

Feel free to contribute by improving the model, adding more features, or extending to other diseases.