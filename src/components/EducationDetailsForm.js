import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext'; 
import '../styles/Forms.css';

const EducationDetailsForm = () => {
  const { user, updateUser } = useUser();
  const { isDarkMode } = useTheme(); 
  const [educationData, setEducationData] = useState({
    degree: '',
    institution: '',
    year: '',
  });
  const [isEditable, setIsEditable] = useState(false); // State to manage edit mode

  useEffect(() => {
    if (user && user.educationData) {
      setEducationData(user.educationData);
    } else {
      const savedEducation = localStorage.getItem('educationData');
      if (savedEducation) {
        setEducationData(JSON.parse(savedEducation));
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationData({ ...educationData, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem('educationData', JSON.stringify(educationData));
    if (user) {
      updateUser({ ...user, educationData });
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
      <h2 className={`form-heading ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Education Details</h2>
      <div className="form-groups">
        <div className="form-group">
          <label htmlFor="degree" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Degree</label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={educationData.degree}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`form-input ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
          />
        </div>
        <div className="form-group">
          <label htmlFor="institution" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Institution</label>
          <input
            type="text"
            id="institution"
            name="institution"
            value={educationData.institution}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`form-input ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
          />
        </div>
        <div className="form-group">
          <label htmlFor="year" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Year</label>
          <input
            type="text"
            id="year"
            name="year"
            value={educationData.year}
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

export default EducationDetailsForm;
