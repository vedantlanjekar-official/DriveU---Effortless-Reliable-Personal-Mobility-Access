import React from 'react';

const Badge = ({ children, variant = 'primary' }) => {
  return (
    <span className={`badge badge-${variant}`}>
      {children}
    </span>
  );
};

export default Badge;

