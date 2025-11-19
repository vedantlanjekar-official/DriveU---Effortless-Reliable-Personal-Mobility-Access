import React from 'react';

const Card = ({ children, className = '', onClick, hover = true }) => {
  return (
    <div 
      className={`card ${hover ? 'card-hover' : ''} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </div>
  );
};

export default Card;

