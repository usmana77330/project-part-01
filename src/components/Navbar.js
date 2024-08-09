// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/Navbar.css';
import { useTheme } from '../context/ThemeContext'; // Import useTheme
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa'; // Import icons

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Use theme context
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Clear user session and redirect to login or home page
    // Example: localStorage.removeItem('user');
    navigate('/login'); // Adjust the route as necessary
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/admin" className="navbar-link">Home/Admin</Link>
        </li>
        <li className="navbar-item">
          <Link to="/personal-info" className="navbar-link">Personal Info</Link>
        </li>
        <li className="navbar-item">
          <Link to="/education-details" className="navbar-link">Education Details</Link>
        </li>
        <li className="navbar-item">
          <Link to="/experience-details" className="navbar-link">Experience Details</Link>
        </li>
        <li className="navbar-item">
          <Link to="/project-details" className="navbar-link">Project Details</Link>
        </li>
        <li className="navbar-item">
          <Link to="/skills-details" className="navbar-link">Skills Details</Link>
        </li>
        <li className="navbar-item">
          <div className="theme-toggle-slider" onClick={toggleTheme}>
            <FaSun className={`theme-icon ${isDarkMode ? 'inactive' : 'active'}`} />
            <FaMoon className={`theme-icon ${isDarkMode ? 'active' : 'inactive'}`} />
            <div className={`slider ${isDarkMode ? 'dark' : 'light'}`}></div>
          </div>
        </li>
        <li className="navbar-item">
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
