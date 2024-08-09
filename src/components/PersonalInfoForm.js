import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext'; 
import '../styles/Forms.css';

const PersonalInfoForm = () => {
  const { user, updateUser } = useUser();
  const { isDarkMode } = useTheme(); 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [isEditable, setIsEditable] = useState(false); // State to manage edit mode

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zip: user.zip || '',
      });
    } else {
      const savedData = localStorage.getItem('personalData');
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (user) {
      updateUser(formData);
    }
    localStorage.setItem('personalData', JSON.stringify(formData));
    setIsEditable(false); // Switch to read-only mode after saving
  };

  const handleEdit = () => {
    setIsEditable(true); // Switch to editable mode
  };

  return (
    <form
      className={`form-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (isEditable) {
          handleSave();
        }
      }}
    >
      <h2 className={`form-heading ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Personal Information</h2>
      <div className="form-groups">
        <div className="form-group">
          <label htmlFor="firstName" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`form-input ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`form-input ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`form-input ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`form-input ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`form-input ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`form-input ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`form-input ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
          />
        </div>
        <div className="form-group">
          <label htmlFor="zip" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Zip Code</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`form-input ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
          />
        </div>
      </div>
      <button 
        type="button" 
        className={`save-button ${isDarkMode ? 'dark-theme' : 'light-theme'}`} 
        onClick={isEditable ? handleSave : handleEdit}
      >
        {isEditable ? 'Save' : 'Edit'}
      </button>
    </form>
  );
};

export default PersonalInfoForm;
