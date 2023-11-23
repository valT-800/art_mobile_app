
import React, { useContext, useEffect, useState } from "react";
import { Button, SafeAreaView, Text, TouchableHighligh, FlatList, TouchableHighlight, View, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { AuthContext } from "../../AuthProvider";
import Album from "../../components/Album";
import PostComponent from "../../components/Post";
import { Post } from "expo-post";
import {NormalText} from "../../components/AppTextComponents";
import {OtherText} from "../../components/AppTextComponents";
import { api } from "../../services/api_base";
import CustomButton from "../../components/CustomButton";
import unfollowUser from "../../utils/unfollowUser";
import followUser from "../../utils/followUser";
function UserProfileScreen({navigation: {navigate}, route}){

  const { user} = useContext(AuthContext)
  const[otherUser, setOtherUser] = useState({})
  const[posts, setPosts] = useState([])
  const[loadingPosts, setLoadingPosts] = useState(true)
  const[loadingUser, setLoadingUser] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const{id} =route.params;

  function getPostsWithoutAlbum(id){
    api.get(`api/posts/noalbum/user/${id}/?page=${currentPage}`)
      .then(response => {
        const { data, meta } = response.data;
        setPosts((prevPosts) => [...prevPosts, ...data]);
        setTotalPages(meta.pagination.last_page);
        setLoadingPosts(false)
      })
      .catch(error => {
        //console.log(error.response);
        setLoadingPosts(false)
    })
  }
  
  
  const isFollowing = (user_id) => {
    //console.log(user_id)
    return otherUser.followers && otherUser.followers.some((follower) => follower.id == user_id);
    
  };

  const handleScrollEnd = (event) => {
    setLoadingPosts(true)
      //console.log(currentPage)
      if (currentPage < totalPages) {
        
        setCurrentPage((prevPage) => prevPage + 1);
        //console.log(currentPage)
    }
  };
  const getUser = async()=>{
    await api.get(`api/users/${id}`)
      .then(response => {
        
        //console.log("Other user ", response.data.data)
        setOtherUser(response.data.data);
        
        setLoadingUser(false)
      }
      )
      .catch(error => {
        //console.log("Error", error.response);   
        setLoadingUser(false)
      })   
  }
  useEffect(() => {
    getUser()
  }, [loadingUser]);
  
  useEffect(()=>{
    getPostsWithoutAlbum(id)
  }, [currentPage])
  
  return(
    
      <SafeAreaView style = {styles.container}>
          {loadingUser ? <ActivityIndicator/> : 
          <ScrollView onScrollEndDrag={handleScrollEnd} scrollEventThrottle={16}>
          <View style={{alignItems: 'center'}}>
            <Post
            source={otherUser.profile_photo_url}
            style={{width: 100, height: 100, borderRadius: 50}}>
            </Post>
            <NormalText text={otherUser.name}/>
            <OtherText text={otherUser.email}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 170}}>
            <NormalText text = {otherUser.followers ? (otherUser.followers.length + " followers"):(0 +" followers")}/>
            <NormalText text = {otherUser.following ? (otherUser.following.length + " following"):(0 +" following")}/>
            </View>
            {isFollowing(user.id) ? (<CustomButton title ='unfollow' onPress={async()=>{
              setLoadingUser(true)
              await unfollowUser(id)}}/>) : (<CustomButton title ='follow' onPress={async()=>{
                setLoadingUser(true)
                await followUser(id)}}/>)}
            
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

          <View style={styles.posts}>
            <FlatList
              data={posts}
              renderItem={({item}) => {
              return(<PostComponent post={item}></PostComponent>)}}
              numColumns={3}
              keyExtractor = {( item, index) => item.id }
            ></FlatList>
          </View>
          {loadingPosts && <ActivityIndicator></ActivityIndicator>}
          </ScrollView>}
        </SafeAreaView>
    )
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
  posts: {
    justifyContent: 'center',
    flex: 1
    
  }
});
