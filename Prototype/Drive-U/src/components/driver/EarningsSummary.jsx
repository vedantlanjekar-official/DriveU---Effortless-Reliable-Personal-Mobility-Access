import React from 'react';
import Card from '../common/Card';
import { DollarSign, TrendingUp, Clock, Navigation } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const EarningsSummary = ({ earnings }) => {
  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Today's Summary</h3>
      <div style={gridStyle}>
        <Card style={summaryCardStyle}>
          <div style={iconContainerStyle('#10B981')}>
            <DollarSign size={24} color="white" />
          </div>
          <div>
            <div style={labelStyle}>Total Earnings</div>
            <div style={valueStyle}>{formatCurrency(earnings.today)}</div>
          </div>
        </Card>

        <Card style={summaryCardStyle}>
          <div style={iconContainerStyle('#2563EB')}>
            <TrendingUp size={24} color="white" />
          </div>
          <div>
            <div style={labelStyle}>Trips Completed</div>
            <div style={valueStyle}>{earnings.todayTrips}</div>
          </div>
        </Card>

        <Card style={summaryCardStyle}>
          <div style={iconContainerStyle('#F59E0B')}>
            <Clock size={24} color="white" />
          </div>
          <div>
            <div style={labelStyle}>Hours Driven</div>
            <div style={valueStyle}>{earnings.todayHours}h</div>
          </div>
        </Card>

        <Card style={summaryCardStyle}>
          <div style={iconContainerStyle('#8B5CF6')}>
            <Navigation size={24} color="white" />
          </div>
          <div>
            <div style={labelStyle}>Distance</div>
            <div style={valueStyle}>{earnings.todayKm} km</div>
          </div>
        </Card>
      </div>

      <div style={periodSummaryStyle}>
        <div style={periodItemStyle}>
          <span>This Week</span>
          <span style={periodValueStyle}>{formatCurrency(earnings.week)}</span>
        </div>
        <div style={periodItemStyle}>
          <span>This Month</span>
          <span style={periodValueStyle}>{formatCurrency(earnings.month)}</span>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  marginBottom: '2rem'
};

const titleStyle = {
  marginBottom: '1rem',
  color: 'var(--black)'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
  marginBottom: '1rem'
};

const summaryCardStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1.25rem'
};

const iconContainerStyle = (bgColor) => ({
  width: '48px',
  height: '48px',
  borderRadius: 'var(--radius-lg)',
  backgroundColor: bgColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0
});

const labelStyle = {
  fontSize: '0.875rem',
  color: 'var(--grey)',
  marginBottom: '0.25rem'
};

const valueStyle = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: 'var(--black)'
};

const periodSummaryStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem'
};

const periodItemStyle = {
  padding: '1rem',
  backgroundColor: 'rgba(37, 99, 235, 0.05)',
  borderRadius: 'var(--radius-lg)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: 500
};

const periodValueStyle = {
  fontSize: '1.25rem',
  fontWeight: 700,
  color: 'var(--primary-blue)'
};

export default EarningsSummary;

