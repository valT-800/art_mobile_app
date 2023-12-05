import { ActivityIndicator, Alert, FlatList, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from 'react';
import { api } from "../../services/api_base";
import { CustomHeader, MultilineText } from "../../components/AppTextComponents";
import CustomButton from "../../components/CustomButton";
import ImageComponent from "../../components/Image";
import getCompetition from "../../utils/getCompetition";
import { AuthContext } from "../../AuthProvider";
import { useTheme } from "@react-navigation/native";
import CustomIcon from "../../components/CustomIcon";
import TouchableListItem from "../../components/TouchableListItem";

export default function CompetitionScreen({route, navigation:{navigate,setOptions}}){
  const{user} =useContext(AuthContext)
  const[competition,setCompetition]=useState([]);
  const [loading, setLoading] = useState(true);
  const[visibleDescription, setVisibleDescription] = useState(false);
  const[visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([])
  const{id} = route.params;
  
  const {colors}= useTheme()
  setOptions({
    headerRight: () => <CustomIcon name = 'ellipsis-horizontal-outline' size={30} event={()=>setVisible(true)}></CustomIcon>
  });

  useEffect(() => {
    async function fetchData(){
      let result = await getCompetition(id)
      setCompetition(result)
      setLoading(false)
    }
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
      {text: 'OK', onPress: async() => { await deleteCompetition(competition.id).then(
        navigation.goBack())
      }},
    ],{
      cancelable: true,
    });
  }
  
  async function deleteCompetition(id){
    await api.delete(`api/user/competitions/${id}`).then(response => {
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

  if(loading){
    return(
      <SafeAreaView>
      <ActivityIndicator/>
    </SafeAreaView>
    )
    
  }else{
    return(
        <SafeAreaView style= {styles.container}>
          <View style = {{alignItems: 'center'}}>
            <CustomHeader text={competition.title}/>
            <TouchableOpacity onPress={()=>setVisibleDescription(!visibleDescription)}><Text style={{color:'grey'}}>About</Text></TouchableOpacity>
            {visibleDescription && <ScrollView style={{maxHeight:'50%'}}>
            <MultilineText text={competition.description}/>
            </ScrollView>}
          <CustomButton title="Participate" onPress={()=>navigate('AddToCompetition', {id})} />
          </View>
          <View style={styles.posts}>
            <FlatList
              data={posts}
              renderItem={({item}) => {
              return(<ImageComponent post={item}></ImageComponent>)}}
              numColumns={3}
              keyExtractor = {( item, index) => item.id }
            ></FlatList> 
          </View>
          <Modal animationType="slide" visible={visible} transparent onRequestClose={()=>setVisible(false)}>
          <View style={[styles.overlayContainer, {backgroundColor: colors.card}]}>
            <CustomIcon name='chevron-down' size={30} event={()=>setVisible(false)}>
            </CustomIcon>
            {competition.gallery && user.id == competition.gallery.id && competition.public==0 && <TouchableListItem title='Edit' onPress={()=>navigate('EditCompetition', competition)}/>}
            {competition.gallery && user.id == competition.gallery.id && competition.public==0 && <TouchableListItem title='Delete' onPress={handleDelete}/>}
          </View>
        </Modal>
        </SafeAreaView>

  );
}
}
const styles = StyleSheet.create({
    container:{
      justifyContent: 'center',
      flex: 1,
      marginTop: 70,
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
  