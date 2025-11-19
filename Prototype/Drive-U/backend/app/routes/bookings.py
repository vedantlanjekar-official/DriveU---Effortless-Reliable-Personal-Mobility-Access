"""
Booking routes - Create, Accept, Verify OTP, Complete
"""
from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from datetime import datetime

from app.schemas.booking import (
    CreateBookingRequest,
    AcceptBookingRequest,
    VerifyOTPRequest,
    CompleteBookingRequest,
    BookingResponse,
    NearbyBookingResponse,
    LocationPointSchema
)
from app.models.booking import Booking, BookingStatus, TripDetails, LocationPoint
from app.models.user import User, UserType
from app.middleware.auth import get_current_user, get_current_active_owner, get_current_active_driver
from app.utils.otp import generate_otp, verify_otp, generate_booking_id
from app.utils.distance import calculate_distance, calculate_eta

router = APIRouter()


@router.post("", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
async def create_booking(
    request: CreateBookingRequest,
    current_user: User = Depends(get_current_active_owner)
):
    """
    Create a new booking (owners only)
    """
    # Calculate distance and ETA
    distance = calculate_distance(
        request.pickup.lat,
        request.pickup.lng,
        request.destination.lat,
        request.destination.lng
    )
    _, eta_str = calculate_eta(distance)
    
    # Calculate fare
    base_rate = 150  # per hour
    total_fare = base_rate * request.duration_hours
    
    # Generate OTP
    otp = generate_otp()
    
    # Create booking
    booking = Booking(
        booking_id=generate_booking_id(),
        owner=current_user,
        trip_details=TripDetails(
            pickup=LocationPoint(**request.pickup.dict()),
            destination=LocationPoint(**request.destination.dict()),
            distance=distance,
            estimated_time=eta_str
        ),
        duration_hours=request.duration_hours,
        base_fare=base_rate,
        total_fare=total_fare,
        otp=otp,
        otp_generated_at=datetime.utcnow(),
        status=BookingStatus.PENDING,
        requested_at=datetime.utcnow()
    )
    
    await booking.insert()
    
    return BookingResponse(
        id=str(booking.id),
        booking_id=booking.booking_id,
        owner_name=current_user.name,
        owner_phone=current_user.phone,
        pickup=request.pickup,
        destination=request.destination,
        duration_hours=request.duration_hours,
        total_fare=total_fare,
        status=booking.status,
        otp=otp,
        requested_at=booking.requested_at
    )


@router.get("/nearby", response_model=List[NearbyBookingResponse])
async def get_nearby_bookings(
    current_user: User = Depends(get_current_active_driver)
):
    """
    Get nearby pending bookings for drivers
    """
    if not current_user.current_location:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Driver location not available"
        )
    
    # Get pending bookings
    bookings = await Booking.find(
        Booking.status == BookingStatus.PENDING
    ).to_list()
    
    # Filter by distance and prepare response
    nearby_bookings = []
    for booking in bookings:
        distance_from_driver = calculate_distance(
            current_user.current_location.lat,
            current_user.current_location.lng,
            booking.trip_details.pickup.lat,
            booking.trip_details.pickup.lng
        )
        
        # Only show bookings within 5km
        if distance_from_driver <= 5.0:
            owner = await booking.owner.fetch()
            nearby_bookings.append(
                NearbyBookingResponse(
                    id=str(booking.id),
                    booking_id=booking.booking_id,
                    owner_name=owner.name,
                    owner_phone=owner.phone,
                    pickup=LocationPointSchema(**booking.trip_details.pickup.dict()),
                    destination=LocationPointSchema(**booking.trip_details.destination.dict()),
                    duration_hours=booking.duration_hours,
                    fare=booking.total_fare,
                    distance_from_driver=round(distance_from_driver, 2),
                    requested_at=booking.requested_at
                )
            )
    
    # Sort by distance
    nearby_bookings.sort(key=lambda x: x.distance_from_driver)
    
    return nearby_bookings


@router.put("/{booking_id}/accept", response_model=BookingResponse)
async def accept_booking(
    booking_id: str,
    current_user: User = Depends(get_current_active_driver)
):
    """
    Driver accepts a booking
    """
    booking = await Booking.find_one(Booking.booking_id == booking_id)
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    if booking.status != BookingStatus.PENDING:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Booking is already {booking.status}"
        )
    
    # Update booking
    booking.driver = current_user
    booking.status = BookingStatus.ACCEPTED
    booking.accepted_at = datetime.utcnow()
    await booking.save()
    
    owner = await booking.owner.fetch()
    
    return BookingResponse(
        id=str(booking.id),
        booking_id=booking.booking_id,
        owner_name=owner.name,
        owner_phone=owner.phone,
        driver_name=current_user.name,
        driver_phone=current_user.phone,
        pickup=LocationPointSchema(**booking.trip_details.pickup.dict()),
        destination=LocationPointSchema(**booking.trip_details.destination.dict()),
        duration_hours=booking.duration_hours,
        total_fare=booking.total_fare,
        status=booking.status,
        otp=booking.otp,
        requested_at=booking.requested_at
    )


