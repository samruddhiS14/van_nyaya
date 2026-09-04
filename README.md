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
