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

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Frontend UI**[cite: 1] | React 18, TypeScript, Tailwind CSS, Lucide Icons[cite: 1] | Officer review portal, triage queues, audit dashboards, and appeal tracking desk[cite: 1] |
| **Geospatial & Maps**[cite: 1] | Leaflet, React-Leaflet, GeoPandas, Shapely, GeoJSON[cite: 1] | Multi-layer cadastral boundary rendering, overlap analysis, and coordinate verification[cite: 1] |
| **Backend API Gateway**[cite: 1] | FastAPI, Python 3.11+, Uvicorn, Pydantic v2[cite: 1] | Asynchronous orchestration, strict schema validation, and inter-service proxy routing[cite: 1] |
| **Database & ORM**[cite: 1] | SQLAlchemy 2.0, SQLite (Dev), PostgreSQL + PostGIS (Prod)[cite: 1] | Relational claims storage, spatial indices, appeal ledgers, and officer audit logging[cite: 1] |
| **Machine Learning Core**[cite: 1] | Scikit-Learn, XGBoost, LightGBM, Pandas, NumPy[cite: 1] | Supervised tabular anomaly scoring, class imbalance handling, and risk band classification[cite: 1] |
| **Explainable AI (XAI)**[cite: 1] | SHAP (TreeExplainer, KernelExplainer)[cite: 1] | Granular feature attribution and positive/negative contribution decomposition[cite: 1] |
| **Document Processing**[cite: 1] | PyMuPDF, PaddleOCR / Tesseract[cite: 1] | Scanned document intake, multi-page text extraction, and cross-source field matching[cite: 1] |

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
