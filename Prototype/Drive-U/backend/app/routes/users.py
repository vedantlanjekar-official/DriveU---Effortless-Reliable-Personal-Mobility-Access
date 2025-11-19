"""
User routes - Profile, Drivers list, Location update
"""
from fastapi import APIRouter, HTTPException, status, Depends
from typing import List, Optional
from pydantic import BaseModel

from app.models.user import User, UserType, Location
from app.middleware.auth import get_current_user, get_current_active_owner
from app.utils.distance import calculate_distance, is_within_radius

router = APIRouter()


class UpdateLocationRequest(BaseModel):
    """Update user location"""
    lat: float
    lng: float
    address: Optional[str] = None


class DriverResponse(BaseModel):
    """Driver information for owners"""
    id: str
    name: str
    phone: str
    rating: float
    total_trips: int
    hourly_rate: float
    experience: int
    skills: List[str]
    habits: List[str]
    distance: Optional[float] = None  # Distance from owner
    available: bool
    
    class Config:
        from_attributes = True


@router.get("/me")
async def get_profile(current_user: User = Depends(get_current_user)):
    """Get current user profile"""
    return {
        "id": str(current_user.id),
        "name": current_user.name,
        "email": current_user.email,
        "phone": current_user.phone,
        "user_type": current_user.user_type,
        "city": current_user.city,
        "car_details": current_user.car_details.dict() if current_user.car_details else None,
        "driver_details": {
            "license_number": current_user.driver_details.license_number,
            "experience": current_user.driver_details.experience,
            "skills": current_user.driver_details.skills,
            "habits": current_user.driver_details.habits,
            "rating": current_user.driver_details.rating,
            "total_trips": current_user.driver_details.total_trips,
            "hourly_rate": current_user.driver_details.hourly_rate,
            "available": current_user.driver_details.available
        } if current_user.driver_details else None,
        "current_location": current_user.current_location.dict() if current_user.current_location else None
    }


@router.put("/location")
async def update_location(
    request: UpdateLocationRequest,
    current_user: User = Depends(get_current_user)
):
    """Update user's current location"""
    from datetime import datetime
    
    current_user.current_location = Location(
        lat=request.lat,
        lng=request.lng,
        address=request.address,
        updated_at=datetime.utcnow()
    )
    current_user.updated_at = datetime.utcnow()
    await current_user.save()
    
    return {"message": "Location updated successfully"}


@router.get("/drivers/available", response_model=List[DriverResponse])
async def get_available_drivers(
    lat: Optional[float] = None,
    lng: Optional[float] = None,
    radius_km: float = 5.0,
    current_user: User = Depends(get_current_active_owner)
):
    """
    Get available drivers near location (owners only)
    """
    # Use provided location or owner's current location
    search_lat = lat if lat is not None else (current_user.current_location.lat if current_user.current_location else None)
    search_lng = lng if lng is not None else (current_user.current_location.lng if current_user.current_location else None)
    
    if search_lat is None or search_lng is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Location is required"
        )
    
    # Get all available drivers
    drivers = await User.find(
        User.user_type == UserType.DRIVER,
        User.is_active == True
    ).to_list()
    
    # Filter by availability and location
    available_drivers = []
    for driver in drivers:
        if not driver.driver_details or not driver.driver_details.available:
            continue
        
        if not driver.current_location:
            continue
        
        # Check if within radius
        distance = calculate_distance(
            search_lat,
            search_lng,
            driver.current_location.lat,
            driver.current_location.lng
        )
        
        if distance <= radius_km:
            available_drivers.append(
                DriverResponse(
                    id=str(driver.id),
                    name=driver.name,
                    phone=driver.phone,
                    rating=driver.driver_details.rating,
                    total_trips=driver.driver_details.total_trips,
                    hourly_rate=driver.driver_details.hourly_rate,
                    experience=driver.driver_details.experience,
                    skills=driver.driver_details.skills,
                    habits=driver.driver_details.habits,
                    distance=round(distance, 2),
                    available=True
                )
            )
    
    # Sort by distance
    available_drivers.sort(key=lambda x: x.distance)
    
    return available_drivers

