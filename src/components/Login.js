// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser(); // Use context to set the user
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement your login logic here
    setUser({ 
      email: email, 
      // Additional fields can be set here if needed
    });
    navigate('/admin');
  };

  const responseFacebook = (response) => {
    console.log(response);
    setUser({ email: response.email });
    navigate('/admin');
  };

  const responseGoogle = (response) => {
    console.log(response);
    setUser({ email: response.profileObj.email });
    navigate('/admin');
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="login-body">
        <div className="login-container">
          <h1 className="login-heading">Login</h1>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">Login</button>
            <p className="login-signup-link">
              Don't have an account? <Link to="/signup">Create one</Link>
            </p>
            <div className="social-buttons">
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={console.error}
                render={({ onClick }) => (
                  <button className="social-button google" onClick={onClick}>
                    <FontAwesomeIcon icon={faGoogle} /> Google
                  </button>
                )}
              />
              <FacebookLogin
                appId="YOUR_FACEBOOK_APP_ID" // Replace with your Facebook App ID
                fields="name,email,picture"
                callback={responseFacebook}
                render={({ onClick }) => (
                  <button className="social-button facebook" onClick={onClick}>
                    <FontAwesomeIcon icon={faFacebook} /> Facebook
                  </button>
                )}
              />
            </div>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
