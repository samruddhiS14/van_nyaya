from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey
from app.database.connection import Base

class Prediction(Base):
    __tablename__ = "predictions"
    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(String, ForeignKey("claims.claim_id"), index=True)
    model_version = Column(String)
    prediction = Column(Integer)
    anomaly_probability = Column(Float)
    risk_band = Column(String)
    feature_snapshot = Column(Text)
    explanation = Column(Text)
    summary = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)