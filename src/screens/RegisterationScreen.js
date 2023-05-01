import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import app from '../../firebaseConfig'
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';

const registrationErrorAlert = (message) => {
    Alert.alert(
        "",
        messageText = message.code === 'auth/email-already-in-use' ? 'That email address is already in use!' : 
            message.code === 'auth/invalid-email' ? 'That email address is invalid!' : 'Ooppss, something wrong',
        [
            {
                text: 'OK',
                onPress: () => console.log("OK pressed")
            }
        ]
    )
}

function RegistrationScreen({navigation: {navigate}}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);



    const passwordErrorChange = (value) => {
        if (value.length < 4) {
            setPassword(value);
            setPasswordError(true);
        } else {
            setPassword(value);
            setPasswordError(false);
        }
    }
    const registerUser = () => {
        const registerObj = {
            email: email,
            password: password
        }
        console.log('register', registerObj)
        app.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                alert("Registration is successful");
                navigate('Login');
            })
            .catch(err => {
                console.log(err)
                registrationErrorAlert(err);
            })
    }
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 150}}>
            <CustomTextInput 
                title="Email"
                placeholder="Enter your email"
                onChangeText={(email) => setEmail(email)}
            />
            <CustomTextInput 
                title="Password"
                placeholder="Enter your password"
                onChangeText={(password) => passwordErrorChange(password)}
            />
            {passwordError ? (
                <View>
                    <Text>Password must contain at least 3 characters</Text>
                </View>
            ) : null}
            <CustomButton
                title="Register"
                onPress={registerUser}
                disabled={passwordError === true ? true : false }
            />
            <TouchableOpacity onPress={() => navigate('Login')}>
                <Text>Already have an account? Sign in</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default RegistrationScreen;