@router.put("/{booking_id}/deny")
async def deny_booking(
    booking_id: str,
    current_user: User = Depends(get_current_active_driver)
):
    """
    Driver denies a booking
    """
    booking = await Booking.find_one(Booking.booking_id == booking_id)
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    if booking.status != BookingStatus.PENDING:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Booking is already {booking.status}"
        )
    
    # Update booking status
    booking.status = BookingStatus.DENIED
    await booking.save()
    
    # TODO: Notify owner and suggest alternate drivers
    
    return {"message": "Booking denied. Owner will be notified."}


@router.post("/{booking_id}/verify-otp", response_model=BookingResponse)
async def verify_booking_otp(
    booking_id: str,
    request: VerifyOTPRequest,
    current_user: User = Depends(get_current_active_driver)
):
    """
    Verify OTP and start trip
    """
    booking = await Booking.find_one(Booking.booking_id == booking_id)
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    if booking.status != BookingStatus.ACCEPTED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking must be accepted first"
        )
    
    # Verify OTP
    is_valid, message = verify_otp(request.otp, booking.otp, booking.otp_generated_at)
    
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=message
        )
    
    # Start trip
    booking.otp_verified = True
    booking.status = BookingStatus.IN_PROGRESS
    booking.started_at = datetime.utcnow()
    
    if request.current_location:
        booking.actual_start_location = LocationPoint(**request.current_location.dict())
    
    await booking.save()
    
    owner = await booking.owner.fetch()
    
    return BookingResponse(
        id=str(booking.id),
        booking_id=booking.booking_id,
        owner_name=owner.name,
        owner_phone=owner.phone,
        driver_name=current_user.name,
        driver_phone=current_user.phone,
        pickup=LocationPointSchema(**booking.trip_details.pickup.dict()),
        destination=LocationPointSchema(**booking.trip_details.destination.dict()),
        duration_hours=booking.duration_hours,
        total_fare=booking.total_fare,
        status=booking.status,
        requested_at=booking.requested_at
    )


@router.put("/{booking_id}/complete", response_model=BookingResponse)
async def complete_booking(
    booking_id: str,
    request: CompleteBookingRequest,
    current_user: User = Depends(get_current_active_driver)
):
    """
    Complete a booking
    """
    booking = await Booking.find_one(Booking.booking_id == booking_id)
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    if booking.status != BookingStatus.IN_PROGRESS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking is not in progress"
        )
    
    # Complete trip
    booking.status = BookingStatus.COMPLETED
    booking.completed_at = datetime.utcnow()
    
    if request.end_location:
        booking.actual_end_location = LocationPoint(**request.end_location.dict())
    
    if request.actual_distance:
        booking.actual_distance = request.actual_distance
    
    # Calculate actual duration
    if booking.started_at:
        duration_delta = datetime.utcnow() - booking.started_at
        booking.actual_duration_minutes = int(duration_delta.total_seconds() / 60)
    
    # Add driver rating
    if request.rating:
        booking.driver_rating = request.rating
    
    if request.review:
        booking.driver_review = request.review
    
    await booking.save()
    
    # Update driver stats
    driver = await booking.driver.fetch()
    driver.driver_details.total_trips += 1
    driver.driver_details.total_earnings += booking.total_fare
    
    if request.rating:
        # Update average rating
        total_rating = driver.driver_details.rating * (driver.driver_details.total_trips - 1) + request.rating
        driver.driver_details.rating = round(total_rating / driver.driver_details.total_trips, 2)
    
    await driver.save()
    
    owner = await booking.owner.fetch()
    
    return BookingResponse(
        id=str(booking.id),
        booking_id=booking.booking_id,
        owner_name=owner.name,
        owner_phone=owner.phone,
        driver_name=driver.name,
        driver_phone=driver.phone,
        pickup=LocationPointSchema(**booking.trip_details.pickup.dict()),
        destination=LocationPointSchema(**booking.trip_details.destination.dict()),
        duration_hours=booking.duration_hours,
        total_fare=booking.total_fare,
        status=booking.status,
        requested_at=booking.requested_at
    )


@router.get("/history", response_model=List[BookingResponse])
async def get_booking_history(
    current_user: User = Depends(get_current_user)
):
    """
    Get booking history for current user
    """
    if current_user.user_type == UserType.OWNER:
        bookings = await Booking.find(Booking.owner.id == current_user.id).sort(-Booking.requested_at).to_list()
    else:
        bookings = await Booking.find(Booking.driver.id == current_user.id).sort(-Booking.requested_at).to_list()
    
    result = []
    for booking in bookings:
        owner = await booking.owner.fetch()
        driver = await booking.driver.fetch() if booking.driver else None
        
        result.append(BookingResponse(
            id=str(booking.id),
            booking_id=booking.booking_id,
            owner_name=owner.name,
            owner_phone=owner.phone,
            driver_name=driver.name if driver else None,
            driver_phone=driver.phone if driver else None,
            pickup=LocationPointSchema(**booking.trip_details.pickup.dict()),
            destination=LocationPointSchema(**booking.trip_details.destination.dict()),
            duration_hours=booking.duration_hours,
            total_fare=booking.total_fare,
            status=booking.status,
            otp=booking.otp if booking.status in [BookingStatus.ACCEPTED, BookingStatus.PENDING] else None,
            requested_at=booking.requested_at
        ))
    
    return result

