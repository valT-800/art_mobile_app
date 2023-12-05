import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Button, Text, View, TextInput, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import CustomButton from "./components/CustomButton";
import {NormalText} from "./components/AppTextComponents";
import { useScrollToTop } from "@react-navigation/native";
import CustomInput from "./components/CustomInput";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LoginScreen({ navigation: {navigate} }) {
  const { login, error } = useContext(AuthContext);
  const [email_or_username, setEmailUsername] = useState('');
  const [password, setPassword] = useState('');    
  const[appError, setError]=useState('')
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
      />
      <CustomButton title="Login" onPress={() => {
        if(!email_or_username.trim()) setError('Please provide email or username')
        else if(!password.trim()) setError('Please provide password')
        else {login(email_or_username, password)}}}/>
      <TouchableOpacity onPress={() => navigate('Register')}>
                <NormalText text='No account? Sign up' />
            </TouchableOpacity>
    </View>
  );
}

function RegisterScreen({ navigation:{navigate} }) {
const { register, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');     
  const [confirmation_password, setConfirmedPassword] = useState('');
  const [name, setName] = useState('');
  const[username, setUsername] = useState('');
    
  const[appError, setError]=useState('')
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      {appError && <Text style={{ color: 'red', marginBottom: 24 }}>{ appError }</Text>}
      
      { error && error.data.name &&
      <Text style={{ color: 'red', marginBottom: 24 }}>{error.data.name}</Text>
      }
      <CustomInput
        style={{  marginBottom: 24 }}
        onChangeText={text => setName(text)}
        placeholder="Name"
        textContentType='name'
      />
      { error && error.data.username &&
      <Text style={{ color: 'red', marginBottom: 24 }}>{error.data.username}</Text>
      }
      <CustomInput
      style={{ marginBottom: 24  }}
      onChangeText={text => setUsername(text)}
      placeholder="Username"
      textContentType='nickname'
      autoCapitalize = 'none'
      />
      { error && error.data.email &&
      <Text style={{ color: 'red', marginBottom: 24 }}>{error.data.email}</Text>
      }
      <CustomInput
        style={{  marginBottom: 24  }}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
        textContentType="emailAddress"
        keyboardType='email-address'
        autoCapitalize = 'none'
      />
      { error && error.data.password &&
      <Text style={{ color: 'red', marginBottom: 24 }}>{error.data.password}</Text>
      }
      <CustomInput
        style={{  marginBottom: 24 }}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        secureTextEntry={true}
      />
      { error && error.data.confirmation_password &&
      <Text style={{ color: 'red', marginBottom: 24 }}>{error.data.confirmation_password}</Text>
      }
      <CustomInput
        style={{ marginBottom: 24 }}
        onChangeText={text => setConfirmedPassword(text)}
        placeholder="Confirm password"
        secureTextEntry={true}
      />
      <CustomButton title="Register" onPress={() => {
        if(!email.trim()) setError('Email is required')
        else if (!username.trim()) setError('Username is required')
        else if(!password.trim()) setError('Password is required')
        else if(password !== confirmation_password) setError('Passwords do not match')
        else register(name, username, email, password, confirmation_password)}}/>

      <TouchableOpacity onPress={() => navigate('Login')}>
          <NormalText text='Already have an account? Login' />
      </TouchableOpacity>
    </View>
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
