// src/components/Admin.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import '../styles/Admin.css';
import { useTheme } from '../context/ThemeContext'; // Import useTheme
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faSlidersH, faUsers, faCogs, faProjectDiagram, faAddressCard, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
  const { isDarkMode } = useTheme(); // Use theme context
  const [showGreeting, setShowGreeting] = useState(true);
  const [cardData, setCardData] = useState({
    'Total Static Pages': Math.floor(Math.random() * 90),
    'Total Slider': Math.floor(Math.random() * 90),
    'Total Teams': Math.floor(Math.random() * 90),
    'Total Services': Math.floor(Math.random() * 90),
    'Total Portfolio': Math.floor(Math.random() * 90),
    'Total Users': Math.floor(Math.random() * 90),
    'Total Enquiries': Math.floor(Math.random() * 90),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 3000); // Change the delay time (3000ms = 3 seconds) as needed

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div className={`admin-body ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Navbar />
      <div className="greeting-container">
        {showGreeting ? (
          <h1 className="admin-heading">Welcome, User!</h1> 
        ) : (
          <h1 className="admin-heading">How can I help you?</h1>
        )}
      </div>
      <div className="card-grid">
        {Object.keys(cardData).map((key, index) => (
          <div
            key={index}
            className="card"
            style={{ backgroundColor: ['#00C1EF', '#F39C11', '#DE4B39', '#00A65A', '#0073B6', '#F012BF', '#3D9970'][index] }}
          >
            <div className="card-icon">
              <FontAwesomeIcon
                icon={[
                  faFileAlt,
                  faSlidersH,
                  faUsers,
                  faCogs,
                  faProjectDiagram,
                  faAddressCard,
                  faEnvelope,
                ][index]}
                className="icon"
              />
            </div>
            <div className="card-content">
              <h3>{key}</h3>
              <p>{cardData[key]}</p>
              <button className="more-info-button">More Info</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
