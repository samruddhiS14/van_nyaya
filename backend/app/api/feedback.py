import httpx
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.config import settings
from app.database.connection import get_db
from app.models.feedback import PredictionFeedback
from app.schemas.feedback import FeedbackCreate

router = APIRouter()

@router.post("/{claim_id}/feedback")
async def submit_feedback_endpoint(claim_id: str, fb_in: FeedbackCreate, db: Session = Depends(get_db)):
    record = PredictionFeedback(
        claim_id=claim_id,
        officer_id=fb_in.officer_id,
        feedback_type=fb_in.feedback_type,
        comments=fb_in.comments
    )
    db.add(record)
    db.commit()
    
    # Relay to ML engine for retraining dataset accumulation
    try:
        async with httpx.AsyncClient() as client:
            await client.post(
                f"{settings.ML_SERVICE_URL}/api/claims/feedback",
                json={"claim_id": claim_id, **fb_in.model_dump()},
                timeout=5.0
            )
    except Exception:
        pass
        
    return {"status": "success", "message": "Official feedback logged successfully"}