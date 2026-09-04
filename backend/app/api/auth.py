from fastapi import APIRouter

router = APIRouter()

@router.post("/login")
def login_stub():
    return {"access_token": "mock_van_nyaya_token_2026", "token_type": "bearer", "role": "Verification Officer"}