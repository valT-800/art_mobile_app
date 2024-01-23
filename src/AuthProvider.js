
import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import {api} from './services/api_base';

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
        register: (name, username, email, password, confirmation_password,isGallerySelected) => {
            api.post('api/register',  {
                name,
                username,
                email,
                password,
                confirmation_password,
                isGallerySelected
                
            }).then(response => {
                //console.log('Data:', response.data.data);
                data = response.data.data;
                
                const userResponse = {
                  id: data.id,
                  name: data.name,
                  username: data.username,
                  token: data.token,
                  roles: data.roles,
                }
                setUser(userResponse);
                setError(null);
                SecureStore.setItemAsync('user', JSON.stringify(userResponse));
            })
            .catch(error => {
              console.log('Register error:', error.response.data);
              setError(error.response.data.data);
            })
        },
        login: (email_or_username, password) => {
          api.post('api/login', {
            email_or_username: email_or_username,
            password,
          })
          .then(response => {
            //console.log('Data:', response.data.data);
            data = response.data.data;
            
            const userResponse = {
              id: data.id,
              name: data.name,
              username: data.username,
              token: data.token,
              roles: data.roles,
            }
            //console.log("User response ", userResponse.token);
            
            setUser(userResponse);
            
            setError(null);
            SecureStore.setItemAsync('user', JSON.stringify(userResponse));
          })
          .catch(error => {
            //console.log('Login error:', error.response.data);
            setError(error.response.data);
          })
        },     
        logout: () => {
          api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
          api.post('api/logout')
          .then(response => {
            //console.log("Logout response: ", response)
            setUser(null);
            SecureStore.deleteItemAsync('user');
          })
          .catch(error => {
            //console.log("Logout error: ", error.response);
          })
        },
        update: (name, username, email)=>{
          api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
          api.put('api/user/update', {edited: true, name, username, email})
          .then(response => {
            //console.log('Data:', response.data.data);
            data = response.data.data;
            
            const userResponse = {
              id: data.id,
              name: data.name,
              username: data.username,
              token: data.token,
              roles: data.roles,
            }
            //console.log("User response ", userResponse.token);
            
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
