from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.connection import engine, Base
from app.api import auth, claims, ai, feedback, documents, gis

# Automatically initialize SQLite tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Van Nyaya FRA Portal Backend Gateway",
    description="Enterprise API orchestration gateway connecting FRA portal to ML engine",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route groups matching the Blueprint
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(claims.router, prefix="/api/claims", tags=["Claims"])
app.include_router(ai.router, prefix="/api/claims", tags=["AI Assistance"])
app.include_router(feedback.router, prefix="/api/claims", tags=["Official Feedback"])
app.include_router(documents.router, prefix="/api/claims", tags=["Documents"])
app.include_router(gis.router, prefix="/api/claims", tags=["GIS Processing"])

@app.get("/")
def health():
    return {"status": "healthy", "service": "FRA Official Portal Backend Gateway"}