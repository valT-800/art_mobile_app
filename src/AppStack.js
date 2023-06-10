
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { Button, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import NewPostScreen from "./screens/posts/NewPostScreen";
import GlobalScreen from "./screens/GlobalScreen";
import SelectImageScreen from "./screens/posts/SelectImageScreen";
import ProfileScreen from "./screens/user/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import NewAlbumScreen from "./screens/albums/NewAlbumScreen";
import AlbumsScreen from "./screens/albums/AlbumsScreen";
import AlbumScreen from "./screens/albums/AlbumScreen";
import ChallengesScreen from "./screens/challenges/ChallengesScreen";
import ChallengeScreen from "./screens/challenges/ChallengeScreen";
import CommentsScreen from "./screens/comments/CommentsScreen";
import { useTheme } from "@react-navigation/native";
import CustomIcon from "./components/CustomIcon";
import EditProfileScreen from "./screens/user/EditProfileScreen";
import PostScreen from "./screens/posts/PostScreen";
import EditPostScreen from "./screens/posts/EditPostScreen";
import NormalText from "./components/NormalText";
import UserProfileScreen from "./screens/users/UserProfileScreen";
import EditAlbumScreen from "./screens/albums/EditAlbumScreen";
import AddImageToChallenges from "./screens/posts/AddImageToChallenges";
import PickImageFromApp from "./screens/posts/PickImageFromApp";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabContainer ({navigation: {navigate}}) {
  
  const colors = useTheme()
  const{user, logout, error} = useContext(AuthContext);
  const ProfileHeader =()=>{
    return (
      <View style={{flexDirection: 'row'}}>
        <CustomIcon name ='settings-outline' size={30} event={()=>navigate('Settings')}/>
        <CustomIcon name='log-out-outline' size ={30} event={()=>logout()}/>
      </View>
    )
  }
  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      title: '',
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Global') {
          iconName = focused ? 'search' : 'search-outline';
        } else if (route.name === 'SelectImage') {
          iconName = focused ? 'add' : 'add-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }
        // You can return any component that you like here!
        return <CustomIcon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {paddingTop: 10, height: 60}
    })}>
      <Tab.Screen name = "Home" component={HomeScreen} options = {{ headerLeft: ()=> <NormalText text={user.username}/>}}/>
      <Tab.Screen name = "Global" component={GlobalScreen} options = {{headerShown: false}}/>
      <Tab.Screen name = "SelectImage" component={SelectImageScreen} options = {{headerShown: false}}/>
      <Tab.Screen name = "Profile" component={ProfileScreen} options = {{headerLeft: ()=> <NormalText text={user.username}/>, headerRight: () => <ProfileHeader/>}}/>
    </Tab.Navigator>
  )
}

export function AppStack () {
  
  return (
    
      <Stack.Navigator initialRouteName={HomeScreen}>
        <Stack.Screen name = "Private" component={BottomTabContainer} options = {{ headerShown: false}}/>    
        <Stack.Screen name = "NewPost" component={NewPostScreen} options = {{title: 'New post'}}/>
        <Stack.Screen name = 'Settings' component={SettingsScreen}/> 
        <Stack.Screen name = "NewAlbum" component={NewAlbumScreen} options = {{title: 'New album'}}/>
        <Stack.Screen name =  'Albums' component={AlbumsScreen}/>
        <Stack.Screen name =  'Album' component={AlbumScreen}/>
        <Stack.Screen name =  'Challenges' component={ChallengesScreen}/>
        <Stack.Screen name =  'Challenge' component={ChallengeScreen}/>
        <Stack.Screen name =  'Comments' component={CommentsScreen} options = {{title: 'Comments', headerTintColor: 'white'}}/>
        <Stack.Screen name = 'EditProfile' component={EditProfileScreen} options={{title: 'Edit Profile'}}/>
        <Stack.Screen name = 'Post' component={PostScreen} />
        <Stack.Screen name = 'EditPost' component={EditPostScreen} options={{title: 'Edit info'}}/>
        <Stack.Screen name = 'EditAlbum' component={EditAlbumScreen} options={{title: 'Edit info'}}/>
        <Stack.Screen name = 'User' component = {UserProfileScreen} />
        <Stack.Screen name = 'AddToChallenge' component={AddImageToChallenges}/>
        <Stack.Screen name = 'PickImageFromApp' component={PickImageFromApp}/>
      </Stack.Navigator>
  )
}
