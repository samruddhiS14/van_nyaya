# Van Nyaya (वन न्याय) — National AI Decision-Support & FRA Land Rights Grid

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React%2018-TypeScript-61DAFB?style=flat&logo=react)](https://react.dev/)
[![XGBoost](https://img.shields.io/badge/XGBoost-Tabular%20ML-EB5424)](https://xgboost.readthedocs.io/)
[![SHAP](https://img.shields.io/badge/SHAP-Explainable%20AI-FF6F00)](https://shap.readthedocs.io/)
[![GeoPandas](https://img.shields.io/badge/GeoPandas-Spatial%20Engine-139C5A)](https://geopandas.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Van Nyaya** is an enterprise AI decision-support platform engineered to accelerate the verification, spatial auditing, and human-in-the-loop validation of land claims submitted under the Scheduled Tribes and Other Traditional Forest Dwellers (Forest Rights Act / FRA).

By combining automated GIS boundary intersection telemetry, supervised gradient-boosted anomaly screening, local SHAP feature attribution, and evidence-grounded summarization, Van Nyaya identifies boundary overlaps and documentary discrepancies while leaving legal determinations to authorized district officials.

---

## Key Features

* **Supervised Anomaly Screening:** Gradient-boosted classifiers trained on cross-source features to flag high-risk structural anomalies across area declarations, survey records, and family claim histories[cite: 1].
* **Local SHAP Attribution:** Granular XAI decomposition pinpointing exactly which factors (e.g., spatial overlap percentage, area mismatch) influenced the model risk score[cite: 1].
* **GIS Cadastral Twin:** Automated calculation of claimed versus satellite-derived polygon areas, self-intersection tests, and boundary overlap metrics against protected zones and neighboring claims[cite: 1].
* **Document OCR Engine:** Optical text and table extraction across physical Form A/B applications, revenue records, and Gram Sabha resolutions to compute documentary consistency scores[cite: 1].
* **Interactive Official Review Dashboard:** Role-based portal featuring split-screen cadastral maps, interactive SHAP force bars, document inspection panels, and one-click audit feedback capture[cite: 1].

---

## Tech Stack & Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend & UX** | `React 18`, `TypeScript`, `Tailwind CSS`, `Lucide Icons` | Officer verification portal, multi-claim review dashboard, dynamic risk indicators, and feedback desk[cite: 1]. |
| **Spatial & Interactive Maps** | `Leaflet`, `React-Leaflet`, `OpenStreetMap / Sat Imagery` | Dual-layer cadastral boundary viewer, live polygon overlap rendering, and survey demarcations[cite: 1]. |
| **Backend Gateway** | `FastAPI`, `Uvicorn`, `Pydantic v2` | High-throughput asynchronous REST gateway, schema validation, and inter-service routing[cite: 1]. |
| **Machine Learning Core** | `XGBoost`, `Scikit-Learn`, `LightGBM`, `Joblib` | Supervised anomaly risk probability estimation and tabular claim classification pipelines[cite: 1]. |
| **Explainable AI (XAI)** | `SHAP (TreeExplainer)`, `NumPy` | Local feature attribution, Shapley value calculations, and quantitative risk decomposition[cite: 1]. |
| **Spatial & GIS Engine** | `GeoPandas`, `Shapely`, `PyProj` | Boundary polygon validation, CRS coordinate transformation, and multi-claim intersection calculations[cite: 1]. |
| **Document Processing** | `PyMuPDF`, `PaddleOCR / Tesseract` | Scanned document intake, multi-page text extraction, and cross-source field matching[cite: 1]. |
| **Database & Persistence** | `SQLAlchemy 2.0`, `PostgreSQL / PostGIS` (SQLite dev) | Relational claim storage, spatial boundary indices, officer audit logs, and retraining feedback[cite: 1]. |

---

### Badges & Tools

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/Scikit_Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)

---

## Repository Structure

```text
fra-ai-system/
├── frontend/                     # Official portal user interface (React + TypeScript)[cite: 1]
│   ├── public/                   # Static icons, map markers, and government emblems
│   ├── src/
│   │   ├── assets/               # Branding assets, vector logos, and base icons
│   │   ├── components/           # Reusable UI widgets[cite: 1]
│   │   │   ├── common/           # Navbar, Sidebar, StatCard, LoadingSkeleton
│   │   │   ├── map/              # Leaflet GIS viewer, OverlapPolygonLayer, GeoJSONControls
│   │   │   ├── audit/            # RiskBandBadge, SHAPBarChart, GroundedSummaryCard
│   │   │   └── documents/        # DocumentViewer, OCRExtractPanel, EvidenceInspector
│   │   ├── pages/                # High-level route views[cite: 1]
│   │   │   ├── Dashboard.tsx     # District officer overview, triage queue, status filters
│   │   │   ├── ClaimReview.tsx   # Split-screen map, ML anomaly assessment, evidence panel
│   │   │   └── FeedbackLogs.tsx  # Historical officer determinations and model audit logs
│   │   ├── services/             # API client bridge (Axios hooks for backend & ML proxy)[cite: 1]
│   │   ├── hooks/                # Custom React hooks (useClaims, useSpatialLayer, useAIAnalysis)[cite: 1]
│   │   ├── types/                # Strict TypeScript interfaces matching backend Pydantic schemas[cite: 1]
│   │   ├── utils/                # Coordinate conversions, date formatters, geo-calc helpers[cite: 1]
│   │   ├── App.tsx               # Root app layout, route router, and notification toaster
│   │   └── main.tsx              # React entry point and CSS bundle mounting
│   ├── package.json              # Frontend npm packages and Vite dependencies
│   ├── tsconfig.json             # TypeScript project compiler configuration
│   └── vite.config.ts            # Vite bundling settings and proxy route configuration
│
├── backend/                      # Orchestration & business logic gateway (Port 5000)[cite: 1]
│   ├── app/
│   │   ├── api/                  # REST routes (auth, claims, documents, GIS, AI, feedback)[cite: 1]
│   │   ├── database/             # Connection pooling, migrations, and seed scripts[cite: 1]
│   │   ├── models/               # SQLAlchemy models (User, Claim, Prediction, Feedback)[cite: 1]
│   │   ├── schemas/              # Pydantic v2 input/output payload schemas[cite: 1]
│   │   ├── services/             # Domain logic (GIS, document OCR, feature aggregation)[cite: 1]
│   │   └── main.py               # Gateway entrypoint & middleware configuration[cite: 1]
│   └── requirements.txt          # Gateway Python dependencies[cite: 1]
│
├── ml/                           # Dedicated ML inference & explainability microservice (Port 8000)[cite: 1]
│   ├── artifacts/                # Encoders, scalers, and evaluation metric snapshots[cite: 1]
│   ├── configs/                  # Model hyperparameters and feature schemas[cite: 1]
│   ├── data/                     # Raw, interim, and processed training matrices[cite: 1]
│   ├── models/                   # Versioned serialized model binaries (.joblib)[cite: 1]
│   ├── src/                      # ML pipelines (ingestion, features, train, explain, predict)[cite: 1]
│   └── requirements.txt          # ML service dependencies[cite: 1]
│
├── tests/                        # Automated integration and API test suite[cite: 1]
├── docker-compose.yml            # Multi-service container specification[cite: 1]
├── run_all.sh                    # Dual-service concurrent runner
└── .gitignore                    # Ignored cache, models, node_modules & environment files[cite: 1]
