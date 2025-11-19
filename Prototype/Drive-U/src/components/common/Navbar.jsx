import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User, History, Settings, LogIn } from 'lucide-react';
import logo from '../../assets/Drive_u_Logo.png';

const Navbar = ({ userType = null, onLogout }) => {
  return (
    <nav style={navStyle}>
      <div className="container" style={navContainerStyle}>
        <Link to="/" style={logoStyle}>
          <img src={logo} alt="DriveU Logo" style={logoImageStyle} />
          <span style={{ fontWeight: 700, fontSize: '1.5rem', marginLeft: '0.5rem' }}>Drive-U</span>
        </Link>
        
        {userType && (
          <div style={navLinksStyle}>
            {userType === 'owner' && (
              <>
                <Link to="/owner-dashboard" style={navLinkStyle}>
                  <User size={18} />
                  Dashboard
                </Link>
                <button style={navLinkButtonStyle}>
                  <History size={18} />
                  History
                </button>
                <button style={navLinkButtonStyle}>
                  <Settings size={18} />
                  Settings
                </button>
              </>
            )}
            {userType === 'driver' && (
              <>
                <Link to="/driver-dashboard" style={navLinkStyle}>
                  <User size={18} />
                  Dashboard
                </Link>
                <button style={navLinkButtonStyle}>
                  <History size={18} />
                  Trips
                </button>
                <button style={navLinkButtonStyle}>
                  <Settings size={18} />
                  Settings
                </button>
              </>
            )}
            <button onClick={onLogout} style={logoutButtonStyle}>
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}

        <div style={rightSectionStyle}>
          {!userType && (
            <Link to="/login" style={loginIconStyle}>
              <LogIn size={24} />
            </Link>
          )}
          <img src={logo} alt="DriveU" style={topRightLogoStyle} />
        </div>
      </div>
    </nav>
  );
};

const navStyle = {
  backgroundColor: 'var(--card-bg)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'var(--shadow-md)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  padding: '1rem 0'
};

const navContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: 'var(--primary-blue)',
  textDecoration: 'none',
  fontWeight: 700
};

const navLinksStyle = {
  display: 'flex',
  gap: '1rem',
  alignItems: 'center'
};

const navLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: 'var(--grey-dark)',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: 'var(--radius-md)',
  transition: 'all var(--transition-fast)',
  fontWeight: 500
};

const navLinkButtonStyle = {
  ...navLinkStyle,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer'
};

const logoutButtonStyle = {
  ...navLinkStyle,
  border: 'none',
  backgroundColor: 'var(--red)',
  color: 'white',
  cursor: 'pointer'
};

const loginIconStyle = {
  display: 'flex',
  alignItems: 'center',
  color: 'var(--primary-blue)',
  textDecoration: 'none',
  padding: '0.5rem',
  borderRadius: 'var(--radius-md)',
  transition: 'all var(--transition-fast)',
  cursor: 'pointer'
};

// Removed unused styles

const logoImageStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  objectFit: 'cover'
};

const rightSectionStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
};

const topRightLogoStyle = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '2px solid var(--primary-blue)'
};

export default Navbar;

