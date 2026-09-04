from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.services.gis_service import process_gis_geometry

router = APIRouter()

@router.post("/{claim_id}/gis/process")
def process_gis_endpoint(claim_id: str, gis_area: float = 2.5, overlap_pct: float = 12.0, db: Session = Depends(get_db)):
    claim = process_gis_geometry(claim_id, gis_area, overlap_pct, 1, db)
    return {"claim_id": claim_id, "gis_area": claim.gis_area, "overlap_pct": claim.overlap_pct}