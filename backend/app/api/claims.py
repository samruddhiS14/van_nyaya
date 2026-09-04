from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.schemas.claim import ClaimCreate, ClaimResponse
from app.services.claim_service import create_new_claim, get_all_claims, get_claim_by_id

router = APIRouter()

@router.post("/", response_model=ClaimResponse)
def create_claim_endpoint(claim_in: ClaimCreate, db: Session = Depends(get_db)):
    return create_new_claim(db, claim_in)

@router.get("/", response_model=List[ClaimResponse])
def get_claims_endpoint(db: Session = Depends(get_db)):
    return get_all_claims(db)

@router.get("/{claim_id}", response_model=ClaimResponse)
def get_claim_endpoint(claim_id: str, db: Session = Depends(get_db)):
    claim = get_claim_by_id(db, claim_id)
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    return claim