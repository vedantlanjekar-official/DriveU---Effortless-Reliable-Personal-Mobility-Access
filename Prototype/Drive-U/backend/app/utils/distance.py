"""
Distance and geolocation utilities
"""
from geopy.distance import geodesic
from typing import Tuple


def calculate_distance(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """
    Calculate distance between two coordinates in kilometers
    
    Args:
        lat1, lng1: First location coordinates
        lat2, lng2: Second location coordinates
    
    Returns:
        Distance in kilometers
    """
    point1 = (lat1, lng1)
    point2 = (lat2, lng2)
    return geodesic(point1, point2).kilometers


def calculate_eta(distance_km: float, avg_speed_kmh: float = 30) -> Tuple[int, str]:
    """
    Calculate estimated time of arrival
    
    Args:
        distance_km: Distance in kilometers
        avg_speed_kmh: Average speed (default 30 km/h for city)
    
    Returns:
        Tuple of (minutes, formatted_time_string)
    """
    time_hours = distance_km / avg_speed_kmh
    time_minutes = int(time_hours * 60)
    
    if time_minutes < 60:
        formatted_time = f"{time_minutes} min"
    else:
        hours = time_minutes // 60
        minutes = time_minutes % 60
        if minutes == 0:
            formatted_time = f"{hours} hr"
        else:
            formatted_time = f"{hours} hr {minutes} min"
    
    return time_minutes, formatted_time


def is_within_radius(
    center_lat: float,
    center_lng: float,
    point_lat: float,
    point_lng: float,
    radius_km: float
) -> bool:
    """
    Check if a point is within radius of center point
    
    Args:
        center_lat, center_lng: Center coordinates
        point_lat, point_lng: Point to check
        radius_km: Radius in kilometers
    
    Returns:
        True if within radius, False otherwise
    """
    distance = calculate_distance(center_lat, center_lng, point_lat, point_lng)
    return distance <= radius_km

