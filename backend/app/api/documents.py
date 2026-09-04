from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schemas.document import DocumentUploadResponse
from app.services.document_service import save_document_record

router = APIRouter()

@router.post("/{claim_id}/documents", response_model=DocumentUploadResponse)
def upload_document_endpoint(claim_id: str, doc_type: str = "Patta", db: Session = Depends(get_db)):
    return save_document_record(claim_id, doc_type, f"uploads/{claim_id}/{doc_type}.pdf", db)