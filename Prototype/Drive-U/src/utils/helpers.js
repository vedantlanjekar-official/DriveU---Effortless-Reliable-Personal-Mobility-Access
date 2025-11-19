// Helper functions for the application

export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-IN', options);
};

export const formatTime = (time) => {
  return time;
};

export const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Haversine formula to calculate distance between two coordinates
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

const toRad = (value) => {
  return (value * Math.PI) / 180;
};

export const getDriversWithinRadius = (drivers, centerLat, centerLng, radiusKm) => {
  return drivers.filter(driver => {
    const distance = calculateDistance(
      centerLat,
      centerLng,
      driver.location.lat,
      driver.location.lng
    );
    return distance <= radiusKm;
  });
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[+]?[0-9]{10,13}$/;
  return re.test(phone.replace(/\s/g, ''));
};

export const validateLicense = (license) => {
  // Indian driving license format: DL-XX-YYYY-XXXXXXX
  const re = /^DL-\d{2}-\d{4}-\d{7}$/;
  return re.test(license);
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const getRandomColor = () => {
  const colors = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getRatingStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return {
    full: fullStars,
    half: hasHalfStar ? 1 : 0,
    empty: 5 - fullStars - (hasHalfStar ? 1 : 0)
  };
};

export const getTimeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

export const sortByDistance = (items, userLat, userLng) => {
  return items.sort((a, b) => {
    const distA = calculateDistance(userLat, userLng, a.location.lat, a.location.lng);
    const distB = calculateDistance(userLat, userLng, b.location.lat, b.location.lng);
    return distA - distB;
  });
};

export const filterAvailableDrivers = (drivers) => {
  return drivers.filter(driver => driver.available);
};

