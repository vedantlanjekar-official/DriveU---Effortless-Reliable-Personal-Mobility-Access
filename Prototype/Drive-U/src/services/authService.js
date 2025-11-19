/**
 * Authentication Service
 */
import api from './api';

const authService = {
  /**
   * Register a new user
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      // Store token and user data
      if (response.access_token) {
        const userSession = {
          token: response.access_token,
          type: response.user_type,
          name: response.user_name,
          email: response.user_email
        };
        sessionStorage.setItem('currentUser', JSON.stringify(userSession));
      }
      
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Login with email and password
   */
  login: async (email, password, rememberMe = false) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
        remember_me: rememberMe
      });
      
      // Store token and user data
      if (response.access_token) {
        const userSession = {
          token: response.access_token,
          type: response.user_type,
          name: response.user_name,
          email: response.user_email
        };
        
        sessionStorage.setItem('currentUser', JSON.stringify(userSession));
        
        if (rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify({
            type: response.user_type,
            email: response.user_email,
            name: response.user_name,
            timestamp: new Date().getTime()
          }));
        }
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Google OAuth login
   */
  googleAuth: async (idToken, rememberMe = false) => {
    try {
      const response = await api.post('/auth/google', {
        id_token: idToken,
        remember_me: rememberMe
      });
      
      // Store token and user data
      if (response.access_token) {
        const userSession = {
          token: response.access_token,
          type: response.user_type,
          name: response.user_name,
          email: response.user_email
        };
        
        sessionStorage.setItem('currentUser', JSON.stringify(userSession));
        
        if (rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify({
            type: response.user_type,
            email: response.user_email,
            name: response.user_name,
            timestamp: new Date().getTime()
          }));
        }
      }
      
      return response;
    } catch (error) {
      console.error('Google auth error:', error);
      throw error;
    }
  },

  /**
   * Logout
   */
  logout: async () => {
    try {
      await api.post('/auth/logout');
      sessionStorage.removeItem('currentUser');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      // Clear session anyway
      sessionStorage.removeItem('currentUser');
      return true;
    }
  },

  /**
   * Get current user
   */
  getCurrentUser: async () => {
    try {
      return await api.get('/auth/me');
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }
};

export default authService;

