"""
User Model - Represents both Owners and Drivers
"""
from beanie import Document
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum


class UserType(str, Enum):
    OWNER = "owner"
    DRIVER = "driver"


class Location(BaseModel):
    """Geolocation coordinates"""
    lat: float
    lng: float
    address: Optional[str] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class CarDetails(BaseModel):
    """Owner's car details"""
    model: str
    number: str
    color: str
    year: int


class DriverDetails(BaseModel):
    """Driver-specific information"""
    license_number: str
    experience: int  # Years of experience
    skills: List[str] = []
    habits: List[str] = []
    verified: bool = False
    verification_date: Optional[datetime] = None
    hourly_rate: float = 150.0
    rating: float = 0.0
    total_trips: int = 0
    total_earnings: float = 0.0
    available: bool = True


class User(Document):
    """User model for both owners and drivers"""
    
    # Common fields
    name: str
    email: EmailStr
    phone: str
    password_hash: Optional[str] = None  # None for Google OAuth users
    user_type: UserType
    
    # Location
    city: Optional[str] = None
    current_location: Optional[Location] = None
    
    # Owner-specific
    car_details: Optional[CarDetails] = None
    
    # Driver-specific
    driver_details: Optional[DriverDetails] = None
    
    # Authentication
    google_id: Optional[str] = None
    remember_token: Optional[str] = None
    
    # Metadata
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None
    is_active: bool = True
    
    class Settings:
        name = "users"
        indexes = [
            "email",
            "user_type",
            "google_id",
            [("current_location.lat", 1), ("current_location.lng", 1)],  # Geospatial index
        ]
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Rajesh Kumar",
                "email": "rajesh@example.com",
                "phone": "+91 98765 43210",
                "user_type": "owner",
                "city": "Delhi",
                "car_details": {
                    "model": "Toyota Camry",
                    "number": "DL-01-AB-1234",
                    "color": "White",
                    "year": 2020
                }
            }
        }

