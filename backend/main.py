
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.api.routes import router as api_router
from app.core.config import settings

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered documentation generator for GitHub repositories"
)

# Configure CORS - Allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",  # Your frontend URL
        "http://127.0.0.1:8080",
        "http://localhost:3000",  # Common React dev port
        "http://127.0.0.1:3000",
        "http://localhost:5173",  # Vite default port
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "GitDocAI Backend API", "version": settings.APP_VERSION}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "GitDocAI Backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
