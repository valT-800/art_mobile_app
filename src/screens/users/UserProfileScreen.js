
import React, { useContext, useEffect, useState } from "react";
import { Button, SafeAreaView, Text, TouchableHighligh, FlatList, TouchableHighlight, View, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { AuthContext } from "../../AuthProvider";
import Album from "../../components/Album";
import ImageComponent from "../../components/Image";
import { Image } from "expo-image";
import {NormalText} from "../../components/AppTextComponents";
import {OtherText} from "../../components/AppTextComponents";
import { api } from "../../services/api_base";
import CustomButton from "../../components/CustomButton";
import unfollowUser from "../../utils/unfollowUser";
import followUser from "../../utils/followUser";
import getUserAlbums from "../../utils/getUserAlbums";
import TouchableSection from "../../components/TouchableSection";
function UserProfileScreen({navigation: {navigate,setOptions}, route}){

  const {user} = useContext(AuthContext)
  const[otherUser, setOtherUser] = useState({})
  const[posts, setPosts] = useState([])
  const[albums, setAlbums] = useState([])
  const[loading, setLoading] = useState(true)
  const[loadingUser, setLoadingUser] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const[pressedSection, setPressedSection]=useState('Posts')

  const{id} =route.params;

  setOptions({
    title:otherUser.username
  })
  const onUserRefresh = () => {
    setLoadingUser(true)
    setLoading(true)
    setPosts([])
    setAlbums([])
    setCurrentPage(1)
    setTimeout(() => {
      setLoadingUser(false);
      setLoading(false)
    }, 1000);
  };
  const getAlbums = async () => {
    await api.get(`api/albums/user/${id}/?page=${currentPage}`).then(response => {
      const { data, meta } = response.data;
      const albumsArray = Object.values(data); 
      setAlbums((prevAlbums) => [...prevAlbums, ...albumsArray]);
      console.log(albums)
      setTotalPages(meta.last_page);
    }).catch(error => {
      console.log("Error", error);
  });  
  setLoading(false);
  }
  function getPostsWithoutAlbum(id){
    api.get(`api/posts/noalbum/user/${id}/?page=${currentPage}`)
      .then(response => {
        const { data, meta } = response.data;
        setPosts((prevPosts) => [...prevPosts, ...data]);
        setTotalPages(meta.pagination.last_page);
        setLoading(false)
      })
      .catch(error => {
        //console.log(error.response);
        setLoading(false)
    })
  }
  
  
  async function isFollowing(){
    await api.get(`api/user/is-following/user/${otherUser.id}`).then(response => {
      console.log('Is following',response.data.isFollowing)
      if(response.data.isFollowing.toString()=="true"){return true}
      else {return false}
  }).catch(error => {
    console.log(error.response);
  })}

  const handleLoadMore = (event) => {
      //console.log(currentPage)
      if (currentPage < totalPages) {
        
        setCurrentPage((prevPage) => prevPage + 1);
        //console.log(currentPage)
        setLoading(true)
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
    if(pressedSection=='Posts') getPostsWithoutAlbum(id);
    else if(pressedSection=='Albums') getAlbums();
  }, [currentPage])
  
  return(
    
      <SafeAreaView style = {styles.container}>
          {loadingUser ? <ActivityIndicator/> : 
          <View>
          <ScrollView
          refreshControl={<RefreshControl refreshing={loadingUser} onRefresh={onUserRefresh} />}>
          <View style={{alignItems: 'center', margin:5}}>
            <Image
            source={otherUser.profile_photo_url}
            style={{width: 100, height: 100, borderRadius: 50}}>
            </Image>
            <NormalText text={otherUser.name}/>
            <OtherText text={otherUser.email}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 170}}>
            <NormalText text = {otherUser.followers + " followers"}/>
            <NormalText text = {otherUser.following  + " following"}/>
            </View>
            {isFollowing() ? (<CustomButton title ='unfollow' onPress={async()=>{
              setLoadingUser(true)
              await unfollowUser(id)}}/>) : (<CustomButton title ='follow' onPress={async()=>{
                setLoadingUser(true)
                await followUser(id)}}/>)}
          </View>
          <View style={{flex: 1}}>
            <View style = {{margin: 5, flexDirection:'row',justifyContent:'space-evenly'}}>
              <TouchableSection title = 'Posts'
                  onPress={() => {
                  setPosts([])
                  setPressedSection('Posts')
                  setCurrentPage(1)
                  getPostsWithoutAlbum(id)
                  }}
                  pressed = {pressedSection}/>    
              <TouchableSection title = 'Albums'
                  onPress={() => {
                  setAlbums([])
                  setPressedSection('Albums')
                  setCurrentPage(1)
                  getAlbums()
                  }}
                  pressed = {pressedSection}/>
                  {otherUser.roles && otherUser.roles.some(r=>r.name=='gallery') && 
              <TouchableSection title = 'Competitions'
                  onPress={() => {
                  setPosts([])
                  setPressedSection('Competitions')
                  setCurrentPage(1)
                  getPostsWithoutAlbum(id)
                  }}
                  pressed = {pressedSection}/>}
                  {otherUser.roles && otherUser.roles.some(r=>r.name=='gallery') &&
              <TouchableSection title = 'Exhibitions'
                  onPress={() => {
                  setAlbums([])
                  setPressedSection('Exhibitions')
                  setCurrentPage(1)
                  getAlbums()
                  }}
                  pressed = {pressedSection}/>}
                  
            </View>
          </View>
          {pressedSection=='Albums' && 
          <FlatList 
            numColumns={3} 
            scrollEnabled={false}
            key={`albumsList-3`}
            contentContainerStyle={styles.albums}
            data={albums}
            renderItem={({item}) => {
              return(<Album album={item}></Album>)}}
          ></FlatList>}

          {pressedSection=='Posts' && 
          <FlatList
            data={posts}
            contentContainerStyle={styles.posts}
            renderItem={({item}) => {
            return(<ImageComponent post={item}></ImageComponent>)}}
            numColumns={3}
            scrollEnabled={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            key={`postsList-3`}
          ></FlatList>}
        {loading && <ActivityIndicator></ActivityIndicator>}
          
          </ScrollView>
          </View>
          }
        </SafeAreaView>
    )
  }

export default UserProfileScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  albums: {
    flex:1,
    alignItems: 'center',
    alignContent: 'space-between'
  },
  posts: {
    flex: 1,
    alignItems: 'stretch'
    
  }
});
