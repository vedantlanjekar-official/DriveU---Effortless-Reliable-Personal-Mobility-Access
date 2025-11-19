"""
Fallback in-memory database when MongoDB is not available
"""
from typing import Dict, List, Optional
import json
from datetime import datetime

class InMemoryDB:
    """Simple in-memory database"""
    
    def __init__(self):
        self.users: Dict[str, dict] = {}
        self.bookings: Dict[str, dict] = {}
        self.locations: List[dict] = []
        self.load_locations()
    
    def load_locations(self):
        """Load locations - will be provided by Nominatim API dynamically"""
        # No need to load hardcoded locations
        # Nominatim will provide all locations dynamically
        self.locations = []
        print("✅ Using Nominatim API for dynamic location search")
    
    def save_user(self, user_id: str, user_data: dict):
        """Save user to memory"""
        self.users[user_id] = user_data
        return user_data
    
    def get_user(self, user_id: str) -> Optional[dict]:
        """Get user by ID"""
        return self.users.get(user_id)
    
    def get_user_by_email(self, email: str) -> Optional[dict]:
        """Get user by email"""
        for user in self.users.values():
            if user.get('email') == email:
                return user
        return None
    
    def save_booking(self, booking_id: str, booking_data: dict):
        """Save booking to memory"""
        self.bookings[booking_id] = booking_data
        return booking_data
    
    def get_booking(self, booking_id: str) -> Optional[dict]:
        """Get booking by ID"""
        return self.bookings.get(booking_id)
    
    def get_all_bookings(self) -> List[dict]:
        """Get all bookings"""
        return list(self.bookings.values())
    
    def search_locations(self, query: str, limit: int = 10) -> List[dict]:
        """Search locations"""
        query = query.lower()
        results = []
        
        for loc in self.locations:
            if (query in loc.get('name', '').lower() or 
                query in loc.get('city', '').lower()):
                results.append(loc)
                if len(results) >= limit:
                    break
        
        return results


# Global in-memory database instance
memory_db = InMemoryDB()

