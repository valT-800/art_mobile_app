
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
import { useIsFocused, useTheme } from "@react-navigation/native";
import TouchableListItem from "../../components/TouchableListItem";
import TouchableText from "../../components/TouchableText";
import Competition from "../../components/Competition";
import Exhibition from "../../components/Exhibition";
import Divider from "../../components/Divider";

export default function GalleryProfileScreen({navigation: {navigate,addListener}}){

  const isFocused = useIsFocused();
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
    setVisible(false)
    setCompetitions([])
    setExhibitions([])
    setCurrentPage(1)
    setLoading(true)
    fetchData()
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
  async function getPlannedCompetitions(){
    if(loggedUser.planned_competitions != 0){
    await api.get(`api/planned-competitions/user/${user.id}/?page=${currentPage}`)
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
  async function getPublishedCompetitions(){
    if(loggedUser.published_competitions != 0){
    await api.get(`api/published-competitions/user/${user.id}/?page=${currentPage}`)
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
    await api.get(`api/published-competitions-archive/user/${user.id}/?page=${currentPage}`)
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
  async function getPlannedExhibitions(){
    if(loggedUser.planned_exhibitions != 0){
    await api.get(`api/planned-exhibitions/user/${user.id}/?page=${currentPage}`)
    .then(response => {
      console.log("Filtered", response.data)
      const{data, meta} =response.data;
      setExhibitions((prev) => [...prev, ...data]);
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
  async function getPublishedExhibitions(){
    if(loggedUser.published_exhibitions != 0){
    await api.get(`api/published-exhibitions/user/${user.id}/?page=${currentPage}`)
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
    else if(pressedSection==="Planned competitions") getPlannedCompetitions()
    else if(pressedSection==="Competition drafts") getUnpublishedCompetitions()
    else if(pressedSection==="Passed competitions") getPublishedExpiredCompetitions()
    else if(pressedSection==="Planned exhibitions") getPlannedExhibitions()
    else if(pressedSection==="Exhibitions") getPublishedExhibitions()
    else if(pressedSection==="Exhibition drafts") getUnpublishedExhibitions()
  }
  useEffect(() => {
    fetchData()
  }, [currentPage]);
    return(
        <SafeAreaView style = {styles.container}>
          {loadingUser ? 
          (
            <ActivityIndicator size={'large'}/>
          ) :
          (<ScrollView
          onEndReached={handleLoadMore}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={loadingUser} onRefresh={onUserRefresh} />
          }>
          <View style={{alignItems: 'center'}}>
            <Image
            source={loggedUser.profile_photo_url}
            style={{width: 100, height: 100, borderRadius: 50,justifyContent:'center',alignItems:'center'}}>
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
          
          <Divider/>
          <View style = {{margin: 2,alignItems: 'center'}}>
            <NormalText text='Competitions'/>
            <View style = {{flexDirection:'row'}}>  
            <TouchableSection title = "drafts"
            pressedSection = "Competition drafts"
            onPress={() => {
              setCompetitions([])
              setCurrentPage(1)
              setPressedSection("Competition drafts")
              getUnpublishedCompetitions()
            }} 
            pressed = {pressedSection}/>
            <TouchableSection title = "coming"
            pressedSection = "Planned competitions"
            onPress={async() => {
              setCompetitions([])
              setCurrentPage(1)
              setPressedSection("Planned competitions")
              getPlannedCompetitions()
            }}
            pressed ={pressedSection}/>
            <TouchableSection title = "now"
            pressedSection = "Competitions"
            onPress={async() => { 
              setCompetitions([])  
              setCurrentPage(1)
              setPressedSection("Competitions")
              getPublishedCompetitions()
            }}
             pressed = {pressedSection}/>
             <TouchableSection title = "passed"
             pressedSection = "Passed competitions"
             onPress={async() => { 
               setCompetitions([])  
               setCurrentPage(1)
               setPressedSection("Passed competitions")
               getPublishedExpiredCompetitions()
             }}
              pressed = {pressedSection}/>
             </View>
            </View>
            <Divider/>
            <View style = {{margin: 2, alignItems: 'center'}}>   
            <NormalText text='Exhibitions'/>  
            <View style = {{flexDirection:'row'}}>   
            <TouchableSection title = "drafts"
            pressedSection = "Exhibition drafts"
            onPress={async() => {
              setExhibitions([])
              setCurrentPage(1)
              setPressedSection("Exhibition drafts")
              getUnpublishedExhibitions()
            }}
            pressed = {pressedSection}/>
            <TouchableSection title = "coming"
            pressedSection = "Planned exhibitions"
            onPress={async() => {
              setExhibitions([])
              setCurrentPage(1)
              setPressedSection("Planned exhibitions")
              getPlannedExhibitions()
            }} 
            pressed = {pressedSection}/>
            <TouchableSection title = "now"
            pressedSection = "Exhibitions"
            onPress={async() => {
              setExhibitions([])
              setCurrentPage(1)
              setPressedSection("Exhibitions")
              getPublishedExhibitions()
            }}
             pressed = {pressedSection}/>
             </View>
            </View> 
            <Divider/>
          {loading ? <ActivityIndicator/> :  <View style={styles.items}>
          {(pressedSection ==="Competitions" || pressedSection ==="Competition drafts" || pressedSection==="Planned competitions" || pressedSection==="Passed competitions") &&
            <FlatList
              data={competitions}
              renderItem={({item}) => {
              return(<Competition competition={item}/>)}}
              numColumns={2}
              scrollEnabled={false}
              keyExtractor = {( item, index) => item.id }
              //onEndReached={handleLoadMore}
              //onEndReachedThreshold={0.1}
            ></FlatList>}
          {(pressedSection ==="Exhibitions" || pressedSection ==="Exhibition drafts" || pressedSection==="Planned exhibitions") && 
            <FlatList
              data={exhibitions}
              renderItem={({item}) => {
              return(<Exhibition exhibition={item}/>)}}
              numColumns={2}
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
          </ScrollView>)}
        </SafeAreaView>
      )
    }

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    flex: 1
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
