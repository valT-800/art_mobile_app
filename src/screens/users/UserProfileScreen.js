
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
import Competition from "../../components/Competition";
import Exhibition from "../../components/Exhibition";
import unfollowUser from "../../utils/unfollowUser";
import followUser from "../../utils/followUser";
import TouchableSection from "../../components/TouchableSection";
import Divider from "../../components/Divider";
function UserProfileScreen({navigation: {setOptions}, route}){

  const {user} = useContext(AuthContext)
  const[otherUser, setOtherUser] = useState([])
  const[posts, setPosts] = useState([])
  const[albums, setAlbums] = useState([])
  const[competitions, setCompetitions] = useState([])
  const[exhibitions, setExhibitions] = useState([])
  const[loading, setLoading] = useState(true)
  const[loadingUser, setLoadingUser] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const[pressedSection, setPressedSection]=useState('Posts')
  const[following, setFollowing] = useState(true);
  const{id} =route.params;

  
  const onUserRefresh = () => {
    setLoadingUser(true)
    setLoading(true)
    setPosts([])
    setCompetitions([])
    setExhibitions([])
    setAlbums([])
    setCurrentPage(1)
    fetchData()
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
      setLoading(false);
    }).catch(error => {
      console.log("Error", error);
      setLoading(false);
  });  
  }
  const getCompetitions = async () => {
    await api.get(`api/published-competitions/user/${id}/?page=${currentPage}`).then(response => {
      const { data, meta } = response.data;
      const competitionsArray = Object.values(data); 
      setCompetitions((prevCompetitions) => [...prevCompetitions, ...competitionsArray]);
      console.log(competitions)
      setTotalPages(meta.last_page);
      setLoading(false);
    }).catch(error => {
      console.log("Error", error);
      setLoading(false);
  });  
  }
  const getExhibitions = async () => {
    await api.get(`api/published-exhibitions/user/${id}/?page=${currentPage}`).then(response => {
      const { data, meta } = response.data;
      const exhibitionsArray = Object.values(data); 
      setExhibitions((prevExhibitions) => [...prevExhibitions, ...exhibitionsArray]);
      console.log(exhibitions)
      setTotalPages(meta.last_page);
      setLoading(false);
    }).catch(error => {
      console.log("Error", error);
      setLoading(false);
  });  
  }
  
  async function getPosts(){
    await api.get(`api/posts/user/${id}/?page=${currentPage}`)
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
    await api.get(`api/user/is-following/user/${id}`).then(response => {
      console.log('Is following',response.data.isFollowing)
      setFollowing(response.data.isFollowing)
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
    isFollowing()
    setOptions({
      title: otherUser ? otherUser.username : ''
    })
  }, [loadingUser]);

  fetchData = () => {
    if(pressedSection=='Posts') getPosts();
    else if(pressedSection=='Albums') getAlbums();
    else if(pressedSection=='Competitions') getCompetitions();
    else getExhibitions();
  }
  useEffect(()=>{
    fetchData()
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
            {following ? (<CustomButton title ='unfollow'
            onPress={async()=>{
              await unfollowUser(id)
              setLoadingUser(true)
            }}/>) :
            (<CustomButton title ='follow'
            onPress={async()=>{
              await followUser(id)
                setLoadingUser(true)
                }}/>)}
          </View>
          <View style={{flex: 1}}>
              <Divider/>
            <View style = {{margin: 5, flexDirection:'row',justifyContent:'space-evenly',flexWrap:'wrap'}}>
            {otherUser.roles && otherUser.roles.some(r=>r.name=='user') && <TouchableSection title = 'Posts'
              pressedSection = 'Posts'
                  onPress={() => {
                  setPosts([])
                  setCurrentPage(1)
                  setPressedSection('Posts')
                  getPosts(id)
                  }}
                  pressed = {pressedSection}/> }   
              {otherUser.roles && otherUser.roles.some(r=>r.name=='user') && <TouchableSection title = 'Albums'
              pressedSection = 'Albums'
                  onPress={() => {
                  setAlbums([])
                  setPressedSection('Albums')
                  setCurrentPage(1)
                  getAlbums()
                  }}
                  pressed = {pressedSection}/>}
                  {otherUser.roles && otherUser.roles.some(r=>r.name=='gallery') && 
              <TouchableSection title = 'Competitions'
              pressedSection = 'Competitions'
                  onPress={() => {
                  setCompetitions([])
                  setPressedSection('Competitions')
                  setCurrentPage(1)
                  getCompetitions()
                  }}
                  pressed = {pressedSection}/>}
                  {otherUser.roles && otherUser.roles.some(r=>r.name=='gallery') &&
              <TouchableSection title = 'Exhibitions'
              pressedSection = 'Exhibitions'
                  onPress={() => {
                  setExhibitions([])
                  setPressedSection('Exhibitions')
                  setCurrentPage(1)
                  getExhibitions()
                  }}
                  pressed = {pressedSection}/>}
                  
            </View>
          </View>
          {pressedSection=='Albums' && 
          <FlatList 
            numColumns={2} 
            scrollEnabled={false}
            key={`albumsList-2`}
            contentContainerStyle={styles.items}
            data={albums}
            renderItem={({item}) => {
              return(<Album album={item} size={150}></Album>)}}
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
          {pressedSection=='Competitions' && 
          <FlatList
            data={competitions}
            contentContainerStyle={styles.items}
            renderItem={({item}) => {
            return(<Competition competition={item}></Competition>)}}
            numColumns={3}
            scrollEnabled={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            key={`competitionsList-3`}
          ></FlatList>}
          {pressedSection=='Exhibitions' && 
          <FlatList
            data={exhibitions}
            contentContainerStyle={styles.items}
            renderItem={({item}) => {
            return(<Exhibition exhibition={item}></Exhibition>)}}
            numColumns={3}
            scrollEnabled={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            key={`exhibitionsList-3`}
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
  items: {
    flex:1,
  },
  posts: {
    flex: 1,
    alignItems: 'stretch'
    
  }
});
