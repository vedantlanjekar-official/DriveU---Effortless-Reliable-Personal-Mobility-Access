"""
Authentication request/response schemas
"""
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from app.models.user import UserType


class CarDetailsSchema(BaseModel):
    """Car details for owner registration"""
    model: str = Field(..., min_length=2, max_length=100)
    number: str = Field(..., min_length=5, max_length=20)
    color: str = Field(..., min_length=3, max_length=30)
    year: int = Field(..., ge=1990, le=2025)


class DriverDetailsSchema(BaseModel):
    """Driver details for driver registration"""
    license_number: str = Field(..., min_length=5, max_length=50)
    experience: int = Field(..., ge=0, le=50)
    skills: list[str] = []
    habits: list[str] = []


class RegisterRequest(BaseModel):
    """Registration request"""
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    password: str = Field(..., min_length=6, max_length=100)
    user_type: UserType
    city: Optional[str] = None
    
    # Owner-specific
    car_details: Optional[CarDetailsSchema] = None
    
    # Driver-specific
    driver_details: Optional[DriverDetailsSchema] = None
    
    @validator('car_details')
    def validate_owner_car_details(cls, v, values):
        if values.get('user_type') == UserType.OWNER and not v:
            raise ValueError('Car details required for owner registration')
        return v
    
    @validator('driver_details')
    def validate_driver_details(cls, v, values):
        if values.get('user_type') == UserType.DRIVER and not v:
            raise ValueError('Driver details required for driver registration')
        return v


class LoginRequest(BaseModel):
    """Login request"""
    email: EmailStr
    password: str
    remember_me: bool = False


class GoogleAuthRequest(BaseModel):
    """Google OAuth request"""
    id_token: str
    remember_me: bool = False


class TokenResponse(BaseModel):
    """JWT token response"""
    access_token: str
    token_type: str = "bearer"
    user_type: UserType
    user_name: str
    user_email: str


class UserResponse(BaseModel):
    """User data response"""
    id: str
    name: str
    email: EmailStr
    phone: str
    user_type: UserType
    city: Optional[str] = None
    
    class Config:
        from_attributes = True

