import React, { useContext, useState } from "react";
import Checkbox from 'expo-checkbox';
import { AuthContext } from "./AuthProvider";
import { Button, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import CustomButton from "./components/CustomButton";
import {NormalText} from "./components/AppTextComponents";
import { useScrollToTop, useTheme } from "@react-navigation/native";
import CustomInput from "./components/CustomInput";
/*import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
*/
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LoginScreen({ navigation: {navigate} }) {
  const { login, error } = useContext(AuthContext);
  const [email_or_username, setEmailUsername] = useState('');
  const [password, setPassword] = useState('');    
  const[appError, setError]=useState('')
  return (
    <SafeAreaView style={{ flex: 1}}>    
    <ScrollView style={{flex: 1,paddingTop:20}}>  
    <View style={{alignItems: 'center', justifyContent: 'center' }}>
      { error &&
        <Text style={{ color: 'red', marginBottom: 24 }}>{error.message} - {error.data }</Text>
      }
      {appError && <Text style={{ color: 'red', marginBottom: 24 }}>{ appError }</Text>}
      <NormalText text='Email address/Username'/>
      <CustomInput
        style={{  marginBottom:24 }}
        onChangeText={text => setEmailUsername(text)}
        placeholder="Email or username"
        autoCapitalize = 'none'
      />
      <NormalText text='Password'/>
      <CustomInput
        style={{  marginBottom: 24 }}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize = 'none'
      />
      <CustomButton title="Login" onPress={() => {
        if(!email_or_username.trim()) setError('Please provide email or username')
        else if(!password.trim()) setError('Please provide password')
        else {login(email_or_username, password)}}}/>
      <TouchableOpacity onPress={() => navigate('Register')}>
                <NormalText text='No account? Sign up' />
            </TouchableOpacity>
            </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function RegisterScreen({ navigation:{navigate} }) {
/*  GoogleSignin.configure();
signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setName(userInfo.user.name );
      setEmail(userInfo.user.email);
    } catch (error) {
      setError(error)
    }
  };*/
const { register, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');     
  const [confirmation_password, setConfirmedPassword] = useState('');
  const [name, setName] = useState('');
  const[username, setUsername] = useState('');
  const [isGallerySelected, setSelection] = useState(false);
    
  const[appError, setError]=useState('')
  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView style={{flex: 1,paddingTop:20}}>
    <View style={{alignItems: 'center', justifyContent: 'center' }}>
      {appError && <Text style={{ color: 'red', marginBottom: 24 }}>{ appError }</Text>}
      
      { error && error.name &&
      <Text style={{ color: 'red', marginBottom: 24 }}>{error.name}</Text>
      }
      <CustomInput
        style={{  marginBottom: 24 }}
        onChangeText={text => setName(text)}
        placeholder="Name"
        textContentType='name'
      />
      { error && error.username &&
      <Text style={{ color: 'red', marginBottom: 24 }}>{error.username}</Text>
      }
      <CustomInput
      style={{ marginBottom: 24  }}
      onChangeText={text => setUsername(text)}
      placeholder="Username"
      textContentType='nickname'
      autoCapitalize = 'none'
      />
      { error && error.email &&
      <Text style={{ color: 'red', marginBottom: 24 }}>{error.email}</Text>
      }
      {/*<CustomInput
        style={{  marginBottom: 24  }}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
        textContentType="emailAddress"
        keyboardType='email-address'
        autoCapitalize = 'none'
    />*/}
      { error && error.password &&
      <Text style={{ color: 'red', marginBottom: 24 }}>{error.password}</Text>
      }
      <CustomInput
        style={{  marginBottom: 24 }}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize = 'none'
      />
      { error && error.confirmation_password &&
      <Text style={{ color: 'red', marginBottom: 24 }}>{error.confirmation_password}</Text>
      }
      <CustomInput
        style={{ marginBottom: 24 }}
        onChangeText={text => setConfirmedPassword(text)}
        placeholder="Confirm password"
        secureTextEntry={true}
        autoCapitalize = 'none'
      />
      <View style={{flexDirection: 'row',alignItems:'center'}}>
      <Checkbox
          value={isGallerySelected}
          onValueChange={setSelection}
          color={isGallerySelected ? useTheme().colors.primary:useTheme().colors.text}
          style={{margin:5}}
        />
        <NormalText text='Register as gallery user'/>
        </View>
        <View style={{paddingTop: 20, alignItems:'center'}}>
      <CustomButton title="Register"
       onPress={() => {
        if(!name.trim()) setError('Name is required')
        else if (!username.trim()) setError('Username is required')
        else if(!email.trim()) setError('Email is required')
        else if(!password.trim()) setError('Password is required')
        else if(password !== confirmation_password) setError('Passwords do not match')
        else register(name, username, email, password, confirmation_password,isGallerySelected)}}/>
      {/*<GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn}
          disabled={this.state.isSigninInProgress}
       />*/}
      <TouchableOpacity onPress={() => navigate('Login')}>
          <NormalText text='Already have an account? Login' />
      </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}
