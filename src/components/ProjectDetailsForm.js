import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext'; 
import '../styles/Forms.css';

const ProjectDetailsForm = () => {
  const { user, updateUser } = useUser();
  const { isDarkMode } = useTheme(); 
  const [projectData, setProjectData] = useState({
    projectName: '',
    description: '',
    technologies: '',
  });
  const [isEditable, setIsEditable] = useState(false); // State to manage edit mode

  useEffect(() => {
    if (user && user.projectData) {
      setProjectData(user.projectData);
    } else {
      const savedProject = localStorage.getItem('projectData');
      if (savedProject) {
        setProjectData(JSON.parse(savedProject));
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem('projectData', JSON.stringify(projectData));
    if (user) {
      updateUser({ ...user, projectData });
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
      <h2 className={`form-heading ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Project Details</h2>
      <div className="form-groups">
        <div className="form-group">
          <label htmlFor="projectName" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Project Name</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={projectData.projectName}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`form-input ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Description</label>
          <textarea
            id="description"
            name="description"
            value={projectData.description}
            onChange={handleChange}
            readOnly={!isEditable}
            className={`form-input ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
          />
        </div>
        <div className="form-group">
          <label htmlFor="technologies" className={`form-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>Technologies Used</label>
          <input
            type="text"
            id="technologies"
            name="technologies"
            value={projectData.technologies}
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

export default ProjectDetailsForm;
