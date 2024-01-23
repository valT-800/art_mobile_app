// CustomColorScheme.js

import React, { useState } from 'react';
import { useColorScheme } from 'react-native';

export const CustomColorSchemeContext = React.createContext();

export const CustomColorSchemeProvider = ({ children }) => {
    const scheme = useColorScheme()
  const [colorScheme, setColorScheme] = useState(scheme);

  const setCustomColorScheme = (scheme) => {
    setColorScheme(scheme);
  };

  return (
    <CustomColorSchemeContext.Provider value={{ colorScheme, setCustomColorScheme }}>
      {children}
    </CustomColorSchemeContext.Provider>
  );
};
