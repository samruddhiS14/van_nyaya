from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from app.database.connection import Base

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(String, ForeignKey("claims.claim_id"), index=True)
    document_type = Column(String)
    file_path = Column(String)
    upload_date = Column(DateTime, default=datetime.utcnow)
    ocr_status = Column(String, default="COMPLETED")
    extracted_text = Column(Text, nullable=True)