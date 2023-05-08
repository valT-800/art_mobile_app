
import React, { useContext, useEffect, useState } from "react";
import { Button, SafeAreaView, Text, TouchableHighligh, FlatList, TouchableHighlight, View, TouchableOpacity, StyleSheet } from "react-native";
import api from "../services/api_base";
import { AuthContext } from "../AuthProvider";
import * as SecureStore from 'expo-secure-store'
import { Ionicons } from "@expo/vector-icons";
import Album from "../hooks/Album";
import ImageComponent from "../hooks/Image";
import { Image } from "expo-image";

function ProfileScreen({navigation: {navigate}}){

  const { user, logout } = useContext(AuthContext)
  const[loggedUser, setLoggedUser] = useState([])
  const[albums, setAlbums] = useState([])
  const[images, setImages] = useState([])

  function createdAlbums(){
    api.get('/api/user/albums')
      .then(response => {
        
        console.log("My albums", response.data.data);
        setAlbums(response.data.data);
      })
      .catch(error => {
        console.log(error.response);
      })
  }
  function imagesWithoutAlbum(all){
   let filtered = all.filter(image => {return image.album==null})
   console.log("Filtered", filtered)
    setImages(filtered)
  }
  useEffect(() => {
    api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    
    api.get('/api/user')
      .then(response => {
        
        console.log("User ", response.data)
        setLoggedUser(response.data);
      })
      .catch(error => {
        console.log("Error", error.response);
      })

      api.get('/api/user/albums')
      .then(response => {
        console.log("My albums", response.data.data);
        setAlbums(response.data.data);
        
        

      })
      .catch(error => {
        console.log(error.response);
      })

      api.get('/api/user/images')
      .then(response => {
        imagesWithoutAlbum(response.data.data);
        console.log("My images", response.data.data);
      })
      .catch(error => {
        console.log(error.response);
      })
  }, []);

    return(
        <SafeAreaView style = {styles.container}>
          <Image
          source={loggedUser.profile_photo_url}
          style={{width: 100, height: 100, borderRadius: 2}}>
          </Image>
          <Text>User: {user.name}</Text>
          <Text>User from Server: {loggedUser.name}</Text>
          <Text>{loggedUser.email}</Text>
          <View style = {{ flexDirection: 'row'}}>
            <TouchableHighlight onPress = {() => createdAlbums()}><Text>Created</Text></TouchableHighlight>
          <TouchableHighlight><Text> Saved</Text></TouchableHighlight>
          </View>
          
          <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Text>Albums</Text>
            <Ionicons style={{alignSelf: 'flex-end'}} name = 'add' size={30} onPress={()=> {navigate('NewAlbum')}}></Ionicons>
          </View>
          

            <FlatList
            keyExtractor = {( item) => item.id }
            style = {styles.albums}
            contentContainerStyle={{
            flexGrow: 1,
            flexDirection:'row'
            }}
            horizontal={true}
            nestedScrollEnabled={true}
            data={albums}
            renderItem={({item}) => {
              return(<Album album={item} size={70}></Album>)}}
            ></FlatList>
            <FlatList
            style = {styles.images}
            keyExtractor = {( item, index) => item.id }
            contentContainerStyle={{
              flexGrow: 1,
              flexDirection:'row'
              }}
            numColumns={3}
            data={images}
            renderItem={({item}) => {
            return(<ImageComponent image={item}></ImageComponent>)}}
            ></FlatList>
          
        </SafeAreaView>
    )
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    margin: 5,
  },
  albums: {
    alignSelf: 'flex-start',
    height: 150,
  },
  images: {
    margin: 10,
    
  }
});
