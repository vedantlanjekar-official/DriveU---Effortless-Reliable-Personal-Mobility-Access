import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Rating from '../components/common/Rating';
import { Car, Shield, Clock, MapPin, CheckCircle, Star, Users, LogIn } from 'lucide-react';
import { testimonials } from '../utils/mockData';
import logo from '../assets/Drive_u_Logo.png';
import '../styles/landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className={`landing-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-content">
          <div className="navbar-logo" onClick={() => navigate('/')}>
            <img src={logo} alt="DriveU Logo" className="logo-img" />
            <span className="logo-text">Drive-U</span>
          </div>
          
          <button className="login-btn" onClick={() => navigate('/login')}>
            <LogIn size={20} />
            <span>Login</span>
          </button>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content animate-fadeIn">
            <h1 className="hero-title">
              Your Car. <span className="text-primary">Our Verified Drivers</span>
            </h1>
            <p className="hero-subtitle">
              Connect with RTO-verified professional drivers for safe, reliable, and convenient driving services. 
              Book by the hour, track in real-time, and travel stress-free.
            </p>
            <div className="hero-buttons">
              <Button 
                variant="primary" 
                onClick={() => navigate('/login')}
                icon={<Car size={20} />}
              >
                Hire a Driver
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                icon={<Users size={20} />}
              >
                Become a Driver
              </Button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value">10,000+</div>
                <div className="stat-label">Verified Drivers</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">50,000+</div>
                <div className="stat-label">Trips Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">4.8★</div>
                <div className="stat-label">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title text-center">Why Choose DriveU?</h2>
          <p className="section-subtitle text-center">
            Safe, verified, and professional drivers at your service
          </p>
          <div className="features-grid">
            <Card className="feature-card">
              <div className="feature-icon" style={{ backgroundColor: '#2563EB' }}>
                <Shield size={32} color="white" />
              </div>
              <h3>RTO Verified</h3>
              <p>All drivers are thoroughly verified with valid RTO licenses and background checks</p>
            </Card>
            <Card className="feature-card">
              <div className="feature-icon" style={{ backgroundColor: '#10B981' }}>
                <Clock size={32} color="white" />
              </div>
              <h3>Flexible Booking</h3>
              <p>Book drivers by the hour - from 1 hour to full day service based on your needs</p>
            </Card>
            <Card className="feature-card">
              <div className="feature-icon" style={{ backgroundColor: '#F59E0B' }}>
                <MapPin size={32} color="white" />
              </div>
              <h3>Real-time Tracking</h3>
              <p>Track your driver's location in real-time with GPS-enabled monitoring</p>
            </Card>
            <Card className="feature-card">
              <div className="feature-icon" style={{ backgroundColor: '#8B5CF6' }}>
                <Star size={32} color="white" />
              </div>
              <h3>Rated Professionals</h3>
              <p>Choose from highly-rated drivers with verified reviews from real customers</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title text-center">How It Works</h2>
          <p className="section-subtitle text-center">
            Get started in 4 simple steps
          </p>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Sign Up</h3>
                <p>Create your account as a car owner or driver in minutes</p>
              </div>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Select Duration</h3>
                <p>Choose your preferred hours and view nearby verified drivers</p>
              </div>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Confirm Driver</h3>
                <p>Select your driver and confirm booking with transparent pricing</p>
              </div>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Track Trip</h3>
                <p>Start your trip with OTP and track in real-time throughout</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title text-center">What Our Users Say</h2>
          <p className="section-subtitle text-center">
            Trusted by thousands of happy customers
          </p>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role}</p>
                  </div>
                </div>
                <Rating rating={testimonial.rating} size={16} />
                <p className="testimonial-comment">{testimonial.comment}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About DriveU</h2>
              <p>
                DriveU is India's leading on-demand driver platform, connecting car owners 
                with professional, RTO-verified drivers. Founded with the mission to make 
                driving services accessible, safe, and convenient for everyone.
              </p>
              <p>
                Our rigorous verification process ensures that every driver on our platform 
                is licensed, experienced, and trustworthy. With flexible hourly bookings, 
                transparent pricing, and real-time tracking, we're revolutionizing how 
                people hire drivers.
              </p>
              <div className="about-features">
                <div className="about-feature-item">
                  <CheckCircle size={24} color="#10B981" />
                  <span>100% Verified Drivers</span>
                </div>
                <div className="about-feature-item">
                  <CheckCircle size={24} color="#10B981" />
                  <span>24/7 Customer Support</span>
                </div>
                <div className="about-feature-item">
                  <CheckCircle size={24} color="#10B981" />
                  <span>Transparent Pricing</span>
                </div>
                <div className="about-feature-item">
                  <CheckCircle size={24} color="#10B981" />
                  <span>Instant Booking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of satisfied users and experience stress-free driving today</p>
            <div className="cta-buttons">
              <Button 
                variant="primary" 
                onClick={() => navigate('/login')}
                icon={<Car size={20} />}
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <Car size={32} />
                <span>DriveU</span>
              </div>
              <p>Your trusted partner for on-demand driving services</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#about">About Us</a>
                <a href="#contact">Contact</a>
                <a href="#careers">Careers</a>
              </div>
              <div className="footer-column">
                <h4>Services</h4>
                <a href="#hire">Hire a Driver</a>
                <a href="#become">Become a Driver</a>
                <a href="#pricing">Pricing</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#safety">Safety</a>
                <a href="#terms">Terms & Conditions</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 DriveU. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

