import httpx
import pytest

BACKEND_URL = "http://127.0.0.1:5000"
ML_URL = "http://127.0.0.1:8000"

def test_ml_health():
    with httpx.Client() as client:
        res = client.get(f"{ML_URL}/docs")
        assert res.status_code == 200

def test_backend_health():
    with httpx.Client() as client:
        res = client.get(f"{BACKEND_URL}/")
        assert res.status_code == 200
        assert res.json()["status"] == "healthy"

def test_fetch_claims():
    with httpx.Client() as client:
        res = client.get(f"{BACKEND_URL}/api/claims/")
        assert res.status_code == 200
        assert isinstance(res.json(), list)