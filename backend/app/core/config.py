
import os
from typing import List
from pydantic_settings import BaseSettings
from pydantic import field_validator

class Settings(BaseSettings):
    APP_NAME: str = "GitDocAI"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # Google Gemini Configuration
    GEMINI_API_KEY: str = "AIzaSyBlhZ2WFY69hCupvoeWLZ0oKxiwiia4jd8"
    
    # CORS Configuration
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://gitdocai.vercel.app"
    ]
    
    # GitHub Configuration
    GITHUB_TOKEN: str = os.getenv("GITHUB_TOKEN", "")
    
    @field_validator('CORS_ORIGINS', mode='before')
    @classmethod
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(',')]
        return v
    
    class Config:
        env_file = ".env"

settings = Settings()
