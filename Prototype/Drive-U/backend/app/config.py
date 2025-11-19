"""
Configuration settings for DriveU Backend API
"""
from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    """Application settings"""
    
    # Application
    app_name: str = "DriveU API"
    app_version: str = "1.0.0"
    debug: bool = True
    api_prefix: str = "/api/v1"
    
    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    
    # Database
    mongodb_url: str = "mongodb://localhost:27017"
    database_name: str = "driveu_db"
    
    # Security
    secret_key: str = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7
    
    # Google OAuth
    google_client_id: str = ""
    google_client_secret: str = ""
    google_redirect_uri: str = "http://localhost:3000/auth/google/callback"
    
    # Google Maps
    google_maps_api_key: str = ""
    
    # CORS
    frontend_url: str = "http://localhost:3000"
    allowed_origins: List[str] = ["http://localhost:3000", "http://localhost:8000"]
    
    # OTP
    otp_expire_minutes: int = 10
    otp_length: int = 4
    
    class Config:
        env_file = ".env"
        case_sensitive = False


# Create global settings instance
settings = Settings()

