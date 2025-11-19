"""
DriveU Backend API - Simplified Version (Works without MongoDB)
"""
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
import logging
import uuid

from app.config import settings
from app.database_fallback import db
from app.utils.security import hash_password, verify_password, create_access_token
from app.utils.otp import generate_otp, generate_booking_id
from app.utils.distance import calculate_distance, calculate_eta
from app.utils.geocoding_builtin import search_location, autocomplete_location, reverse_geocode

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="DriveU API",
    version="1.0.0",
    description="Backend API for DriveU - Simplified Version",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ===== SCHEMAS =====

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str
    user_type: str
    city: Optional[str] = None
    car_details: Optional[dict] = None
    driver_details: Optional[dict] = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    remember_me: bool = False


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user_type: str
    user_name: str
    user_email: str


class LocationPoint(BaseModel):
    lat: float
    lng: float
    name: str
    address: Optional[str] = None


class CreateBookingRequest(BaseModel):
    pickup: LocationPoint
    destination: LocationPoint
    duration_hours: int


# ===== ROUTES =====

@app.get("/")
async def root():
    """Health check"""
    return {
        "message": "🚗 DriveU API is running!",
        "version": "1.0.0",
        "status": "healthy",
        "database": "in-memory",
        "locations_loaded": len(db.locations)
    }


@app.post("/api/v1/auth/register", response_model=TokenResponse)
async def register(request: RegisterRequest):
    """Register new user"""
    # Check if user exists
    if db.get_user_by_email(request.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user_id = str(uuid.uuid4())
    user_data = {
        "id": user_id,
        "name": request.name,
        "email": request.email,
        "phone": request.phone,
        "password_hash": hash_password(request.password),
        "user_type": request.user_type,
        "city": request.city,
        "car_details": request.car_details,
        "driver_details": request.driver_details,
        "created_at": datetime.utcnow().isoformat()
    }
    
    db.save_user(user_id, user_data)
    
    # Create token
    token = create_access_token({"sub": user_id, "email": request.email, "type": request.user_type})
    
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user_type=request.user_type,
        user_name=request.name,
        user_email=request.email
    )


@app.post("/api/v1/auth/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    """Login user"""
    user = db.get_user_by_email(request.email)
    
    if not user or not verify_password(request.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    # Create token
    token = create_access_token({"sub": user["id"], "email": user["email"], "type": user["user_type"]})
    
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user_type=user["user_type"],
        user_name=user["name"],
        user_email=user["email"]
    )


@app.post("/api/v1/auth/google", response_model=TokenResponse)
async def google_auth():
    """Google OAuth (mock)"""
    # Mock Google user
    user_id = str(uuid.uuid4())
    user_data = {
        "id": user_id,
        "name": "Google User",
        "email": "user@gmail.com",
        "phone": "+91 98765 43210",
        "user_type": "owner",
        "created_at": datetime.utcnow().isoformat()
    }
    
    db.save_user(user_id, user_data)
    token = create_access_token({"sub": user_id, "email": user_data["email"], "type": "owner"})
    
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user_type="owner",
        user_name="Google User",
        user_email="user@gmail.com"
    )


@app.get("/api/v1/locations/autocomplete")
async def autocomplete_search(query: str, limit: int = 10):
    """
    Autocomplete location search using Nominatim (OpenStreetMap)
    Returns real places from all over India with actual coordinates
    """
    if len(query) < 2:
        return []
    
    # Use Nominatim API for real-time search
    results = await autocomplete_location(query, limit)
    
    # Calculate distance from query location if coordinates available
    for result in results:
        if result.get("lat") and result.get("lng"):
            # Mock distance calculation from user location (you can pass user location later)
            result["distance"] = "5 km"  # Will be calculated with real user location
            result["time"] = "15 min"
    
    return results


@app.post("/api/v1/locations/search")
async def search_locations_endpoint(query: str = "", limit: int = 10):
    """
    Search locations using Nominatim API
    Returns actual places with real coordinates
    """
    if not query:
        return []
    
    results = await search_location(query, limit)
    return results


@app.post("/api/v1/locations/nearby")
async def get_nearby_places_endpoint(lat: float, lng: float, radius_km: float = 50, limit: int = 20):
    """
    Get nearby places using reverse geocoding
    This will find actual places near the given coordinates
    """
    # For now, use search with the coordinates
    # In production, you'd use Nominatim's reverse geocoding or nearby search
    nearby_results = []
    
    # Get address of the location
    address_info = await reverse_geocode(lat, lng)
    
    if address_info:
        city = address_info.get("city", "")
        if city:
            # Search for popular places in this city
            nearby_results = await search_location(city, limit)
    
    return nearby_results


@app.post("/api/v1/locations/reverse-geocode")
async def reverse_geocode_endpoint(lat: float, lng: float):
    """
    Reverse geocode coordinates to address
    """
    result = await reverse_geocode(lat, lng)
    if not result:
        raise HTTPException(status_code=404, detail="Location not found")
    return result


@app.post("/api/v1/bookings", status_code=201)
async def create_booking(request: CreateBookingRequest):
    """Create booking"""
    booking_id = generate_booking_id()
    otp = generate_otp()
    
    # Calculate distance
    distance = calculate_distance(
        request.pickup.lat, request.pickup.lng,
        request.destination.lat, request.destination.lng
    )
    
    _, eta_str = calculate_eta(distance)
    
    booking_data = {
        "id": str(uuid.uuid4()),
        "booking_id": booking_id,
        "pickup": request.pickup.dict(),
        "destination": request.destination.dict(),
        "duration_hours": request.duration_hours,
        "total_fare": 150 * request.duration_hours,
        "otp": otp,
        "status": "pending",
        "distance": distance,
        "eta": eta_str,
        "created_at": datetime.utcnow().isoformat()
    }
    
    db.save_booking(booking_id, booking_data)
    
    return {
        **booking_data,
        "message": "Booking created successfully",
        "otp": otp
    }


@app.get("/api/v1/bookings/history")
async def get_booking_history():
    """Get booking history"""
    return db.get_all_bookings()


logger.info("✅ DriveU API (Simplified) ready to start!")
logger.info(f"📍 Loaded {len(db.locations)} locations")


if __name__ == "__main__":
    import uvicorn
    print("""
    ╔══════════════════════════════════════════════════════════╗
    ║                                                          ║
    ║             🚗 DriveU Backend API 🚗                     ║
    ║                   Simplified Version                     ║
    ║                                                          ║
    ║  Server: http://localhost:8000                           ║
    ║  API Docs: http://localhost:8000/docs                    ║
    ║                                                          ║
    ║  Status: No MongoDB required ✅                          ║
    ║  Locations: 50+ cities across India ✅                   ║
    ║                                                          ║
    ╚══════════════════════════════════════════════════════════╝
    """)
    
    uvicorn.run(
        "app.main_simple:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )

