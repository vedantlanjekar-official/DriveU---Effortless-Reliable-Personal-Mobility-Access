"""
Geocoding using only Python built-in libraries (urllib)
No external dependencies - works out of the box
"""
import urllib.request
import urllib.parse
import json
import logging
from typing import List, Dict, Optional

logger = logging.getLogger(__name__)

NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org"
USER_AGENT = "DriveU/1.0"


def search_location_sync(query: str, limit: int = 10, country: str = "India") -> List[Dict]:
    """
    Search for locations using Nominatim HTTP API (synchronous)
    
    Args:
        query: Search query
        limit: Maximum results
        country: Country to search in
    
    Returns:
        List of location dictionaries
    """
    try:
        # Add country to query
        search_query = f"{query}, {country}"
        
        params = urllib.parse.urlencode({
            "q": search_query,
            "format": "json",
            "addressdetails": 1,
            "limit": limit
        })
        
        url = f"{NOMINATIM_BASE_URL}/search?{params}"
        
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        
        with urllib.request.urlopen(req, timeout=10) as response:
            locations = json.loads(response.read().decode())
        
        if not locations:
            return []
        
        results = []
        for location in locations:
            address_parts = location.get('address', {})
            city = (
                address_parts.get('city') or 
                address_parts.get('town') or 
                address_parts.get('village') or
                address_parts.get('state_district') or
                address_parts.get('state') or
                'Unknown'
            )
            state = address_parts.get('state', '')
            
            results.append({
                "name": location.get('display_name', '').split(',')[0],
                "full_address": location.get('display_name', ''),
                "city": city,
                "state": state,
                "country": address_parts.get('country', 'India'),
                "lat": float(location.get('lat', 0)),
                "lng": float(location.get('lon', 0)),
                "place_type": location.get('type', 'unknown')
            })
        
        return results
        
    except Exception as e:
        logger.error(f"Geocoding error: {e}")
        return []


async def search_location(query: str, limit: int = 10, country: str = "India") -> List[Dict]:
    """Async wrapper for search_location_sync"""
    import asyncio
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(None, search_location_sync, query, limit, country)


def reverse_geocode_sync(lat: float, lng: float) -> Optional[Dict]:
    """
    Reverse geocode coordinates (synchronous)
    
    Args:
        lat: Latitude
        lng: Longitude
    
    Returns:
        Location dictionary
    """
    try:
        params = urllib.parse.urlencode({
            "lat": lat,
            "lon": lng,
            "format": "json",
            "addressdetails": 1
        })
        
        url = f"{NOMINATIM_BASE_URL}/reverse?{params}"
        
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        
        with urllib.request.urlopen(req, timeout=10) as response:
            location = json.loads(response.read().decode())
        
        if not location:
            return None
        
        address_parts = location.get('address', {})
        
        return {
            "address": location.get('display_name', ''),
            "city": address_parts.get('city') or address_parts.get('town') or 'Unknown',
            "state": address_parts.get('state', ''),
            "country": address_parts.get('country', 'India'),
            "lat": lat,
            "lng": lng
        }
        
    except Exception as e:
        logger.error(f"Reverse geocoding error: {e}")
        return None


async def reverse_geocode(lat: float, lng: float) -> Optional[Dict]:
    """Async wrapper for reverse_geocode_sync"""
    import asyncio
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(None, reverse_geocode_sync, lat, lng)


async def autocomplete_location(query: str, limit: int = 10) -> List[Dict]:
    """
    Autocomplete search
    
    Args:
        query: Partial search query
        limit: Maximum results
    
    Returns:
        List of suggestions
    """
    if len(query) < 2:
        return []
    
    results = await search_location(query, limit=limit)
    
    # Format for autocomplete
    suggestions = []
    for result in results:
        suggestions.append({
            "name": result["name"],
            "description": f"{result['name']}, {result['city']}, {result['state']}",
            "city": result["city"],
            "state": result["state"],
            "lat": result["lat"],
            "lng": result["lng"]
        })
    
    return suggestions

