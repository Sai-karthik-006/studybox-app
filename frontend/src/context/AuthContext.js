import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { adminLogin, studentLogin, studentRegister } from '../utils/api';
import { supabase } from '../utils/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('studybox_token');
    const userData = localStorage.getItem('studybox_user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const loginAdmin = async (email, password) => {
    try {
      const response = await adminLogin(email, password);
      if (response.data && response.data.success) {
        const { user: userData, token } = response.data.data;
        localStorage.setItem('studybox_token', token);
        localStorage.setItem('studybox_user', JSON.stringify(userData));
        setUser(userData);
        toast.success('Admin login successful!');
        return { success: true };
      } else {
        const errorMsg = response.data?.message || 'Login failed';
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Login failed';
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const loginStudent = async (email, password) => {
    try {
      const response = await studentLogin(email, password);
      if (response.data && response.data.success) {
        const { user: userData, token } = response.data.data;
        localStorage.setItem('studybox_token', token);
        localStorage.setItem('studybox_user', JSON.stringify(userData));
        setUser(userData);
        toast.success('Login successful!');
        return { success: true };
      } else {
        toast.error(response.data?.message || 'Login failed');
        return { success: false, error: response.data?.message };
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return { success: false, error: error.message };
    }
  };

  // Student Register with Email Verification - COMPLETE FLOW
  const registerStudent = async (userData) => {
    try {
      console.log('Starting registration for:', userData.email);
      
      const { data: supabaseData, error: supabaseError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            phone: userData.phone,
            gender: userData.gender
          },
          emailRedirectTo: `${window.location.origin}/student-auth`
        }
      });

      if (supabaseError) {
        console.error('Supabase registration error:', supabaseError);
        throw new Error(supabaseError.message);
      }

      console.log('Supabase registration successful:', supabaseData);

      if (supabaseData.user && !supabaseData.user.email_confirmed_at) {
        return { 
          success: true, 
          message: 'Registration successful! Please check your email to verify your account before logging in.',
          requiresVerification: true
        };
      }

      const response = await studentRegister(userData);
      console.log('Backend registration response:', response);
      
      if (response.data && response.data.success) {
        const loginResponse = await studentLogin(userData.email, userData.password);
        if (loginResponse.data && loginResponse.data.success) {
          const { user, token } = loginResponse.data.data;
          localStorage.setItem('studybox_token', token);
          localStorage.setItem('studybox_user', JSON.stringify(user));
          setUser(user);
        }
        
        return { 
          success: true, 
          message: 'Registration successful! You are now logged in.',
          requiresVerification: false
        };
      } else {
        throw new Error(response.data?.message || 'Backend registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Registration failed. Please try again.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('studybox_token');
    localStorage.removeItem('studybox_user');
    setUser(null);
    toast.info('Logged out successfully');
  };

  const value = {
    user,
    loginAdmin,
    loginStudent,
    registerStudent,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
