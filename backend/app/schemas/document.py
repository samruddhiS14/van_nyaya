from pydantic import BaseModel, ConfigDict
from datetime import datetime

class DocumentUploadResponse(BaseModel):
    id: int
    claim_id: str
    document_type: str
    file_path: str
    ocr_status: str
    upload_date: datetime
    model_config = ConfigDict(from_attributes=True)