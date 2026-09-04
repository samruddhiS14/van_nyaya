# Van-Nyaya: AI Decision-Support & FRA Land Rights Grid

A comprehensive Decision Support System (DSS), Machine Learning Anomaly Detection, and Geospatial Verification platform for the Forest Rights Act (FRA, 2006). This application integrates archival satellite imagery, automated boundary overlap telemetry, supervised tabular risk scoring, transparent rejection justifications, and grounded natural-language summaries to empower district verification committees.

---

## 🌳 Overview

Van-Nyaya is designed to support forest rights claimants, gram sabhas, and government verification committees in:

* **Geospatial Claim Validation:** Automatically checking submitted claims against cadastral maps, forest reserves, and adjacent plots.
* **Pre-2005 Cutoff Verification:** Ingesting historical satellite data to verify land occupation/cultivation prior to the statutory December 13, 2005 cutoff.
* **Trained ML Anomaly Detection:** Flagging structural inconsistencies, area mismatches, and multi-claim duplicates using supervised XGBoost/LightGBM models.
* **Explainable AI (XAI):** Decomposing risk factors into clear, human-readable contributions using SHAP attribution.
* **Transparent Rejections & Appeals:** Enforcing mandatory written justifications for any claim rejection, backed by an automated 90-day statutory appeal window tracking desk.
* **Document OCR Processing:** Extracting structured parameters from physical claim applications (Form A/B), voter IDs, and Gram Sabha resolutions.

---

## 📁 Project Structure

```text
fra-ai-system/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── map/
│   │   │   ├── audit/
│   │   │   └── appeals/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   ├── public/
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── database/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   └── requirements.txt
├── ml/
│   ├── src/
│   ├── models/
│   ├── data/
│   └── requirements.txt
├── tests/
├── run_all.sh
└── docker-compose.yml
```

---

## 🚀 Key Features

### 1. Pre-2005 Temporal Spatial Verification
* **Historical Satellite Ingestion:** Compares historical satellite telemetry (Landsat/Sentinel archival imagery pre-2005 vs. present basemaps) against submitted claim boundaries.
* **Statutory Cutoff Adherence:** Confirms historical agricultural clearing or dwelling prior to the mandatory **December 13, 2005** cutoff date.
* **Encroachment Filtering:** Differentiates authentic, multi-generational forest dwelling from fresh, post-cutoff encroachments.

### 2. Transparent Rejection Justifications & 90-Day Appeal Tracker
* **Statutory Compliance:** Prevents silent, arbitrary rejections by enforcing mandatory written justifications from the Sub-Divisional (SDLC) or District Level Committee (DLC).
* **Automated Notice Generation:** Generates formal, downloadable rejection notices citing specific legal and evidential grounds for claimants.
* **Active Appeal Windows:** Automatically triggers an active **90-day statutory appeal countdown** with tracking alerts and escalation monitors for district committees.

### 3. Supervised ML Anomaly Detection & SHAP Attribution
* **Cross-Source Evaluation:** Evaluates cross-source signals including claimed vs. GIS surface area discrepancies, spatial overlap percentages, document completeness, and applicant history.
* **Calibrated Risk Bands:** Predicts an overall risk probability and assigns claims into **LOW**, **MEDIUM**, or **HIGH** risk bands.
* **Local Explainability (XAI):** Employs **SHAP (SHapley Additive exPlanations)** to isolate positive and negative factor contributions for complete transparency.

### 4. Interactive WebGIS & Boundary Analysis
* **Cadastral Layer Viewer:** Multi-layer interactive map rendering village boundaries, cadastre lines, and reserve forest tracts.
* **Real-Time Spatial Math:** Computes instant polygon intersections, topological overlaps, and boundary buffer encroachments.
* **Geometric Validation:** Validates coordinate polygons against self-intersections, vertex anomalies, and invalid geometries.

### 5. Document Processing & OCR
* **Multi-Format Ingestion:** Scans uploaded PDFs, PNGs, and JPEGs of claim forms, revenue certificates, and Gram Sabha resolutions.
* **Structured Data Extraction:** Automatically extracts claimant names, survey numbers, and declared land area via OCR.
* **Fuzzy Consistency Checks:** Runs cross-source Levenshtein string matching between physical paperwork and land record registries.

