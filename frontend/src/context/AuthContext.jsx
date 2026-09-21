import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
const AuthContext = createContext(null);
export const AuthProvider = ({
  children
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const stored = localStorage.getItem('foodlog_user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);
  const login = async (email, password) => {
    const {
      data
    } = await axiosInstance.post('/auth/login', {
      email,
      password
    });
    localStorage.setItem('foodlog_token', data.token);
    localStorage.setItem('foodlog_user', JSON.stringify(data));
    setUser(data);
    return data;
  };
  const signup = async (name, email, password) => {
    const {
      data
    } = await axiosInstance.post('/auth/signup', {
      name,
      email,
      password
    });
    localStorage.setItem('foodlog_token', data.token);
    localStorage.setItem('foodlog_user', JSON.stringify(data));
    setUser(data);
    return data;
  };
  const logout = () => {
    localStorage.removeItem('foodlog_token');
    localStorage.removeItem('foodlog_user');
    setUser(null);
  };
  const googleLogin = async credential => {
    const {
      data
    } = await axiosInstance.post('/auth/google', {
      credential
    });
    localStorage.setItem('foodlog_token', data.token);
    localStorage.setItem('foodlog_user', JSON.stringify(data));
    setUser(data);
    return data;
  };
  return <AuthContext.Provider value={{
    user,
    loading,
    login,
    signup,
    googleLogin,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);