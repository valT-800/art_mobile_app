
import { useNavigation, useTheme } from "@react-navigation/native";
import { ActivityIndicator, Alert, FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import CustomIcon from "./CustomIcon";
import User from "./User";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import {api, baseURL } from "../services/api_base";
import {BoldText, MultilineText} from "./AppTextComponents";
import TouchableText from "./TouchableText";
import {OtherText} from "./AppTextComponents";
import savePost from "../utils/savePost";
import unsavePost from "../utils/unsavePost";
import unlikePost from "../utils/unlikePost";
import likePost from "../utils/likePost";
import TouchableListItem from "./TouchableListItem";
import deletePost from "../utils/deletePost";


export default function Post({item}){

  const{user} =useContext(AuthContext)
  const {colors} = useTheme()
  const navigation = useNavigation();
  const[post, setPost] = useState(item)
  const[liked, setLiked] = useState(false)
  const[saved, setSaved] = useState(false)
  const[visible, setVisible]= useState(false)

  const handleDelete=()=>{
    Alert.alert('Confirm delete', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: async() => { await deletePost(post.id)
        navigation.navigate('Profile');
      }},
    ],{
      cancelable: true,
    });
  }
  async function isLiked(){
    await api.get(`api/user/liked/post/${post.id}`).then(response => {
      console.log('Liked',response.data.liked)
      setLiked(response.data.liked)
  }).catch(error => {
    console.log(error.response);
  })}
  async function isSaved(){
    await api.get(`api/user/saved/post/${post.id}`).then(response => {
      console.log('Saved',response.data.saved)
      setSaved(response.data.saved)
  }).catch(error => {
    console.log(error.response);
  })}
  useEffect(()=>{
    isLiked()
    isSaved()
  },[post])

  return(
        <SafeAreaView style={{flex:1}}>
          <View style= {{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5}}>
            <User user={post.user}/>
            <CustomIcon name = 'ellipsis-horizontal-outline' size={30} event={()=>setVisible(true)}></CustomIcon>
          </View>
          <TouchableHighlight onPress={()=>navigation.navigate('PostFull',{id:post.id})}>
          <Image resizeMode='cover' style={styles.post}
              source={{uri: baseURL + post.url} }>
          </Image>
          </TouchableHighlight>
          {/*<Image resizeMode='cover' style={styles.post}
              source={{uri: baseURL + post.url} }>
        </Image>*/}
          <View style={{paddingHorizontal:5}}>
            <View style ={{margin: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <BoldText text={post.users_liked ? (post.users_liked.length +" likes") : (0 +" likes")}/>
              <View style ={{flexDirection: 'row'}}>
              {liked ? 
                <CustomIcon name='heart' size={30} event={async()=>{
                  let result = await unlikePost(post.id)
                  setPost(result)
                }}/> :
              <CustomIcon name='heart-outline' size={30} event={async()=>{
                let result = await likePost(post.id)
                setPost(result)}}/>
                }
              <CustomIcon name='chatbubbles-outline' event={()=>navigation.navigate('Comments', {post_id: post.id})} size={30}/>
              {/* <CustomIcon name='arrow-redo-outline' size={30}/> */}
              {saved ? <CustomIcon name='bookmark' size={30} event={async()=>{
                  let result = await unsavePost(post.id)
                  setPost(result)}}/> :
              <CustomIcon name='bookmark-outline' size={30} event={async()=>{
                let result = await savePost(post.id)
                setPost(result)}}/>}
              </View>
            </View>
            {post.winnings.length>0 && 
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <OtherText text='Winnigs '/>
            <FlatList
            horizontal
            data={post.winnings}
            keyExtractor = {( item, index) => item.id }
            renderItem={({ item }) =>{
            return(
              <View style={{backgroundColor: 'rgba(255, 211, 67,0.6)',borderRadius: 50, padding:5,alignItems:'center'}}>
            <TouchableText title={item.title} onPress={()=>navigation.navigate('Competition', {id: item.id})}/>
            </View>)}}></FlatList>
            </View>}
            {post.description && 
            <MultilineText text={post.description} fontSize={14}/>}
            {post.comments &&
            <View>
              <TouchableOpacity onPress={()=>navigation.navigate('Comments', {post_id: post.id})}><OtherText text="View all comments"/></TouchableOpacity>
              
            </View>
            }
            <OtherText text={post.created_at + " ago"}/>
          </View>
          <Modal animationType="slide" visible={visible} transparent onRequestClose={()=>setVisible(false)}>
          <View style={[styles.overlayContainer, {backgroundColor: colors.card}]}>
            <CustomIcon name='chevron-down' size={30} event={()=>setVisible(false)}>
            </CustomIcon>
            {user.id == post.user.id && <TouchableListItem title='Edit' onPress={()=>navigation.navigate('EditPost', post)}/>}
            {user.id == post.user.id && <TouchableListItem title='Delete' onPress={handleDelete}/>}
            {user.roles.some(r=>r.name=='gallery') && <TouchableListItem title='Invite to exhibition' onPress={()=>navigation.navigate('PlannedExhibitions',{post_id:post.id})}/>}
          </View>
        </Modal>
        </SafeAreaView>
      
                             
    )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      paddingVertical:20,
      justifyContent:'center',
      alignItems: 'center'
    },
    post:{
      width: '100%',
      height: undefined, 
      aspectRatio: 1, 
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
  