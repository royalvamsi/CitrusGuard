# CitrusGuard AI Frontend

A modern, responsive web application for citrus fruit and leaf disease detection. Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **Lucide React**, and **Framer Motion**.

---

## 🛠 Tech Stack

- **Framework:** React 19 (TypeScript)
- **Bundler:** Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **State Management:** React Context API + LocalStorage persistence
- **Backend API:** FastAPI (ResNet-34 PyTorch Transfer Learning)

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js:** v18.0.0 or higher (v26+ supported)
- **npm:** v9.0.0 or higher
- **FastAPI Backend:** Running on `http://127.0.0.1:8000`

### 2. Environment Configuration
Verify that `frontend/.env` is configured with your FastAPI backend URL:
```env
VITE_API_URL=http://127.0.0.1:8000
```

### 3. Installation
Navigate into the `frontend` directory and install project dependencies:
```bash
cd frontend
npm install
```

### 4. Development Server
Start the Vite development server:
```bash
npm run dev
```
Open your browser at:
👉 **`http://localhost:5173`**

### 5. Production Build
To create a production-optimized build:
```bash
npm run build
npm run preview
```

---

## 📱 Application Modules & Pages

1. **Dashboard (`/`):**
   - High-level overview of dual-modality architecture.
   - Live model status and performance benchmarks (ResNet-34 84.0% vs Random Forest 92.5%).
   - Monitored disease encyclopedia quick-access.

2. **Fruit Disease Detection:**
   - Drag-and-drop image upload zone with client-side JPEG/PNG/WebP validation.
   - Connected directly to `POST http://127.0.0.1:8000/predict`.
   - Displays diagnosed disease, confidence percentage, and complete softmax probability distribution.
   - Dynamic therapeutic treatments, diagnostic symptoms, and prevention protocols.

3. **Leaf Disease Detection:**
   - Staging interface for citrus foliage inspection.
   - Technical breakdown of the 110-dimensional handcrafted feature vector (HSV + GLCM + LBP).
   - Information banner detailing Phase 2 backend unification.

4. **Diagnosis History:**
   - Persisted scan history in browser `localStorage`.
   - Filter by specimen category (Fruit vs. Leaf) and search by disease name.
   - Export scan audit logs as formatted JSON.

5. **About the Project:**
   - Academic details: RGUKT Ongole CSE Batch 68 (2025–2026).
   - Research team and faculty supervisor credits.
   - Full comparative benchmark table across Logistic Regression, KNN, SVM, XGBoost, Random Forest, and ResNet-34.

---

## 🔌 API Integration Contracts

| Endpoint | Method | Payload | Response | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/predict` | `POST` | `multipart/form-data` (`file`) | `FruitPredictionResponse` | Classifies fruit image into blackspot, canker, greening, or healthy |
| `/health` | `GET` | None | `HealthStatus` | Returns backend readiness and model loaded status |
| `/model-info` | `GET` | None | `ModelInfo` | Reports architecture and parameter counts |
| `/classes` | `GET` | None | `ClassesResponse` | Returns active class index mappings |
