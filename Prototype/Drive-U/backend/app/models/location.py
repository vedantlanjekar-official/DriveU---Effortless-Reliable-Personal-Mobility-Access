"""
Location Model - Popular places and destinations
"""
from beanie import Document
from pydantic import Field
from typing import Optional
from datetime import datetime


class Location(Document):
    """Location/Place model"""
    
    name: str
    city: str
    state: Optional[str] = None
    country: str = "India"
    
    # Coordinates
    lat: float
    lng: float
    
    # Details
    address: Optional[str] = None
    place_type: Optional[str] = None  # restaurant, monument, mall, etc.
    
    # Metadata
    popular: bool = False
    search_count: int = 0
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "locations"
        indexes = [
            "name",
            "city",
            [("lat", 1), ("lng", 1)],
            [("name", "text"), ("city", "text"), ("address", "text")],  # Text search
        ]
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "India Gate",
                "city": "Delhi",
                "state": "Delhi",
                "lat": 28.6129,
                "lng": 77.2295,
                "address": "Rajpath, India Gate, New Delhi, Delhi 110001",
                "place_type": "monument",
                "popular": True
            }
        }

