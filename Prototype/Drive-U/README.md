# DriveU Frontend

**Your Car. Our Verified Drivers.**

DriveU is a responsive web application that connects car owners with RTO-verified drivers for on-demand driving services.

## 🚀 Features

- **Landing Page**: Hero section, features showcase, how it works, testimonials
- **Dual Login System**: Separate interfaces for car owners and drivers
- **Owner Dashboard**: Book drivers, track trips, view history, manage settings
- **Driver Dashboard**: Accept/deny requests, track earnings, view ratings
- **Interactive Maps**: Real-time driver locations and trip tracking
- **Booking System**: Hourly plans, fare calculation, OTP verification
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🎨 Design System

- **Background**: White with 50% opacity car interior/road overlay
- **Accent Colors**: Blue (#2563EB) and Grey (#6B7280)
- **UI Elements**: Rounded cards, shadows, smooth animations
- **Typography**: Modern, clean, accessible

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```

3. **Open browser**:
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
driveu-frontend/
├── public/
│   ├── index.html
│   └── assets/
│       └── images/
├── src/
│   ├── components/
│   │   ├── common/         # Reusable components
│   │   ├── owner/          # Owner-specific components
│   │   └── driver/         # Driver-specific components
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── OwnerDashboard.jsx
│   │   └── DriverDashboard.jsx
│   ├── styles/
│   │   ├── global.css
│   │   └── components.css
│   ├── utils/
│   │   ├── mockData.js
│   │   └── helpers.js
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **React 18**: Modern UI library
- **React Router**: Client-side routing
- **Leaflet**: Interactive maps
- **Lucide React**: Beautiful icons
- **CSS3**: Custom styling with animations

## 🎯 Pages

### Landing Page
- Hero section with CTAs
- Features overview
- How it works guide
- Testimonials

### Login/Signup
- Toggle between Owner and Driver
- Form validation
- Responsive design

### Owner Dashboard
- Search destinations
- Select hourly plans
- View nearby drivers on map
- Booking history
- Settings panel

### Driver Dashboard
- Receive booking requests
- Track daily earnings
- View active trips
- Ratings and reviews

## 🚦 Getting Started

1. Start on the landing page
2. Sign up as Owner or Driver
3. Explore the respective dashboards
4. Test the booking flow
5. View interactive maps and popups

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔜 Future Enhancements

- Real-time notifications
- Payment gateway integration
- GPS tracking
- Chat system between owners and drivers
- Advanced analytics dashboard

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👥 Contact

For questions or feedback, reach out through the app's contact section.

---

**Built with ❤️ for seamless driver-owner connections**

