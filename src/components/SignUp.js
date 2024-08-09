// src/components/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/SignUp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useUser(); // Use context to set the user
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    if (firstName && surname && email && password && password === confirmPassword) {
      setUser({ 
        firstName: firstName,
        lastName: surname,
        email: email,
        // Additional fields can be set here if needed
      });
      navigate('/admin');
    } else {
      alert('Please fill in all fields correctly.');
    }
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
      <div className="signup-body">
        <div className="signup-container">
          <h1 className="signup-heading">Sign Up</h1>
          <form className="signup-form" onSubmit={handleSignUp}>
            <div className="name-group">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  id="surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Enter your surname"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
          <p className="signup-link">
            Already have an account? <a href="/login">Login</a>
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
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default SignUp;
