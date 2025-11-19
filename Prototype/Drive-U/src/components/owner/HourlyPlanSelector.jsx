import React from 'react';
import Card from '../common/Card';
import { Clock, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import { hourlyPlans } from '../../utils/mockData';

const HourlyPlanSelector = ({ onSelectPlan, selectedPlan, selectedDriver }) => {
  const handleSelect = (plan) => {
    if (onSelectPlan) {
      const fare = selectedDriver 
        ? plan.hours * selectedDriver.hourlyRate 
        : plan.baseRate;
      onSelectPlan({ ...plan, fare });
    }
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>
        <Clock size={24} /> Select Duration
      </h3>
      <div style={plansGridStyle}>
        {hourlyPlans.map((plan) => {
          const fare = selectedDriver 
            ? plan.hours * selectedDriver.hourlyRate 
            : plan.baseRate;
          
          const isSelected = selectedPlan && selectedPlan.hours === plan.hours;
          
          return (
            <Card
              key={plan.hours}
              className={isSelected ? 'selected' : ''}
              onClick={() => handleSelect(plan)}
              style={{
                ...planCardStyle,
                border: isSelected 
                  ? '3px solid var(--primary-blue)' 
                  : '2px solid var(--grey-light)',
                backgroundColor: isSelected 
                  ? 'rgba(30, 58, 138, 0.15)' 
                  : 'var(--card-bg)',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                boxShadow: isSelected ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                position: 'relative'
              }}
            >
              {isSelected && (
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  color: 'var(--primary-blue)'
                }}>
                  <CheckCircle size={24} fill="var(--primary-blue)" />
                </div>
              )}
              <div style={hoursStyle}>{plan.hours}h</div>
              <div style={fareStyle}>{formatCurrency(fare)}</div>
              <div style={descriptionStyle}>{plan.description}</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const containerStyle = {
  marginBottom: '2rem'
};

const titleStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '1rem',
  color: 'var(--black)'
};

const plansGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '1rem'
};

const planCardStyle = {
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all var(--transition-normal)',
  padding: '1.5rem',
  userSelect: 'none' // Prevent text selection on click
};

const hoursStyle = {
  fontSize: '2rem',
  fontWeight: 700,
  color: 'var(--primary-blue)',
  marginBottom: '0.5rem'
};

const fareStyle = {
  fontSize: '1.25rem',
  fontWeight: 600,
  color: 'var(--black)',
  marginBottom: '0.5rem'
};

const descriptionStyle = {
  fontSize: '0.875rem',
  color: 'var(--grey)',
  lineHeight: 1.4
};

export default HourlyPlanSelector;

