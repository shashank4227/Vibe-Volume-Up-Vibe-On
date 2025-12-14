import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as apiLogin, register as apiRegister, getMe } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const userData = await getMe();
          setUser(userData.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Auth check failed", error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiLogin({ email, password });
      if (response.success) {
        localStorage.setItem('authToken', response.token);
        setUser({ username: response.username, email: response.email, _id: response._id });
        setIsAuthenticated(true);
        return { success: true };
      }
    } catch (error) {
      console.error("Login failed", error);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await apiRegister({ username, email, password });
      if (response.success) {
        localStorage.setItem('authToken', response.token);
        setUser({ username: response.username, email: response.email, _id: response._id });
        setIsAuthenticated(true);
        return { success: true };
      }
    } catch (error) {
      console.error("Registration failed", error);
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
