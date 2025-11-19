"""
Location routes - Search, Nearby places, Directions
"""
from fastapi import APIRouter, Depends
from typing import List, Optional

from app.schemas.location import (
    LocationSearchRequest,
    NearbyPlacesRequest,
    DirectionsRequest,
    LocationResponse,
    DirectionsResponse
)
from app.models.location import Location
from app.models.user import User
from app.middleware.auth import optional_authentication
from app.utils.distance import calculate_distance, calculate_eta

router = APIRouter()


@router.post("/search", response_model=List[LocationResponse])
async def search_locations(request: LocationSearchRequest):
    """
    Search locations by name or address
    """
    # Text search on name, city, address
    locations = await Location.find(
        {"$text": {"$search": request.query}}
    ).limit(request.limit).to_list()
    
    # If text search returns nothing, try regex search
    if not locations:
        locations = await Location.find(
            {
                "$or": [
                    {"name": {"$regex": request.query, "$options": "i"}},
                    {"city": {"$regex": request.query, "$options": "i"}},
                    {"address": {"$regex": request.query, "$options": "i"}}
                ]
            }
        ).limit(request.limit).to_list()
    
    return [
        LocationResponse(
            name=loc.name,
            city=loc.city,
            lat=loc.lat,
            lng=loc.lng,
            address=loc.address
        )
        for loc in locations
    ]


@router.post("/nearby", response_model=List[LocationResponse])
async def get_nearby_places(request: NearbyPlacesRequest):
    """
    Get nearby popular places
    """
    # Get all locations
    all_locations = await Location.find().to_list()
    
    # Filter by distance
    nearby = []
    for loc in all_locations:
        distance = calculate_distance(
            request.lat,
            request.lng,
            loc.lat,
            loc.lng
        )
        
        if distance <= request.radius_km:
            _, eta_str = calculate_eta(distance)
            nearby.append(
                LocationResponse(
                    name=loc.name,
                    city=loc.city,
                    lat=loc.lat,
                    lng=loc.lng,
                    address=loc.address,
                    distance=f"{round(distance, 1)} km",
                    time=eta_str
                )
            )
    
    # Sort by distance
    nearby.sort(key=lambda x: float(x.distance.split()[0]))
    
    return nearby[:request.limit]


@router.post("/directions", response_model=DirectionsResponse)
async def get_directions(request: DirectionsRequest):
    """
    Get directions between two points
    """
    # Calculate distance
    distance_km = calculate_distance(
        request.origin_lat,
        request.origin_lng,
        request.dest_lat,
        request.dest_lng
    )
    
    # Calculate ETA
    duration_minutes, duration_str = calculate_eta(distance_km)
    
    return DirectionsResponse(
        distance=f"{round(distance_km, 1)} km",
        duration=duration_str,
        distance_km=round(distance_km, 2),
        duration_minutes=duration_minutes,
        polyline=None  # TODO: Add Google Maps polyline
    )


@router.get("/autocomplete")
async def autocomplete_location(query: str, limit: int = 10):
    """
    Autocomplete location search (like Google Maps)
    """
    if len(query) < 2:
        return []
    
    # Search with regex for autocomplete
    locations = await Location.find(
        {
            "$or": [
                {"name": {"$regex": f"^{query}", "$options": "i"}},
                {"name": {"$regex": query, "$options": "i"}},
                {"city": {"$regex": f"^{query}", "$options": "i"}}
            ]
        }
    ).limit(limit).to_list()
    
    return [
        {
            "name": loc.name,
            "city": loc.city,
            "description": f"{loc.name}, {loc.city}",
            "lat": loc.lat,
            "lng": loc.lng
        }
        for loc in locations
    ]

