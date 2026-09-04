from pydantic import BaseModel
from typing import Optional

class FeedbackCreate(BaseModel):
    officer_id: str
    feedback_type: str
    comments: Optional[str] = None