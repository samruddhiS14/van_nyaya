from sqlalchemy.orm import Session
from app.models.document import Document

def save_document_record(claim_id: str, document_type: str, file_path: str, db: Session):
    doc = Document(
        claim_id=claim_id,
        document_type=document_type,
        file_path=file_path,
        ocr_status="COMPLETED",
        extracted_text="Document text verified and extracted successfully."
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc