
import React, { useContext} from "react";
import { AuthContext } from "./AuthProvider";
import { Platform, StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import NewPostScreen from "./screens/posts/NewPostScreen";
import GlobalScreen from "./screens/GlobalScreen";
import SelectFileScreen from "./screens/posts/SelectFileScreen";
import ProfileScreen from "./screens/user/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import NewAlbumScreen from "./screens/albums/NewAlbumScreen";
import AlbumScreen from "./screens/albums/AlbumScreen";
import CompetitionScreen from "./screens/competitions/CompetitionScreen";
import EditCompetitionScreen from "./screens/competitions/EditCompetitionScreen";
import ExhibitionScreen from "./screens/exhibitions/ExhibitionScreen";
import CommentsScreen from "./screens/comments/CommentsScreen";
import { useTheme } from "@react-navigation/native";
import CustomIcon from "./components/CustomIcon";
import EditProfileScreen from "./screens/user/EditProfileScreen";
import PostScreen from "./screens/posts/PostScreen";
import PostFullScreen from "./screens/posts/PostFullScreen";
import EditPostScreen from "./screens/posts/EditPostScreen";
import { CustomHeader2} from "./components/AppTextComponents";
import UserProfileScreen from "./screens/users/UserProfileScreen";
import EditAlbumScreen from "./screens/albums/EditAlbumScreen";
import PickPostFromAppScreen from "./screens/posts/PickPostFromAppScreen";
import NewCompetitionScreen from "./screens/competitions/NewCompetitionScreen";
import NewExhibitionScreen from "./screens/exhibitions/NewExhibitionScreen";
import PlannedExhibitionsScreen from "./screens/exhibitions/PlannedExhibitionsScreen";
import FollowingUsersScreen from "./screens/users/FollowingUsersScreen";
import FollowersScreen from "./screens/users/FollowersScreen";
import GalleryProfileScreen from "./screens/gallery/ProfileScreen";
import CompetitionPostScreen from "./screens/posts/CompetitionPostScreen";
import AlbumsScreen from "./screens/albums/AlbumsScreen";
import EditExhibitionScreen from "./screens/exhibitions/EditExhibitionScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import NewContentScreen from "./screens/NewContentScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Header =()=>{
  const{user} = useContext(AuthContext);
  return(
    <View style={{paddingHorizontal: 10}}><CustomHeader2 text={user.username}/></View>
  )
}
function BottomTabContainer ({navigation: {navigate}}) {
  
  const{user} = useContext(AuthContext);
  const colors = useTheme()
  const ProfileHeader =()=>{
    return (
      <View style={{flexDirection: 'row'}}>
        <CustomIcon name ='menu-outline' size={30} event={()=>navigate('Settings')}/>
      </View>
    )
  }

  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      title: '',
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        size = 30;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Global') {
          iconName = focused ? 'search' : 'search-outline';
        } else if (route.name === 'NewContent') {
          iconName = focused ? 'add-circle' : 'add';
        } else if (route.name === 'Notifications') {
          iconName = focused ? 'notifications-sharp' : 'notifications-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }
        // You can return any component that you like here!
        return <CustomIcon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: styles.tabBar
    })}>
      <Tab.Screen name = "Home" component={HomeScreen} options = {{ headerLeft: ()=> <Header/>}}/>
      <Tab.Screen name = "Global" component={GlobalScreen} options = {{headerShown: false}}/>
      <Tab.Screen name = "NewContent" component={NewContentScreen} options = {{headerShown: false}}/>
      <Tab.Screen name = "Notifications" component={NotificationsScreen} options = {{ headerLeft: ()=> <Header/>}}/>
      {user.roles.some((role) => role.name === 'gallery') ? <Tab.Screen name = "Profile" component={GalleryProfileScreen} options={{headerLeft: ()=> <Header/>, headerRight: () => <ProfileHeader/>}}/> : <Tab.Screen name = "Profile" component={ProfileScreen} options = {{headerLeft: ()=> <Header/>, headerRight: () => <ProfileHeader/>}}/>}
    </Tab.Navigator>
  )
}

export function AppStack () {
  
  return (
      <Stack.Navigator initialRouteName={HomeScreen}>
        <Stack.Screen name = "Private" component={BottomTabContainer} options = {{ headerShown: false}}/>
        <Stack.Screen name = "SelectFile" component={SelectFileScreen} options = {{title: 'New post'}}/>    
        <Stack.Screen name = "NewPost" component={NewPostScreen} options = {{title: 'New post'}}/>
        <Stack.Screen name = 'Settings' component={SettingsScreen}/> 
        <Stack.Screen name = "NewAlbum" component={NewAlbumScreen} options = {{title: 'New album'}}/>
        <Stack.Screen name =  'Album' component={AlbumScreen} options = {{title: ''}}/>
        <Stack.Screen name =  'Albums' component={AlbumsScreen} options = {{title: 'My Albums'}}/>
        <Stack.Screen name = "NewCompetition" component={NewCompetitionScreen} options = {{title: 'New competition'}}/>
        <Stack.Screen name =  'Competition' component={CompetitionScreen} options = {{title: '', headerTransparent: true}}/>
        <Stack.Screen name = "NewExhibition" component={NewExhibitionScreen} options = {{title: 'New exhibition'}}/>
        <Stack.Screen name =  'Exhibition' component={ExhibitionScreen} options = {{title: '', headerTransparent: true}}/>
        <Stack.Screen name =  'PlannedExhibitions' component={PlannedExhibitionsScreen} options = {{title: 'Planned exhibitions'}}/>
        <Stack.Screen name =  'Comments' component={CommentsScreen} options = {{title: 'Comments'}}/>
        <Stack.Screen name = 'EditProfile' component={EditProfileScreen} options={{title: 'Edit Profile'}}/>
        <Stack.Screen name = 'Post' component={PostScreen} options = {{title: '', headerTransparent: true}}/>
        <Stack.Screen name = 'PostFull' component={PostFullScreen} options = {{title: '', headerTransparent: true}}/>
        <Stack.Screen name = 'CompetitionPost' component={CompetitionPostScreen} options = {{title: '', headerTransparent: true}}/>
        <Stack.Screen name = 'EditPost' component={EditPostScreen} options={{title: 'Edit info'}}/>
        <Stack.Screen name = 'EditAlbum' component={EditAlbumScreen} options={{title: 'Edit info'}}/>
        <Stack.Screen name = 'EditCompetition' component={EditCompetitionScreen} options={{title: 'Edit info'}}/>
        <Stack.Screen name = 'EditExhibition' component={EditExhibitionScreen} options={{title: 'Edit info'}}/>
        <Stack.Screen name = 'User' component = {UserProfileScreen} options = {{title: ''}}/>
        <Stack.Screen name =  'FollowingUsers' component={FollowingUsersScreen} options = {{title: 'Following'}}/>
        <Stack.Screen name =  'Followers' component={FollowersScreen} options = {{title: 'Followers'}}/>
        <Stack.Screen name = 'PickPostFromApp' component={PickPostFromAppScreen} options = {{title: '', headerTransparent: true}}/>
      </Stack.Navigator>
  )
}
const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === 'ios' ? 70 : 60,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0
  }
})
