from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from app.database.connection import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, unique=True, index=True)
    name = Column(String)
    designation = Column(String)
    district_id = Column(String)
    role = Column(String, default="Verification Officer")
    email = Column(String, unique=True, index=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)