
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, FlatList, View, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, Modal } from "react-native";
import {api} from "../../services/api_base";
import { AuthContext } from "../../AuthProvider";
import Album from "../../components/Album";
import ImageComponent from "../../components/Image";
import { Image } from "expo-image";
import CustomButton from "../../components/CustomButton";
import {NormalText} from "../../components/AppTextComponents";
import {OtherText} from "../../components/AppTextComponents";
import CustomIcon from "../../components/CustomIcon";
import TouchableSection from "../../components/TouchableSection";
import { useTheme } from "@react-navigation/native";
import TouchableListItem from "../../components/TouchableListItem";
import TouchableText from "../../components/TouchableText";
import Divider from "../../components/Divider";

function ProfileScreen({navigation: {navigate}}){

  const { user} = useContext(AuthContext)
  const[loggedUser, setLoggedUser] = useState([])
  const[albums, setAlbums] = useState([])
  const[posts, setPosts] = useState([])
  const[loadingPosts, setLoadingPosts] = useState(true)
  const[loadingUser, setLoadingUser] = useState(false)
  const[pressedSection, setPressedSection]=useState('Created')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {colors} = useTheme()
  const[modalIsVisible, setModalVisible]= useState(false) //sets visibility of down Modal to uppear then '+' icon (new content) is pressed

  const onUserRefresh = () => {
    setLoadingUser(true)
    setLoadingPosts(true)
    setModalVisible(false)
    setLoggedUser([])
    setPosts([])  
    setAlbums([])
    setCurrentPage(1)
    getUser()
    getAlbums()
    fetchContent()
    setTimeout(() => {
      setLoadingUser(false);
      setLoadingPosts(false);
    }, 1000);
  };

  
  const getAlbums = async () => {
    await api.get(`api/albums/user/${user.id}/?page=${currentPage}`).then(response => {
      const { data, meta } = response.data;
      const albumsArray = Object.values(data); 
      setAlbums((prevAlbums) => [...prevAlbums, ...albumsArray]);
      //setTotalPages(meta.last_page);
      //console.log(albumsArray)
      //setLoading(false);
    }).catch(error => {
      console.log("Error", error);
      //setLoading(false);
  });
}  
  async function getPosts(user_id){
    await api.get(`api/posts/user/${user_id}/?page=${currentPage}`)
      .then(response => {
        //console.log("Filtered", response.data)
        const{data, meta} =response.data;
        setPosts((prevPost) => [...prevPost, ...data]);
        setTotalPages(meta.last_page);
        setLoadingPosts(false);
      })
      .catch(error => {
        //console.log(error.response);
        setLoadingPosts(false);
    })
  }

  async function getLikedPosts(){
    await api.get(`api/user/liked-posts/?page=${currentPage}`)
      .then(response => {
        //console.log("Filtered", response.data)
        const{data, meta} =response.data;
        setPosts((prevPost) => [...prevPost, ...data]);
        setTotalPages(meta.last_page);
        setLoadingPosts(false);
      })
      .catch(error => {
        //console.log(error.response);
        setLoadingPosts(false);
    })
  }
  async function getSavedPosts(){
    await api.get(`api/user/saved-posts/?page=${currentPage}`)
    .then(response => {
      //console.log("Filtered", response.data)
      const{data, meta} =response.data;
      setPosts((prevPost) => [...prevPost, ...data]);
      setTotalPages(meta.last_page);
      setLoadingPosts(false);
    })
    .catch(error => {
      //console.log(error.response);
      setLoadingPosts(false);
  })
}

  const handleScrollEnd = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isEndReached =
      layoutMeasurement.height + contentOffset.y >= contentSize.height;
      //console.log(currentPage)
      if (currentPage < totalPages) {
        
        setCurrentPage((prevPage) => prevPage + 1);
        //console.log(currentPage)
        setLoadingPosts(true);
    }
  };
  
  const getUser=async()=>{
    api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    await api.get('api/user')
    .then(response => {
      setLoggedUser(response.data.data);
      setLoadingUser(false)
    })
    .catch(error => {
      //console.log("Error", error.response);
    setLoadingUser(false)
    })
  }
  useEffect(() => {
    getUser()
  }, []);
  useEffect(() => {
    getAlbums()
  }, []);
  function fetchContent(){
    if(pressedSection=='Saved') getSavedPosts();
    else if(pressedSection=='Liked') getLikedPosts();
    else if(pressedSection=='Created') getPosts(user.id) 
  }
  useEffect(() => {
    fetchContent()
  }, [currentPage]);
    return(
        <SafeAreaView style = {styles.container}>
          {loadingUser ? 
          (
            <ActivityIndicator size={'large'}/>
          ) :
          (<ScrollView onScrollEndDrag={handleScrollEnd}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={loadingUser} onRefresh={onUserRefresh} />
          }>
          <View style={{alignItems: 'center'}}>
            <Image
            source={loggedUser.profile_photo_url}
            style={{width: 90, height: 90, borderRadius: 50,justifyContent:'center',alignItems:'center'}}>
            </Image>
            <NormalText text={loggedUser.name}/>
            <OtherText text={loggedUser.email}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 170}}>
            <TouchableText title = {loggedUser.followers + " followers"} onPress={()=>navigate('Followers')}/>
            <TouchableText title = {loggedUser.following + " following"}  onPress={()=>navigate('FollowingUsers')}/>
            </View>
            <CustomButton title ='Edit profile' onPress={()=>navigate('EditProfile', loggedUser)}></CustomButton>
            
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center',justifyContent: 'space-between'}}>
          <NormalText text={'Level: '+ loggedUser.level}/>
            <NormalText text={'Score: '+ loggedUser.points}/>
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <CustomIcon name = 'add-circle-outline' size={30} event={()=> {setModalVisible(true)}}/>
          </View>
          {albums.length>0 && <View style = {styles.albums}>
            <FlatList
              keyExtractor = {( item) => item.id }
              contentContainerStyle={{
              flexGrow: 1,
              flexDirection:'row'
              }}
              scrollEnabled={false}
              horizontal
              data={albums}
              renderItem={({item}) => {
                return(<Album album={item}></Album>)}}
            ></FlatList>
            <CustomIcon name='chevron-forward' size={30} event={()=>navigate('Albums')}/>
          </View>}
          <Divider/>
          <View style = {{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: '100%', padding:15}}>
            <TouchableSection title = 'Created'
            pressedSection = 'Created' 
            onPress={async() => {
              setPosts([])
              setCurrentPage(1)
              setPressedSection('Created')
              getPosts(loggedUser.id)
            }} 
            pressed = {pressedSection}/>
            <TouchableSection title = 'Saved'
            pressedSection = 'Saved'
            onPress={async() => {
              setPosts([])
              setCurrentPage(1)
              setPressedSection('Saved')
              getSavedPosts()
            }} 
            pressed = {pressedSection}/>
            <TouchableSection title = 'Liked'
            pressedSection = 'Liked'
            onPress={() => {
              setPosts([])
              setCurrentPage(1)
              setPressedSection('Liked')
              getLikedPosts()
            }} 
             pressed = {pressedSection}/>
          </View>

          <View style={styles.posts}>
            <FlatList
              data={posts}
              renderItem={({item}) => {
              return(<ImageComponent post={item}></ImageComponent>)}}
              numColumns={3}
              scrollEnabled={false}
              keyExtractor = {( item, index) => item.id }
              // onEndReached={handleLoadMore}
              // onEndReachedThreshold={0.1}
            ></FlatList>
            {loadingPosts && <ActivityIndicator/>}
          </View>
          
          <Modal animationType="slide" visible={modalIsVisible} transparent onRequestClose={()=>setModalVisible(false)}>
          <View style={[styles.overlayContainer, {backgroundColor: colors.card}]}>
            <CustomIcon name='chevron-down' size={30} event={()=>setModalVisible(false)}>
            </CustomIcon>
            {<TouchableListItem title='New post' onPress={()=>navigate('SelectFile')}/>}
            {<TouchableListItem title='New album' onPress={()=>navigate('NewAlbum')}/>}
          </View>
        </Modal>
          </ScrollView>)}
        </SafeAreaView>
    )}

export default ProfileScreen;

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    flex: 1
  },
  albums: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  posts: {
    justifyContent: 'center',
    flex: 1, 
  },
  overlayContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    bottom: 0,
    paddingBottom: 20,
  },
});
