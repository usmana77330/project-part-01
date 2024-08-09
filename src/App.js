import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { ThemeProvider, useTheme } from './context/ThemeContext'; // Import useTheme here
import PersonalInfoForm from './components/PersonalInfoForm';
import EducationDetailsForm from './components/EducationDetailsForm';
import ExperienceDetailsForm from './components/ExperienceDetailsForm';
import ProjectDetailsForm from './components/ProjectDetailsForm';
import SkillsDetailsForm from './components/SkillsDetailsForm';
import Navbar from './components/Navbar';
import Admin from './components/Admin';
import './styles/App.css'; // Ensure this file imports the CSS with theme styles
import { UserProvider } from './context/UserContext';

// Helper component to apply the theme class
const ThemedAppContainer = ({ children }) => {
  const { isDarkMode } = useTheme(); // Use useTheme to get the current theme
  return <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>{children}</div>;
};

const App = () => {
  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <ThemedAppContainer>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/admin"
                element={
                  <>
                    <Navbar />
                    <Admin />
                  </>
                }
              />
              <Route
                path="/personal-info"
                element={
                  <>
                    <Navbar />
                    <PersonalInfoForm />
                  </>
                }
              />
              <Route
                path="/education-details"
                element={
                  <>
                    <Navbar />
                    <EducationDetailsForm />
                  </>
                }
              />
              <Route
                path="/experience-details"
                element={
                  <>
                    <Navbar />
                    <ExperienceDetailsForm />
                  </>
                }
              />
              <Route
                path="/project-details"
                element={
                  <>
                    <Navbar />
                    <ProjectDetailsForm />
                  </>
                }
              />
              <Route
                path="/skills-details"
                element={
                  <>
                    <Navbar />
                    <SkillsDetailsForm />
                  </>
                }
              />
            </Routes>
          </ThemedAppContainer>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
