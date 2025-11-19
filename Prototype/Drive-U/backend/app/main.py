"""
DriveU Backend API - FastAPI Application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.config import settings
from app.database import connect_to_mongo, close_mongo_connection
from app.routes import auth, bookings, users, locations

# Configure logging
logging.basicConfig(
    level=logging.INFO if settings.debug else logging.WARNING,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Startup
    logger.info("Starting DriveU API...")
    await connect_to_mongo()
    logger.info("DriveU API started successfully!")
    
    yield
    
    # Shutdown
    logger.info("Shutting down DriveU API...")
    await close_mongo_connection()
    logger.info("DriveU API shut down successfully!")


# Create FastAPI app
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Backend API for DriveU - On-demand driver booking platform",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/")
async def root():
    """Root endpoint - Health check"""
    return {
        "message": "DriveU API is running!",
        "version": settings.app_version,
        "status": "healthy"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": logging.time.time()
    }


# Include routers
app.include_router(auth.router, prefix=f"{settings.api_prefix}/auth", tags=["Authentication"])
app.include_router(bookings.router, prefix=f"{settings.api_prefix}/bookings", tags=["Bookings"])
app.include_router(users.router, prefix=f"{settings.api_prefix}/users", tags=["Users"])
app.include_router(locations.router, prefix=f"{settings.api_prefix}/locations", tags=["Locations"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )

