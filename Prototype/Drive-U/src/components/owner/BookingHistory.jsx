import React from 'react';
import Card from '../common/Card';
import Rating from '../common/Rating';
import Badge from '../common/Badge';
import { Calendar, Clock, MapPin, DollarSign } from 'lucide-react';
import { formatDate, formatCurrency } from '../../utils/helpers';

const BookingHistory = ({ bookings }) => {
  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Booking History</h3>
      <div style={listStyle}>
        {bookings.map((booking) => (
          <Card key={booking.id} style={bookingCardStyle}>
            <div style={headerStyle}>
              <div>
                <h4 style={{ margin: 0 }}>{booking.destination}</h4>
                <div style={dateStyle}>
                  <Calendar size={14} />
                  {formatDate(booking.date)}
                </div>
              </div>
              <Badge variant={
                booking.status === 'completed' ? 'success' :
                booking.status === 'active' ? 'primary' : 'warning'
              }>
                {booking.status}
              </Badge>
            </div>
            
            <div style={detailsStyle}>
              <div style={detailItemStyle}>
                <Clock size={16} color="#6B7280" />
                <span>{booking.startTime} - {booking.endTime}</span>
              </div>
              <div style={detailItemStyle}>
                <Clock size={16} color="#6B7280" />
                <span>{booking.duration} hours</span>
              </div>
              <div style={detailItemStyle}>
                <DollarSign size={16} color="#10B981" />
                <span style={{ fontWeight: 600 }}>{formatCurrency(booking.fare)}</span>
              </div>
            </div>

            {booking.status === 'completed' && booking.rating && (
              <div style={ratingContainerStyle}>
                <Rating rating={booking.rating} size={14} />
                {booking.review && <p style={reviewStyle}>{booking.review}</p>}
              </div>
            )}

            {booking.status === 'active' && (
              <div style={activeInfoStyle}>
                <span style={otpStyle}>OTP: {booking.otp}</span>
                <span style={etaStyle}>ETA: {booking.eta}</span>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

const containerStyle = {
  marginTop: '2rem'
};

const titleStyle = {
  marginBottom: '1rem',
  color: 'var(--black)'
};

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxHeight: '500px',
  overflowY: 'auto'
};

const bookingCardStyle = {
  padding: '1.25rem'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '1rem'
};

const dateStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  fontSize: '0.875rem',
  color: 'var(--grey)',
  marginTop: '0.25rem'
};

const detailsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  marginTop: '0.75rem'
};

const detailItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.9rem',
  color: 'var(--grey-dark)'
};

const ratingContainerStyle = {
  marginTop: '1rem',
  paddingTop: '1rem',
  borderTop: '1px solid var(--grey-light)'
};

const reviewStyle = {
  fontSize: '0.9rem',
  color: 'var(--grey-dark)',
  fontStyle: 'italic',
  marginTop: '0.5rem',
  marginBottom: 0
};

const activeInfoStyle = {
  display: 'flex',
  gap: '1rem',
  marginTop: '1rem',
  paddingTop: '1rem',
  borderTop: '1px solid var(--grey-light)'
};

const otpStyle = {
  backgroundColor: 'var(--primary-blue)',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: 'var(--radius-md)',
  fontWeight: 600,
  fontSize: '0.9rem'
};

const etaStyle = {
  backgroundColor: 'var(--green)',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: 'var(--radius-md)',
  fontWeight: 600,
  fontSize: '0.9rem'
};

export default BookingHistory;

