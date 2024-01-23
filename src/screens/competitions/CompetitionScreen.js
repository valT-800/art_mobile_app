import { ActivityIndicator, Alert, FlatList, Image, Modal, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from 'react';
import { api } from "../../services/api_base";
import { BoldText, CustomHeader, MultilineText, NormalText } from "../../components/AppTextComponents";
import CustomButton from "../../components/CustomButton";
import ImageComponent from "../../components/Image";
import { AuthContext } from "../../AuthProvider";
import { useTheme } from "@react-navigation/native";
import CustomIcon from "../../components/CustomIcon";
import TouchableListItem from "../../components/TouchableListItem";
import User from "../../components/User";
import Timer from "../../components/Timer";

export default function CompetitionScreen({route, navigation:{navigate,setOptions}}){
  const{user} =useContext(AuthContext)
  const[competition,setCompetition]=useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([])
  const [participated,setParticipated] = useState(true);
  const{id} = route.params;
  
  const {colors}= useTheme()
  
  setOptions({
    headerRight: () => <CustomIcon name = 'ellipsis-horizontal-outline' size={30} event={()=>setVisible(true)}></CustomIcon>
  });

  const onRefresh = () => {
    setLoading(true)
    setVisible(false)
    setCompetition([])
    setPosts([])  
    setCurrentPage(1)
    getCompetition()
    getPosts()
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  async function getCompetition(){
    await api.get('api/competitions/'+id).then(response => {
    let apidata = response.data;
    if (apidata.length !== 0) {
      console.log(apidata.data)
      setCompetition(apidata.data)
      setLoading(false)
    }    
  }).catch(error => {
    //console.log(error);
      setLoading(false)
  });}

  useEffect(() => {
    getCompetition()
  }, []);
  useEffect(() => {
    getPosts()
  }, [currentPage]);

  if(!user.roles.some(r=>r.name=='gallery'))checkIfParticipated()
  
  const handleDelete=()=>{
    Alert.alert('Confirm delete', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: async() => { await deleteCompetition().then(
        navigate('Profile'))
      }},
    ],{
      cancelable: true,
    });
  }
  
  async function deleteCompetition(){
    await api.delete(`api/gallery/competitions/${id}`).then(response => {
      console.log(response.data.message);
      return true;
    }).catch(error => {
      return false;
    });
  }
  const getPosts = async () => {
    await api.get(`api/competition-posts/${id}/?page=${currentPage}`).then(response => {
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

async function checkIfParticipated(){
  await api.get(`api/user/participated/competition/${id}`).then(response => {
    console.log('Participated',response.data.participated)
    setParticipated(response.data.participated)
}).catch(error => {
  console.log(error.response);
})}

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
            <CustomHeader text={competition.title}/>
            <User user={competition.user}></User>
            
            {competition.starts_in ? <Timer interval={competition.starts_in} title='Competition starts in'/> : 
            competition.ends_in ? <Timer interval={competition.ends_in} title='Competition ends in'/> :
            <View>
            <NormalText text={'From: ' + competition.start_time}/>         
            <NormalText text={'     To: ' + competition.end_time}/>
            </View>
            }
            <View style={{width:'100%',paddingHorizontal:10}}>
            <MultilineText text={competition.description}/>
            </View>
          {!participated && <CustomButton title="Participate" onPress={()=>navigate('PickPostFromApp', {id:competition.id})} />}
          </View>
          {competition.winners && competition.winners.length>0 && 
            <View style={{backgroundColor: 'rgba(255, 211, 67,0.6)',flex:1,borderRadius:10,padding:5}}>
           <View style={{alignSelf:'center'}}><BoldText text='Competition winners'/></View> 
            <View style={styles.posts}>
            <FlatList
              data={competition.winners}
              renderItem={({item}) => {
              return(<ImageComponent post={item} competition_id={id}></ImageComponent>)}}
              //numColumns={2}
              scrollEnabled={false}
              keyExtractor = {( item, index) => item.id }
            ></FlatList> 
          </View>
            </View>}
          <View style={styles.posts}>
            <FlatList
              data={posts}
              renderItem={({item}) => {
              return(<ImageComponent post={item} competition_id={id}></ImageComponent>)}}
              //onEndReached={handleLoadMore}
              scrollEnabled={false}
              numColumns={2}
              keyExtractor = {( item, index) => item.id }
            ></FlatList> 
          </View>
          {visible && <Modal animationType="slide" visible={visible} transparent onRequestClose={()=>setVisible(false)}>
          <View style={[styles.overlayContainer, {backgroundColor: colors.card}]}>
            <CustomIcon name='chevron-down' size={30} event={()=>setVisible(false)}>
            </CustomIcon>
            { competition.public==0 && user.id == competition.user.id &&
                <View>
                  <TouchableListItem title='Edit' onPress={()=>navigate('EditCompetition', competition)}/>
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
  