
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { Button, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import NewPostScreen from "./screens/posts/NewPostScreen";
import GlobalScreen from "./screens/GlobalScreen";
import SelectImageScreen from "./screens/posts/SelectImageScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PostsScreen from "./screens/posts/PostsScreen";

import { Ionicons } from '@expo/vector-icons';
import SettingsScreen from "./screens/SettingsScreen";
import NewAlbumScreen from "./screens/albums/NewAlbumScreen";
import AlbumsScreen from "./screens/albums/AlbumsScreen";
import AlbumScreen from "./screens/albums/AlbumScreen";
import ChallengesScreen from "./screens/challenges/ChallengesScreen";
import ChallengeScreen from "./screens/challenges/ChallengeScreen";
import CommentScreen from "./screens/comments/CommentScreen";
import CommentsScreen from "./screens/comments/CommentsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function ProfileHeader({navigation: {navigate}}){
  
}
function BottomTabContainer ({navigation: {navigate}}) {
  
  const{logout, error} = useContext(AuthContext);
  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Global') {
          iconName = focused ? 'search' : 'search-outline';
        } else if (route.name === 'SelectImage') {
          iconName = focused ? 'add' : 'add-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'image' : 'image-outline';
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name = "Home" component={HomeScreen} options = {{title: 'Home'}}/>
      <Tab.Screen name = "Global" component={GlobalScreen} options = {{title: 'Global'}}/>
      <Tab.Screen name = "SelectImage" component={SelectImageScreen} options = {{headerShown: false}}/>
      <Tab.Screen name = "Profile" component={ProfileScreen} options = {{headerRight: () => <View style={{flexDirection: 'row'}}><Ionicons name ='settings' size={30} onPress={()=> {navigate('Settings')}}/>
      <Ionicons name='log-out' size={30} onPress={()=>logout()}></Ionicons></View>}}/>
    </Tab.Navigator>
  )
}

export const AppStack = () => {
  return (
    
        <Stack.Navigator initialRouteName={HomeScreen}>
        <Stack.Screen name = "Private" component={BottomTabContainer} options = {{ title: 'Art',headerShown: false}}/>    
        <Stack.Screen name = "NewPost" component={NewPostScreen} options = {{title: 'New post'}}/>
        <Stack.Screen name =  'Posts' component={PostsScreen}/>
        <Stack.Screen name = 'Settings' component={SettingsScreen}/> 
        <Stack.Screen name = "NewAlbum" component={NewAlbumScreen} options = {{title: 'New album'}}/>
        <Stack.Screen name =  'Albums' component={AlbumsScreen}/>
        <Stack.Screen name =  'Album' component={AlbumScreen}/>
        <Stack.Screen name =  'Challenges' component={ChallengesScreen}/>
        <Stack.Screen name =  'Challenge' component={ChallengeScreen}/>
        <Stack.Screen name =  'Comments' component={CommentsScreen}/>
        <Stack.Screen name =  'Comment' component={CommentScreen}/>
        </Stack.Navigator>
  )
}