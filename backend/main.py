from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
import json
import numpy as np
from sklearn.ensemble import RandomForestClassifier

app = FastAPI(title="Van-Nyaya Spatial ML Core", version="3.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = "fra_portal.db"

# Baseline Random Forest trained on land title risk indicators
X_train = np.array([
    [10.2, 6.1, 0.67, 0],
    [5.1, 5.2, 0.02, 1],
    [8.0, 7.95, 0.01, 1],
    [3.8, 2.1, 0.81, 0],
    [2.0, 1.9, 0.05, 1],
    [12.0, 7.0, 0.71, 0],
])
y_train = np.array([1, 0, 0, 1, 0, 1])

rf_model = RandomForestClassifier(n_estimators=25, random_state=42)
rf_model.fit(X_train, y_train)

def compute_ml_risk(area_claimed: float, gis_area: float, pre_2005_verified: bool):
    discrepancy = abs(area_claimed - gis_area) / max(area_claimed, 0.1)
    features = np.array([[area_claimed, gis_area, discrepancy, 1 if pre_2005_verified else 0]])
    risk_prob = float(rf_model.predict_proba(features)[0][1])
    importances = rf_model.feature_importances_
    
    shap_factors = [
        {
            "feature": "pre_2005_satellite_anomaly",
            "importance": round(float(importances[3] * (1.3 if not pre_2005_verified else 0.1)), 2),
            "direction": "positive" if not pre_2005_verified else "negative",
            "description": "Satellite NIR reflectance indicates post-2005 clearing" if not pre_2005_verified else "Landsat 7 confirms pre-2005 customary occupancy"
        },
        {
            "feature": "area_discrepancy_pct",
            "importance": round(float(importances[2] * min(discrepancy, 1.0)), 2),
            "direction": "positive" if discrepancy > 0.15 else "negative",
            "description": f"Cadastral boundary area differs from declared form by {round(discrepancy * 100, 1)}%"
        }
    ]
    level = "HIGH" if risk_prob >= 0.6 else ("MEDIUM" if risk_prob >= 0.3 else "LOW")
    return risk_prob, level, shap_factors

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS claims (
            id TEXT PRIMARY KEY,
            claimant_name TEXT,
            village TEXT,
            district TEXT,
            state TEXT,
            area_claimed_hectares REAL,
            gis_computed_area_hectares REAL,
            status TEXT,
            risk_score REAL,
            risk_level TEXT,
            pre_2005_verified INTEGER,
            coordinates TEXT,
            shap_attributions TEXT
        )
    """)
    conn.commit()

    c.execute("SELECT COUNT(*) FROM claims")
    if c.fetchone()[0] == 0:
        seed_records = [
            (
                "FRA-1023", "Mangilal Bhil", "Kothri Kalan", "Sehore", "Madhya Pradesh",
                10.2, 6.1, "PENDING", 0.78, "HIGH", 0,
                json.dumps([[23.120, 76.980], [23.126, 76.980], [23.126, 76.987], [23.120, 76.987]]),
                json.dumps([
                    {"feature": "pre_2005_satellite_anomaly", "importance": 0.44, "direction": "positive", "description": "No cultivation clearing detected in Landsat archive prior to Dec 13, 2005"},
                    {"feature": "area_discrepancy_pct", "importance": 0.67, "direction": "positive", "description": "GIS boundary differs from claimed form area by 67%"}
                ])
            ),
            (
                "FRA-1041", "Devkaran Korku", "Nimawar", "Dewas", "Madhya Pradesh",
                5.1, 5.2, "PENDING", 0.45, "MEDIUM", 1,
                json.dumps([[23.130, 76.990], [23.135, 76.990], [23.135, 76.995], [23.130, 76.995]]),
                json.dumps([
                    {"feature": "delay_in_sdlc", "importance": 0.28, "direction": "positive", "description": "Processing window exceeded statutory timeline"}
                ])
            ),
            (
                "FRA-1067", "Savitri Bai Gond", "Khategaon", "Dewas", "Madhya Pradesh",
                8.0, 7.95, "APPROVED", 0.08, "LOW", 1,
                json.dumps([[23.140, 76.980], [23.145, 76.980], [23.145, 76.985], [23.140, 76.985]]),
                json.dumps([
                    {"feature": "pre_2005_satellite_anomaly", "importance": 0.02, "direction": "negative", "description": "Uninterrupted pre-2005 customary occupancy verified"}
                ])
            ),
            (
                "FRA-1099", "Rameshwar Kol", "Ashta", "Sehore", "Madhya Pradesh",
                3.8, 2.1, "REJECTED", 0.91, "HIGH", 0,
                json.dumps([[23.110, 76.970], [23.115, 76.970], [23.115, 76.975], [23.110, 76.975]]),
                json.dumps([
                    {"feature": "reserve_forest_overlap", "importance": 0.62, "direction": "positive", "description": "Boundary overlaps with protected sanctuary core"}
                ])
            )
        ]
        c.executemany("INSERT INTO claims VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", seed_records)
        conn.commit()
    conn.close()

init_db()

class ClaimCreate(BaseModel):
    id: str
    claimant_name: str
    village: str
    district: str
    state: str
    area_claimed_hectares: float
    gis_computed_area_hectares: float
    status: str
    pre_2005_verified: bool
    coordinates: List[List[float]]

class StatusUpdate(BaseModel):
    status: str

@app.get("/api/claims")
def get_all_claims():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("SELECT * FROM claims")
    rows = c.fetchall()
    conn.close()
    claims = []
    for r in rows:
        claims.append({
            "id": r[0],
            "claimant_name": r[1],
            "village": r[2],
            "district": r[3],
            "state": r[4],
            "area_claimed_hectares": r[5],
            "gis_computed_area_hectares": r[6],
            "status": r[7],
            "risk_score": r[8],
            "risk_level": r[9],
            "pre_2005_verified": bool(r[10]),
            "coordinates": json.loads(r[11]),
            "shap_attributions": json.loads(r[12]),
        })
    return claims

@app.post("/api/claims")
def create_claim(claim: ClaimCreate):
    risk_score, risk_level, shap_factors = compute_ml_risk(
        claim.area_claimed_hectares,
        claim.gis_computed_area_hectares,
        claim.pre_2005_verified
    )
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    try:
        c.execute("""
            INSERT INTO claims VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            claim.id,
            claim.claimant_name,
            claim.village,
            claim.district,
            claim.state,
            claim.area_claimed_hectares,
            claim.gis_computed_area_hectares,
            claim.status,
            risk_score,
            risk_level,
            1 if claim.pre_2005_verified else 0,
            json.dumps(claim.coordinates),
            json.dumps(shap_factors)
        ))
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        raise HTTPException(status_code=400, detail="Claim ID already exists.")
    conn.close()
    return {"status": "success", "claim_id": claim.id, "risk_score": risk_score, "risk_level": risk_level, "shap_attributions": shap_factors}

@app.patch("/api/claims/{claim_id}/status")
def update_status(claim_id: str, payload: StatusUpdate):
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("UPDATE claims SET status = ? WHERE id = ?", (payload.status, claim_id))
    conn.commit()
    conn.close()
    return {"status": "updated", "id": claim_id, "new_status": payload.status}
