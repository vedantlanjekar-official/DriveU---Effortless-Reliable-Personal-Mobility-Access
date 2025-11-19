"""
Start the DriveU Backend API server
"""
import uvicorn
from app.config import settings

if __name__ == "__main__":
    print(f"""
    ╔══════════════════════════════════════════════════════════╗
    ║                                                          ║
    ║             🚗 DriveU Backend API 🚗                     ║
    ║                                                          ║
    ║  Server starting on: http://{settings.host}:{settings.port}        ║
    ║  API Documentation: http://localhost:{settings.port}/docs           ║
    ║  Alternative Docs: http://localhost:{settings.port}/redoc           ║
    ║                                                          ║
    ╚══════════════════════════════════════════════════════════╝
    """)
    
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        log_level="info"
    )

