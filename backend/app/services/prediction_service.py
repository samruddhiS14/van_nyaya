import json
import httpx
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.config import settings
from app.models.claim import Claim
from app.models.prediction import Prediction

async def run_ai_prediction_pipeline(claim_id: str, db: Session):
    claim = db.query(Claim).filter(Claim.claim_id == claim_id).first()
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
        
    payload = {
        "claim_id": claim.claim_id,
        "claim_type": claim.claim_type,
        "claimed_area": claim.claimed_area,
        "gis_area": claim.gis_area,
        "overlap_pct": claim.overlap_pct,
        "overlapping_claims_count": claim.overlapping_claims_count,
        "name_similarity_score": 0.85,
        "survey_number_matched": "YES",
        "missing_doc_count": 0,
        "historical_claim_count": 0
    }
    
    try:
        async with httpx.AsyncClient() as client:
            res = await client.post(f"{settings.ML_SERVICE_URL}/api/claims/analyze", json=payload, timeout=10.0)
            if res.status_code != 200:
                raise HTTPException(status_code=502, detail="ML Service Error")
            ml_data = res.json()
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Cannot reach ML engine: {str(e)}")
        
    pred_record = Prediction(
        claim_id=claim.claim_id,
        model_version=ml_data.get("model_version", "v1.0"),
        prediction=1 if ml_data["prediction"]["anomaly_detected"] else 0,
        anomaly_probability=ml_data["prediction"]["anomaly_probability"],
        risk_band=ml_data["prediction"]["risk_band"],
        feature_snapshot=json.dumps(payload),
        explanation=json.dumps(ml_data["prediction"]["top_contributing_factors"]),
        summary=ml_data.get("summary", "")
    )
    db.add(pred_record)
    db.commit()
    db.refresh(pred_record)
    return ml_data