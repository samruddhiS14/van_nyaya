from pydantic import BaseModel
from typing import List

class FactorContribution(BaseModel):
    factor: str
    contribution: float

class AnomalyPredictionDetail(BaseModel):
    anomaly_detected: bool
    anomaly_probability: float
    risk_band: str
    top_contributing_factors: List[FactorContribution]

class AnalyzeResponse(BaseModel):
    claim_id: str
    model_version: str
    prediction: AnomalyPredictionDetail
    summary: str