// Mock data for development and testing

export const mockDrivers = [
  {
    id: 'D001',
    name: 'Rajesh Kumar',
    photo: 'https://i.pravatar.cc/150?img=12',
    experience: 8,
    rating: 4.8,
    completedTrips: 1250,
    skills: ['Highway driving', 'City navigation', 'Night driving'],
    habits: ['Non-smoker', 'Professional', 'Punctual'],
    licenseNumber: 'DL-01-2015-1234567',
    location: { lat: 28.6139, lng: 77.2090 },
    available: true,
    hourlyRate: 150
  },
  {
    id: 'D002',
    name: 'Amit Singh',
    photo: 'https://i.pravatar.cc/150?img=13',
    experience: 5,
    rating: 4.6,
    completedTrips: 850,
    skills: ['Defensive driving', 'GPS expert', 'Multi-lingual'],
    habits: ['Non-smoker', 'Courteous', 'Safe driver'],
    licenseNumber: 'DL-01-2018-2345678',
    location: { lat: 28.6190, lng: 77.2100 },
    available: true,
    hourlyRate: 130
  },
  {
    id: 'D003',
    name: 'Suresh Sharma',
    photo: 'https://i.pravatar.cc/150?img=33',
    experience: 12,
    rating: 4.9,
    completedTrips: 2100,
    skills: ['Long distance', 'Highway expert', 'Emergency driving'],
    habits: ['Non-smoker', 'Experienced', 'Reliable'],
    licenseNumber: 'DL-01-2011-3456789',
    location: { lat: 28.6120, lng: 77.2150 },
    available: true,
    hourlyRate: 180
  },
  {
    id: 'D004',
    name: 'Vikram Patel',
    photo: 'https://i.pravatar.cc/150?img=51',
    experience: 6,
    rating: 4.7,
    completedTrips: 980,
    skills: ['City expert', 'Quick routes', 'Patient driver'],
    habits: ['Non-smoker', 'Friendly', 'Helpful'],
    licenseNumber: 'DL-01-2017-4567890',
    location: { lat: 28.6100, lng: 77.2200 },
    available: false,
    hourlyRate: 140
  },
  {
    id: 'D005',
    name: 'Mohan Das',
    photo: 'https://i.pravatar.cc/150?img=68',
    experience: 10,
    rating: 4.8,
    completedTrips: 1680,
    skills: ['All terrain', 'Corporate driving', 'Event specialist'],
    habits: ['Non-smoker', 'Professional', 'Well-dressed'],
    licenseNumber: 'DL-01-2013-5678901',
    location: { lat: 28.6080, lng: 77.2180 },
    available: true,
    hourlyRate: 160
  }
];

export const mockOwners = [
  {
    id: 'O001',
    name: 'Priya Mehta',
    email: 'priya.mehta@email.com',
    phone: '+91 98765 43210',
    city: 'Delhi',
    totalBookings: 45,
    favoriteDrivers: ['D001', 'D003']
  },
  {
    id: 'O002',
    name: 'Arjun Reddy',
    email: 'arjun.reddy@email.com',
    phone: '+91 98765 43211',
    city: 'Bangalore',
    totalBookings: 32,
    favoriteDrivers: ['D002']
  }
];

export const mockBookings = [
  {
    id: 'B001',
    ownerId: 'O001',
    driverId: 'D001',
    date: '2025-10-08',
    startTime: '09:00 AM',
    endTime: '01:00 PM',
    duration: 4,
    destination: 'India Gate, New Delhi',
    fare: 600,
    status: 'completed',
    otp: '5432',
    rating: 5,
    review: 'Excellent driver, very professional!'
  },
  {
    id: 'B002',
    ownerId: 'O001',
    driverId: 'D003',
    date: '2025-10-09',
    startTime: '02:00 PM',
    endTime: '04:00 PM',
    duration: 2,
    destination: 'Connaught Place, Delhi',
    fare: 360,
    status: 'completed',
    otp: '7821',
    rating: 5,
    review: 'Great experience!'
  },
  {
    id: 'B003',
    ownerId: 'O001',
    driverId: 'D002',
    date: '2025-10-10',
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    duration: 2,
    destination: 'Nehru Place, Delhi',
    fare: 260,
    status: 'active',
    otp: '3456',
    eta: '15 mins'
  }
];

export const mockTrips = [
  {
    id: 'T001',
    driverId: 'D001',
    ownerName: 'Priya Mehta',
    date: '2025-10-10',
    startTime: '09:00 AM',
    duration: 4,
    distance: 45,
    earnings: 600,
    rating: 5,
    status: 'completed'
  },
  {
    id: 'T002',
    driverId: 'D001',
    ownerName: 'Rahul Verma',
    date: '2025-10-09',
    startTime: '02:00 PM',
    duration: 3,
    distance: 35,
    earnings: 450,
    rating: 4,
    status: 'completed'
  },
  {
    id: 'T003',
    driverId: 'D001',
    ownerName: 'Sneha Gupta',
    date: '2025-10-08',
    startTime: '11:00 AM',
    duration: 2,
    distance: 20,
    earnings: 300,
    rating: 5,
    status: 'completed'
  }
];

