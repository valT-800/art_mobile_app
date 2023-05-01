// ./App.js
// Import React Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegisterationScreen';
import HomeScreen from './src/screens/HomeScreen';
import GlobalScreen from './src/screens/GlobalScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import SelectImageScreen from './src/screens/SelectImageScreen';
import NewPostScreen from './src/screens/NewPostScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const PrivateContainer = ({navigation: {navigate}}) => {
  
  // <Tab.Screen name = "NewPost" component={NewPostScreen} options = {{title: 'New post', headerRight: () =>  <NewPost/>, headerLeft: () =>  <Cancel/>}}/>
  
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
      <Tab.Screen name = "Home" component={HomeScreen} options = {{headerShown: false}}/>
      <Tab.Screen name = "Global" component={GlobalScreen} options = {{headerShown: false}}/>
      <Tab.Screen name = "SelectImage" component={SelectImageScreen} options = {{headerShown: false}}/>
      <Tab.Screen name = "Profile" component={ProfileScreen} options = {{headerShown: false}}/>
    </Tab.Navigator>
  )
}

function Navigation(){
  const scheme = useColorScheme();
  return (
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName={LoginScreen}>
        <Stack.Screen name = "Private" component={PrivateContainer} options = {{ title: 'Art'}}/>
        <Stack.Screen name = "Login" component={LoginScreen} options = {{title: 'Login', headerShown: false}}/>
        <Stack.Screen name = "Register" component={RegistrationScreen} options = {{title: 'Register', headerShown: false}}/>        
        <Stack.Screen name = "NewPost" component={NewPostScreen} options = {{title: 'New post', headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
    
  );
}
export default Navigation;
// Create our main tab navigator for moving between the Feed and Photo screens
/*const navigator = createBottomTabNavigator(
  {
    // The name `Feed` is used later for accessing screens
    Feed: {
      // Define the component we will use for the Feed screen.
      screen: FeedScreen,
      navigationOptions: {
        // Add a cool Material Icon for this screen
        tabBarIcon: tabBarIcon('home'),
      },
    },
    // All the same stuff but for the Photo screen
    Photo: {
      screen: SelectPhotoScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon('add-circle'),
      },
    },
  },
  {
    // We want to hide the labels and set a nice 2-tone tint system for our tabs
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  },
);

// Create the navigator that pushes high-level screens like the `NewPost` screen.
const stackNavigator = createNativeStackNavigator(
  {
    Main: {
      screen: navigator,
      // Set the title for our app when the tab bar screen is present
      navigationOptions: { title: 'Art' },
    },
    // This screen will not have a tab bar
    NewPost: NewPostScreen,
  },
  {
    cardStyle: { backgroundColor: 'white' },
  },
);

// Export it as the root component
export default stackNavigator;
*/