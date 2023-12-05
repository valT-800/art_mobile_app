
import React, { useContext, useEffect, useState } from "react";
import {SafeAreaView, Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import {api} from "../../services/api_base";
import { AuthContext } from "../../AuthProvider";
import CustomIcon from "../../components/CustomIcon";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

function EditProfileScreen({navigation: {navigate, setOptions}}){

  const { user, update,error } = useContext(AuthContext)
  const[loggedUser, setLoggedUser] = useState({})
  const[name, setName] = useState('')
  const[username, setUsername] = useState('')
  const[email, setEmail] = useState('')
  const [loading, setLoading] =useState(true)

  setOptions({
    headerRight: () =>
    <CustomIcon name='checkmark' size = {30} event={()=>updateUserInfo()}></CustomIcon>
    });
    
  const updateUserInfo =async()=>{
    //console.log(name,username,email)
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
        
        //console.log("User ", response.data)
        setLoggedUser(response.data.data);
        setUser(response.data.data);
        setLoading(false)
      })
      .catch(error => {
        console.log("Error", error.response);
        setLoading(false)
      })
          
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
            <CustomButton title={'Upload picture'}/>
          </View>
          { error && error.data.name &&
          <Text style={{ color: 'red', marginBottom: 24 }}>{error.data.name}</Text>
          }
          <CustomInput
              onChangeText={setName}
              placeholder="Name"
              textContentType='name'
              value={name}
          />
          { error && error.data.username &&
          <Text style={{ color: 'red', marginBottom: 24 }}>{error.data.username}</Text>
          }
          <CustomInput
              onChangeText={setUsername}
              placeholder="Username"
              textContentType='nickname'
              value={username}
          />
          { error && error.data.email &&
          <Text style={{ color: 'red', marginBottom: 24 }}>{error.data.email}</Text>
          }
          <CustomInput
              onChangeText={setEmail}
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
  posts: {
    justifyContent: 'center',
    flex: 1
    
  }
});