export const hourlyPlans = [
  { hours: 1, baseRate: 150, description: 'Quick errands or short trips' },
  { hours: 2, baseRate: 260, description: 'Shopping or appointments' },
  { hours: 3, baseRate: 390, description: 'Half-day trips' },
  { hours: 4, baseRate: 520, description: 'Extended travel' },
  { hours: 6, baseRate: 750, description: 'Full day service' },
  { hours: 8, baseRate: 960, description: 'All-day availability' }
];

export const testimonials = [
  {
    id: 1,
    name: 'Anita Desai',
    role: 'Business Owner',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    comment: 'DriveU has been a lifesaver! Professional drivers who know the city well. Highly recommended for anyone looking for reliable driving services.'
  },
  {
    id: 2,
    name: 'Karthik Raman',
    role: 'IT Professional',
    avatar: 'https://i.pravatar.cc/150?img=15',
    rating: 5,
    comment: 'The verification process gives me peace of mind. All drivers are RTO-certified and very professional. Great service!'
  },
  {
    id: 3,
    name: 'Meera Iyer',
    role: 'Marketing Manager',
    avatar: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    comment: 'Love the hourly booking system. Very flexible and transparent pricing. The app is easy to use and drivers are always on time.'
  },
  {
    id: 4,
    name: 'Rohit Malhotra',
    role: 'Entrepreneur',
    avatar: 'https://i.pravatar.cc/150?img=52',
    rating: 4,
    comment: 'Excellent platform connecting car owners with verified drivers. Makes my daily commute stress-free!'
  }
];

// Popular places across India for search suggestions
export const nearbyPlaces = [
  // Delhi NCR
  { name: 'India Gate, Delhi', distance: '5 km', time: '15 min', city: 'Delhi', lat: 28.6129, lng: 77.2295 },
  { name: 'Connaught Place, Delhi', distance: '3 km', time: '10 min', city: 'Delhi', lat: 28.6315, lng: 77.2167 },
  { name: 'Qutub Minar, Delhi', distance: '12 km', time: '30 min', city: 'Delhi', lat: 28.5244, lng: 77.1855 },
  { name: 'Red Fort, Delhi', distance: '6 km', time: '18 min', city: 'Delhi', lat: 28.6562, lng: 77.2410 },
  
  // Mumbai
  { name: 'Gateway of India, Mumbai', distance: '8 km', time: '22 min', city: 'Mumbai', lat: 18.9220, lng: 72.8347 },
  { name: 'Marine Drive, Mumbai', distance: '6 km', time: '18 min', city: 'Mumbai', lat: 18.9432, lng: 72.8236 },
  { name: 'Bandra, Mumbai', distance: '14 km', time: '35 min', city: 'Mumbai', lat: 19.0596, lng: 72.8295 },
  
  // Bangalore  
  { name: 'MG Road, Bangalore', distance: '7 km', time: '20 min', city: 'Bangalore', lat: 12.9758, lng: 77.6061 },
  { name: 'Whitefield, Bangalore', distance: '25 km', time: '55 min', city: 'Bangalore', lat: 12.9698, lng: 77.7500 },
  { name: 'Koramangala, Bangalore', distance: '10 km', time: '28 min', city: 'Bangalore', lat: 12.9352, lng: 77.6245 },
  
  // Other major cities
  { name: 'Charminar, Hyderabad', distance: '6 km', time: '18 min', city: 'Hyderabad', lat: 17.3616, lng: 78.4747 },
  { name: 'Marina Beach, Chennai', distance: '7 km', time: '20 min', city: 'Chennai', lat: 13.0499, lng: 80.2824 },
  { name: 'Howrah Bridge, Kolkata', distance: '6 km', time: '18 min', city: 'Kolkata', lat: 22.5851, lng: 88.3470 },
  { name: 'Hawa Mahal, Jaipur', distance: '6 km', time: '18 min', city: 'Jaipur', lat: 26.9239, lng: 75.8267 },
  { name: 'Taj Mahal, Agra', distance: '8 km', time: '22 min', city: 'Agra', lat: 27.1751, lng: 78.0421 }
];

export const driverEarnings = {
  today: 1250,
  week: 8400,
  month: 32500,
  todayTrips: 5,
  todayHours: 8.5,
  todayKm: 87
};

export const calculateFare = (hours, driverId) => {
  const driver = mockDrivers.find(d => d.id === driverId);
  const hourlyRate = driver ? driver.hourlyRate : 150;
  return hours * hourlyRate;
};

export const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const calculateETA = (distance) => {
  // Assuming average speed of 30 km/h in city
  const timeInMinutes = Math.round((distance / 30) * 60);
  return `${timeInMinutes} mins`;
};

export const mockRequest = {
  id: 'REQ001',
  ownerName: 'Priya Mehta',
  ownerPhone: '+91 98765 43210',
  pickup: 'Connaught Place, Delhi',
  destination: 'India Gate, New Delhi',
  duration: 3,
  fare: 450,
  distance: 35,
  otp: '5432',
  requestedAt: new Date()
};

