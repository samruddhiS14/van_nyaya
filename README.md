# Van-Nyaya: AI Decision-Support & FRA Land Rights Grid

A comprehensive Decision Support System (DSS), Machine Learning Anomaly Detection, and Geospatial Verification platform for the Forest Rights Act (FRA, 2006). This application integrates archival satellite imagery, automated boundary overlap telemetry, supervised tabular risk scoring, transparent rejection justifications, and grounded natural-language summaries to empower district verification committees.

---

## 🌳 Overview

Van-Nyaya is designed to support forest rights claimants, gram sabhas, and government verification committees in:
* **Geospatial Claim Validation:** Automatically checking submitted claims against cadastral maps, forest reserves, and adjacent plots.
* **Pre-2005 Cutoff Verification:** Ingesting historical satellite data to verify land occupation/cultivation prior to the statutory December 13, 2005 cutoff.
* **Trained ML Anomaly Detection:** Flagging structural inconsistencies, area mismatches, and multi-claim duplicates using supervised XGBoost/LightGBM models[cite: 1].
* **Explainable AI (XAI):** Decomposing risk factors into clear, human-readable contributions using SHAP attribution[cite: 1].
* **Transparent Rejections & Appeals:** Enforcing mandatory written justifications for any claim rejection, backed by an automated 90-day statutory appeal window tracking desk.
* **Document OCR Processing:** Extracting structured parameters from physical claim applications (Form A/B), voter IDs, and Gram Sabha resolutions[cite: 1].

---

## 📁 Project Structure

fra-ai-system/
├── frontend/                     # Official React + TypeScript review dashboard
│   ├── src/
│   │   ├── components/           # Reusable UI elements (Map, Badges, Modals)
│   │   │   ├── map/              # Leaflet GIS viewer & historical satellite layer
│   │   │   ├── audit/            # SHAP bar chart, risk band badges, evidence panels
│   │   │   └── appeals/          # 90-day appeal countdown timers & justification forms
│   │   ├── pages/                # High-level screens (Dashboard, ClaimReview, Rejections)
│   │   ├── services/             # Axios API services for backend communication
│   │   └── types/                # TypeScript interfaces matching backend models
│   ├── public/                   # Static assets & sample GeoJSON boundaries
│   └── package.json
├── backend/                      # FastAPI orchestration gateway (Port 5000)
│   ├── app/
│   │   ├── api/                  # REST endpoints (auth, claims, gis, ai, documents)
│   │   ├── database/             # SQLite/PostGIS connection, models, and seeders
│   │   ├── models/               # SQLAlchemy entities (User, Claim, Prediction, Feedback)
│   │   ├── schemas/              # Pydantic input/output validation contracts
│   │   ├── services/             # GIS intersection logic, OCR parsing, & ML proxy
│   │   └── main.py               # Application entrypoint & middleware
│   └── requirements.txt
├── ml/                           # Dedicated ML & XAI microservice (Port 8000)
│   ├── src/                      # Feature pipeline, model training, SHAP & prediction
│   ├── models/                   # Serialized ML binaries (.joblib)
│   ├── data/                     # Raw, interim, and processed feature CSVs
│   └── requirements.txt
├── tests/                        # Integration and automated endpoint tests
├── run_all.sh                    # Dual-service concurrent runner
└── docker-compose.yml            # Multi-service container spec

---

## 🚀 Key Features

### 1. Pre-2005 Temporal Spatial Verification
* Compares historical satellite telemetry (Landsat/Sentinel archival imagery pre-2005 vs. present basemaps) against claim boundaries.
* Confirms historical agricultural clearing or dwelling prior to the statutory December 13, 2005 cutoff date.
* Differentiates long-term traditional forest dwelling from fresh post-cutoff encroachments.

### 2. Transparent Rejection Justifications & 90-Day Appeal Tracker
* Prevents silent, arbitrary rejections by enforcing written reasons from the Sub-Divisional (SDLC) or District Level Committee (DLC).
* Generates formal, downloadable rejection notices for claimants.
* Automatically triggers an active 90-day statutory appeal countdown with tracking alerts for district committees.

### 3. Supervised ML Anomaly Detection & SHAP Attribution
* Evaluates cross-source signals: claimed vs. GIS surface area discrepancy, spatial overlap percentages, document completeness, and applicant history[cite: 1].
* Predicts an overall risk score and maps claims into `LOW`, `MEDIUM`, or `HIGH` risk bands[cite: 1].
* Employs SHAP (SHapley Additive exPlanations) to isolate positive and negative factor contributions for complete transparency[cite: 1].

### 4. Interactive WebGIS & Boundary Analysis
* Multi-layer interactive map showing village boundaries, cadastre lines, and forest reserves[cite: 1].
* Computes real-time polygon intersections and geometric overlap percentages[cite: 1].
* Evaluates polygon validity, vertex anomalies, and self-intersections[cite: 1].

### 5. Document Processing & OCR
* Scans uploaded PDFs, PNGs, and JPEGs of claim forms and certificates[cite: 1].
* Extracts names, survey numbers, and stated areas via OCR[cite: 1].
* Runs fuzzy cross-source consistency checks between physical paperwork and digital registry records[cite: 1].

### 6. Grounded AI Claim Summaries
* Generates structured natural language briefs strictly derived from verified parameters[cite: 1].
* Formats clear evidence panels for quick inspection by government review officers[cite: 1].
* Captures officer verification determinations to continuously improve model performance[cite: 1].

---

## 🛠️ Technology Stack

* **Frontend UI:** React 18, TypeScript, Tailwind CSS, Lucide Icons[cite: 1]
* **Geospatial & Maps:** Leaflet, GeoPandas, Shapely, GeoJSON[cite: 1]
* **Backend API Gateway:** FastAPI (Python 3.11+), Uvicorn, Pydantic v2[cite: 1]
* **Database & ORM:** SQLAlchemy 2.0, SQLite (Dev), PostgreSQL + PostGIS (Prod)[cite: 1]
* **Machine Learning:** Scikit-Learn, XGBoost, LightGBM, Pandas, NumPy[cite: 1]
* **Explainable AI (XAI):** SHAP (TreeExplainer)[cite: 1]
* **Document Processing:** PyMuPDF, PaddleOCR / Tesseract[cite: 1]

---

## 📦 Installation & Setup

### Prerequisites
* Python 3.9+ (Python 3.11 recommended)[cite: 1]
* Node.js 18+ (for frontend)
* Git[cite: 1]

### 1. Clone the Repository
```bash
git clone [https://github.com/samruddhiS14/van_nyaya.git](https://github.com/samruddhiS14/van_nyaya.git)
cd van_nyaya
