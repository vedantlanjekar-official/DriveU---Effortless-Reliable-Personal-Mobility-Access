"""
Booking request/response schemas
"""
from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime
from app.models.booking import BookingStatus


class LocationPointSchema(BaseModel):
    """Location with coordinates"""
    lat: float = Field(..., ge=-90, le=90)
    lng: float = Field(..., ge=-180, le=180)
    name: str = Field(..., min_length=1, max_length=200)
    address: Optional[str] = None


class CreateBookingRequest(BaseModel):
    """Create booking request"""
    pickup: LocationPointSchema
    destination: LocationPointSchema
    duration_hours: int = Field(..., ge=1, le=24)
    
    @validator('duration_hours')
    def validate_duration(cls, v):
        if v not in [2, 4, 6, 8, 12, 24]:
            raise ValueError('Duration must be one of: 2, 4, 6, 8, 12, 24 hours')
        return v


class AcceptBookingRequest(BaseModel):
    """Driver accepts booking"""
    driver_id: str


class VerifyOTPRequest(BaseModel):
    """Verify OTP to start trip"""
    otp: str = Field(..., min_length=4, max_length=4)
    current_location: Optional[LocationPointSchema] = None


class CompleteBookingRequest(BaseModel):
    """Complete booking"""
    end_location: Optional[LocationPointSchema] = None
    actual_distance: Optional[float] = None
    rating: Optional[float] = Field(None, ge=1, le=5)
    review: Optional[str] = None


class BookingResponse(BaseModel):
    """Booking response"""
    id: str
    booking_id: str
    owner_name: str
    owner_phone: str
    driver_name: Optional[str] = None
    driver_phone: Optional[str] = None
    pickup: LocationPointSchema
    destination: LocationPointSchema
    duration_hours: int
    total_fare: float
    status: BookingStatus
    otp: Optional[str] = None
    requested_at: datetime
    
    class Config:
        from_attributes = True


class NearbyBookingResponse(BaseModel):
    """Nearby booking for drivers"""
    id: str
    booking_id: str
    owner_name: str
    owner_phone: str
    pickup: LocationPointSchema
    destination: LocationPointSchema
    duration_hours: int
    fare: float
    distance_from_driver: float  # in km
    requested_at: datetime

