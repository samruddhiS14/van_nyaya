from sqlalchemy.orm import Session
from app.models.claim import Claim
from app.schemas.claim import ClaimCreate

def create_new_claim(db: Session, claim_data: ClaimCreate):
    db_claim = Claim(**claim_data.model_dump())
    db.add(db_claim)
    db.commit()
    db.refresh(db_claim)
    return db_claim

def get_all_claims(db: Session):
    return db.query(Claim).all()

def get_claim_by_id(db: Session, claim_id: str):
    return db.query(Claim).filter(Claim.claim_id == claim_id).first()