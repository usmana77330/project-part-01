import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext'; 
import '../styles/Forms.css';

const ExperienceDetailsForm = () => {
  const { user, updateUser } = useUser();
  const { isDarkMode } = useTheme(); 
  const [experienceData, setExperienceData] = useState({
    company: '',
    role: '',
    duration: '',
  });
  const [isEditable, setIsEditable] = useState(false); // State to manage edit mode

  useEffect(() => {
    if (user && user.experienceData) {
      setExperienceData(user.experienceData);
    } else {
      const savedExperience = localStorage.getItem('experienceData');
      if (savedExperience) {
        setExperienceData(JSON.parse(savedExperience));
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperienceData({ ...experienceData, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem('experienceData', JSON.stringify(experienceData));
    if (user) {
      updateUser({ ...user, experienceData });
    }
    setIsEditable(false); // Switch to read-only mode after saving
  };

  const handleEdit = () => {
    setIsEditable(true); // Switch to editable mode
  };

  return (
    <form
      className={`form-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className={`form-heading ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Experience Details</h2>
      <div className="form-groups">
        <div className="form-group">
          <label htmlFor="company" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={experienceData.company}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`form-input ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={experienceData.role}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`form-input ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Duration</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={experienceData.duration}
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

export default ExperienceDetailsForm;
