import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator } from 'react-native';
import { AuthContext } from './AuthProvider';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import * as SecureStore from 'expo-secure-store';

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

export default function Routes() {
  const { user, setUser, login, logout } = useContext(AuthContext)
  const [loading, setLoading] = useState(true);

  /*useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        if (userString) {
          const userObject = JSON.parse(userString);
          setUser(userObject);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getUserFromStorage();
  }, []);*/

  useEffect(() => {
    // check if the user is logged in or not
    SecureStore.getItemAsync('user')
      .then(userString => {
        if (userString) {
          // decode it
          // login();
          userObject = JSON.parse(userString)
          console.log("User check ", userObject)
          setUser(userObject);
          
        }
        setLoading(false);
        //SecureStore.deleteItemAsync('user');
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <NavigationContainer theme={useColorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}