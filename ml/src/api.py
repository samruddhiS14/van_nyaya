import csv
from datetime import datetime
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from src.predict import FRAAnomalyPredictor
from src.summary import GroundedSummarizer

app = FastAPI(title="FRA AI Assistance Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

predictor = FRAAnomalyPredictor()
summarizer = GroundedSummarizer()

class ClaimRequest(BaseModel):
    claim_id: str
    claim_type: str = "IFR"
    claimed_area: float
    gis_area: float
    overlap_pct: float
    overlapping_claims_count: int
    name_similarity_score: float
    survey_number_matched: str = "YES"
    missing_doc_count: int = 0
    historical_claim_count: int = 0

class FeedbackRequest(BaseModel):
    claim_id: str
    officer_id: str
    feedback_type: str
    comments: Optional[str] = None

@app.get("/")
def health_check():
    return {"status": "healthy", "service": "FRA AI Engine"}

@app.post("/api/claims/analyze")
def analyze_claim(claim: ClaimRequest):
    try:
        claim_dict = claim.dict()
        prediction = predictor.predict_claim(claim_dict)
        summary = summarizer.generate_summary(claim_dict, prediction)

        return {
            "claim_id": claim.claim_id,
            "model_version": "RandomForest_v1.0",
            "prediction": prediction,
            "summary": summary["summary_text"],
            "disclaimer": "AI decision support output. Authoritative determination rests with the competent FRA authority."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/claims/feedback")
def submit_feedback(fb: FeedbackRequest):
    try:
        log_path = Path("data/processed/officer_feedback.csv")
        log_path.parent.mkdir(parents=True, exist_ok=True)
        file_exists = log_path.exists()
        
        with open(log_path, "a", newline="") as f:
            writer = csv.writer(f)
            if not file_exists:
                writer.writerow(["timestamp", "claim_id", "officer_id", "feedback_type", "comments"])
            writer.writerow([datetime.utcnow().isoformat(), fb.claim_id, fb.officer_id, fb.feedback_type, fb.comments])
            
        return {"status": "success", "message": "Feedback recorded for future model validation"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))