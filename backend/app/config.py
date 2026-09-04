import os

class Settings:
    PROJECT_NAME: str = "FRA Official Portal Backend Gateway"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./fra_portal.db")
    ML_SERVICE_URL: str = os.getenv("ML_SERVICE_URL", "http://127.0.0.1:8000")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "van_nyaya_hackathon_super_secret_key_2026")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

settings = Settings()