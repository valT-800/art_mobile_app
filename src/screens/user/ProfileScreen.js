
import React, { useContext, useEffect, useState } from "react";
import { Button, SafeAreaView, Text, TouchableHighligh, FlatList, TouchableHighlight, View, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import {api} from "../../services/api_base";
import { AuthContext } from "../../AuthProvider";
import * as SecureStore from 'expo-secure-store'
import { Ionicons } from "@expo/vector-icons";
import Album from "../../components/Album";
import ImageComponent from "../../components/Image";
import { Image } from "expo-image";
import CustomButton from "../../components/CustomButton";
import NormalText from "../../components/NormalText";
import OtherText from "../../components/OtherText";
import CustomIcon from "../../components/CustomIcon";
import TouchableSection from "../../components/TouchableSection";

function ProfileScreen({navigation: {navigate}}){

  const { user, logout } = useContext(AuthContext)
  const[loggedUser, setLoggedUser] = useState([])
  const[albums, setAlbums] = useState([])
  const[images, setImages] = useState([])
  const[loading, setLoading] = useState(true)
  const[pressedSection, setPressedSection]=useState('Created')
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
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
  
  function getImagesWithoutAlbum(user_id){
    api.get(`api/images/noalbum/user/${user_id}`)
      .then(response => {
        console.log("Filtered", response.data)
        const{data, meta} =response.data;
        setImages((prevImage) => [...prevImage, ...data]);
        setTotalPages(meta.total_pages);
      })
      .catch(error => {
        console.log(error.response);
    })
  }

  function getLikedImages(){
    loggedUser.liked_images ? setImages(loggedUser.liked_images) : setImages([])
  }
  function getSavedImages(){
    loggedUser.saved_images ? setImages(loggedUser.saved_images) : setImages([])
  }

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    
    api.get('/api/user')
      .then(response => {
        
        setLoggedUser(response.data.data);
        createdAlbums();
        getImagesWithoutAlbum(loggedUser.id);
        setLoading(false)
      })
      .catch(error => {
        console.log("Error", error.response);   
        setLoading(false)
      })   
      
  }, [currentPage]);

  if(loading){
    return(
      <SafeAreaView>
        <ActivityIndicator/>
      </SafeAreaView>
    )
  }
  else{

    return(
        <SafeAreaView style = {styles.container}>
          
          <View style={{alignItems: 'center'}}>
            <Image
            source={loggedUser.profile_photo_url}
            style={{width: 100, height: 100, borderRadius: 50}}>
            </Image>
            <NormalText text={loggedUser.name}/>
            <OtherText text={loggedUser.email}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 170}}>
            <NormalText text = {loggedUser.followers ? (loggedUser.followers.length + " followers"):(0 +" followers")}/>
            <NormalText text = {loggedUser.following ? (loggedUser.following.length + " following"):(0 +" following")}/>
            </View>
            <CustomButton title ='Edit profile' onPress={()=>navigate('EditProfile', loggedUser)}></CustomButton>
            
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <CustomIcon name = 'add' size={30} event={()=> {navigate('NewAlbum')}}/>
          </View>
          <View style = {styles.albums}>
            <FlatList
              keyExtractor = {( item) => item.id }
              
              contentContainerStyle={{
              flexGrow: 1,
              flexDirection:'row'
              }}
              horizontal={true}
              nestedScrollEnabled={true}
              data={albums}
              renderItem={({item}) => {
                return(<Album album={item}></Album>)}}
            ></FlatList>
          </View>

          <View style = {{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: '100%', padding:15}}>
            <TouchableSection title = 'Created' 
            onPress={() => {
              getImagesWithoutAlbum(loggedUser.id)
              setPressedSection('Created')
            }} 
            pressed = {pressedSection}/>
            <TouchableSection title = 'Saved'
            onPress={() => {
              getSavedImages()
              setPressedSection('Saved')
            }} 
            pressed = {pressedSection}/>
            <TouchableSection title = 'Liked'
            onPress={() => {
              getLikedImages()
              setPressedSection('Liked')
            }} 
             pressed = {pressedSection}/>
          </View>

          <View style={styles.images}>
            <FlatList
              data={images}
              renderItem={({item}) => {
              return(<ImageComponent image={item}></ImageComponent>)}}
              numColumns={3}
              keyExtractor = {( item, index) => item.id }
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.1}
            ></FlatList>
          </View>
        </SafeAreaView>
    )}
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
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
