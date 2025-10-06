import React, { useState } from 'react';
import { FaUserGraduate, FaEnvelope, FaLock, FaUser, FaPhone } from 'react-icons/fa';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';

const StudentAuth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon student">
            <FaUserGraduate />
          </div>
          <h2>{isLogin ? 'Student Login' : 'Student Registration'}</h2>
          <p>{isLogin ? 'Welcome back! Please login to continue' : 'Create your account to access study materials'}</p>
        </div>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="auth-switch">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="switch-btn"
            >
              {isLogin ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentAuth;