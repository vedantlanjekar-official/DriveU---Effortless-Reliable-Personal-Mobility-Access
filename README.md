# 🚗 DriveU - On-Demand Driver Booking Platform

**Your Car. Our Verified Drivers.**

DriveU is a comprehensive, production-ready platform that connects car owners with RTO-verified professional drivers for on-demand driving services. Think of it as "Uber for hiring drivers to drive YOUR car" rather than booking a cab.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Features in Detail](#features-in-detail)
- [Security](#security)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## 🎯 Overview

DriveU is a full-stack web application designed to revolutionize the way car owners hire professional drivers. The platform offers flexible hourly booking plans (2-24 hours), real-time location tracking, OTP-based verification, and a seamless user experience for both car owners and drivers.

### Core Value Proposition

- 🚗 **Your car, our verified drivers** - Use your own vehicle with professional drivers
- ⏰ **Flexible hourly plans** - Book for 2, 4, 6, 8, 12, or 24 hours
- 📍 **Real-time tracking** - GPS-based location services and navigation
- 🔒 **RTO-verified drivers** - Safety and trust through verification
- 💰 **Transparent pricing** - Clear hourly rates with no hidden fees
- 📱 **Easy booking** - Simple, intuitive booking process with OTP verification

---

## ✨ Key Features

### For Car Owners

- ✅ **User Registration & Authentication**
  - Email/password registration
  - Google OAuth sign-in
  - Remember me (30-day persistent login)
  - Profile management with car details

- ✅ **Smart Location Search**
  - Unlimited location search using OpenStreetMap Nominatim API
  - Real-time autocomplete suggestions
  - "Choose on Map" interactive selection
  - Distance and ETA calculations

- ✅ **Driver Discovery & Booking**
  - View nearby drivers within 5km radius
  - Interactive map with driver locations
  - Driver profiles with ratings, experience, and skills
  - Hourly plan selection (2h to 24h)
  - Booking confirmation with OTP

- ✅ **Trip Management**
  - Active trip tracking
  - OTP display and sharing
  - Booking history
  - Trip status updates

### For Drivers

- ✅ **Driver Registration**
  - License verification
  - Experience and skills profiling
  - Availability status management

- ✅ **Booking Management**
  - Receive nearby booking requests (< 5km)
  - Accept or deny requests
  - OTP verification at pickup
  - Trip completion tracking

- ✅ **Earnings & Analytics**
  - Daily, weekly, monthly earnings tracking
  - Trip history
  - Performance metrics
  - Rating and review system

### Platform Features

- ✅ **Real-time Location Services**
  - GPS tracking
  - Interactive maps with Leaflet
  - Route navigation
  - Distance calculations

- ✅ **Security & Verification**
  - JWT-based authentication
  - OTP generation and verification (10-minute expiry)
  - Password hashing (bcrypt)
  - Protected API routes

- ✅ **Modern UI/UX**
  - Fully responsive design (mobile, tablet, desktop)
  - Smooth animations and transitions
  - Intuitive navigation
  - Professional color scheme

---

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI library |
| **React Router DOM** | 6.20.0 | Client-side routing |
| **React Leaflet** | 4.2.1 | Interactive maps |
| **Leaflet** | 1.9.4 | Map rendering |
| **Lucide React** | 0.294.0 | Icon library |
| **CSS3** | - | Styling (no frameworks) |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.10+ | Programming language |
| **FastAPI** | 0.104.1 | Web framework |
| **Uvicorn** | 0.24.0 | ASGI server |
| **Pydantic** | 2.5.0 | Data validation |
| **MongoDB** | 6.0+ | Database |
| **Beanie** | 1.23.6 | MongoDB ODM |
| **Motor** | 3.3.2 | Async MongoDB driver |
| **JWT** | 3.3.0 | Authentication |
| **Geopy** | 2.4.1 | Geocoding |
| **Google Maps API** | 4.10.0 | Location services |

### External Services

- **OpenStreetMap Nominatim API** - Location search and geocoding
- **Google OAuth** - Social authentication (optional)
- **Google Maps API** - Navigation and directions (optional)

---

## 📁 Project Structure

```
Drive-U/
├── Documentation/                    # Project documentation
│   ├── Abstract.pdf
│   ├── Problem Statement.pdf
│   ├── Solution.pdf
│   ├── System Architecture.pdf
│   └── Tech Stack.pdf
│
├── Prototype/
│   └── Drive-U/
│       ├── backend/                  # Python FastAPI backend
│       │   ├── app/
│       │   │   ├── models/           # Database models
│       │   │   │   ├── user.py
│       │   │   │   ├── booking.py
│       │   │   │   └── location.py
│       │   │   ├── schemas/          # Pydantic schemas
│       │   │   │   ├── auth.py
│       │   │   │   ├── booking.py
│       │   │   │   └── location.py
│       │   │   ├── routes/           # API endpoints
│       │   │   │   ├── auth.py
│       │   │   │   ├── bookings.py
│       │   │   │   ├── users.py
│       │   │   │   └── locations.py
│       │   │   ├── utils/            # Utility functions
│       │   │   │   ├── security.py
│       │   │   │   ├── otp.py
│       │   │   │   ├── distance.py
│       │   │   │   └── geocoding_builtin.py
│       │   │   ├── middleware/       # Middleware
│       │   │   │   └── auth.py
│       │   │   ├── config.py         # Configuration
│       │   │   ├── database.py       # Database connection
│       │   │   └── main.py           # FastAPI app
│       │   ├── tests/                # Unit tests
│       │   ├── requirements.txt      # Python dependencies
│       │   ├── env.example           # Environment variables template
│       │   ├── run.py                # Run script
│       │   └── README.md             # Backend documentation
│       │
│       ├── src/                      # React frontend
│       │   ├── components/
│       │   │   ├── common/           # Reusable components
│       │   │   │   ├── Button.jsx
│       │   │   │   ├── Card.jsx
│       │   │   │   ├── Input.jsx
│       │   │   │   ├── Modal.jsx
│       │   │   │   ├── Navbar.jsx
│       │   │   │   ├── MapComponent.jsx
│       │   │   │   ├── SearchDestination.jsx
│       │   │   │   ├── Badge.jsx
│       │   │   │   └── Rating.jsx
│       │   │   ├── owner/            # Owner-specific components
│       │   │   │   ├── DriverCard.jsx
│       │   │   │   ├── HourlyPlanSelector.jsx
│       │   │   │   └── BookingHistory.jsx
│       │   │   └── driver/           # Driver-specific components
│       │   │       ├── BookingRequest.jsx
│       │   │       └── EarningsSummary.jsx
│       │   ├── pages/
│       │   │   ├── Landing.jsx       # Landing page
│       │   │   ├── Login.jsx         # Login/Signup
│       │   │   ├── OwnerDashboard.jsx
│       │   │   └── DriverDashboard.jsx
│       │   ├── services/             # API services
│       │   │   ├── api.js
│       │   │   ├── authService.js
│       │   │   ├── bookingService.js
│       │   │   ├── locationService.js
│       │   │   └── userService.js
│       │   ├── styles/               # CSS files
│       │   │   ├── global.css
│       │   │   ├── landing.css
│       │   │   ├── login.css
│       │   │   ├── dashboard.css
│       │   │   └── search.css
│       │   ├── utils/                # Utilities
│       │   │   ├── helpers.js
│       │   │   └── mockData.js
│       │   ├── assets/               # Images and assets
│       │   │   ├── Drive_u_Logo.png
│       │   │   └── drive_u_background.png
│       │   ├── App.jsx               # Main app component
│       │   └── index.js              # Entry point
│       │
│       ├── public/
│       │   └── index.html
│       │
│       ├── package.json              # Frontend dependencies
│       ├── README.md                 # Frontend README
│       ├── SETUP_GUIDE.md            # Setup instructions
│       ├── GETTING_STARTED.md        # Quick start guide
│       ├── PROJECT_STRUCTURE.md      # Structure documentation
│       ├── PROJECT_ANALYSIS_AND_OVERVIEW.md
│       ├── BACKEND_INTEGRATION_GUIDE.md
│       └── LEAFLET_CUSTOM_SEARCH_INTEGRATION.md
│
├── Logo.png
├── Header.png
└── README.md                         # This file
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **Python** (3.10 or higher) - [Download](https://www.python.org/downloads/)
- **MongoDB** (6.0 or higher) - [Download](https://www.mongodb.com/try/download/community) (Optional - fallback in-memory DB available)
- **npm** or **yarn** - Comes with Node.js
- **pip** - Comes with Python

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd Prototype/Drive-U
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   The app will automatically open at `http://localhost:3000`

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd Prototype/Drive-U/backend
   ```

2. **Create a virtual environment:**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Linux/Mac
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   ```bash
   # Copy the example file
   cp env.example .env

   # Edit .env with your configuration
   # Minimum required:
   # - SECRET_KEY (generate a random string)
   # - MONGODB_URL (or leave default for in-memory fallback)
   # - FRONTEND_URL (http://localhost:3000)
   ```

5. **Start MongoDB** (if using MongoDB):
   ```bash
   # Windows
   mongod

   # Linux/Mac
   sudo systemctl start mongod
   ```

6. **Run the backend server:**
   ```bash
   # Option 1: Using uvicorn directly
   uvicorn app.main:app --reload --port 8000

   # Option 2: Using the run script
   python run.py

   # Option 3: Using the main file
   python -m app.main
   ```

7. **Verify the backend is running:**
   - API: `http://localhost:8000`
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

### Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Application
APP_NAME=DriveU API
APP_VERSION=1.0.0
DEBUG=True
API_PREFIX=/api/v1

# Server
HOST=0.0.0.0
PORT=8000

# Database
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=driveu_db

# Security
SECRET_KEY=your-secret-key-here-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# Google Maps (Optional)
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# CORS
FRONTEND_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000
```

---

## 📖 Usage Guide

### For Car Owners

1. **Register/Login:**
   - Visit the landing page
   - Click "Hire a Driver"
   - Sign up with email/password or use Google OAuth
   - Fill in car details (model, number, color, year)

2. **Book a Driver:**
   - Search for your destination using the search bar
   - Select an hourly plan (2h, 4h, 6h, 8h, 12h, or 24h)
   - View available drivers on the map
   - Click on a driver to see their profile
   - Confirm booking and receive OTP

3. **Manage Trips:**
   - View active trips in the dashboard
   - Copy or share OTP with the driver
   - Track trip status
   - View booking history

### For Drivers

1. **Register/Login:**
   - Visit the landing page
   - Click "Become a Driver"
   - Sign up with email/password
   - Provide license details and experience

2. **Accept Bookings:**
   - View nearby booking requests (< 5km)
   - Review booking details
   - Accept or deny requests
   - Navigate to pickup location

3. **Complete Trips:**
   - Enter OTP at pickup location
   - Navigate to destination
   - Complete trip
   - View earnings and ratings

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "phone": "+1234567890",
  "user_type": "owner" | "driver"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "remember_me": true
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

### Booking Endpoints

#### Create Booking
```http
POST /bookings/
Authorization: Bearer <token>
Content-Type: application/json

{
  "pickup_location": {
    "latitude": 28.6139,
    "longitude": 77.2090,
    "address": "New Delhi, India"
  },
  "destination": {
    "latitude": 28.5355,
    "longitude": 77.3910,
    "address": "Gurgaon, India"
  },
  "duration_hours": 4,
  "driver_id": "driver_id_here"
}
```

#### Get Nearby Bookings (for drivers)
```http
GET /bookings/nearby?latitude=28.6139&longitude=77.2090&radius=5
Authorization: Bearer <token>
```

#### Accept Booking
```http
PUT /bookings/{booking_id}/accept
Authorization: Bearer <token>
```

#### Verify OTP
```http
POST /bookings/{booking_id}/verify-otp
Authorization: Bearer <token>
Content-Type: application/json

{
  "otp": "1234"
}
```

#### Complete Trip
```http
PUT /bookings/{booking_id}/complete
Authorization: Bearer <token>
```

### Location Endpoints

#### Search Locations
```http
POST /locations/search
Content-Type: application/json

{
  "query": "New Delhi"
}
```

#### Get Autocomplete Suggestions
```http
GET /locations/autocomplete?q=New
```

### User Endpoints

#### Get Available Drivers
```http
GET /users/drivers/available?latitude=28.6139&longitude=77.2090&radius=5
Authorization: Bearer <token>
```

#### Update Location
```http
PUT /users/location
Authorization: Bearer <token>
Content-Type: application/json

{
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

### Interactive API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## 🎯 Features in Detail

### 1. Unlimited Location Search

- **Technology**: OpenStreetMap Nominatim API
- **Features**:
  - Search any location worldwide
  - Real-time autocomplete (300ms debounce)
  - "Choose on Map" interactive selection
  - Distance and ETA calculations
  - No hardcoded locations

### 2. OTP Verification System

- **Security**: 4-digit OTP with 10-minute expiry
- **Features**:
  - Auto-generated for each booking
  - Visible to owner in dashboard
  - Copy and share functionality
  - Driver verification at pickup
  - Secure trip start

### 3. Interactive Maps

- **Technology**: React Leaflet with OpenStreetMap tiles
- **Features**:
  - Real-time driver locations
  - 5km radius visualization
  - Click-to-select destinations
  - Route navigation
  - Custom markers and popups

### 4. Flexible Booking System

- **Hourly Plans**: 2h, 4h, 6h, 8h, 12h, 24h
- **Features**:
  - Visual plan selector
  - Dynamic fare calculation
  - Transparent pricing
  - Booking confirmation
  - Status tracking

### 5. Dual Authentication

- **For Owners**: Email/password + Google OAuth
- **For Drivers**: Email/password only
- **Features**:
  - JWT token-based auth
  - Remember me (30 days)
  - Secure password hashing
  - Session management

---

## 🔐 Security

### Implemented Security Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Password Hashing** - bcrypt with salt rounds
- ✅ **OTP Expiry** - 10-minute time-limited OTPs
- ✅ **CORS Configuration** - Restricted cross-origin requests
- ✅ **Input Validation** - Pydantic schemas for all inputs
- ✅ **XSS Protection** - React's built-in XSS protection
- ✅ **Protected Routes** - Authentication required for sensitive endpoints
- ✅ **Secure Headers** - CORS and security headers configured

### Security Best Practices

- Store sensitive data in environment variables
- Use HTTPS in production
- Implement rate limiting (recommended)
- Regular security audits
- Keep dependencies updated

---

## 🚢 Deployment

### Frontend Deployment

#### Build for Production
```bash
cd Prototype/Drive-U
npm run build
```

#### Deploy Options

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
- Drag and drop the `build/` folder to Netlify
- Or connect GitHub repository for auto-deploy

**AWS S3 + CloudFront:**
```bash
aws s3 sync build/ s3://your-bucket-name
```

### Backend Deployment

#### Using Docker (Recommended)

Create a `Dockerfile`:
```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t driveu-backend .
docker run -p 8000:8000 driveu-backend
```

#### Cloud Platforms

**Heroku:**
```bash
heroku create driveu-api
git push heroku main
```

**Railway:**
- Connect GitHub repository
- Auto-deploy on push

**AWS EC2:**
- Setup EC2 instance
- Install dependencies
- Use PM2 or systemd for process management

**DigitalOcean App Platform:**
- Connect repository
- Configure environment variables
- Deploy

### Environment Variables for Production

Ensure all production environment variables are set:
- `DEBUG=False`
- `SECRET_KEY` (strong, random string)
- `MONGODB_URL` (production database)
- `ALLOWED_ORIGINS` (production frontend URL)
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` (if using OAuth)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages:**
   ```bash
   git commit -m "Add: Description of your feature"
   ```
6. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Code Style

- **Frontend**: Follow React best practices, use functional components
- **Backend**: Follow PEP 8 Python style guide
- **Commits**: Use conventional commit messages
- **Documentation**: Update README and code comments

---

## 📄 License

This project is proprietary software. All rights reserved.

For licensing inquiries, please contact the project maintainers.

---

## 🆘 Support

### Documentation

- **Frontend README**: `Prototype/Drive-U/README.md`
- **Backend README**: `Prototype/Drive-U/backend/README.md`
- **Setup Guide**: `Prototype/Drive-U/SETUP_GUIDE.md`
- **Getting Started**: `Prototype/Drive-U/GETTING_STARTED.md`
- **Project Analysis**: `Prototype/Drive-U/PROJECT_ANALYSIS_AND_OVERVIEW.md`

### Troubleshooting

#### Frontend Issues

**Maps not showing?**
- Check Leaflet CSS is loaded in `public/index.html`
- Verify `react-leaflet` is installed
- Check browser console for errors

**Port 3000 already in use?**
```bash
PORT=3001 npm start
```

**Build errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Backend Issues

**MongoDB connection failed?**
- The app uses an in-memory fallback database
- For MongoDB, ensure it's running: `mongod`
- Check `MONGODB_URL` in `.env`

**Import errors?**
```bash
pip install -r requirements.txt
```

**Port 8000 already in use?**
```bash
uvicorn app.main:app --port 8001
```

### Getting Help

1. Check the documentation files
2. Review the API documentation at `/docs`
3. Check browser/terminal console for errors
4. Review the code comments
5. Open an issue on the repository

---

## 📊 Project Statistics

- **Total Components**: 16+
- **Total Pages**: 4
- **API Endpoints**: 15+
- **Database Models**: 3
- **Lines of Code**: ~5,000+
- **Development Status**: Production-ready MVP

---

## 🎯 Roadmap

### Planned Features

- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] SMS notifications (Twilio)
- [ ] Push notifications (Web Push API)
- [ ] Real-time chat between owner and driver
- [ ] Advanced analytics dashboard
- [ ] Driver rating submission
- [ ] Trip cancellation and refunds
- [ ] Multi-language support
- [ ] Mobile apps (React Native)
- [ ] Advanced route optimization

### Future Enhancements

- [ ] AI-powered driver matching
- [ ] Predictive demand analytics
- [ ] Loyalty program
- [ ] Referral system
- [ ] Corporate accounts
- [ ] Fleet management for multiple cars

---

## 🏆 Acknowledgments

- **OpenStreetMap** - For location data and Nominatim API
- **Leaflet** - For interactive maps
- **FastAPI** - For the excellent web framework
- **React** - For the powerful UI library

---

## 📞 Contact

For questions, suggestions, or support:

- **Project Repository**: [GitHub Repository URL]
- **Documentation**: See `Documentation/` folder
- **Issues**: Open an issue on GitHub

---

## 🎉 Thank You!

Thank you for using DriveU! We hope this platform helps connect car owners with professional drivers seamlessly.

**Built with ❤️ for seamless driver-owner connections**

---
![drive u prop imges_page-0001](https://github.com/user-attachments/assets/7c07e110-4efe-4cb2-93cd-b6ce9a22ae40)
![drive u prop imges_page-0002](https://github.com/user-attachments/assets/6ca2eaf0-f517-44f4-a0e7-1a3857828003)
![drive u prop imges_page-0003](https://github.com/user-attachments/assets/b66259a4-f722-4eb6-a72b-e742b8561754)
![drive u prop imges_page-0004](https://github.com/user-attachments/assets/4390e834-f335-4d84-a534-25be618ca897)
![drive u prop imges_page-0005](https://github.com/user-attachments/assets/89134a63-d699-4c04-9352-8e488371d2f8)
![drive u prop imges_page-0006](https://github.com/user-attachments/assets/90ff3555-1f66-4486-a0c6-20073dc9417d)
![drive u prop imges_page-0007](https://github.com/user-attachments/assets/e2743f05-5fe8-4cd3-89e0-6232b13b04d8)
![drive u prop imges_page-0008](https://github.com/user-attachments/assets/526b813d-19f7-4dcc-afe0-1da6ab12301a)
![drive u prop imges_page-0009](https://github.com/user-attachments/assets/cce6714c-c5e5-4e08-bf45-5c869a521a4c)
![drive u prop imges_page-0010](https://github.com/user-attachments/assets/9a34fec8-30e2-4484-bac8-db7ff0c162d0)
![drive u prop imges_page-0011](https://github.com/user-attachments/assets/256577c8-b5ca-4d6e-95ad-3e26f5ae10b7)

*Last Updated: 2025*
*Version: 1.0.0*

