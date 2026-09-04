from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from app.database.connection import Base

class PredictionFeedback(Base):
    __tablename__ = "prediction_feedback"
    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(String, ForeignKey("claims.claim_id"), index=True)
    prediction_id = Column(Integer, ForeignKey("predictions.id"), nullable=True)
    officer_id = Column(String)
    feedback_type = Column(String)
    comments = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)