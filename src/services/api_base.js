import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const baseURL = 'http://192.168.1.103:8000/';
export const api = axios.create({
      baseURL: baseURL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        
      },
});

// Set up the interceptors
api.interceptors.request.use(
  function (config) {
    // Set the Authorization header with the token
    let user = SecureStore.getItemAsync('user');
    if(user){
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
      //console.log("User token ", user.token)
    }
    return config;
  }},
  function (error) {
    // Do something with the request error
    return Promise.reject(error);
  }
);
