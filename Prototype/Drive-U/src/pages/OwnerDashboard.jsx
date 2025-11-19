import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import MapComponent from '../components/common/MapComponent';
import SearchDestination from '../components/common/SearchDestination';
import DriverCard from '../components/owner/DriverCard';
import HourlyPlanSelector from '../components/owner/HourlyPlanSelector';
import BookingHistory from '../components/owner/BookingHistory';
import { Search, MapPin, Clock, Info, Navigation } from 'lucide-react';
import { mockDrivers, mockBookings } from '../utils/mockData';
import { formatCurrency, calculateDistance } from '../utils/helpers';
import '../styles/dashboard.css';
import '../styles/search.css';

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [bookingOTP, setBookingOTP] = useState('');
  const [activeTab, setActiveTab] = useState('book'); // 'book', 'history', 'settings'
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [showDriverSelection, setShowDriverSelection] = useState(false);

  const [userLocation, setUserLocation] = useState({ lat: 28.6139, lng: 77.2090 }); // Default to Delhi
  const availableDrivers = mockDrivers.filter(d => d.available);

  // Check authentication on component mount
  useEffect(() => {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
      // Not logged in, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  // Get user's current location on component mount
  useEffect(() => {
    // First check if location is stored
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      setUserLocation(JSON.parse(storedLocation));
    }

    // Then get fresh location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
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

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination);
    
    // Calculate estimated time (mock calculation)
    if (destination.coordinates) {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        destination.coordinates.lat,
        destination.coordinates.lng
      );
      const timeInMinutes = Math.round((distance / 30) * 60); // Assuming 30 km/h average
      setEstimatedTime({
        distance: `${distance.toFixed(1)} km`,
        time: `${timeInMinutes} minutes`
      });
    }
  };

  const handleProceedToBooking = () => {
    if (selectedDestination && selectedPlan) {
      setShowDriverSelection(true);
    } else {
      alert('Please select destination and duration first');
    }
  };

  const handleLogout = () => {
    // Clear session storage (but keep localStorage if they checked "Remember me")
    sessionStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleBookDriver = (driver) => {
    setSelectedDriver(driver);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedPlan) {
      alert('Please select a duration plan');
      return;
    }
    
    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setBookingOTP(otp);
    setShowBookingModal(false);
    setShowOTPModal(true);
  };

  const handleCloseOTP = () => {
    setShowOTPModal(false);
    setSelectedDriver(null);
    setSelectedPlan(null);
    setBookingOTP('');
  };

  return (
    <div className="dashboard">
      <Navbar userType="owner" onLogout={handleLogout} />
      
      <div className="dashboard-container">
        {/* Sidebar / Tabs */}
        <div className="dashboard-sidebar">
          <button 
            className={`sidebar-tab ${activeTab === 'book' ? 'active' : ''}`}
            onClick={() => setActiveTab('book')}
          >
            <Search size={20} />
            Book a Driver
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <Clock size={20} />
            Booking History
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Info size={20} />
            About
          </button>
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
          {/* Book Tab */}
          {activeTab === 'book' && (
            <div className="animate-fadeIn">
              <h2 className="dashboard-title">Book a Verified Driver</h2>
              
              {/* Active Trip OTP - Always Visible When Trip is Booked */}
              {bookingOTP && (
                <Card style={{ 
                  marginBottom: '1.5rem', 
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  border: '2px solid var(--green)'
                }}>
                  <h3 style={{ 
                    color: 'var(--green)', 
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    🎉 Active Trip - Share OTP with Driver
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--grey)', marginBottom: '0.5rem' }}>
                        Your Trip OTP:
                      </div>
                      <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        color: 'var(--green)',
                        letterSpacing: '0.5rem'
                      }}>
                        {bookingOTP}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--grey)', marginTop: '0.5rem' }}>
                        Driver: <strong>{selectedDriver?.name}</strong>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          navigator.clipboard.writeText(bookingOTP);
                          alert('OTP copied to clipboard!');
                        }}
                      >
                        📋 Copy OTP
                      </Button>
                      <Button 
                        variant="success" 
                        onClick={() => {
                          const message = `Your DriveU booking OTP is: ${bookingOTP}. Driver: ${selectedDriver?.name}. Please share this with your driver to start the trip.`;
                          if (navigator.share) {
                            navigator.share({ text: message });
                          } else {
                            navigator.clipboard.writeText(message);
                            alert('Booking details copied to clipboard!');
                          }
                        }}
                      >
                        📤 Share OTP
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
              
              {/* Destination Search */}
              <Card className="search-card">
                <SearchDestination 
                  onDestinationSelect={handleDestinationSelect}
                  placeholder="Where do you want to go?"
                />
                
                {/* Estimated Time and Distance */}
                {estimatedTime && (
                  <div className="estimated-info">
                    <div className="info-item">
                      <Navigation size={16} color="#1E3A8A" />
                      <span>Distance: {estimatedTime.distance}</span>
                    </div>
                    <div className="info-item">
                      <Clock size={16} color="#1E3A8A" />
                      <span>Estimated Time: {estimatedTime.time}</span>
                    </div>
                  </div>
                )}
              </Card>

              {/* Hourly Plan Selector */}
              <HourlyPlanSelector 
                onSelectPlan={setSelectedPlan}
                selectedPlan={selectedPlan}
                selectedDriver={selectedDriver}
              />

              {/* Proceed to Booking Button - Moved here below duration */}
              <div style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '2rem' }}>
                <Button 
                  variant="primary" 
                  onClick={handleProceedToBooking}
                  disabled={!selectedDestination || !selectedPlan}
                  style={{ 
                    fontSize: '1.1rem', 
                    padding: '1rem 2rem',
                    opacity: (!selectedDestination || !selectedPlan) ? 0.5 : 1,
                    cursor: (!selectedDestination || !selectedPlan) ? 'not-allowed' : 'pointer'
                  }}
                >
                  Proceed to Driver Selection
                </Button>
                {(!selectedDestination || !selectedPlan) && (
                  <p style={{ color: 'var(--red)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Please select destination and duration first
                  </p>
                )}
              </div>

              {/* Map */}
              <Card>
                <h3 style={{ marginBottom: '1rem' }}>
                  <MapPin size={24} style={{ verticalAlign: 'middle' }} /> 
                  {' '}Nearby Verified Drivers
                </h3>
                <MapComponent 
                  center={[userLocation.lat, userLocation.lng]}
                  drivers={availableDrivers}
                  showRadius={true}
                  radius={5000}
                />
                <p style={{ marginTop: '1rem', color: 'var(--grey)', fontSize: '0.9rem' }}>
                  Showing {availableDrivers.length} available drivers within 5km radius
                </p>
              </Card>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="animate-fadeIn">
              <h2 className="dashboard-title">Your Booking History</h2>
              <BookingHistory bookings={mockBookings} />
            </div>
          )}

          {/* Settings/About Tab */}
          {activeTab === 'settings' && (
            <div className="animate-fadeIn">
              <h2 className="dashboard-title">About DriveU</h2>
              <Card>
                <h3>How DriveU Works</h3>
                <p>
                  DriveU connects car owners with professional, RTO-verified drivers for safe 
                  and reliable driving services. Here's how it works:
                </p>
                <ol className="about-list">
                  <li>Search for your destination or select from nearby places</li>
                  <li>Choose your preferred duration (hourly plans available)</li>
                  <li>View nearby verified drivers on the map</li>
                  <li>Select a driver based on ratings, experience, and skills</li>
                  <li>Confirm your booking and receive an OTP</li>
                  <li>Share the OTP with your driver to start the trip</li>
                  <li>Track your trip in real-time</li>
                  <li>Rate and review your experience after completion</li>
                </ol>
              </Card>

              <Card style={{ marginTop: '1.5rem' }}>
                <h3>Safety Features</h3>
                <ul className="about-list">
                  <li>All drivers are RTO-verified with valid licenses</li>
                  <li>Background checks conducted for every driver</li>
                  <li>Real-time GPS tracking during trips</li>
                  <li>OTP-based trip verification</li>
                  <li>24/7 customer support</li>
                  <li>Driver ratings and review system</li>
                </ul>
              </Card>

              <Card style={{ marginTop: '1.5rem' }}>
                <h3>Pricing Information</h3>
                <p>
                  Our pricing is transparent and based on hourly rates. Each driver sets 
                  their hourly rate based on experience and skills. There are no hidden fees.
                </p>
                <ul className="about-list">
                  <li>Hourly rates range from ₹130 to ₹180 per hour</li>
                  <li>No booking fees</li>
                  <li>No cancellation charges (if cancelled 30 mins before trip)</li>
                  <li>Payment can be made online or in cash</li>
                </ul>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title="Confirm Booking"
        footer={
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setShowBookingModal(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleConfirmBooking}>
              Confirm Booking
            </Button>
          </div>
        }
      >
        {selectedDriver && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <img 
                src={selectedDriver.photo} 
                alt={selectedDriver.name}
                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h3 style={{ margin: 0 }}>{selectedDriver.name}</h3>
                <p style={{ margin: '0.25rem 0', color: 'var(--grey)' }}>
                  {selectedDriver.experience} years experience • {selectedDriver.rating}★
                </p>
              </div>
            </div>

            {selectedPlan ? (
              <div style={{ backgroundColor: 'rgba(37, 99, 235, 0.05)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Duration:</span>
                  <strong>{selectedPlan.hours} hours</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Hourly Rate:</span>
                  <strong>{formatCurrency(selectedDriver.hourlyRate)}/hr</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--grey-light)' }}>
                  <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>Total Fare:</span>
                  <strong style={{ fontSize: '1.5rem', color: 'var(--green)' }}>
                    {formatCurrency(selectedPlan.fare)}
                  </strong>
                </div>
              </div>
            ) : (
              <p style={{ color: 'var(--red)' }}>Please select a duration plan before confirming</p>
            )}

            {selectedDestination && (
              <div style={{ marginTop: '1rem' }}>
                <strong>Destination:</strong> {selectedDestination.name}
                {estimatedTime && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--grey)' }}>
                    Distance: {estimatedTime.distance} • Time: {estimatedTime.time}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Driver Selection Modal */}
      <Modal
        isOpen={showDriverSelection}
        onClose={() => setShowDriverSelection(false)}
        title="Select Your Driver"
      >
        <div>
          <h3>Available Drivers Near You</h3>
          <div className="drivers-list-modal">
            {availableDrivers.map((driver) => (
              <DriverCard
                key={driver.id}
                driver={driver}
                onBook={(driver) => {
                  setSelectedDriver(driver);
                  setShowDriverSelection(false);
                  setShowBookingModal(true);
                }}
              />
            ))}
          </div>
        </div>
      </Modal>

      {/* OTP Modal */}
      <Modal
        isOpen={showOTPModal}
        onClose={handleCloseOTP}
        title="Booking Confirmed! 🎉"
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{
            backgroundColor: 'var(--green)',
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: 700,
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1.5rem',
            letterSpacing: '0.5rem'
          }}>
            {bookingOTP}
          </div>
          <p style={{ marginBottom: '1rem' }}>
            Your booking with <strong>{selectedDriver?.name}</strong> is confirmed!
          </p>
          <p style={{ color: 'var(--grey)', fontSize: '0.9rem' }}>
            Share this OTP with your driver to start the trip. Expected arrival time: 10-15 minutes.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <Button 
              variant="outline" 
              onClick={() => {
                // Copy OTP to clipboard
                navigator.clipboard.writeText(bookingOTP);
                alert('OTP copied to clipboard!');
              }}
              style={{ flex: 1 }}
            >
              Copy OTP
            </Button>
            <Button 
              variant="primary" 
              onClick={() => {
                // Share OTP functionality
                const message = `Your DriveU booking OTP is: ${bookingOTP}. Driver: ${selectedDriver?.name}. Please share this with your driver to start the trip.`;
                if (navigator.share) {
                  navigator.share({ text: message });
                } else {
                  navigator.clipboard.writeText(message);
                  alert('Booking details copied to clipboard!');
                }
              }}
              style={{ flex: 1 }}
            >
              Share OTP
            </Button>
          </div>
          <Button variant="secondary" onClick={handleCloseOTP} style={{ marginTop: '1rem', width: '100%' }}>
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default OwnerDashboard;

