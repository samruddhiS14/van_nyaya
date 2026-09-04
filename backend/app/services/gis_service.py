from sqlalchemy.orm import Session
from app.models.claim import Claim

def process_gis_geometry(claim_id: str, gis_area: float, overlap_pct: float, overlap_count: int, db: Session):
    claim = db.query(Claim).filter(Claim.claim_id == claim_id).first()
    if claim:
        claim.gis_area = gis_area
        claim.overlap_pct = overlap_pct
        claim.overlapping_claims_count = overlap_count
        db.commit()
        db.refresh(claim)
    return claim