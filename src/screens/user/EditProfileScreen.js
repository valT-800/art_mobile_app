
import React, { useContext, useEffect, useState } from "react";
import { Button, SafeAreaView, Text, TouchableHighligh, FlatList, TouchableHighlight, View, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import {api} from "../../services/api_base";
import { AuthContext } from "../../AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import CustomIcon from "../../components/CustomIcon";
import CustomInput from "../../components/CustomInput";

function EditProfileScreen({navigation: {navigate, setOptions}}){

  const { user, update } = useContext(AuthContext)
  const[loggedUser, setLoggedUser] = useState({})
  const[name, setName] = useState('')
  const[username, setUsername] = useState('')
  const[email, setEmail] = useState('')
  const [loading, setLoading] =useState(true)
  const updateUserInfo =async()=>{
    
    update(name, username, email)
    setLoading(true)
  }

  const setUser=(user)=>{
    setName(user.name);
    setEmail(user.email);
    setUsername(user.username)
  }
  useEffect(() => {
    api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    
    api.get('api/user')
      .then(response => {
        
        console.log("User ", response.data)
        setLoggedUser(response.data.data);
        setUser(response.data.data);
        setLoading(false)
      })
      .catch(error => {
        console.log("Error", error.response);
        setLoading(false)
      })
      setOptions({
        headerRight: () =>
        <CustomIcon name='checkmark' size = {30} event={()=>updateUserInfo()}></CustomIcon>
        });    
  }, [loading]);

    return(
        <SafeAreaView style = {styles.container}>
          {loading ? <ActivityIndicator/> :
          <View style = {{margin: 15, width: '100%', alignItems:'center'}}>
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
            <CustomInput
                onChangeText={text=>setUsername(text)}
                placeholder="Username"
                textContentType='nickname'
                value={username}
            />
            <CustomInput
                onChangeText={text=>setEmail(text)}
                placeholder="Email"
                textContentType='emailAddress'
                value={email}
            />
            </View>}
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
