import React from 'react';
import { Star } from 'lucide-react';

const Rating = ({ rating, showNumber = true, size = 16 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="rating" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={size} fill="#F59E0B" color="#F59E0B" />
      ))}
      {hasHalfStar && (
        <Star size={size} fill="#F59E0B" color="#F59E0B" style={{ opacity: 0.5 }} />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={size} color="#D1D5DB" />
      ))}
      {showNumber && (
        <span style={{ marginLeft: '0.5rem', fontWeight: 500, color: '#6B7280' }}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;

