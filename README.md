# CitrusGuard - Plant Disease Detection System

An end-to-end intelligent disease detection system for fruits and leaves using deep learning and classical machine learning, powered by FastAPI microservices and a modern React + Vite frontend.

---

## 📁 Project Architecture

```
.
├── frontend/                  # React + TypeScript + Tailwind CSS UI
│   ├── src/                   # Components, pages, and UI logic
│   └── package.json
├── fruit-disease-service/     # FastAPI service for citrus fruit disease classification
│   ├── app/                   # FastAPI routes, schemas, and inference services
│   ├── artifacts/             # Trained deep learning model checkpoint
│   ├── models/                # PyTorch neural network architectures
│   └── requirements.txt
├── leaf-disease-service/      # Classical ML service for leaf disease diagnosis
│   └── dataset/
│       └── classical_ml/      # Random Forest, feature extraction & evaluation
└── README.md
```

---

## 🚀 Quick Start

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 2. Fruit Disease Service
```bash
cd fruit-disease-service
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 3. Leaf Disease Service
```bash
cd leaf-disease-service/dataset/classical_ml
python predict_rf.py
```
