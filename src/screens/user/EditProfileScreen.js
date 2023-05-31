
import React, { useContext, useEffect, useState } from "react";
import { Button, SafeAreaView, Text, TouchableHighligh, FlatList, TouchableHighlight, View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Image } from "expo-image";
import {api} from "../../services/api_base";
import { AuthContext } from "../../AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import CustomIcon from "../../components/CustomIcon";
import CustomInput from "../../components/CustomInput";

function EditProfileScreen({navigation: {navigate, setOptions}}){

  const { user, logout } = useContext(AuthContext)
  const[loggedUser, setLoggedUser] = useState([])
  const[name, setName] = useState('')
  const[username, setUsername] = useState('')
  const[email, setEmail] = useState('')

  const updateUserInfo =()=>{
    api.put(`/api/user/users/${loggedUser.id}`, {name, username, email})
      .then(response => {
        
        console.log("User ", response.data)
        setLoggedUser(response.data);
      })
      .catch(error => {
        console.log("Error", error.response);
      })
  }

  const setUser=()=>{
    setName(loggedUser.name);
    setEmail(loggedUser.email);
    setUsername(loggedUser.username)
  }
  useEffect(() => {
    api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    
    api.get('/api/user')
      .then(response => {
        
        console.log("User ", response.data)
        setLoggedUser(response.data);
        setUser();

      })
      .catch(error => {
        console.log("Error", error.response);
      })
      setOptions({
        headerRight: () =>
        <CustomIcon name='checkmark' size = {30} event={()=>updateUserInfo()}></CustomIcon>
        });    
  }, []);

    return(
        <SafeAreaView style = {styles.container}>
          <View style = {{alignItems:'center', padding:10}}>
            <Image
            source={loggedUser.profile_photo_url}
            style={{width: 100, height: 100, borderRadius: 50}}>
            </Image>
            <TouchableOpacity><Text>Edit picture</Text></TouchableOpacity>
        </View>
        <CustomInput
          onChangeText={text=>setName(text)}
          placeholder="Name"
          textContentType='name'
          value={name}
        />
            <TextInput
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8, marginTop: 24 }}
                onChangeText={text=>setName(text)}
                placeholder="Name"
                textContentType='name'
                value={name}
            />
            <TextInput
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8, marginTop: 24 }}
                onChangeText={text=>setUsername(text)}
                placeholder="Username"
                textContentType='username'
                value={username}
            />
            <TextInput
                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8, marginTop: 24 }}
                onChangeText={text=>setEmail(text)}
                placeholder="Email"
                textContentType='email'
                value={email}
            />
        </SafeAreaView>
    )
}
export default EditProfileScreen;

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    flex: 1
  },
  albums: {
    alignItems: 'flex-start',
  },
  images: {
    justifyContent: 'center',
    flex: 1
    
  }
});
