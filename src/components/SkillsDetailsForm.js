import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext'; 
import '../styles/Forms.css';

const SkillsDetailsForm = () => {
  const { user, updateUser } = useUser();
  const { isDarkMode } = useTheme(); 
  const [skillsData, setSkillsData] = useState({
    skill: '',
    proficiency: '',
  });
  const [isEditable, setIsEditable] = useState(false); // State to manage edit mode

  useEffect(() => {
    if (user && user.skillsData) {
      setSkillsData(user.skillsData);
    } else {
      const savedSkills = localStorage.getItem('skillsData');
      if (savedSkills) {
        setSkillsData(JSON.parse(savedSkills));
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSkillsData({ ...skillsData, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem('skillsData', JSON.stringify(skillsData));
    if (user) {
      updateUser({ ...user, skillsData });
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
      <h2 className={`form-heading ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Skills Details</h2>
      <div className="form-groups">
        <div className="form-group">
          <label htmlFor="skill" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Skill</label>
          <input
            type="text"
            id="skill"
            name="skill"
            value={skillsData.skill}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`form-input ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
          />
        </div>
        <div className="form-group">
          <label htmlFor="proficiency" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Proficiency</label>
          <input
            type="text"
            id="proficiency"
            name="proficiency"
            value={skillsData.proficiency}
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

export default SkillsDetailsForm;
