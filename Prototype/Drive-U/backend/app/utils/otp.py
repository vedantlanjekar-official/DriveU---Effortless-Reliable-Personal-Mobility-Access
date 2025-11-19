"""
OTP generation and verification utilities
"""
import random
import string
from datetime import datetime, timedelta
from typing import Tuple
from app.config import settings


def generate_otp(length: int = None) -> str:
    """
    Generate a random OTP
    
    Args:
        length: Length of OTP (default from settings)
    
    Returns:
        OTP string
    """
    if length is None:
        length = settings.otp_length
    
    # Generate numeric OTP
    otp = ''.join(random.choices(string.digits, k=length))
    return otp


def is_otp_expired(generated_at: datetime) -> bool:
    """
    Check if OTP has expired
    
    Args:
        generated_at: When OTP was generated
    
    Returns:
        True if expired, False otherwise
    """
    expiry_time = generated_at + timedelta(minutes=settings.otp_expire_minutes)
    return datetime.utcnow() > expiry_time


def verify_otp(input_otp: str, stored_otp: str, generated_at: datetime) -> Tuple[bool, str]:
    """
    Verify OTP
    
    Args:
        input_otp: OTP entered by user
        stored_otp: OTP stored in database
        generated_at: When OTP was generated
    
    Returns:
        Tuple of (is_valid, message)
    """
    # Check if expired
    if is_otp_expired(generated_at):
        return False, "OTP has expired. Please request a new one."
    
    # Check if matches
    if input_otp != stored_otp:
        return False, "Invalid OTP. Please try again."
    
    return True, "OTP verified successfully"


def generate_booking_id() -> str:
    """Generate unique booking ID"""
    timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
    random_suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    return f"BOOK-{timestamp}-{random_suffix}"

