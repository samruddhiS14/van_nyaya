from pydantic import BaseModel, ConfigDict
from typing import Optional

class ClaimCreate(BaseModel):
    claim_id: str
    claimant_id: str
    claimant_name: str
    claim_type: str = "IFR"
    village_id: str
    gram_panchayat_id: str
    district_id: str
    survey_number: str
    claimed_area: float
    gis_area: float = 0.0
    overlap_pct: float = 0.0
    overlapping_claims_count: int = 0

class ClaimResponse(ClaimCreate):
    id: int
    status: str
    model_config = ConfigDict(from_attributes=True)