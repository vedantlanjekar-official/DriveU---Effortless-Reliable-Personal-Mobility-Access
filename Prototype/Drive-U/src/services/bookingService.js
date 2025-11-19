/**
 * Booking Service
 */
import api from './api';

const bookingService = {
  /**
   * Create a new booking
   */
  createBooking: async (bookingData) => {
    try {
      return await api.post('/bookings', bookingData);
    } catch (error) {
      console.error('Create booking error:', error);
      throw error;
    }
  },

  /**
   * Get nearby bookings (for drivers)
   */
  getNearbyBookings: async () => {
    try {
      return await api.get('/bookings/nearby');
    } catch (error) {
      console.error('Get nearby bookings error:', error);
      throw error;
    }
  },

  /**
   * Accept a booking (driver)
   */
  acceptBooking: async (bookingId, driverId) => {
    try {
      return await api.put(`/bookings/${bookingId}/accept`, { driver_id: driverId });
    } catch (error) {
      console.error('Accept booking error:', error);
      throw error;
    }
  },

  /**
   * Deny a booking (driver)
   */
  denyBooking: async (bookingId) => {
    try {
      return await api.put(`/bookings/${bookingId}/deny`);
    } catch (error) {
      console.error('Deny booking error:', error);
      throw error;
    }
  },

  /**
   * Verify OTP and start trip
   */
  verifyOTP: async (bookingId, otp, currentLocation = null) => {
    try {
      return await api.post(`/bookings/${bookingId}/verify-otp`, {
        otp,
        current_location: currentLocation
      });
    } catch (error) {
      console.error('Verify OTP error:', error);
      throw error;
    }
  },

  /**
   * Complete a booking
   */
  completeBooking: async (bookingId, data) => {
    try {
      return await api.put(`/bookings/${bookingId}/complete`, data);
    } catch (error) {
      console.error('Complete booking error:', error);
      throw error;
    }
  },

  /**
   * Get booking history
   */
  getHistory: async () => {
    try {
      return await api.get('/bookings/history');
    } catch (error) {
      console.error('Get history error:', error);
      throw error;
    }
  }
};

export default bookingService;

