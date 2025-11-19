"""
Authentication routes - Register, Login, Google OAuth
"""
from fastapi import APIRouter, HTTPException, status, Depends
from datetime import datetime, timedelta

from app.schemas.auth import RegisterRequest, LoginRequest, GoogleAuthRequest, TokenResponse, UserResponse
from app.models.user import User, UserType, CarDetails, DriverDetails
from app.utils.security import hash_password, verify_password, create_access_token
from app.middleware.auth import get_current_user
from app.config import settings

router = APIRouter()


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(request: RegisterRequest):
    """
    Register a new user (owner or driver)
    """
    # Check if user already exists
    existing_user = await User.find_one(User.email == request.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    user_data = {
        "name": request.name,
        "email": request.email,
        "phone": request.phone,
        "password_hash": hash_password(request.password),
        "user_type": request.user_type,
        "city": request.city,
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    # Add owner-specific details
    if request.user_type == UserType.OWNER and request.car_details:
        user_data["car_details"] = CarDetails(**request.car_details.dict())
    
    # Add driver-specific details
    if request.user_type == UserType.DRIVER and request.driver_details:
        user_data["driver_details"] = DriverDetails(
            license_number=request.driver_details.license_number,
            experience=request.driver_details.experience,
            skills=request.driver_details.skills,
            habits=request.driver_details.habits,
            verified=False,  # Needs admin verification
            hourly_rate=150.0
        )
    
    user = User(**user_data)
    await user.insert()
    
    # Create access token
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email, "type": user.user_type}
    )
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user_type=user.user_type,
        user_name=user.name,
        user_email=user.email
    )


@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    """
    Login with email and password
    """
    # Find user
    user = await User.find_one(User.email == request.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Verify password
    if not user.password_hash or not verify_password(request.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive"
        )
    
    # Update last login
    user.last_login = datetime.utcnow()
    await user.save()
    
    # Create access token with longer expiry if remember_me
    expires_delta = None
    if request.remember_me:
        expires_delta = timedelta(days=settings.refresh_token_expire_days)
    
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email, "type": user.user_type},
        expires_delta=expires_delta
    )
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user_type=user.user_type,
        user_name=user.name,
        user_email=user.email
    )


@router.post("/google", response_model=TokenResponse)
async def google_auth(request: GoogleAuthRequest):
    """
    Google OAuth authentication (owners only)
    """
    # In production, verify the ID token with Google
    # For now, we'll create a mock implementation
    
    # TODO: Implement actual Google OAuth verification
    # from google.oauth2 import id_token
    # from google.auth.transport import requests
    # idinfo = id_token.verify_oauth2_token(request.id_token, requests.Request(), settings.google_client_id)
    
    # Mock Google user data
    google_email = "google.user@gmail.com"  # Extract from verified token
    google_name = "Google User"  # Extract from verified token
    google_id = "google_123456"  # Extract from verified token
    
    # Check if user exists
    user = await User.find_one(User.google_id == google_id)
    
    if not user:
        # Create new user
        user = User(
            name=google_name,
            email=google_email,
            phone="",  # Can be updated later
            user_type=UserType.OWNER,
            google_id=google_id,
            is_active=True,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        await user.insert()
    
    # Update last login
    user.last_login = datetime.utcnow()
    await user.save()
    
    # Create access token
    expires_delta = None
    if request.remember_me:
        expires_delta = timedelta(days=settings.refresh_token_expire_days)
    
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email, "type": user.user_type},
        expires_delta=expires_delta
    )
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user_type=user.user_type,
        user_name=user.name,
        user_email=user.email
    )


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    """
    Get current user information
    """
    return UserResponse(
        id=str(current_user.id),
        name=current_user.name,
        email=current_user.email,
        phone=current_user.phone,
        user_type=current_user.user_type,
        city=current_user.city
    )


@router.post("/logout")
async def logout(current_user: User = Depends(get_current_user)):
    """
    Logout user
    """
    # In a real app, you might want to blacklist the token
    return {"message": "Successfully logged out"}

