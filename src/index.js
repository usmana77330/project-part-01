import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/App.css'; // Global styles (optional)
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';

// Ensure ThemeProvider wraps UserProvider for proper context hierarchy
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
