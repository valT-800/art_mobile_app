import { useNavigation, useTheme } from "@react-navigation/native";
import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Modal, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../AuthProvider";
import {api} from "../../services/api_base";
import ImageComponent from "../../components/Image";
import {BoldText, CustomHeader, MultilineText} from "../../components/AppTextComponents";
import {NormalText} from "../../components/AppTextComponents";
import getAlbum from "../../utils/getAlbum";
import { Header } from "../../components/AppTextComponents";
import CustomIcon from "../../components/CustomIcon";
import TouchableListItem from "../../components/TouchableListItem";
import User from "../../components/User";


export default function AlbumScreen({route, navigation:{navigate,setOptions}}){
  const{user} =useContext(AuthContext)
  const[album,setAlbum]=useState([]);
  const [loading, setLoading] = useState(true);
  const[visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([])
  const{id} = route.params;
  const {colors}= useTheme()
  
  setOptions({
    title: album ? album.title : '',
    headerRight: () => <CustomIcon name = 'ellipsis-horizontal-outline' size={30} event={()=>setVisible(true)}></CustomIcon>
  });

  const onRefresh = () => {
    setLoading(true)
    setVisible(false)
    setAlbum([])
    setPosts([])  
    setCurrentPage(1)
    fetchData()
    getPosts()
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  
  async function fetchData(){
    let result = await getAlbum(id)
    console.log(result)
    setAlbum(result)
    setLoading(false)
  }
  
  useEffect(() => {
    fetchData()
  }, []);
  useEffect(() => {
    getPosts()
  }, [currentPage]);
  
  const handleDelete=()=>{
    Alert.alert('Confirm delete', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: async() => { await deleteAlbum(album.id).then(
        navigate('Profile'))
      }},
    ],{
      cancelable: true,
    });
  }
  async function deleteAlbum(id){
    await api.delete(`api/user/albums/${id}`).then(response => {
      return true;
    }).catch(error => {
      return false;
    });
  }
  const getPosts = async () => {
    await api.get(`api/posts/album/${id}/?page=${currentPage}`).then(response => {
      const { data, meta } = response.data;
      const postsArray = Object.values(data); 
      setPosts((prevPosts) => [...prevPosts, ...postsArray]);
      setTotalPages(meta.last_page);
      setLoading(false);
    }).catch(error => {
      console.log("Error", error);
      setLoading(false);
  });
}
const handleLoadMore = (event) => {
  //console.log(currentPage)
  if (currentPage < totalPages) {
    setCurrentPage((prevPage) => prevPage + 1);
    //console.log(currentPage)
    setLoading(true);
}
};

  if(loading){
    return(
      <SafeAreaView>
      <ActivityIndicator/>
    </SafeAreaView>
    )
    
  }else{
    return(
        <SafeAreaView style= {styles.container}>
          <ScrollView onScrollEndDrag={handleLoadMore}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />}>
          <View style = {{alignItems: 'center'}}>
            <User user={album.user}></User>
          <View style={{width:'100%',paddingHorizontal:10}}>
            <MultilineText text={album.description}/>
            </View> 
          </View>
          <View style={styles.posts}>
            <FlatList
              data={posts}
              renderItem={({item}) => {
              return(<ImageComponent post={item}></ImageComponent>)}}
              numColumns={2}
              scrollEnabled={false}
              keyExtractor = {( item, index) => item.id }
            ></FlatList> 
          </View>
          <Modal animationType="slide" visible={visible} transparent onRequestClose={()=>setVisible(false)}>
          <View style={[styles.overlayContainer, {backgroundColor: colors.card}]}>
            <CustomIcon name='chevron-down' size={30} event={()=>setVisible(false)}>
            </CustomIcon>
            {album.user && user.id == album.user.id && <TouchableListItem title='Edit' onPress={()=>navigate('EditAlbum', album)}/>}
            {album.user && user.id == album.user.id && <TouchableListItem title='Delete' onPress={handleDelete}/>}
          </View>
        </Modal>
        </ScrollView>
        </SafeAreaView>

  );
}
}
const styles = StyleSheet.create({
    container:{
      justifyContent: 'center',
      flex: 1,
      padding: 10,
    },
    posts: {
      justifyContent: 'center',
      flex: 1
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