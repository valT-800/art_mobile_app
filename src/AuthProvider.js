
import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import {api} from './services/api_base';
//api.defaults.baseURL = 'http://192.168.1.103:8000';
export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        register: (name, username, email, password, confirmation_password) => {
            api.post('api/register',  {
                name,
                username,
                email,
                password,
                confirmation_password,
                
            }).then(response => {
                console.log('Data:', response.data.data);
                data = response.data.data;
                
                const userResponse = {
                  id: data.id,
                  name: data.name,
                  username: data.username,
                  token: data.token,
                }
                setUser(userResponse);
                setError(null);
                SecureStore.setItemAsync('user', JSON.stringify(userResponse));
            })
            .catch(error => {
              console.log('Register error:', error.response.data);
              setError(error.response.data);
            })
        },
        login: (email, password) => {
          api.post('api/login', {
            email,
            password,
          })
          .then(response => {
            console.log('Data:', response.data.data);
            data = response.data.data;
            
            const userResponse = {
              id: data.id,
              name: data.name,
              username: data.username,
              token: data.token,
            }
            console.log("User response ", userResponse.token);
            
            setUser(userResponse);
            
            setError(null);
            SecureStore.setItemAsync('user', JSON.stringify(userResponse));
          })
          .catch(error => {
            console.log('Login error:', error.response.data);
            setError(error.response.data);
          })
        },     
        logout: () => {
          api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
          api.post('api/logout')
          .then(response => {
            console.log("Logout response: ", response)
            setUser(null);
            SecureStore.deleteItemAsync('user');
          })
          .catch(error => {
            console.log("Logout error: ", error.response);
          })
        },
        update: (name, username, email)=>{
          api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
          api.put('api/user/update', {name, username, email})
          .then(response => {
            console.log('Data:', response.data.data);
            data = response.data.data;
            
            const userResponse = {
              id: data.id,
              name: data.name,
              username: data.username,
              token: data.token,
            }
            console.log("User response ", userResponse.token);
            
            setUser(userResponse);
            
            setError(null);
            SecureStore.setItemAsync('user', JSON.stringify(userResponse));
          })
          .catch(error => {
            console.log('Update error:', error.response.data);
            setError(error.response.data);
          })
        }
      }}>
      {children}
    </AuthContext.Provider>
  );
}
