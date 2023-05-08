// ./App.js
// Import React Navigation

import { AuthProvider } from './src/AuthProvider';
import Routes from './src/Routes';


export default function Provider (){
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};