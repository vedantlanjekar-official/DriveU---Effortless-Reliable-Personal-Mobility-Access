"""
Simple run script for DriveU Backend
"""
import sys
import os

# Add parent directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Now import and run
from app.main_simple import app
import uvicorn

if __name__ == "__main__":
    print("""
    ╔══════════════════════════════════════════════════════════╗
    ║                                                          ║
    ║             🚗 DriveU Backend API 🚗                     ║
    ║                Nominatim Integration                     ║
    ║                                                          ║
    ║  Server: http://localhost:8000                           ║
    ║  API Docs: http://localhost:8000/docs                    ║
    ║                                                          ║
    ║  ✅ Real-time location search (OpenStreetMap)            ║
    ║  ✅ Search ANY place in India                            ║
    ║  ✅ Unlimited locations available                        ║
    ║                                                          ║
    ╚══════════════════════════════════════════════════════════╝
    """)
    
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=True
    )

