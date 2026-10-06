# Fruit Disease Classification Service

A FastAPI-based web service for classifying fruit diseases using machine learning models. The service accepts image uploads and returns disease predictions for citrus fruits (blackspot, canker, greening, healthy).

## Features

- RESTful API for disease prediction
- Support for image upload and classification
- Health check endpoint
- Model information endpoint
- Class mapping endpoint

## Installation

1. Navigate to the fruit-disease-service directory:
   ```bash
   cd fruit-disease-service
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. Start the server:
   ```bash
   uvicorn app.main:app --reload
   ```

2. The API will be available at `http://localhost:8000`

3. Access the interactive API documentation at `http://localhost:8000/docs`

### Endpoints

- `POST /predict` - Upload an image file to get disease prediction
- `GET /health` - Health check
- `GET /model-info` - Get model information
- `GET /classes` - Get class mappings

## Project Structure

- `app/` - Main application code
  - `api/` - API routes
  - `core/` - Core functionality (model loading)
  - `services/` - Business logic (inference)
  - `schema/` - Pydantic schemas
  - `utils/` - Utility functions
- `artifacts/` - Trained model files
- `config/` - Configuration files
- `data/` - Data loading and preprocessing
- `models/` - Model definitions
- `training/` - Training scripts
- `scripts/` - Utility scripts

## Training

To train the model:

1. Prepare your dataset in the `data/dataset/` directory
2. Run the training script:
   ```bash
   python training/train.py
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
