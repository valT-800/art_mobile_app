// ./App.js
// Import React Navigation

import { AuthProvider } from './src/AuthProvider';
import Routes from './src/Routes';
import { CustomColorSchemeProvider } from './src/screens/CustomColorScheme';


export default function Provider (){
  return (
    <AuthProvider>
      <CustomColorSchemeProvider>
      <Routes />
      </CustomColorSchemeProvider>
    </AuthProvider>
    
  );
};