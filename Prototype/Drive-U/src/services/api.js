/**
 * API Service - Base configuration for backend communication
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

/**
 * Get authentication token from storage
 */
const getAuthToken = () => {
  const user = sessionStorage.getItem('currentUser');
  if (user) {
    const userData = JSON.parse(user);
    return userData.token;
  }
  return null;
};

/**
 * Base fetch wrapper with error handling
 */
const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'An error occurred');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * API methods
 */
const api = {
  // GET request
  get: (endpoint, options = {}) => apiFetch(endpoint, { method: 'GET', ...options }),
  
  // POST request
  post: (endpoint, data, options = {}) => apiFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  }),
  
  // PUT request
  put: (endpoint, data, options = {}) => apiFetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  }),
  
  // DELETE request
  delete: (endpoint, options = {}) => apiFetch(endpoint, { method: 'DELETE', ...options }),
};

export default api;
export { API_BASE_URL };

