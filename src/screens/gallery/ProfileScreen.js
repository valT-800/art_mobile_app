
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, FlatList, View, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, Modal, Text } from "react-native";
import {api} from "../../services/api_base";
import { AuthContext } from "../../AuthProvider";
import { Image } from "expo-image";
import CustomButton from "../../components/CustomButton";
import {NormalText} from "../../components/AppTextComponents";
import {OtherText} from "../../components/AppTextComponents";
import CustomIcon from "../../components/CustomIcon";
import TouchableSection from "../../components/TouchableSection";
import { useTheme } from "@react-navigation/native";
import TouchableListItem from "../../components/TouchableListItem";
import TouchableText from "../../components/TouchableText";
import Competition from "../../components/Competition";
import Exhibition from "../../components/Exhibition";

export default function GalleryProfileScreen({navigation: {navigate}}){

  const { user} = useContext(AuthContext)
  const[loggedUser, setLoggedUser] = useState([])
  const[competitions, setCompetitions] = useState([])
  const[exhibitions, setExhibitions] = useState([])
  const[loading, setLoading] = useState(true)
  const[loadingUser, setLoadingUser] = useState(true)
  const[pressedSection, setPressedSection]=useState("Competitions")
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {colors} = useTheme()
  const[visible, setVisible]= useState(false) //sets visibility of down Modal to uppear then '+' icon (new content) is pressed


  const onUserRefresh = () => {
    setLoadingUser(true)
    setCompetitions([])
    setExhibitions([])
    setCurrentPage(1)
    setLoading(true)
    setTimeout(() => {
      setLoadingUser(false)
      setLoading(false)
    }, 1000);
  };

  async function getUnpublishedCompetitions(){
    if(loggedUser.unpublished_competitions != 0){
      api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      console.log('Hello')
      await api.get(`api/gallery/unpublished-competitions/?page=${currentPage}`)
        .then(response => {
          console.log("Filtered unpublished", response.data)
          const{data, meta} =response.data;
          setCompetitions((prevCompetition) => [...prevCompetition, ...data]);
          setTotalPages(meta.last_page);
          setLoading(false)
        })
        .catch(error => {
          console.log(error.response);
          setLoading(false)
      })
    }
    else {
    setCompetitions([])
    setLoading(false)
  }
    
  }
  async function getPublishedCompetitions(){
    if(loggedUser.published_competitions != 0){
    await api.get(`api/published-competitions/${user.id}/?page=${currentPage}`)
    .then(response => {
      console.log("Filtered", response.data)
      const{data, meta} =response.data;
      setCompetitions((prevCompetition) => [...prevCompetition, ...data]);
      setTotalPages(meta.last_page);
      setLoading(false)
    })
    .catch(error => {
      console.log(error.response);
      setLoading(false)
  })
}else{
  setCompetitions([])
  setLoading(false)}
  }
  
  async function getPublishedExpiredCompetitions(){
    if(loggedUser.published_expired_competitions != 0){
    await api.get(`api/published-competitions-archive/${user.id}/?page=${currentPage}`)
      .then(response => {
        //console.log("Filtered", response.data)
        const{data, meta} =response.data;
        setCompetitions((prevCompetition) => [...prevCompetition, ...data]);
        setTotalPages(meta.last_page);
        setLoading(false)
      })
      .catch(error => {
        console.log(error.response);
        setLoading(false)
    })
  }else{
    setCompetitions([])
    setLoading(false)}
    
  }
  
  async function getUnpublishedExhibitions(){
    if(loggedUser.unpublished_exhibitions != 0){  
    await api.get(`api/gallery/unpublished-exhibitions/?page=${currentPage}`)
      .then(response => {
        console.log("Filtered unpublished", response.data)
        const{data, meta} =response.data;
        setExhibitions((prevExhibition) => [...prevExhibition, ...data]);
        setTotalPages(meta.last_page);
        setLoading(false)
      })
      .catch(error => {
        console.log(error.response);
        setLoading(false)
    })
   }else{setExhibitions([])
    setLoading(false)}
  }
    
  async function getPublishedExhibitions(){
    if(loggedUser.published_exhibitions != 0){
    await api.get(`api/published-exhibitions/${user.id}/?page=${currentPage}`)
    .then(response => {
      console.log("Filtered", response.data)
      const{data, meta} =response.data;
      setExhibitions((prevExhibition) => [...prevExhibition, ...data]);
      setTotalPages(meta.last_page);
      setLoading(false)
    })
    .catch(error => {
      console.log(error.response);
      setLoading(false)
  })
}else{setExhibitions([])
  setLoading(false)}
  }

  const handleLoadMore = (event) => {
    if (currentPage < totalPages) {    
        setCurrentPage((prevPage) => prevPage + 1);
        setLoading(true)
    }
  };
  const getUser=async()=>{

    await api.get('api/user')
    .then(response => {
      setLoggedUser(response.data.data);
      console.log(response.data.data)
      setLoadingUser(false)
    })
    .catch(error => {
      //console.log("Error", error.response);   
      setLoadingUser(false)
    })
  }
  useEffect(() => {
    getUser()
  }, [loadingUser]);

  function fetchData(){
    if(pressedSection==="Competitions") getPublishedCompetitions()
    else if(pressedSection==="Competition drafts") getUnpublishedCompetitions()
    else if(pressedSection==="Exhibitions") getPublishedExhibitions()
    else if(pressedSection==="Exhibition drafts") getUnpublishedExhibitions()
  }
  useEffect(() => {
    fetchData()
  }, [currentPage]);

  if(loadingUser){
    return (<ActivityIndicator size='large'></ActivityIndicator>)
  }
  else{
    return(
        <SafeAreaView style = {styles.container}>
          <ScrollView
          onEndReached={handleLoadMore}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={loadingUser} onRefresh={onUserRefresh} />
          }>
          <View style={{alignItems: 'center'}}>
            <Image
            source={loggedUser.profile_photo_url}
            style={{width: 100, height: 100, borderRadius: 50}}>
            </Image>
            <NormalText text={loggedUser.name}/>
            <OtherText text={loggedUser.email}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 170}}>
            <TouchableText title = {loggedUser.followers + " followers"} onPress={()=>navigate('Followers')}/>
            <TouchableText title = {loggedUser.following + " following"}  onPress={()=>navigate('FollowingUsers')}/>
            </View>
            <CustomButton title ='Edit profile' onPress={()=>navigate('EditProfile', loggedUser)}></CustomButton>
            
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <CustomIcon name = 'add' size={30} event={()=> {setVisible(true)}}/>
          </View>

          <ScrollView horizontal={true} style = {{margin: 5}}>
            <TouchableSection title = "Competition drafts"
            onPress={() => {
              setCompetitions([])
              setCurrentPage(1)
              setPressedSection("Competition drafts")
              getUnpublishedCompetitions()
            }} 
            pressed = {pressedSection}/>
            <TouchableSection title = "Competitions"
            onPress={() => { 
              setCompetitions([])  
              setCurrentPage(1)
              setPressedSection("Competitions")
              getPublishedCompetitions()
            }}
             pressed = {pressedSection}/>
             
            <TouchableSection title = "Exhibition drafts"
            onPress={async() => {
              setExhibitions([])
              setCurrentPage(1)
              setPressedSection("Exhibition drafts")
              getUnpublishedExhibitions()
            }} 
            pressed = {pressedSection}/>

            <TouchableSection title = "Exhibitions"
            onPress={async() => {
              setExhibitions([])
              setCurrentPage(1)
              setPressedSection("Exhibitions")
              getPublishedExhibitions()
            }}
             pressed = {pressedSection}/>
          </ScrollView>
          {loading ? <ActivityIndicator/> :  <View style={styles.items}>
          {(pressedSection ==="Competitions" || pressedSection ==="Competition drafts") &&
            <FlatList
              data={competitions}
              renderItem={({item}) => {
              return(<Competition competition={item}/>)}}
              numColumns={3}
              scrollEnabled={false}
              keyExtractor = {( item, index) => item.id }
              //onEndReached={handleLoadMore}
              //onEndReachedThreshold={0.1}
            ></FlatList>}
          {(pressedSection ==="Exhibitions" || pressedSection ==="Exhibition drafts") && 
            <FlatList
              data={exhibitions}
              renderItem={({item}) => {
              return(<Exhibition exhibition={item}/>)}}
              numColumns={3}
              scrollEnabled={false}
              keyExtractor = {( item, index) => item.id }
              //onEndReached={handleLoadMore}
              //onEndReachedThreshold={0.1}
            ></FlatList>}
          </View>}
          
          <Modal animationType="slide" visible={visible} transparent onRequestClose={()=>setVisible(false)}>
          <View style={[styles.overlayContainer, {backgroundColor: colors.card}]}>
            <CustomIcon name='chevron-down' size={30} event={()=>setVisible(false)}>
            </CustomIcon>
            <TouchableListItem title='New competition' onPress={()=>navigate('NewCompetition')}/> 
            <TouchableListItem title='New exhibition' onPress={()=>navigate('NewExhibition')}/> 
          </View>
        </Modal>
          </ScrollView>
        </SafeAreaView>
      )
    }
  }

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    flex: 1
  },
  albums: {
    alignItems: 'flex-start',
  },
  items: {
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
  },
})
