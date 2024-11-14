import { createContext, useState, useContext } from 'react';

// Creating the Theme context to manage dark and light mode
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // State to manage whether dark mode is active or not
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle between dark and light mode
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
    // Toggling the 'dark' class on the document element to apply dark mode styles
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    // Providing the theme state and toggle function to the rest of the app
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}  {/* Rendering the children components */}
    </ThemeContext.Provider>
  );
}

// Custom hook to access theme context
export function useTheme() {
  return useContext(ThemeContext);
}
