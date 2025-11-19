/**
 * User Service
 */
import api from './api';

const userService = {
  /**
   * Get user profile
   */
  getProfile: async () => {
    try {
      return await api.get('/users/me');
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  /**
   * Update user location
   */
  updateLocation: async (lat, lng, address = null) => {
    try {
      return await api.put('/users/location', {
        lat,
        lng,
        address
      });
    } catch (error) {
      console.error('Update location error:', error);
      throw error;
    }
  },

  /**
   * Get available drivers
   */
  getAvailableDrivers: async (lat = null, lng = null, radiusKm = 5.0) => {
    try {
      const params = new URLSearchParams();
      if (lat) params.append('lat', lat);
      if (lng) params.append('lng', lng);
      params.append('radius_km', radiusKm);
      
      return await api.get(`/users/drivers/available?${params.toString()}`);
    } catch (error) {
      console.error('Get available drivers error:', error);
      throw error;
    }
  }
};

export default userService;

