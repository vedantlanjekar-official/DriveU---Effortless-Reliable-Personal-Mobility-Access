import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import { Car, User, Briefcase, Upload, MapPin } from 'lucide-react';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('owner'); // 'owner' or 'driver'
  const [isSignup, setIsSignup] = useState(true);
  
  const [ownerForm, setOwnerForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    carModel: '',
    carNumber: '',
    carColor: '',
    carYear: ''
  });

  const [driverForm, setDriverForm] = useState({
    name: '',
    email: '',
    phone: '',
    licenseNumber: '',
    experience: '',
    skills: '',
    habits: '',
    licenseFile: null
  });

  const [locationPermission, setLocationPermission] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  // Request location permission on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationPermission('granted');
          console.log('Location permission granted:', position.coords);
          // Store location in localStorage for use in other components
          localStorage.setItem('userLocation', JSON.stringify({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }));
        },
        (error) => {
          setLocationPermission('denied');
          console.log('Location permission denied:', error);
        }
      );
    } else {
      setLocationPermission('not-supported');
      console.log('Geolocation not supported');
    }
  }, []);

  const handleOwnerChange = (e) => {
    setOwnerForm({
      ...ownerForm,
      [e.target.name]: e.target.value
    });
  };

  const handleDriverChange = (e) => {
    setDriverForm({
      ...driverForm,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {
    setDriverForm({
      ...driverForm,
      licenseFile: e.target.files[0]
    });
  };

  const handleOwnerSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would validate and send to backend
    console.log('Owner form submitted:', ownerForm);
    
    // Store user data if remember me is checked
    if (rememberMe) {
      localStorage.setItem('rememberedUser', JSON.stringify({
        type: 'owner',
        email: ownerForm.email,
        name: ownerForm.name,
        timestamp: new Date().getTime()
      }));
    } else {
      localStorage.removeItem('rememberedUser');
    }
    
    // Store current session
    sessionStorage.setItem('currentUser', JSON.stringify({
      type: 'owner',
      email: ownerForm.email,
      name: ownerForm.name
    }));
    
    navigate('/owner-dashboard');
  };

  const handleDriverSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would validate and send to backend
    console.log('Driver form submitted:', driverForm);
    
    // Store user data if remember me is checked
    if (rememberMe) {
      localStorage.setItem('rememberedUser', JSON.stringify({
        type: 'driver',
        email: driverForm.email,
        name: driverForm.name,
        timestamp: new Date().getTime()
      }));
    } else {
      localStorage.removeItem('rememberedUser');
    }
    
    // Store current session
    sessionStorage.setItem('currentUser', JSON.stringify({
      type: 'driver',
      email: driverForm.email,
      name: driverForm.name
    }));
    
    navigate('/driver-dashboard');
  };

  const handleGoogleSignIn = async () => {
    try {
      // Google Sign-in functionality for owners only
      console.log('Google Sign-in initiated for owner');
      
      // Store user data if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify({
          type: 'owner',
          email: 'google.user@gmail.com',
          name: 'Google User',
          timestamp: new Date().getTime()
        }));
      }
      
      // Store current session
      sessionStorage.setItem('currentUser', JSON.stringify({
        type: 'owner',
        email: 'google.user@gmail.com',
        name: 'Google User'
      }));
      
      // Simulate Google OAuth flow
      alert('Google Sign-in successful! Redirecting to Owner Dashboard...');
      navigate('/owner-dashboard');
    } catch (error) {
      console.error('Google Sign-in failed:', error);
      alert('Google Sign-in failed. Please try again.');
    }
  };

  // Removed has-navbar class management - using CSS padding instead

  // Check for remembered user on component mount
  useEffect(() => {
    const rememberedUser = localStorage.getItem('rememberedUser');
    const currentUser = sessionStorage.getItem('currentUser');
    
    // If already logged in this session, redirect
    if (currentUser) {
      const user = JSON.parse(currentUser);
      if (user.type === 'owner') {
        navigate('/owner-dashboard');
      } else if (user.type === 'driver') {
        navigate('/driver-dashboard');
      }
      return;
    }
    
    // If remembered user exists and is less than 30 days old, auto-login
    if (rememberedUser) {
      const user = JSON.parse(rememberedUser);
      const daysSinceLogin = (new Date().getTime() - user.timestamp) / (1000 * 60 * 60 * 24);
      
      if (daysSinceLogin < 30) {
        setRememberMe(true);
        // Auto-fill email if it's a returning user
        if (user.type === 'owner') {
          setOwnerForm(prev => ({ ...prev, email: user.email }));
        } else if (user.type === 'driver') {
          setDriverForm(prev => ({ ...prev, email: user.email }));
        }
      } else {
        // Remove expired remembered user
        localStorage.removeItem('rememberedUser');
      }
    }
  }, [navigate]);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo" onClick={() => navigate('/')}>
            <Car size={36} />
            <span>DriveU</span>
          </div>
          <h1>{isSignup ? 'Create Account' : 'Welcome Back'}</h1>
          <p>Connect with verified drivers or become one</p>
          
          {/* Location Permission Status */}
          <div className="location-status">
            <MapPin size={16} />
            <span>
              {locationPermission === 'granted' && 'Location access granted ✓'}
              {locationPermission === 'denied' && 'Location access denied - Some features may be limited'}
              {locationPermission === 'not-supported' && 'Location not supported on this device'}
              {locationPermission === null && 'Requesting location access...'}
            </span>
          </div>
        </div>

        {/* User Type Toggle */}
        <div className="user-type-toggle">
          <button
            className={`toggle-btn ${userType === 'owner' ? 'active' : ''}`}
            onClick={() => setUserType('owner')}
          >
            <User size={20} />
            Car Owner
          </button>
          <button
            className={`toggle-btn ${userType === 'driver' ? 'active' : ''}`}
            onClick={() => setUserType('driver')}
          >
            <Briefcase size={20} />
            Driver
          </button>
        </div>

        {/* Owner Form */}
        {userType === 'owner' && (
          <Card className="form-card animate-slideUp">
            <form onSubmit={handleOwnerSubmit}>
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={ownerForm.name}
                onChange={handleOwnerChange}
                placeholder="Enter your full name"
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={ownerForm.email}
                onChange={handleOwnerChange}
                placeholder="your.email@example.com"
                required
              />
              
              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={ownerForm.phone}
                onChange={handleOwnerChange}
                placeholder="+91 98765 43210"
                required
              />
              
              <Input
                label="City"
                type="text"
                name="city"
                value={ownerForm.city}
                onChange={handleOwnerChange}
                placeholder="Your city"
                required
              />

              {isSignup && (
                <>
                  <h4 style={{ marginTop: '1.5rem', marginBottom: '1rem', color: 'var(--black)' }}>Car Details</h4>
                  
                  <Input
                    label="Car Model"
                    type="text"
                    name="carModel"
                    value={ownerForm.carModel}
                    onChange={handleOwnerChange}
                    placeholder="e.g., Toyota Camry"
                    required
                  />
                  
                  <Input
                    label="Car Number"
                    type="text"
                    name="carNumber"
                    value={ownerForm.carNumber}
                    onChange={handleOwnerChange}
                    placeholder="e.g., DL-01-AB-1234"
                    required
                  />
                  
                  <Input
                    label="Car Color"
                    type="text"
                    name="carColor"
                    value={ownerForm.carColor}
                    onChange={handleOwnerChange}
                    placeholder="e.g., White, Black, Silver"
                    required
                  />
                  
                  <Input
                    label="Car Year"
                    type="number"
                    name="carYear"
                    value={ownerForm.carYear}
                    onChange={handleOwnerChange}
                    placeholder="e.g., 2020"
                    required
                  />
                </>
              )}

              {!isSignup && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                  <input
                    type="checkbox"
                    id="rememberMeOwner"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="rememberMeOwner" style={{ cursor: 'pointer', color: 'var(--grey)', fontSize: '0.9rem' }}>
                    Remember me for 30 days
                  </label>
                </div>
              )}

              <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1rem' }}>
                {isSignup ? 'Sign Up as Owner' : 'Login as Owner'}
              </Button>
            </form>

            <div className="form-divider">
              <span>or</span>
            </div>

            {!isSignup && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    id="rememberMeGoogle"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="rememberMeGoogle" style={{ cursor: 'pointer', color: 'var(--grey)', fontSize: '0.9rem' }}>
                    Remember me for 30 days
                  </label>
                </div>
              </div>
            )}

            <button className="google-btn" onClick={handleGoogleSignIn}>
              <img src="https://www.google.com/favicon.ico" alt="Google" width="20" />
              Continue with Google
            </button>
          </Card>
        )}

        {/* Driver Form */}
        {userType === 'driver' && (
          <Card className="form-card animate-slideUp">
            <form onSubmit={handleDriverSubmit}>
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={driverForm.name}
                onChange={handleDriverChange}
                placeholder="Enter your full name"
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={driverForm.email}
                onChange={handleDriverChange}
                placeholder="your.email@example.com"
                required
              />
              
              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={driverForm.phone}
                onChange={handleDriverChange}
                placeholder="+91 98765 43210"
                required
              />
              
              <Input
                label="License Number"
                type="text"
                name="licenseNumber"
                value={driverForm.licenseNumber}
                onChange={handleDriverChange}
                placeholder="DL-XX-YYYY-XXXXXXX"
                required
              />
              
              <Input
                label="Years of Experience"
                type="number"
                name="experience"
                value={driverForm.experience}
                onChange={handleDriverChange}
                placeholder="5"
                required
              />
              
              <Input
                label="Skills (comma separated)"
                type="text"
                name="skills"
                value={driverForm.skills}
                onChange={handleDriverChange}
                placeholder="Highway driving, City navigation, Night driving"
                required
              />
              
              <Input
                label="Driving Habits (comma separated)"
                type="text"
                name="habits"
                value={driverForm.habits}
                onChange={handleDriverChange}
                placeholder="Non-smoker, Professional, Punctual"
                required
              />

              <div className="form-group">
                <label className="form-label">
                  Upload License <span style={{ color: 'var(--red)' }}>*</span>
                </label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="license-upload"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    required
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="license-upload" className="file-upload-label">
                    <Upload size={20} />
                    {driverForm.licenseFile ? driverForm.licenseFile.name : 'Choose file'}
                  </label>
                </div>
              </div>

              {!isSignup && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                  <input
                    type="checkbox"
                    id="rememberMeDriver"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="rememberMeDriver" style={{ cursor: 'pointer', color: 'var(--grey)', fontSize: '0.9rem' }}>
                    Remember me for 30 days
                  </label>
                </div>
              )}

              <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1rem' }}>
                {isSignup ? 'Sign Up as Driver' : 'Login as Driver'}
              </Button>
            </form>
          </Card>
        )}

        {/* Toggle Sign In/Sign Up */}
        <div className="form-footer">
          <p>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              className="link-btn" 
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        <div className="back-to-home">
          <button onClick={() => navigate('/')}>← Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export default Login;

