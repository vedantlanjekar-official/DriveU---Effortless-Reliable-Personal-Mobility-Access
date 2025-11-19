# DriveU - Quick Setup Guide

## 📋 Project Overview

DriveU is a complete, production-ready React frontend application for connecting car owners with RTO-verified drivers. The project includes:

- ✅ Landing page with hero, features, testimonials
- ✅ Login/Signup with Owner and Driver modes
- ✅ Owner Dashboard with booking, maps, history
- ✅ Driver Dashboard with requests, earnings, ratings
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Interactive maps with Leaflet
- ✅ Modern UI with animations and transitions
- ✅ Complete component library

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages:
- React 18
- React Router DOM (for navigation)
- React Leaflet (for maps)
- Lucide React (for icons)

### Step 2: Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000` in your browser.

### Step 3: Explore the App

1. **Landing Page** (`/`)
   - View hero section, features, how it works, testimonials
   - Click "Hire a Driver" or "Become a Driver"

2. **Login/Signup** (`/login`)
   - Toggle between Owner and Driver
   - Fill out respective forms
   - Sign up to access dashboards

3. **Owner Dashboard** (`/owner-dashboard`)
   - Search destinations
   - Select hourly plans
   - View drivers on interactive map
   - Book drivers
   - View booking history

4. **Driver Dashboard** (`/driver-dashboard`)
   - View earnings summary
   - Accept/deny booking requests
   - Track trip history
   - View ratings and reviews

## 📁 Project Structure

```
driveu-frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── common/             # Reusable components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Rating.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── MapComponent.jsx
│   │   │   └── Navbar.jsx
│   │   ├── owner/              # Owner-specific components
│   │   │   ├── DriverCard.jsx
│   │   │   ├── HourlyPlanSelector.jsx
│   │   │   └── BookingHistory.jsx
│   │   └── driver/             # Driver-specific components
│   │       ├── BookingRequest.jsx
│   │       └── EarningsSummary.jsx
│   ├── pages/
│   │   ├── Landing.jsx         # Landing page
│   │   ├── Login.jsx           # Login/Signup page
│   │   ├── OwnerDashboard.jsx  # Owner dashboard
│   │   └── DriverDashboard.jsx # Driver dashboard
│   ├── styles/
│   │   ├── global.css          # Global styles & theme
│   │   ├── landing.css         # Landing page styles
│   │   ├── login.css           # Login page styles
│   │   └── dashboard.css       # Dashboard styles
│   ├── utils/
│   │   ├── mockData.js         # Mock data for development
│   │   └── helpers.js          # Helper functions
│   ├── App.jsx                 # Main app with routing
│   └── index.js                # Entry point
├── package.json
├── README.md
└── SETUP_GUIDE.md
```

## 🎨 Design System

### Colors
- **Primary Blue**: `#2563EB` - Main accent color
- **Grey**: `#6B7280` - Secondary color
- **Green**: `#10B981` - Success/Available
- **Red**: `#EF4444` - Danger/Unavailable
- **White**: `#FFFFFF` - Background
- **Background**: White with 50% opacity car road overlay

### Components
- **Buttons**: Primary, Secondary, Success, Danger, Outline
- **Cards**: Elevated with shadows, rounded corners
- **Modals**: Centered overlays with backdrop blur
- **Forms**: Clean inputs with focus states
- **Badges**: Status indicators
- **Ratings**: Star-based with Lucide icons

## 🗺️ Interactive Maps

The app uses **React Leaflet** for interactive maps:
- Shows driver locations with custom markers
- 5km radius circle for search area
- Popup information on marker click
- Real-time updates (simulated)

## 📊 Mock Data

The app includes comprehensive mock data in `src/utils/mockData.js`:
- 5 verified drivers with profiles
- Sample bookings and trip history
- Earnings data for drivers
- Testimonials
- Nearby places

## 🔧 Customization

### Change Colors

Edit `src/styles/global.css`:
```css
:root {
  --primary-blue: #2563EB;    /* Change main color */
  --grey: #6B7280;            /* Change secondary */
  --green: #10B981;           /* Change success */
  --red: #EF4444;             /* Change danger */
}
```

### Add More Mock Data

Edit `src/utils/mockData.js` to add:
- More drivers
- More bookings
- Custom locations
- Additional testimonials

### Modify Hourly Plans

Edit the `hourlyPlans` array in `mockData.js` to adjust:
- Available durations
- Base rates
- Descriptions

## 🚦 Features

### Owner Features
- ✅ Search destinations
- ✅ View drivers on map
- ✅ Select hourly booking plans
- ✅ View driver profiles (ratings, experience, skills)
- ✅ Book drivers
- ✅ Receive OTP for trip verification
- ✅ View booking history
- ✅ Track active trips

### Driver Features
- ✅ Receive booking requests within 5km
- ✅ Accept/Deny requests
- ✅ View daily/weekly/monthly earnings
- ✅ Track trip history
- ✅ View ratings and reviews
- ✅ Performance metrics dashboard

### Shared Features
- ✅ Responsive design (mobile-first)
- ✅ Smooth animations and transitions
- ✅ Modal popups for confirmations
- ✅ Real-time status updates
- ✅ Clean, modern UI

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

All components are fully responsive and optimized for all screen sizes.

## 🔐 Authentication (To Be Implemented)

Currently, the app uses client-side routing without authentication. To add authentication:

1. Set up a backend API (Node.js, Python, etc.)
2. Implement JWT-based authentication
3. Add protected routes
4. Store user session in localStorage/cookies
5. Add API calls to replace mock data

## 🌐 Backend Integration

To connect with a real backend:

1. Replace mock data in `utils/mockData.js` with API calls
2. Use `fetch` or `axios` for HTTP requests
3. Add environment variables for API endpoints
4. Implement error handling
5. Add loading states

Example API call:
```javascript
// In OwnerDashboard.jsx
const fetchDrivers = async () => {
  const response = await fetch('/api/drivers/nearby');
  const drivers = await response.json();
  setDrivers(drivers);
};
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deploy Options

- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect GitHub repo and auto-deploy
- **AWS S3**: Upload build folder to S3 bucket
- **GitHub Pages**: Use `gh-pages` package

## 📝 Next Steps

1. **Add Real Authentication**
   - Implement user registration and login
   - Add session management
   - Protect routes

2. **Connect to Backend**
   - Create REST API or GraphQL backend
   - Replace mock data with real API calls
   - Add database (MongoDB, PostgreSQL)

3. **Add Payment Integration**
   - Integrate Razorpay/Stripe
   - Implement booking payments
   - Add payment history

4. **Real-time Features**
   - WebSocket for live updates
   - Real GPS tracking
   - Push notifications

5. **Advanced Features**
   - Chat between owner and driver
   - Rating and review system
   - Trip analytics
   - Advanced search filters

## 🐛 Troubleshooting

### Map not showing?
- Check that Leaflet CSS is loaded in `public/index.html`
- Verify react-leaflet is installed

### Components not styling correctly?
- Ensure all CSS files are imported in respective components
- Check browser console for CSS errors

### Routing not working?
- Verify React Router DOM is installed
- Check that BrowserRouter wraps the app

## 📧 Support

For questions or issues:
1. Check the README.md
2. Review component documentation
3. Check browser console for errors
4. Verify all dependencies are installed

## 🎉 You're All Set!

Your DriveU frontend is ready for development. Start customizing, add your backend, and launch your driver booking platform!

---

**Built with React 18 + Modern Web Technologies**

