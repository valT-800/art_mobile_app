import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Button, Text, View, TextInput, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LoginScreen({ navigation: {navigate} }) {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');    

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      { error &&
        <Text style={{ color: 'red', marginBottom: 24 }}>{ error }</Text>
      }
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8 }}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
        textContentType="emailAddress"
        autoCapitalize = 'none'
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8, marginTop: 24 }}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button title="Login" onPress={() => login(email, password)}/>
      {/*<Button title="Go to Register" onPress={() => navigate('Register')}/>*/}
      <TouchableOpacity onPress={() => navigate('Register')}>
                <Text>No account? Sign up </Text>
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
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Register Screen</Text>
      { error &&
        <Text style={{ color: 'red', marginBottom: 24 }}>{ error }</Text>
      }
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8, marginTop: 24 }}
        onChangeText={text => setName(text)}
        placeholder="Name"
        textContentType='name'
      />
      <TextInput
      style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8, marginTop: 24  }}
      onChangeText={text => setUsername(text)}
      placeholder="Username"
      textContentType='nickname'
      autoCapitalize = 'none'
      ></TextInput>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8, marginTop: 24  }}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
        textContentType="emailAddress"
        autoCapitalize = 'none'
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8, marginTop: 24 }}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8, marginTop: 24 }}
        onChangeText={text => setConfirmedPassword(text)}
        placeholder="Confirm password"
        secureTextEntry={true}
      />
      <Button title="Register" onPress={() => register(name, username, email, password, confirmation_password)}/>

      <TouchableOpacity onPress={() => navigate('Login')}>
          <Text>Already have an account? Login </Text>
      </TouchableOpacity>
      {/*<Button title="Go to Login" onPress={() => navigate('Login')} />
      
       <Button title="Go back" onPress={() => goBack()} /> */}
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
