# DriveU Backend API

Python FastAPI backend for DriveU - On-demand driver booking platform.

## 🚀 Quick Start

### Prerequisites
- Python 3.10 or higher
- MongoDB 6.0 or higher
- pip (Python package manager)

### Installation

1. **Create virtual environment**:
```bash
python -m venv venv
```

2. **Activate virtual environment**:

Windows:
```bash
venv\Scripts\activate
```

Linux/Mac:
```bash
source venv/bin/activate
```

3. **Install dependencies**:
```bash
pip install -r requirements.txt
```

4. **Setup environment variables**:
- Copy `env.example` to `.env`
- Update the values in `.env` with your configuration

5. **Start MongoDB** (if running locally):
```bash
mongod
```

6. **Run the application**:
```bash
python -m uvicorn app.main:app --reload --port 8000
```

Or:
```bash
python app/main.py
```

### API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📁 Project Structure

```
backend/
├── app/
│   ├── models/          # Database models
│   ├── schemas/         # Request/Response schemas
│   ├── routes/          # API endpoints
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── middleware/      # Middleware (auth, etc.)
│   ├── config.py        # Configuration
│   ├── database.py      # DB connection
│   └── main.py          # FastAPI app
├── tests/               # Unit tests
├── requirements.txt     # Dependencies
└── README.md
```

## 🔌 API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /register` - Register user
- `POST /login` - Login
- `POST /google` - Google OAuth
- `GET /me` - Current user
- `POST /logout` - Logout

### Bookings (`/api/v1/bookings`)
- `POST /` - Create booking
- `GET /nearby` - Nearby bookings (drivers)
- `PUT /{id}/accept` - Accept booking
- `PUT /{id}/deny` - Deny booking
- `POST /{id}/verify-otp` - Verify OTP
- `PUT /{id}/complete` - Complete trip
- `GET /history` - Booking history

### Users (`/api/v1/users`)
- `GET /me` - Get profile
- `PUT /location` - Update location
- `GET /drivers/available` - Available drivers

### Locations (`/api/v1/locations`)
- `POST /search` - Search locations
- `POST /nearby` - Nearby places
- `POST /directions` - Get directions
- `GET /autocomplete` - Autocomplete

## 🔧 Development

### Run with auto-reload:
```bash
uvicorn app.main:app --reload --port 8000
```

### Run tests:
```bash
pytest
```

### Format code:
```bash
black app/
```

## 🐳 Docker (Optional)

```bash
docker-compose up
```

## 📝 Environment Variables

See `env.example` for all available configuration options.

## 🛠️ Tech Stack

- **FastAPI** - Modern web framework
- **MongoDB** - NoSQL database
- **Beanie** - ODM for MongoDB
- **JWT** - Authentication
- **Geopy** - Distance calculations
- **Google Maps API** - Navigation

## 📄 License

Proprietary - DriveU Platform

