from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schemas.prediction import AnalyzeResponse
from app.services.prediction_service import run_ai_prediction_pipeline

router = APIRouter()

@router.post("/{claim_id}/analyze", response_model=AnalyzeResponse)
async def analyze_claim_endpoint(claim_id: str, db: Session = Depends(get_db)):
    return await run_ai_prediction_pipeline(claim_id, db)