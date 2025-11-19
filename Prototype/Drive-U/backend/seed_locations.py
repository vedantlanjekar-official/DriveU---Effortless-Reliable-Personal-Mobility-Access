"""
Seed database with locations from all over India
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

# All locations from mockData.js converted to Python
LOCATIONS = [
    # Delhi NCR
    {"name": "India Gate, Delhi", "city": "Delhi", "state": "Delhi", "lat": 28.6129, "lng": 77.2295, "popular": True},
    {"name": "Connaught Place, Delhi", "city": "Delhi", "state": "Delhi", "lat": 28.6315, "lng": 77.2167, "popular": True},
    {"name": "Lotus Temple, Delhi", "city": "Delhi", "state": "Delhi", "lat": 28.5535, "lng": 77.2588, "popular": True},
    {"name": "Qutub Minar, Delhi", "city": "Delhi", "state": "Delhi", "lat": 28.5244, "lng": 77.1855, "popular": True},
    {"name": "Red Fort, Delhi", "city": "Delhi", "state": "Delhi", "lat": 28.6562, "lng": 77.2410, "popular": True},
    {"name": "Akshardham, Delhi", "city": "Delhi", "state": "Delhi", "lat": 28.6127, "lng": 77.2773, "popular": True},
    {"name": "Chandni Chowk, Delhi", "city": "Delhi", "state": "Delhi", "lat": 28.6506, "lng": 77.2303, "popular": True},
    {"name": "Saket, Delhi", "city": "Delhi", "state": "Delhi", "lat": 28.5244, "lng": 77.2066, "popular": False},
    {"name": "Cyber City, Gurgaon", "city": "Gurgaon", "state": "Haryana", "lat": 28.4951, "lng": 77.0890, "popular": True},
    {"name": "Noida Sector 18", "city": "Noida", "state": "Uttar Pradesh", "lat": 28.5688, "lng": 77.3243, "popular": True},
    
    # Mumbai
    {"name": "Gateway of India, Mumbai", "city": "Mumbai", "state": "Maharashtra", "lat": 18.9220, "lng": 72.8347, "popular": True},
    {"name": "Marine Drive, Mumbai", "city": "Mumbai", "state": "Maharashtra", "lat": 18.9432, "lng": 72.8236, "popular": True},
    {"name": "Bandra Kurla Complex, Mumbai", "city": "Mumbai", "state": "Maharashtra", "lat": 19.0625, "lng": 72.8686, "popular": True},
    {"name": "Juhu Beach, Mumbai", "city": "Mumbai", "state": "Maharashtra", "lat": 19.0990, "lng": 72.8265, "popular": True},
    {"name": "Powai, Mumbai", "city": "Mumbai", "state": "Maharashtra", "lat": 19.1197, "lng": 72.9059, "popular": False},
    {"name": "Andheri, Mumbai", "city": "Mumbai", "state": "Maharashtra", "lat": 19.1136, "lng": 72.8697, "popular": False},
    {"name": "Colaba, Mumbai", "city": "Mumbai", "state": "Maharashtra", "lat": 18.9067, "lng": 72.8147, "popular": True},
    
    # Bangalore
    {"name": "MG Road, Bangalore", "city": "Bangalore", "state": "Karnataka", "lat": 12.9758, "lng": 77.6061, "popular": True},
    {"name": "Whitefield, Bangalore", "city": "Bangalore", "state": "Karnataka", "lat": 12.9698, "lng": 77.7500, "popular": True},
    {"name": "Koramangala, Bangalore", "city": "Bangalore", "state": "Karnataka", "lat": 12.9352, "lng": 77.6245, "popular": True},
    {"name": "Electronic City, Bangalore", "city": "Bangalore", "state": "Karnataka", "lat": 12.8458, "lng": 77.6632, "popular": True},
    {"name": "Indiranagar, Bangalore", "city": "Bangalore", "state": "Karnataka", "lat": 12.9719, "lng": 77.6412, "popular": True},
    {"name": "HSR Layout, Bangalore", "city": "Bangalore", "state": "Karnataka", "lat": 12.9082, "lng": 77.6476, "popular": False},
    
    # Hyderabad
    {"name": "Charminar, Hyderabad", "city": "Hyderabad", "state": "Telangana", "lat": 17.3616, "lng": 78.4747, "popular": True},
    {"name": "HITEC City, Hyderabad", "city": "Hyderabad", "state": "Telangana", "lat": 17.4484, "lng": 78.3908, "popular": True},
    {"name": "Banjara Hills, Hyderabad", "city": "Hyderabad", "state": "Telangana", "lat": 17.4126, "lng": 78.4421, "popular": True},
    {"name": "Gachibowli, Hyderabad", "city": "Hyderabad", "state": "Telangana", "lat": 17.4399, "lng": 78.3487, "popular": True},
    {"name": "Jubilee Hills, Hyderabad", "city": "Hyderabad", "state": "Telangana", "lat": 17.4331, "lng": 78.4074, "popular": False},
    
    # Chennai
    {"name": "Marina Beach, Chennai", "city": "Chennai", "state": "Tamil Nadu", "lat": 13.0499, "lng": 80.2824, "popular": True},
    {"name": "T Nagar, Chennai", "city": "Chennai", "state": "Tamil Nadu", "lat": 13.0418, "lng": 80.2341, "popular": True},
    {"name": "OMR, Chennai", "city": "Chennai", "state": "Tamil Nadu", "lat": 12.8642, "lng": 80.2179, "popular": True},
    {"name": "Velachery, Chennai", "city": "Chennai", "state": "Tamil Nadu", "lat": 12.9759, "lng": 80.2211, "popular": False},
    {"name": "Anna Nagar, Chennai", "city": "Chennai", "state": "Tamil Nadu", "lat": 13.0850, "lng": 80.2101, "popular": False},
    
    # Kolkata
    {"name": "Howrah Bridge, Kolkata", "city": "Kolkata", "state": "West Bengal", "lat": 22.5851, "lng": 88.3470, "popular": True},
    {"name": "Park Street, Kolkata", "city": "Kolkata", "state": "West Bengal", "lat": 22.5535, "lng": 88.3522, "popular": True},
    {"name": "Salt Lake, Kolkata", "city": "Kolkata", "state": "West Bengal", "lat": 22.5764, "lng": 88.4328, "popular": False},
    {"name": "New Town, Kolkata", "city": "Kolkata", "state": "West Bengal", "lat": 22.5958, "lng": 88.4758, "popular": False},
    {"name": "Esplanade, Kolkata", "city": "Kolkata", "state": "West Bengal", "lat": 22.5627, "lng": 88.3492, "popular": True},
    
    # Pune
    {"name": "Koregaon Park, Pune", "city": "Pune", "state": "Maharashtra", "lat": 18.5362, "lng": 73.8958, "popular": True},
    {"name": "Hinjewadi, Pune", "city": "Pune", "state": "Maharashtra", "lat": 18.5912, "lng": 73.7394, "popular": True},
    {"name": "Viman Nagar, Pune", "city": "Pune", "state": "Maharashtra", "lat": 18.5679, "lng": 73.9143, "popular": False},
    {"name": "Baner, Pune", "city": "Pune", "state": "Maharashtra", "lat": 18.5596, "lng": 73.7802, "popular": False},
    {"name": "Kothrud, Pune", "city": "Pune", "state": "Maharashtra", "lat": 18.5074, "lng": 73.8077, "popular": False},
    
    # More cities continued...
    {"name": "Sabarmati Ashram, Ahmedabad", "city": "Ahmedabad", "state": "Gujarat", "lat": 23.0609, "lng": 72.5822, "popular": True},
    {"name": "SG Highway, Ahmedabad", "city": "Ahmedabad", "state": "Gujarat", "lat": 23.0338, "lng": 72.5194, "popular": True},
    {"name": "Maninagar, Ahmedabad", "city": "Ahmedabad", "state": "Gujarat", "lat": 22.9953, "lng": 72.6022, "popular": False},
    {"name": "Vastrapur, Ahmedabad", "city": "Ahmedabad", "state": "Gujarat", "lat": 23.0393, "lng": 72.5247, "popular": False},
    
    # Jaipur
    {"name": "Hawa Mahal, Jaipur", "city": "Jaipur", "state": "Rajasthan", "lat": 26.9239, "lng": 75.8267, "popular": True},
    {"name": "Amber Fort, Jaipur", "city": "Jaipur", "state": "Rajasthan", "lat": 26.9855, "lng": 75.8513, "popular": True},
    {"name": "Malviya Nagar, Jaipur", "city": "Jaipur", "state": "Rajasthan", "lat": 26.8657, "lng": 75.8226, "popular": False},
    {"name": "C-Scheme, Jaipur", "city": "Jaipur", "state": "Rajasthan", "lat": 26.9124, "lng": 75.7873, "popular": True},
    
    # More cities
    {"name": "Rock Garden, Chandigarh", "city": "Chandigarh", "state": "Chandigarh", "lat": 30.7529, "lng": 76.8100, "popular": True},
    {"name": "Sukhna Lake, Chandigarh", "city": "Chandigarh", "state": "Chandigarh", "lat": 30.7420, "lng": 76.8188, "popular": True},
    {"name": "Sector 17, Chandigarh", "city": "Chandigarh", "state": "Chandigarh", "lat": 30.7410, "lng": 76.7791, "popular": True},
    
    # Additional cities
    {"name": "Hazratganj, Lucknow", "city": "Lucknow", "state": "Uttar Pradesh", "lat": 26.8551, "lng": 80.9429, "popular": True},
    {"name": "Gomti Nagar, Lucknow", "city": "Lucknow", "state": "Uttar Pradesh", "lat": 26.8550, "lng": 81.0066, "popular": False},
    {"name": "Alambagh, Lucknow", "city": "Lucknow", "state": "Uttar Pradesh", "lat": 26.8335, "lng": 80.9231, "popular": False},
    
    {"name": "Rajwada, Indore", "city": "Indore", "state": "Madhya Pradesh", "lat": 22.7196, "lng": 75.8577, "popular": True},
    {"name": "Vijay Nagar, Indore", "city": "Indore", "state": "Madhya Pradesh", "lat": 22.7532, "lng": 75.8937, "popular": False},
    {"name": "Sarafa Bazaar, Indore", "city": "Indore", "state": "Madhya Pradesh", "lat": 22.7186, "lng": 75.8649, "popular": True},
    
    # Additional cities from the expanded list
    {"name": "Marine Drive, Kochi", "city": "Kochi", "state": "Kerala", "lat": 9.9674, "lng": 76.2782, "popular": True},
    {"name": "Fort Kochi", "city": "Kochi", "state": "Kerala", "lat": 9.9654, "lng": 76.2424, "popular": True},
    {"name": "Kakkanad, Kochi", "city": "Kochi", "state": "Kerala", "lat": 10.0058, "lng": 76.3496, "popular": False},
    
    {"name": "RK Beach, Vizag", "city": "Vizag", "state": "Andhra Pradesh", "lat": 17.7231, "lng": 83.3260, "popular": True},
    {"name": "Rushikonda Beach, Vizag", "city": "Vizag", "state": "Andhra Pradesh", "lat": 17.7853, "lng": 83.3851, "popular": True},
    
    {"name": "RS Puram, Coimbatore", "city": "Coimbatore", "state": "Tamil Nadu", "lat": 11.0015, "lng": 76.9553, "popular": True},
    {"name": "Gandhipuram, Coimbatore", "city": "Coimbatore", "state": "Tamil Nadu", "lat": 11.0168, "lng": 76.9558, "popular": True},
    
    # More cities
    {"name": "Sitabuldi, Nagpur", "city": "Nagpur", "state": "Maharashtra", "lat": 21.1498, "lng": 79.0821, "popular": True},
    {"name": "Athwa, Surat", "city": "Surat", "state": "Gujarat", "lat": 21.1850, "lng": 72.8040, "popular": False},
    {"name": "Patia, Bhubaneswar", "city": "Bhubaneswar", "state": "Odisha", "lat": 20.3597, "lng": 85.8189, "popular": False},
    {"name": "Kovalam Beach, Trivandrum", "city": "Trivandrum", "state": "Kerala", "lat": 8.4004, "lng": 76.9786, "popular": True},
    {"name": "Alkapuri, Vadodara", "city": "Vadodara", "state": "Gujarat", "lat": 22.3039, "lng": 73.1812, "popular": False},
    {"name": "Boring Road, Patna", "city": "Patna", "state": "Bihar", "lat": 25.6101, "lng": 85.1757, "popular": False},
    {"name": "Taj Mahal, Agra", "city": "Agra", "state": "Uttar Pradesh", "lat": 27.1751, "lng": 78.0421, "popular": True},
    {"name": "Meenakshi Temple, Madurai", "city": "Madurai", "state": "Tamil Nadu", "lat": 9.9195, "lng": 78.1193, "popular": True},
    {"name": "Dashashwamedh Ghat, Varanasi", "city": "Varanasi", "state": "Uttar Pradesh", "lat": 25.3077, "lng": 83.0106, "popular": True},
    {"name": "Rajpur Road, Dehradun", "city": "Dehradun", "state": "Uttarakhand", "lat": 30.3255, "lng": 78.0436, "popular": True},
    {"name": "Mysore Palace", "city": "Mysore", "state": "Karnataka", "lat": 12.3052, "lng": 76.6551, "popular": True},
    {"name": "Kamakhya Temple, Guwahati", "city": "Guwahati", "state": "Assam", "lat": 26.1654, "lng": 91.7044, "popular": True},
]


async def seed_locations():
    """Seed locations into MongoDB"""
    print("🌱 Starting location seeding...")
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(settings.mongodb_url)
    db = client[settings.database_name]
    locations_collection = db.locations
    
    try:
        # Clear existing locations (optional - remove this line to keep existing)
        # await locations_collection.delete_many({})
        
        # Insert locations
        count = 0
        for loc_data in LOCATIONS:
            # Check if location already exists
            existing = await locations_collection.find_one({"name": loc_data["name"]})
            if not existing:
                await locations_collection.insert_one(loc_data)
                count += 1
                print(f"✅ Added: {loc_data['name']}")
            else:
                print(f"⏭️  Skipped (already exists): {loc_data['name']}")
        
        print(f"\n🎉 Successfully seeded {count} new locations!")
        print(f"📍 Total locations in database: {await locations_collection.count_documents({})}")
        
    except Exception as e:
        print(f"❌ Error seeding locations: {e}")
    finally:
        client.close()


if __name__ == "__main__":
    asyncio.run(seed_locations())

