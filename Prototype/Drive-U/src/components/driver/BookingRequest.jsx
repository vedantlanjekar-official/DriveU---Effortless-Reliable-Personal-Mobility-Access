import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { MapPin, Clock, DollarSign, User, Navigation } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const BookingRequest = ({ request, onAccept, onDeny, onOTPVerify }) => {
  const [otp, setOtp] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);

  const handleAccept = () => {
    onAccept(request.id);
    setShowOTPInput(true);
  };

  const handleOTPVerify = () => {
    if (otp === request.otp) {
      onOTPVerify && onOTPVerify();
      alert('OTP verified! Trip started.');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <Card style={requestCardStyle}>
      <div style={headerStyle}>
        <h3 style={{ margin: 0, color: 'var(--primary-blue)' }}>New Booking Request</h3>
        <span style={timeStyle}>Just now</span>
      </div>

      <div style={bookingIdStyle}>
        <strong>Booking ID:</strong> {request.id}
      </div>

      <div style={ownerInfoStyle}>
        <User size={20} color="#6B7280" />
        <div>
          <div style={ownerNameStyle}>{request.ownerName}</div>
          <div style={phoneStyle}>{request.ownerPhone}</div>
        </div>
      </div>

      <div style={detailsStyle}>
        <div style={detailItemStyle}>
          <MapPin size={18} color="#EF4444" />
          <div>
            <div style={labelStyle}>Pickup Location</div>
            <div style={valueStyle}>{request.pickup}</div>
          </div>
        </div>

        <div style={detailItemStyle}>
          <Navigation size={18} color="#10B981" />
          <div>
            <div style={labelStyle}>Destination</div>
            <div style={valueStyle}>{request.destination}</div>
          </div>
        </div>

        <div style={detailItemStyle}>
          <Clock size={18} color="#F59E0B" />
          <div>
            <div style={labelStyle}>Duration</div>
            <div style={valueStyle}>{request.duration} hours</div>
          </div>
        </div>

        <div style={detailItemStyle}>
          <DollarSign size={18} color="#10B981" />
          <div>
            <div style={labelStyle}>Fare</div>
            <div style={fareValueStyle}>{formatCurrency(request.fare)}</div>
          </div>
        </div>
      </div>

      {showOTPInput && (
        <div style={otpInputStyle}>
          <h4>Enter OTP from Owner</h4>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 4-digit OTP"
            maxLength="4"
            style={otpInputFieldStyle}
          />
          <Button variant="success" onClick={handleOTPVerify} style={{ marginTop: '1rem' }}>
            Verify OTP & Start Trip
          </Button>
        </div>
      )}

      {!showOTPInput && (
        <div style={actionsStyle}>
          <Button variant="danger" onClick={() => onDeny(request.id)}>
            Deny
          </Button>
          <Button variant="success" onClick={handleAccept}>
            Accept Request
          </Button>
        </div>
      )}
    </Card>
  );
};

const requestCardStyle = {
  border: '2px solid var(--primary-blue)',
  animation: 'pulse 2s ease-in-out infinite'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
  paddingBottom: '0.75rem',
  borderBottom: '1px solid var(--grey-light)'
};

const timeStyle = {
  fontSize: '0.875rem',
  color: 'var(--grey)',
  fontWeight: 500
};

const ownerInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '1rem',
  backgroundColor: 'rgba(37, 99, 235, 0.05)',
  borderRadius: 'var(--radius-md)',
  marginBottom: '1rem'
};

const ownerNameStyle = {
  fontWeight: 600,
  color: 'var(--black)',
  fontSize: '1.1rem'
};

const phoneStyle = {
  fontSize: '0.9rem',
  color: 'var(--grey)'
};

const detailsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',
  marginBottom: '1.5rem'
};

const detailItemStyle = {
  display: 'flex',
  gap: '0.75rem',
  alignItems: 'flex-start'
};

const labelStyle = {
  fontSize: '0.75rem',
  color: 'var(--grey)',
  textTransform: 'uppercase',
  fontWeight: 600,
  letterSpacing: '0.5px'
};

const valueStyle = {
  fontSize: '0.95rem',
  color: 'var(--black)',
  fontWeight: 500,
  marginTop: '0.25rem'
};

const fareValueStyle = {
  ...valueStyle,
  color: 'var(--green)',
  fontSize: '1.25rem',
  fontWeight: 700
};

const actionsStyle = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'flex-end'
};

const bookingIdStyle = {
  backgroundColor: 'rgba(30, 58, 138, 0.1)',
  padding: '0.75rem',
  borderRadius: 'var(--radius-md)',
  marginBottom: '1rem',
  textAlign: 'center',
  fontSize: '0.9rem',
  color: 'var(--primary-blue)',
  fontWeight: 600
};

const otpInputStyle = {
  marginTop: '1.5rem',
  padding: '1.5rem',
  backgroundColor: 'rgba(16, 185, 129, 0.05)',
  borderRadius: 'var(--radius-lg)',
  border: '2px solid var(--green)',
  textAlign: 'center'
};

const otpInputFieldStyle = {
  width: '100%',
  padding: '1rem',
  fontSize: '1.5rem',
  textAlign: 'center',
  border: '2px solid var(--green)',
  borderRadius: 'var(--radius-md)',
  letterSpacing: '0.5rem',
  fontWeight: 600,
  marginTop: '0.5rem'
};

export default BookingRequest;

