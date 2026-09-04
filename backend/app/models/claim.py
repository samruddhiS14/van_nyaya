from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime
from app.database.connection import Base

class Claim(Base):
    __tablename__ = "claims"
    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(String, unique=True, index=True)
    claimant_id = Column(String, index=True)
    claimant_name = Column(String)
    claim_type = Column(String, default="IFR")
    village_id = Column(String)
    gram_panchayat_id = Column(String)
    district_id = Column(String)
    survey_number = Column(String)
    claimed_area = Column(Float)
    gis_area = Column(Float, default=0.0)
    overlap_pct = Column(Float, default=0.0)
    overlapping_claims_count = Column(Integer, default=0)
    status = Column(String, default="PENDING_REVIEW")
    submission_date = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)