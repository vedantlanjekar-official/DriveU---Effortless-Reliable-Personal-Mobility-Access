/**
 * Location Service
 */
import api from './api';

const locationService = {
  /**
   * Search locations
   */
  searchLocations: async (query, limit = 10) => {
    try {
      return await api.post('/locations/search', { query, limit });
    } catch (error) {
      console.error('Search locations error:', error);
      throw error;
    }
  },

  /**
   * Get nearby places
   */
  getNearbyPlaces: async (lat, lng, radiusKm = 50, limit = 20) => {
    try {
      return await api.post('/locations/nearby', {
        lat,
        lng,
        radius_km: radiusKm,
        limit
      });
    } catch (error) {
      console.error('Get nearby places error:', error);
      throw error;
    }
  },

  /**
   * Get directions
   */
  getDirections: async (originLat, originLng, destLat, destLng) => {
    try {
      return await api.post('/locations/directions', {
        origin_lat: originLat,
        origin_lng: originLng,
        dest_lat: destLat,
        dest_lng: destLng
      });
    } catch (error) {
      console.error('Get directions error:', error);
      throw error;
    }
  },

  /**
   * Autocomplete location search
   */
  autocomplete: async (query, limit = 10) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1'}/locations/autocomplete?query=${encodeURIComponent(query)}&limit=${limit}`);
      if (!response.ok) throw new Error('Autocomplete failed');
      return await response.json();
    } catch (error) {
      console.error('Autocomplete error:', error);
      throw error;
    }
  }
};

export default locationService;