### 6. Grounded AI Claim Summaries
* **Zero-Hallucination Briefs:** Generates structured, natural-language executive summaries derived strictly from verified database records.
* **Evidence Panels:** Formats clear visual evidence panels for high-speed triage by government review officers.
* **Human-in-the-Loop Feedback:** Logs officer overrides and verification determinations to version and retrain ML pipelines continuously.

---

## 🛠️ Technology Stack

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | `React 18`, `TypeScript`, `Tailwind CSS`, `Lucide Icons` | Officer review portal, triage queues, audit dashboards, and appeal tracking desk |
| **Geospatial & Maps** | `Leaflet`, `React-Leaflet`, `GeoPandas`, `Shapely`, `GeoJSON` | Multi-layer cadastral boundary rendering, overlap analysis, and coordinate verification |
| **Backend API Gateway** | `FastAPI`, `Python 3.11+`, `Uvicorn`, `Pydantic v2` | Asynchronous orchestration, strict schema validation, and inter-service proxy routing |
| **Database & ORM** | `SQLAlchemy 2.0`, `SQLite` (Dev), `PostgreSQL` + `PostGIS` (Prod) | Relational claims storage, spatial indices, appeal ledgers, and officer audit logging |
| **Machine Learning Core** | `Scikit-Learn`, `XGBoost`, `LightGBM`, `Pandas`, `NumPy` | Supervised tabular anomaly scoring, class imbalance handling, and risk band classification |
| **Explainable AI (XAI)** | `SHAP` (`TreeExplainer`, `KernelExplainer`) | Granular feature attribution and positive/negative contribution decomposition |
| **Document Processing** | `PyMuPDF`, `PaddleOCR` / `Tesseract` | Scanned document intake, multi-page text extraction, and cross-source field matching |

---

## 📦 Installation & Setup

### Prerequisites
* **Python 3.11+**
* **Node.js 18+** & `npm`
* **Git**
* *(Optional)* **Docker & Docker Compose**

### 1. Clone the Repository
```bash
git clone [https://github.com/samruddhiS14/van_nyaya.git](https://github.com/samruddhiS14/van_nyaya.git)
cd van_nyaya
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

### 4. Running via Docker Compose
```bash
docker-compose up --build
```

---

## ⚙️ Environment Configuration (.env)

Create a `.env` file in the `backend/` directory:

```ini
# Application Settings
PROJECT_NAME="Van-Nyaya FRA Grid"
ENVIRONMENT="development"
DEBUG=True
API_V1_STR="/api/v1"
SECRET_KEY="replace-with-a-secure-secret-key"

# Database Configuration (PostGIS)
POSTGRES_SERVER="localhost"
POSTGRES_PORT=5432
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres_password"
POSTGRES_DB="van_nyaya_db"
DATABASE_URL="postgresql+psycopg2://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_SERVER}:${POSTGRES_PORT}/${POSTGRES_DB}"

# Geospatial & Satellite Services
LANDSAT_AWS_S3_BUCKET="landsat-pds"
SENTINEL_API_KEY="your-sentinel-api-key"

# ML & OCR Model Paths
MODEL_CHECKPOINT_DIR="ml/models/"
SHAP_BACKGROUND_SAMPLES=100
OCR_ENGINE="paddleocr"

# Security & CORS
CORS_ORIGINS="http://localhost:3000,http://localhost:5173"
```

---

## 📡 API Reference

When running the backend, interactive Swagger API documentation is available at `http://localhost:8000/docs`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/claims/upload` | Upload claim dossier (Form A/B, identity docs, GeoJSON boundary) |
| `POST` | `/api/v1/spatial/verify-temporal` | Compare boundary polygon against pre-2005 satellite raster bands |
| `POST` | `/api/v1/ml/predict-risk` | Generate risk probability score and SHAP feature attributions |
| `GET` | `/api/v1/claims/{id}/evidence-panel` | Fetch structured verification data, map layers, and OCR logs |
| `POST` | `/api/v1/appeals/{id}/reject` | Submit mandatory written rejection grounds and start 90-day window |
| `GET` | `/api/v1/appeals/active` | Monitor claims currently within the statutory 90-day appeal countdown |

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.
