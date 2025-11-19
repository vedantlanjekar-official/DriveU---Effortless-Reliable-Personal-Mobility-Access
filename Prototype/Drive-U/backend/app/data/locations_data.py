"""
Locations data - All places across India
"""

LOCATIONS = [
    # Delhi NCR
    {"name": "India Gate, Delhi", "city": "Delhi", "state": "Delhi", "lat": 28.6129, "lng": 77.2295, "popular": True, "distance": "5 km", "time": "15 min"},
    {"name": "Connaught Place, Delhi", "city": "Delhi", "state": "Delhi", "lat": 28.6315, "lng": 77.2167, "popular": True, "distance": "3 km", "time": "10 min"},
    {"name": "Lotus Temple, Delhi", "city": "Delhi", "state": "Delhi", "lat": 28.5535, "lng": 77.2588, "popular": True, "distance": "8 km", "time": "20 min"},
    {"name": "Qutub Minar, Delhi", "city": "Delhi", "state": "Delhi", "lat": 28.5244, "lng": 77.1855, "popular": True, "distance": "12 km", "time": "30 min"},
    {"name": "Red Fort, Delhi", "city": "Delhi", "state": "Delhi", "lat": 28.6562, "lng": 77.2410, "popular": True, "distance": "6 km", "time": "18 min"},
    {"name": "Akshardham, Delhi", "city": "Delhi", "state": "Delhi", "lat": 28.6127, "lng": 77.2773, "popular": True, "distance": "10 km", "time": "25 min"},
    {"name": "Chandni Chowk, Delhi", "city": "Delhi", "state": "Delhi", "lat": 28.6506, "lng": 77.2303, "popular": True, "distance": "7 km", "time": "20 min"},
    {"name": "Saket, Delhi", "city": "Delhi", "state": "Delhi", "lat": 28.5244, "lng": 77.2066, "popular": False, "distance": "11 km", "time": "28 min"},
    {"name": "Cyber City, Gurgaon", "city": "Gurgaon", "state": "Haryana", "lat": 28.4951, "lng": 77.0890, "popular": True, "distance": "22 km", "time": "45 min"},
    {"name": "Noida Sector 18", "city": "Noida", "state": "Uttar Pradesh", "lat": 28.5688, "lng": 77.3243, "popular": True, "distance": "19 km", "time": "38 min"},
    
    # Mumbai
    {"name": "Gateway of India, Mumbai", "city": "Mumbai", "state": "Maharashtra", "lat": 18.9220, "lng": 72.8347, "popular": True, "distance": "8 km", "time": "22 min"},
    {"name": "Marine Drive, Mumbai", "city": "Mumbai", "state": "Maharashtra", "lat": 18.9432, "lng": 72.8236, "popular": True, "distance": "6 km", "time": "18 min"},
    {"name": "Bandra Kurla Complex, Mumbai", "city": "Mumbai", "state": "Maharashtra", "lat": 19.0625, "lng": 72.8686, "popular": True, "distance": "14 km", "time": "35 min"},
    {"name": "Juhu Beach, Mumbai", "city": "Mumbai", "state": "Maharashtra", "lat": 19.0990, "lng": 72.8265, "popular": True, "distance": "17 km", "time": "40 min"},
    {"name": "Powai, Mumbai", "city": "Mumbai", "state": "Maharashtra", "lat": 19.1197, "lng": 72.9059, "popular": False, "distance": "20 km", "time": "48 min"},
    {"name": "Andheri, Mumbai", "city": "Mumbai", "state": "Maharashtra", "lat": 19.1136, "lng": 72.8697, "popular": False, "distance": "12 km", "time": "30 min"},
    {"name": "Colaba, Mumbai", "city": "Mumbai", "state": "Maharashtra", "lat": 18.9067, "lng": 72.8147, "popular": True, "distance": "9 km", "time": "25 min"},
    
    # Bangalore
    {"name": "MG Road, Bangalore", "city": "Bangalore", "state": "Karnataka", "lat": 12.9758, "lng": 77.6061, "popular": True, "distance": "7 km", "time": "20 min"},
    {"name": "Whitefield, Bangalore", "city": "Bangalore", "state": "Karnataka", "lat": 12.9698, "lng": 77.7500, "popular": True, "distance": "25 km", "time": "55 min"},
    {"name": "Koramangala, Bangalore", "city": "Bangalore", "state": "Karnataka", "lat": 12.9352, "lng": 77.6245, "popular": True, "distance": "10 km", "time": "28 min"},
    {"name": "Electronic City, Bangalore", "city": "Bangalore", "state": "Karnataka", "lat": 12.8458, "lng": 77.6632, "popular": True, "distance": "28 km", "time": "60 min"},
    {"name": "Indiranagar, Bangalore", "city": "Bangalore", "state": "Karnataka", "lat": 12.9719, "lng": 77.6412, "popular": True, "distance": "9 km", "time": "24 min"},
    {"name": "HSR Layout, Bangalore", "city": "Bangalore", "state": "Karnataka", "lat": 12.9082, "lng": 77.6476, "popular": False, "distance": "12 km", "time": "32 min"},
    
    # Hyderabad
    {"name": "Charminar, Hyderabad", "city": "Hyderabad", "state": "Telangana", "lat": 17.3616, "lng": 78.4747, "popular": True, "distance": "6 km", "time": "18 min"},
    {"name": "HITEC City, Hyderabad", "city": "Hyderabad", "state": "Telangana", "lat": 17.4484, "lng": 78.3908, "popular": True, "distance": "18 km", "time": "42 min"},
    {"name": "Banjara Hills, Hyderabad", "city": "Hyderabad", "state": "Telangana", "lat": 17.4126, "lng": 78.4421, "popular": True, "distance": "10 km", "time": "26 min"},
    {"name": "Gachibowli, Hyderabad", "city": "Hyderabad", "state": "Telangana", "lat": 17.4399, "lng": 78.3487, "popular": True, "distance": "20 km", "time": "48 min"},
    {"name": "Jubilee Hills, Hyderabad", "city": "Hyderabad", "state": "Telangana", "lat": 17.4331, "lng": 78.4074, "popular": False, "distance": "12 km", "time": "30 min"},
    
    # Chennai
    {"name": "Marina Beach, Chennai", "city": "Chennai", "state": "Tamil Nadu", "lat": 13.0499, "lng": 80.2824, "popular": True, "distance": "7 km", "time": "20 min"},
    {"name": "T Nagar, Chennai", "city": "Chennai", "state": "Tamil Nadu", "lat": 13.0418, "lng": 80.2341, "popular": True, "distance": "10 km", "time": "28 min"},
    {"name": "OMR, Chennai", "city": "Chennai", "state": "Tamil Nadu", "lat": 12.8642, "lng": 80.2179, "popular": True, "distance": "24 km", "time": "52 min"},
    {"name": "Velachery, Chennai", "city": "Chennai", "state": "Tamil Nadu", "lat": 12.9759, "lng": 80.2211, "popular": False, "distance": "14 km", "time": "36 min"},
    {"name": "Anna Nagar, Chennai", "city": "Chennai", "state": "Tamil Nadu", "lat": 13.0850, "lng": 80.2101, "popular": False, "distance": "11 km", "time": "30 min"},
    
    # More cities - continuing with 50+ locations
    {"name": "Howrah Bridge, Kolkata", "city": "Kolkata", "state": "West Bengal", "lat": 22.5851, "lng": 88.3470, "popular": True, "distance": "6 km", "time": "18 min"},
    {"name": "Park Street, Kolkata", "city": "Kolkata", "state": "West Bengal", "lat": 22.5535, "lng": 88.3522, "popular": True, "distance": "4 km", "time": "12 min"},
    {"name": "Koregaon Park, Pune", "city": "Pune", "state": "Maharashtra", "lat": 18.5362, "lng": 73.8958, "popular": True, "distance": "7 km", "time": "20 min"},
    {"name": "Hinjewadi, Pune", "city": "Pune", "state": "Maharashtra", "lat": 18.5912, "lng": 73.7394, "popular": True, "distance": "24 km", "time": "52 min"},
    {"name": "Hawa Mahal, Jaipur", "city": "Jaipur", "state": "Rajasthan", "lat": 26.9239, "lng": 75.8267, "popular": True, "distance": "6 km", "time": "18 min"},
    {"name": "Amber Fort, Jaipur", "city": "Jaipur", "state": "Rajasthan", "lat": 26.9855, "lng": 75.8513, "popular": True, "distance": "18 km", "time": "42 min"},
    {"name": "Marine Drive, Kochi", "city": "Kochi", "state": "Kerala", "lat": 9.9674, "lng": 76.2782, "popular": True, "distance": "5 km", "time": "15 min"},
    {"name": "Fort Kochi", "city": "Kochi", "state": "Kerala", "lat": 9.9654, "lng": 76.2424, "popular": True, "distance": "8 km", "time": "22 min"},
    {"name": "RK Beach, Vizag", "city": "Vizag", "state": "Andhra Pradesh", "lat": 17.7231, "lng": 83.3260, "popular": True, "distance": "6 km", "time": "18 min"},
    {"name": "Taj Mahal, Agra", "city": "Agra", "state": "Uttar Pradesh", "lat": 27.1751, "lng": 78.0421, "popular": True, "distance": "8 km", "time": "22 min"},
    {"name": "Mysore Palace", "city": "Mysore", "state": "Karnataka", "lat": 12.3052, "lng": 76.6551, "popular": True, "distance": "5 km", "time": "15 min"},
]

# Global instance
db = InMemoryDB()

