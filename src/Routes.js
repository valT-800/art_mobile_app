import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator } from 'react-native';
import { AuthContext } from './AuthProvider';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import * as SecureStore from 'expo-secure-store';

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import {api} from "./services/api_base";
import { CustomColorSchemeContext } from "./CustomColorScheme";

export default function Routes() {
  const { user, setUser, login, logout } = useContext(AuthContext)
  const [loading, setLoading] = useState(true);
  
  const { colorScheme, setCustomColorScheme } = useContext(CustomColorSchemeContext);

  // Add any other logic or state you need for your color scheme selection
  DarkTheme.colors = {
    primary: 'rgb(191, 217, 182)',
  background: 'rgb(1, 1, 1)',
  card: 'rgb(38, 38, 38)',
  text: 'rgb(229, 229, 231)',
  border: 'rgb(58, 58, 58)',
  notification: 'rgb(255, 69, 58)'}
  DefaultTheme.colors={  
    primary: 'rgb(24,58,29)',
    background: 'rgb(254,251,233)',
    card: 'rgb(225,238,221)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  }
  const onColorSchemeChange = (scheme) => {
    setCustomColorScheme(scheme);
  };

  useEffect(() => {
    // check if the user is logged in or not
    
    SecureStore.getItemAsync('user')
      .then(userString => {
        if (userString) {
          // decode it
          // login();
          userObject = JSON.parse(userString)
          //console.log("User check ", userObject)
          setUser(userObject);
          
        }
      if(user){
        api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        api.get('api/user')
        .then(response => {
          //console.log("User ", response.data.data)
        })
        .catch(error => {
          //console.log("Error", error.response);
          SecureStore.deleteItemAsync('user');
          setUser(null);
        })
      }
    
        setLoading(false);
        //SecureStore.deleteItemAsync('user');
      })
      .catch(err => {
        //console.log("Error", err);
        setLoading(false);
      })
  }, [loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  
  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme }>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}