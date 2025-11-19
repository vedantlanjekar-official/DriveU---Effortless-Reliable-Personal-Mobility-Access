"""
Database connection and initialization
"""
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.config import settings
import logging

logger = logging.getLogger(__name__)


class Database:
    client: AsyncIOMotorClient = None
    
    
db = Database()


async def connect_to_mongo():
    """Connect to MongoDB"""
    try:
        logger.info(f"Connecting to MongoDB at {settings.mongodb_url}")
        db.client = AsyncIOMotorClient(settings.mongodb_url)
        
        # Test connection
        await db.client.admin.command('ping')
        logger.info("Successfully connected to MongoDB!")
        
        # Import models here to avoid circular imports
        from app.models.user import User
        from app.models.booking import Booking
        from app.models.location import Location
        
        # Initialize beanie with models
        await init_beanie(
            database=db.client[settings.database_name],
            document_models=[User, Booking, Location]
        )
        logger.info("Beanie initialized with models")
        
    except Exception as e:
        logger.error(f"Could not connect to MongoDB: {e}")
        raise


async def close_mongo_connection():
    """Close MongoDB connection"""
    try:
        if db.client:
            db.client.close()
            logger.info("MongoDB connection closed")
    except Exception as e:
        logger.error(f"Error closing MongoDB connection: {e}")


def get_database():
    """Get database instance"""
    return db.client[settings.database_name]

