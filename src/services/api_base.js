import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
      baseURL: 'http://192.168.1.103:8000',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        
      },
});

export default api;