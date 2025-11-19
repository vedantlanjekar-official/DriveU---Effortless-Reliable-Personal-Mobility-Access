import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Rating from '../components/common/Rating';
import Input from '../components/common/Input';
import MapComponent from '../components/common/MapComponent';
import BookingRequest from '../components/driver/BookingRequest';
import EarningsSummary from '../components/driver/EarningsSummary';
import { Calendar, Star, TrendingUp, MapPin } from 'lucide-react';
import { mockTrips, driverEarnings, mockRequest } from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils/helpers';
import '../styles/dashboard.css';

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requests'); // 'requests', 'trips', 'earnings', 'ratings'
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [driverLocation, setDriverLocation] = useState({ lat: 28.6139, lng: 77.2090 }); // Default to Delhi

  // Check authentication on component mount
  useEffect(() => {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
      // Not logged in, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  // Get driver's current location on component mount
  useEffect(() => {
    // First check if location is stored
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      setDriverLocation(JSON.parse(storedLocation));
    }

    // Then get fresh location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setDriverLocation(location);
          localStorage.setItem('userLocation', JSON.stringify(location));
        },
        (error) => {
          console.error('Error getting location:', error);
          // Keep using stored or default location
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    }
  }, []);

  // Use imported mock request data

  const handleLogout = () => {
    // Clear session storage (but keep localStorage if they checked "Remember me")
    sessionStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleAcceptRequest = (requestId) => {
    console.log('Accepted request:', requestId);
    setShowRequestModal(false);
    setShowSuccessModal(true);
  };

  const handleDenyRequest = (requestId) => {
    console.log('Denied request:', requestId);
    setShowRequestModal(false);
    // In real app, this would notify owner and suggest alternate drivers
    alert('Request denied. Owner will be notified with alternate driver suggestions.');
  };

  const simulateNewRequest = () => {
    setCurrentRequest(mockRequest);
    setShowRequestModal(true);
  };

  const handleOTPVerify = () => {
    console.log('OTP verified, starting navigation to drop location');
    // In real app, this would start navigation
    alert('Starting navigation to drop location!');
  };

  return (
    <div className="dashboard">
      <Navbar userType="driver" onLogout={handleLogout} />
      
      <div className="dashboard-container">
        {/* Sidebar / Tabs */}
        <div className="dashboard-sidebar">
          <button 
            className={`sidebar-tab ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            <MapPin size={20} />
            Booking Requests
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'earnings' ? 'active' : ''}`}
            onClick={() => setActiveTab('earnings')}
          >
            <TrendingUp size={20} />
            Earnings
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'trips' ? 'active' : ''}`}
            onClick={() => setActiveTab('trips')}
          >
            <Calendar size={20} />
            Trip History
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'ratings' ? 'active' : ''}`}
            onClick={() => setActiveTab('ratings')}
          >
            <Star size={20} />
            Ratings & Reviews
          </button>
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <div className="animate-fadeIn">
              <h2 className="dashboard-title">Active Booking Requests</h2>
              
              <EarningsSummary earnings={driverEarnings} />

              {/* OTP Entry Section - Always Visible */}
              <Card style={{ marginBottom: '1.5rem', backgroundColor: 'rgba(30, 58, 138, 0.05)' }}>
                <h3 style={{ marginBottom: '1rem', color: 'var(--primary-blue)' }}>
                  Start Trip with OTP
                </h3>
                <p style={{ color: 'var(--grey)', marginBottom: '1rem', fontSize: '0.95rem' }}>
                  Once you reach the pickup location, enter the owner's OTP to start the trip
                </p>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'end' }}>
                  <div style={{ flex: 1 }}>
                    <Input 
                      label="Enter OTP from Owner"
                      type="text"
                      placeholder="Enter 4-digit OTP"
                      maxLength="4"
                      style={{
                        fontSize: '1.5rem',
                        letterSpacing: '0.5rem',
                        textAlign: 'center',
                        fontWeight: 600
                      }}
                    />
                  </div>
                  <Button variant="success" style={{ padding: '1rem 2rem' }}>
                    Verify & Start Trip
                  </Button>
                </div>
              </Card>

              {/* Demo Button */}
              <Card style={{ textAlign: 'center', padding: '2rem' }}>
                <h3>Waiting for Booking Requests...</h3>
                <p style={{ color: 'var(--grey)', marginBottom: '1.5rem' }}>
                  You'll receive notifications when owners within 5km request a driver
                </p>
                <Button variant="primary" onClick={simulateNewRequest}>
                  Simulate New Request (Demo)
                </Button>
              </Card>

              {/* Map showing driver location */}
              <Card style={{ marginTop: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>
                  <MapPin size={24} style={{ verticalAlign: 'middle' }} /> 
                  {' '}Your Current Location
                </h3>
                <MapComponent 
                  center={[driverLocation.lat, driverLocation.lng]}
                  drivers={[]}
                  showRadius={true}
                  radius={5000}
                />
                <p style={{ marginTop: '1rem', color: 'var(--grey)', fontSize: '0.9rem' }}>
                  You'll receive requests from owners within 5km radius
                </p>
              </Card>
            </div>
          )}

          {/* Earnings Tab */}
          {activeTab === 'earnings' && (
            <div className="animate-fadeIn">
              <h2 className="dashboard-title">Your Earnings</h2>
              
              <EarningsSummary earnings={driverEarnings} />

              <Card>
                <h3>Earnings Breakdown</h3>
                <div style={{ marginTop: '1rem' }}>
                  <div className="earnings-row">
                    <span>Today's Earnings</span>
                    <strong style={{ color: 'var(--green)', fontSize: '1.25rem' }}>
                      {formatCurrency(driverEarnings.today)}
                    </strong>
                  </div>
                  <div className="earnings-row">
                    <span>This Week</span>
                    <strong style={{ color: 'var(--primary-blue)', fontSize: '1.25rem' }}>
                      {formatCurrency(driverEarnings.week)}
                    </strong>
                  </div>
                  <div className="earnings-row">
                    <span>This Month</span>
                    <strong style={{ color: 'var(--primary-blue)', fontSize: '1.25rem' }}>
                      {formatCurrency(driverEarnings.month)}
                    </strong>
                  </div>
                </div>
              </Card>

              <Card style={{ marginTop: '1.5rem' }}>
                <h3>Performance Metrics</h3>
                <div className="metrics-grid">
                  <div className="metric-item">
                    <div className="metric-label">Trips Completed</div>
                    <div className="metric-value">1,250</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-label">Average Rating</div>
                    <div className="metric-value">4.8 ⭐</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-label">Total Distance</div>
                    <div className="metric-value">15,420 km</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-label">Total Hours</div>
                    <div className="metric-value">892 hrs</div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Trips Tab */}
          {activeTab === 'trips' && (
            <div className="animate-fadeIn">
              <h2 className="dashboard-title">Trip History</h2>
              
              <div className="trips-list">
                {mockTrips.map((trip) => (
                  <Card key={trip.id} className="trip-card">
                    <div className="trip-header">
                      <div>
                        <h4>{trip.ownerName}</h4>
                        <p className="trip-date">
                          <Calendar size={14} />
                          {formatDate(trip.date)} • {trip.startTime}
                        </p>
                      </div>
                      <div className="trip-earnings">
                        {formatCurrency(trip.earnings)}
                      </div>
                    </div>
                    
                    <div className="trip-details">
                      <div className="trip-detail-item">
                        <span className="label">Duration</span>
                        <span className="value">{trip.duration} hours</span>
                      </div>
                      <div className="trip-detail-item">
                        <span className="label">Distance</span>
                        <span className="value">{trip.distance} km</span>
                      </div>
                      <div className="trip-detail-item">
                        <span className="label">Rating</span>
                        <span className="value">
                          <Rating rating={trip.rating} size={14} showNumber={false} />
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Ratings Tab */}
          {activeTab === 'ratings' && (
            <div className="animate-fadeIn">
              <h2 className="dashboard-title">Ratings & Reviews</h2>
              
              <Card className="ratings-summary">
                <div className="rating-overview">
                  <div className="rating-score">
                    <div className="score">4.8</div>
                    <Rating rating={4.8} size={20} showNumber={false} />
                    <p className="rating-count">Based on 1,250 trips</p>
                  </div>
                  
                  <div className="rating-breakdown">
                    <div className="rating-bar-item">
                      <span>5 ⭐</span>
                      <div className="rating-bar">
                        <div className="rating-bar-fill" style={{ width: '85%' }}></div>
                      </div>
                      <span>85%</span>
                    </div>
                    <div className="rating-bar-item">
                      <span>4 ⭐</span>
                      <div className="rating-bar">
                        <div className="rating-bar-fill" style={{ width: '10%' }}></div>
                      </div>
                      <span>10%</span>
                    </div>
                    <div className="rating-bar-item">
                      <span>3 ⭐</span>
                      <div className="rating-bar">
                        <div className="rating-bar-fill" style={{ width: '3%' }}></div>
                      </div>
                      <span>3%</span>
                    </div>
                    <div className="rating-bar-item">
                      <span>2 ⭐</span>
                      <div className="rating-bar">
                        <div className="rating-bar-fill" style={{ width: '1%' }}></div>
                      </div>
                      <span>1%</span>
                    </div>
                    <div className="rating-bar-item">
                      <span>1 ⭐</span>
                      <div className="rating-bar">
                        <div className="rating-bar-fill" style={{ width: '1%' }}></div>
                      </div>
                      <span>1%</span>
                    </div>
                  </div>
                </div>
              </Card>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Recent Reviews</h3>
              
              <div className="reviews-list">
                <Card className="review-card">
                  <div className="review-header">
                    <div>
                      <strong>Priya Mehta</strong>
                      <Rating rating={5} size={14} showNumber={false} />
                    </div>
                    <span className="review-date">2 days ago</span>
                  </div>
                  <p className="review-text">
                    Excellent driver! Very professional and knows the city routes well. 
                    Highly recommended for anyone looking for a safe and comfortable ride.
                  </p>
                </Card>

                <Card className="review-card">
                  <div className="review-header">
                    <div>
                      <strong>Rahul Verma</strong>
                      <Rating rating={4} size={14} showNumber={false} />
                    </div>
                    <span className="review-date">5 days ago</span>
                  </div>
                  <p className="review-text">
                    Good experience overall. Driver was punctual and drove carefully. 
                    Would book again.
                  </p>
                </Card>

                <Card className="review-card">
                  <div className="review-header">
                    <div>
                      <strong>Sneha Gupta</strong>
                      <Rating rating={5} size={14} showNumber={false} />
                    </div>
                    <span className="review-date">1 week ago</span>
                  </div>
                  <p className="review-text">
                    Amazing service! The driver was courteous, professional, and maintained 
                    the car well. 5 stars!
                  </p>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Request Modal */}
      {currentRequest && (
        <Modal
          isOpen={showRequestModal}
          onClose={() => setShowRequestModal(false)}
          title=""
        >
          <BookingRequest
            request={currentRequest}
            onAccept={handleAcceptRequest}
            onDeny={handleDenyRequest}
            onOTPVerify={handleOTPVerify}
          />
        </Modal>
      )}

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Booking Accepted! 🎉"
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
            You've successfully accepted the booking request!
          </p>
          <div style={{
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1rem'
          }}>
            <p style={{ margin: 0, color: 'var(--grey-dark)' }}>
              <strong>Owner:</strong> {currentRequest?.ownerName}<br />
              <strong>Pickup:</strong> {currentRequest?.pickup}<br />
              <strong>Duration:</strong> {currentRequest?.duration} hours<br />
              <strong>Earnings:</strong> {formatCurrency(currentRequest?.fare || 0)}
            </p>
          </div>
          <p style={{ color: 'var(--grey)', fontSize: '0.9rem' }}>
            Navigate to pickup location and collect the OTP from the owner to start the trip.
          </p>
          <Button 
            variant="success" 
            onClick={() => setShowSuccessModal(false)}
            style={{ marginTop: '1rem', width: '100%' }}
          >
            Start Navigation
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DriverDashboard;

