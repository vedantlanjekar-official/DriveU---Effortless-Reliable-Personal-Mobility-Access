"""
Booking Model - Represents trip bookings
"""
from beanie import Document, Link
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum
from app.models.user import User


class BookingStatus(str, Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    DENIED = "denied"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class LocationPoint(BaseModel):
    """Location coordinates with name"""
    lat: float
    lng: float
    name: str
    address: Optional[str] = None


class TripDetails(BaseModel):
    """Details of the trip"""
    pickup: LocationPoint
    destination: LocationPoint
    distance: Optional[float] = None  # in km
    estimated_time: Optional[str] = None


class Booking(Document):
    """Booking/Trip model"""
    
    # IDs
    booking_id: str = Field(..., unique=True)
    owner: Link[User]
    driver: Optional[Link[User]] = None
    
    # Trip details
    trip_details: TripDetails
    duration_hours: int
    
    # Pricing
    base_fare: float
    total_fare: float
    
    # OTP
    otp: Optional[str] = None
    otp_verified: bool = False
    otp_generated_at: Optional[datetime] = None
    
    # Status
    status: BookingStatus = BookingStatus.PENDING
    
    # Timestamps
    requested_at: datetime = Field(default_factory=datetime.utcnow)
    accepted_at: Optional[datetime] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    
    # Trip tracking
    actual_start_location: Optional[LocationPoint] = None
    actual_end_location: Optional[LocationPoint] = None
    actual_distance: Optional[float] = None
    actual_duration_minutes: Optional[int] = None
    
    # Review
    owner_rating: Optional[float] = None
    driver_rating: Optional[float] = None
    owner_review: Optional[str] = None
    driver_review: Optional[str] = None
    
    class Settings:
        name = "bookings"
        indexes = [
            "booking_id",
            "status",
            "requested_at",
            [("trip_details.pickup.lat", 1), ("trip_details.pickup.lng", 1)],
        ]
    
    class Config:
        json_schema_extra = {
            "example": {
                "booking_id": "BOOK-2024-001",
                "duration_hours": 3,
                "trip_details": {
                    "pickup": {
                        "lat": 28.6139,
                        "lng": 77.2090,
                        "name": "Connaught Place"
                    },
                    "destination": {
                        "lat": 28.6129,
                        "lng": 77.2295,
                        "name": "India Gate"
                    }
                },
                "base_fare": 150,
                "total_fare": 450,
                "status": "pending"
            }
        }

