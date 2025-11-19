# 🚀 Start DriveU Project - Complete Guide

## ✅ All Ports Closed - Ready to Start Fresh!

---

## 📋 Prerequisites Check

Before starting, ensure you have:
- ✅ **Node.js** installed (for frontend)
- ✅ **Python 3.10+** installed (for backend)
- ✅ **MongoDB** installed (for database)

---

## 🚀 Quick Start - Run Complete Project

### **Option 1: Run Frontend Only (Mock Data)**

If you want to run just the frontend with mock data:

```bash
# In the project root (E:\Drive-U)
npm start
```

Frontend will open at: **http://localhost:3000**

---

### **Option 2: Run Complete Project (Frontend + Backend)**

For the full experience with real backend integration:

#### **Step 1: Start MongoDB** (Terminal 1)

```bash
# Start MongoDB server
mongod
```

Keep this terminal running.

---

#### **Step 2: Start Backend** (Terminal 2)

```bash
# Navigate to backend
cd backend

# Create virtual environment (first time only)
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies (first time only)
pip install -r requirements.txt

# Seed locations to database (first time only)
python seed_locations.py

# Start backend server
python start.py
```

Backend will run at: **http://localhost:8000**  
API Docs available at: **http://localhost:8000/docs**

Keep this terminal running.

---

#### **Step 3: Start Frontend** (Terminal 3)

```bash
# In project root (E:\Drive-U)
npm start
```

Frontend will open at: **http://localhost:3000**

---

## 🎯 Simplified Commands

### **First Time Setup:**

**Terminal 1 - MongoDB:**
```bash
mongod
```

**Terminal 2 - Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python seed_locations.py
python start.py
```

**Terminal 3 - Frontend:**
```bash
npm start
```

---

### **Subsequent Runs:**

**Terminal 1 - MongoDB:**
```bash
mongod
```

**Terminal 2 - Backend:**
```bash
cd backend
venv\Scripts\activate
python start.py
```

**Terminal 3 - Frontend:**
```bash
npm start
```

---

## ✅ How to Verify Everything is Running

### **1. Check MongoDB:**
MongoDB should show:
```
[initandlisten] waiting for connections on port 27017
```

### **2. Check Backend:**
Visit: http://localhost:8000
Should show:
```json
{
  "message": "DriveU API is running!",
  "version": "1.0.0",
  "status": "healthy"
}
```

### **3. Check API Documentation:**
Visit: http://localhost:8000/docs
Should show interactive Swagger UI

### **4. Check Frontend:**
Visit: http://localhost:3000
Should show DriveU landing page with logo

---

## 🔧 Troubleshooting

### **If MongoDB doesn't start:**
```bash
# Check if MongoDB is installed
mongod --version

# If not installed, download from:
# https://www.mongodb.com/try/download/community
```

### **If Python packages fail:**
```bash
# Make sure you're in virtual environment
venv\Scripts\activate

# Try upgrading pip first
python -m pip install --upgrade pip

# Then install requirements
pip install -r requirements.txt
```

### **If ports are already in use:**
```bash
# Kill Node processes
taskkill /f /im node.exe

# Kill Python processes
taskkill /f /im python.exe

# Then restart
```

---

## 🎮 What You Can Test

Once all three servers are running:

### **Landing Page:**
✅ See DriveU logo  
✅ Navigation bar with login  
✅ Scroll effects  

### **Login/Register:**
✅ Owner registration with car details  
✅ Driver registration with license  
✅ Google sign-in (owners only)  
✅ Remember me checkbox  
✅ Location permission request  

### **Owner Dashboard:**
✅ Search destinations (150+ locations all over India)  
✅ Autocomplete suggestions  
✅ Choose on map feature  
✅ Duration selection with visual feedback  
✅ See nearby available drivers  
✅ Create booking  
✅ OTP always visible at top  
✅ Copy/Share OTP  

### **Driver Dashboard:**
✅ See nearby booking requests  
✅ Accept/Deny bookings  
✅ OTP entry section (always visible)  
✅ Verify OTP & start trip  
✅ View earnings  
✅ Trip history  

---

## 📊 Tech Stack Summary

**Frontend:**
- React.js
- React Router
- Leaflet Maps
- Axios/Fetch API

**Backend:**
- Python 3.10+
- FastAPI
- MongoDB
- Beanie ODM
- JWT Authentication
- Geopy (distance calculations)

---

## 🎯 Ready to Run!

Choose your option:
- **Option 1**: Run frontend only with mock data (1 command)
- **Option 2**: Run complete project with backend (3 terminals)

All files are created, tested, and ready to go! 🎉

