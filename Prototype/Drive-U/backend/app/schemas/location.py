"""
Location request/response schemas
"""
from pydantic import BaseModel, Field
from typing import Optional, List


class LocationSearchRequest(BaseModel):
    """Search location request"""
    query: str = Field(..., min_length=1, max_length=200)
    limit: int = Field(default=10, ge=1, le=50)


class NearbyPlacesRequest(BaseModel):
    """Get nearby places request"""
    lat: float = Field(..., ge=-90, le=90)
    lng: float = Field(..., ge=-180, le=180)
    radius_km: float = Field(default=5.0, ge=0.1, le=50)
    limit: int = Field(default=20, ge=1, le=100)


class DirectionsRequest(BaseModel):
    """Get directions request"""
    origin_lat: float = Field(..., ge=-90, le=90)
    origin_lng: float = Field(..., ge=-180, le=180)
    dest_lat: float = Field(..., ge=-90, le=90)
    dest_lng: float = Field(..., ge=-180, le=180)


class LocationResponse(BaseModel):
    """Location response"""
    name: str
    city: str
    lat: float
    lng: float
    address: Optional[str] = None
    distance: Optional[str] = None  # From user location
    time: Optional[str] = None  # Estimated time
    
    class Config:
        from_attributes = True


class DirectionsResponse(BaseModel):
    """Directions response"""
    distance: str
    duration: str
    distance_km: float
    duration_minutes: int
    polyline: Optional[str] = None

