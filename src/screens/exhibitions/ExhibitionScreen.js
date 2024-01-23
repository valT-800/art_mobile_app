import { ActivityIndicator, Alert, FlatList, Modal, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from 'react';
import { api } from "../../services/api_base";
import { CustomHeader, MultilineText, NormalText } from "../../components/AppTextComponents";
import CustomButton from "../../components/CustomButton";
import ImageComponent from "../../components/Image";
import getExhibition from "../../utils/getExhibition";
import CustomIcon from "../../components/CustomIcon";
import { useTheme } from "@react-navigation/native";
import { AuthContext } from "../../AuthProvider";
import User from "../../components/User";
import Timer from "../../components/Timer";

export default function ExhibitionScreen({route, navigation:{navigate,setOptions}}){
  const[exhibition,setExhibition]=useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([])
  const{id} = route.params;
  const{user} =useContext(AuthContext)
  const {colors}= useTheme()
  
  setOptions({
    headerRight: () => <CustomIcon name = 'ellipsis-horizontal-outline' size={30} event={()=>setVisible(true)}></CustomIcon>
  });

  const onRefresh = () => {
    setLoading(true)
    setVisible(false)
    setExhibition([])
    setPosts([])  
    setCurrentPage(1)
    fetchData()
    getPosts()
    setTimeout(() => {
      //setLoading(false);
    }, 1000);
  };
async function fetchData(){
      let result = await getExhibition(id)
      setExhibition(result)
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
      {text: 'OK', onPress: () => { deleteExhibition(exhibition.id).then(
        navigate('Profile'))
      }},
    ],{
      cancelable: true,
    });
  }
  
  async function deleteExhibition(id){
    await api.delete(`api/gallery/exhibitions/${id}`).then(response => {
      return true;
    }).catch(error => {
      return false;
    });
  }

  const getPosts = async () => {
    await api.get(`api/exhibition-posts/${id}/?page=${currentPage}`).then(response => {
      const { data, meta } = response.data;
      const postsArray = Object.values(data); 
      setPosts((prevPosts) => [...prevPosts, ...postsArray]);
      setTotalPages(meta.last_page);
      console.log(posts)
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
            <CustomHeader text={exhibition.title}/> 
            <User user={exhibition.user}></User>   
            {exhibition.starts_in ? <Timer interval={exhibition.starts_in} title='Exhibition starts in'/> : 
            exhibition.ends_in ? <Timer interval={exhibition.ends_in} title='Exhibition ends in'/> :
            <View>
            <NormalText text={'From: ' + exhibition.start_time}/>         
            <NormalText text={'     To: ' + exhibition.end_time}/>
            </View>
            } 
            <View style={{width:'100%',paddingHorizontal:10}}>
            <MultilineText text={exhibition.description}/>   
            </View>
          </View>
          <View style={styles.posts}>
            <FlatList
              data={posts}
              renderItem={({item}) => {
              return(<ImageComponent post={item}></ImageComponent>)}}  
              scrollEnabled={false}
              keyExtractor = {( item, index) => item.id }
            ></FlatList> 
          </View>
          {visible && <Modal animationType="slide" visible={visible} transparent onRequestClose={()=>setVisible(false)}>
          <View style={[styles.overlayContainer, {backgroundColor: colors.card}]}>
            <CustomIcon name='chevron-down' size={30} event={()=>setVisible(false)}>
            </CustomIcon>
            {console.log(exhibition,user)}
            { exhibition.public==0 && user.id == exhibition.user.id &&
                <View>
                  <TouchableListItem title='Edit' onPress={()=>navigate('EditExhibition', exhibition)}/>
                  <TouchableListItem title='Delete' onPress={handleDelete}/>
                </View>
            }
          </View>
        </Modal>}
        </ScrollView>
        </SafeAreaView>

  );
}
}
const styles = StyleSheet.create({
    container:{
      justifyContent: 'center',
      flex: 1,
      marginTop: 30,
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
  