
import { useNavigation, useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { ActivityIndicator, Alert, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomIcon from "./CustomIcon";
import User from "./User";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import {baseURL } from "../services/api_base";
import {BoldText} from "./AppTextComponents";
import {NormalText} from "./AppTextComponents";
import {OtherText} from "./AppTextComponents";
import postIsLiked from "../utils/postIsLiked";
import postIsSaved from "../utils/postIsSaved";
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
  useEffect(()=>{
    setLiked(postIsLiked(post, user.id))
    setSaved(postIsSaved(post, user.id))
  })
  return(
    
        <View>
          <View style= {{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5}}>
            <User user={post.user}/>
            <CustomIcon name = 'ellipsis-horizontal-outline' size={30} event={()=>setVisible(true)}></CustomIcon>
          </View>
          <Image style={[styles.post,{width: '100%'}]}
              source={{uri: baseURL + post.url} }>
          </Image>
          <View style={{paddingHorizontal:5}}>
            <View style ={{margin: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <BoldText text={post.users_liked ? (post.users_liked.length +" likes") : (0 +" likes")}/>
              <View style ={{flexDirection: 'row'}}>
              {liked ? (
                <CustomIcon name='heart' size={30} event={async()=>{
                  let result = await unlikePost(post.id)
                  setPost(result)
                  setLiked(false)}}/>
              ) :(
              <CustomIcon name='heart-outline' size={30} event={async()=>{
                let result = await likePost(post.id)
                setPost(result)
                setLiked(true)}}/>
                )}
              <CustomIcon name='chatbubbles-outline' event={()=>navigation.navigate('Comments', {post_id: post.id})} size={30}/>
              {/* <CustomIcon name='arrow-redo-outline' size={30}/> */}
              {saved ? (<CustomIcon name='bookmark' size={30} event={async()=>{
                  let result = await unsavePost(post.id)
                  setPost(result)
                  setSaved(false)}}/>):
              (<CustomIcon name='bookmark-outline' size={30} event={async()=>{
                let result = await savePost(post.id)
                setPost(result)
                setSaved(true)}}/>)}
              </View>
            </View>
            {post.description && <NormalText text={post.description}/>}
            {post.tags &&  <FlatList
              data={post.tags}
              renderItem={({item})=>{
                return(
                <TouchableOpacity onPress={()=>navigation.navigate('Tag', {id: item.id})}><OtherText text={item.tag}/></TouchableOpacity>
                )
              }}
              >
            </FlatList>}
            {post.tags && <View style={{width: '100%'}}>
            <FlatList
            data={post.tags}
            renderItem={({item})=><TouchableOpacity onPress={()=>navigation.navigate('Tag', {id: item.id})}><OtherText text={`#${item.tag}`}/></TouchableOpacity>}
            keyExtractor={(item) => item.id}
            horizontal
            />
          </View>}
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
          </View>
        </Modal>
        </View>
      
                             
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
      minHeight:300,
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
  });
  