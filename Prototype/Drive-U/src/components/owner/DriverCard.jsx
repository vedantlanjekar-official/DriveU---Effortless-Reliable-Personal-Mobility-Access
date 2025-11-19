import React from 'react';
import Card from '../common/Card';
import Rating from '../common/Rating';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { Clock, MapPin, Award } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const DriverCard = ({ driver, onBook }) => {
  return (
    <Card className="driver-card">
      <div style={cardLayoutStyle}>
        <img 
          src={driver.photo} 
          alt={driver.name} 
          style={photoStyle}
        />
        <div style={contentStyle}>
          <div style={headerStyle}>
            <h3 style={{ margin: 0 }}>{driver.name}</h3>
            <Rating rating={driver.rating} size={14} />
          </div>
          
          <div style={infoRowStyle}>
            <Clock size={16} color="#6B7280" />
            <span>{driver.experience} years experience</span>
          </div>
          
          <div style={infoRowStyle}>
            <Award size={16} color="#6B7280" />
            <span>{driver.completedTrips}+ trips completed</span>
          </div>
          
          <div style={skillsContainerStyle}>
            {driver.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="primary">{skill}</Badge>
            ))}
          </div>
          
          <div style={habitsContainerStyle}>
            {driver.habits.map((habit, index) => (
              <span key={index} style={habitStyle}>✓ {habit}</span>
            ))}
          </div>
          
          <div style={bottomRowStyle}>
            <div>
              <span style={rateStyle}>{formatCurrency(driver.hourlyRate)}/hr</span>
              <div style={availabilityStyle}>
                <span style={{
                  ...dotStyle,
                  backgroundColor: driver.available ? 'var(--green)' : 'var(--red)'
                }}></span>
                {driver.available ? 'Available' : 'Busy'}
              </div>
            </div>
            <Button 
              variant={driver.available ? 'success' : 'secondary'} 
              onClick={() => onBook(driver)}
              disabled={!driver.available}
            >
              {driver.available ? 'Book Now' : 'Unavailable'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const cardLayoutStyle = {
  display: 'flex',
  gap: '1.5rem',
  alignItems: 'flex-start'
};

const photoStyle = {
  width: '120px',
  height: '120px',
  borderRadius: 'var(--radius-lg)',
  objectFit: 'cover',
  boxShadow: 'var(--shadow-md)'
};

const contentStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const infoRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.9rem',
  color: 'var(--grey-dark)'
};

const skillsContainerStyle = {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap'
};

const habitsContainerStyle = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap'
};

const habitStyle = {
  fontSize: '0.85rem',
  color: 'var(--green)',
  fontWeight: 500
};

const bottomRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '0.5rem',
  paddingTop: '0.75rem',
  borderTop: '1px solid var(--grey-light)'
};

const rateStyle = {
  fontSize: '1.25rem',
  fontWeight: 700,
  color: 'var(--primary-blue)',
  display: 'block'
};

const availabilityStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.875rem',
  marginTop: '0.25rem'
};

const dotStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  display: 'inline-block'
};

export default DriverCard;

