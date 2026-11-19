import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ dark: true, toggleTheme: () => {} });

function getInitialTheme() {
  const savedTheme = document.documentElement.dataset.theme;
  if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme === 'dark';

  try {
    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme === 'dark';
  } catch (error) {
    console.error('Unable to read the saved theme preference.', error);
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function hasSavedTheme() {
  try {
    const storedTheme = window.localStorage.getItem('theme');
    return storedTheme === 'dark' || storedTheme === 'light';
  } catch (error) {
    console.error('Unable to check the saved theme preference.', error);
    return false;
  }
}

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = dark ? 'dark' : 'light';
    root.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handlePreferenceChange = event => {
      if (!hasSavedTheme()) setDark(event.matches);
    };

    mediaQuery.addEventListener('change', handlePreferenceChange);
    return () => mediaQuery.removeEventListener('change', handlePreferenceChange);
  }, []);

  const toggleTheme = () => {
    const nextDark = !dark;
    try {
      window.localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Unable to save the theme preference.', error);
    }
    setDark(nextDark);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
