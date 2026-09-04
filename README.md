# Van Nyaya (वन न्याय): AI Decision-Support System for Forest Rights Act Claims

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20TypeScript-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Scikit-Learn](https://img.shields.io/badge/ML-Scikit--Learn%20%7C%20XGBoost-F7931E?style=flat&logo=scikit-learn)](https://scikit-learn.org/)
[![Explainable AI](https://img.shields.io/badge/XAI-SHAP-FF6F00?style=flat)](https://shap.readthedocs.io/)
[![Spatial](https://img.shields.io/badge/GIS-GeoPandas%20%7C%20Shapely-139C5A?style=flat)](https://geopandas.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%2B%20PostGIS-336791?style=flat&logo=postgresql)](https://www.postgresql.org/)

Van Nyaya is an enterprise decision-support system engineered to accelerate and audit the verification of land claims submitted under the Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006 (FRA).

The platform uses a **human-in-the-loop** architecture. Rather than issuing automated legal determinations, it surfaces cross-source discrepancies across spatial polygons, physical records, and administrative registries. A supervised machine-learning model scores claims for structural anomalies, decomposes predictive factors via SHAP, and generates evidence-grounded claim summaries for designated verification officers.

---

## System Architecture

The monorepo contains decoupled microservices that communicate over internal HTTP endpoints:

```text
fra-ai-system/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── utils/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── api/
│   │   │   ├── auth.py
│   │   │   ├── claims.py
│   │   │   ├── documents.py
│   │   │   ├── gis.py
│   │   │   ├── ai.py
│   │   │   └── feedback.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── claim.py
│   │   │   ├── document.py
│   │   │   ├── prediction.py
│   │   │   └── feedback.py
│   │   ├── schemas/
│   │   │   ├── claim.py
│   │   │   ├── document.py
│   │   │   ├── prediction.py
│   │   │   └── feedback.py
│   │   ├── services/
│   │   │   ├── claim_service.py
│   │   │   ├── document_service.py
│   │   │   ├── gis_service.py
│   │   │   ├── feature_service.py
│   │   │   ├── prediction_service.py
│   │   │   ├── explanation_service.py
│   │   │   └── summary_service.py
│   │   └── database/
│   │       ├── connection.py
│   │       ├── seed.py
│   │       └── migrations/
│   └── requirements.txt
│
├── ml/
│   ├── data/
│   │   ├── raw/
│   │   ├── interim/
│   │   └── processed/
│   ├── notebooks/
│   ├── src/
│   │   ├── ingestion.py
│   │   ├── cleaning.py
│   │   ├── feature_engineering.py
│   │   ├── train.py
│   │   ├── evaluate.py
│   │   ├── predict.py
│   │   └── explain.py
│   ├── models/
│   ├── artifacts/
│   ├── configs/
│   └── requirements.txt
│
├── tests/
├── docs/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── run_all.sh
└── README.md

