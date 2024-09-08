// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

const Login = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login or signup logic here
    navigate('/');
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-container">
      <div className="inner-container">
        <h2 className="login-title">{isLogin ? 'Login' : 'Signup'}</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-input" required />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" id="username" className="form-input" required />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-input"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <button type="button" className="toggle-button" onClick={togglePasswordVisibility}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type="submit" className="submit-button">{isLogin ? 'Login' : 'Signup'}</button>
          <div><ul className="list-icons">
        <button className='btn-icon'><li><GoogleIcon /></li></button>
        <button className='btn-icon'><li><FacebookIcon /></li></button>
        <button className='btn-icon'><li><GitHubIcon /></li></button>
        </ul></div>
        </form>
        <button className="toggle-form-button" onClick={toggleForm}>
          {isLogin ? 'Don\'t have an account? Signup' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;
