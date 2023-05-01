import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, Text, View, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import app from '../../firebaseConfig'
//import { SetCurrentUser } from '../redux/userSlice';

const loginErrorAlert = (message) => {
    Alert.alert(
        "",
        messageText = message.code === 'auth/invalid-email' ? 'Wrong email address' : 
            message.code === 'auth/wrong-password' ? 'Wrong password' : 
                message.code === 'auth/user-not-found' ? 'User not exist!' : 'Oooppss, something wrong!',
        [
            {
                text: 'OK',
                onPress: () => console.log("OK pressed")
            }
        ]
    )
}

function LoginScreen({ navigation: {navigate}}) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [usernameError, setUsernameError] = useState('false');
    const [passwordError, setPasswordError] = useState('false');
    
    useEffect(() => {
        const subscriber = app.auth().onAuthStateChanged(currentUser => {
            if (currentUser !== null) {
                navigate('Private')
            } else {
                navigate('Login')
            }
        })
        return subscriber
    })

    const passwordErrorChange = (value) => {
        if (value.length < 4) {
            setPassword(value);
            setPasswordError(true);
        } else {
            setPassword(value);
            setPasswordError(false);
        }
    }

    const loginMethod = () => {
        app.auth()
        .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Sign in');
                
            }).catch(err => {
                loginErrorAlert(err);
            })

    }
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 150}}>
            <CustomTextInput
                title="Email"
                placeholder="Enter your email"
                onChangeText={(username) => setEmail(username)}
            />
            
            <CustomTextInput
                title="Password"
                placeholder="Enter your password"
                onChangeText={(password) => passwordErrorChange(password)}
                secureTextEntry={true}
            />
            <CustomButton 
                title="Login"
                onPress={loginMethod} 
                disabled={false}
            />
            <TouchableOpacity onPress={() => navigate('Register')}>
                <Text>No account? Sign up </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

  

export default LoginScreen;