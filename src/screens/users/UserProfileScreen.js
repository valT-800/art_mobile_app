
import React, { useContext, useEffect, useState } from "react";
import { Button, SafeAreaView, Text, TouchableHighligh, FlatList, TouchableHighlight, View, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../../AuthProvider";
import Album from "../../components/Album";
import ImageComponent from "../../components/Image";
import { Image } from "expo-image";
import NormalText from "../../components/NormalText";
import OtherText from "../../components/OtherText";
import CustomIcon from "../../components/CustomIcon";
import { api } from "../../services/api_base";
import CustomButton from "../../components/CustomButton";

function UserProfileScreen({navigation: {navigate}, route}){

  const { user} = useContext(AuthContext)
  const[otherUser, setOtherUser] = useState({})
  const[images, setImages] = useState([])
  const[loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const{id} =route.params;

  function followUser(id){
    setLoading(true)
    api.put(`api/user/users/${id}`,{
      follow: true,
      following_id: id
    }).then(response => {
      setLoading(false)
    })
    .catch(error => {
      setLoading(false)
  })
  }
  function unfollowUser(id){
    setLoading(true)
    api.put(`api/user/users/${id}`,{
      unfollow: true,
      following_id: id
    }).then(response => {
      setLoading(false)
    })
    .catch(error => {
      console.log(error.response);
      setLoading(false)
  })
  }
  function getImagesWithoutAlbum(id){
    api.get(`api/images/noalbum/user/${id}`)
      .then(response => {
        setImages(response.data.data.data)
        const { data, meta } = response.data;
        setImages((prevImages) => [...prevImages, ...data]);
        setTotalPages(meta.pagination.total_pages);
      })
      .catch(error => {
        console.log(error.response);
    })
  }
  
  const isFollowing = (user_id) => {
    console.log(user_id)
    return otherUser.followers && otherUser.followers.some((follower) => follower.id == user_id);
    
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    api.get(`api/users/${id}`)
      .then(response => {
        
        console.log("User ", response.data.data)
        setOtherUser(response.data.data);
        getImagesWithoutAlbum(id);
        setLoading(false)
      }
      )
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
            source={otherUser.profile_photo_url}
            style={{width: 100, height: 100, borderRadius: 50}}>
            </Image>
            <NormalText text={otherUser.name}/>
            <OtherText text={otherUser.email}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 170}}>
            <NormalText text = {otherUser.followers ? (otherUser.followers.length + " followers"):(0 +" followers")}/>
            <NormalText text = {otherUser.following ? (otherUser.following.length + " following"):(0 +" following")}/>
            </View>
            {isFollowing(user.id) ? (<CustomButton title ='unfollow' onPress={()=>unfollowUser(id)}/>) : (<CustomButton title ='follow' onPress={()=>followUser(id)}/>)}
            
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
              data={otherUser.albums}
              renderItem={({item}) => {
                return(<Album album={item}></Album>)}}
            ></FlatList>
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
export default UserProfileScreen;

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
