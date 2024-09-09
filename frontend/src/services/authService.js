import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const signup = async (email, password, uniqueId) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      email,
      password,
      uniqueId,
    });
    return response.data.success ? true:false;
  } catch (error) {
    console.error('Signup error:', error);
    return false;
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    
    });
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data.success;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

const getToken = () => {
  return localStorage.getItem('token');
};

const authService = {
  signup,
  login,
  getToken,
};

export default authService;
