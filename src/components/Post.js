
import { useNavigation, useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import { ActivityIndicator, Alert, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomIcon from "./CustomIcon";
import User from "./User";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import {baseURL } from "../services/api_base";
import BoldText from "./BoldText";
import NormalText from "./NormalText";
import OtherText from "./OtherText";
import imageIsLiked from "../utils/imageIsLiked";
import imageIsSaved from "../utils/imageIsSaved";
import saveImage from "../utils/saveImage";
import unsaveImage from "../utils/unsaveImage";
import unlikeImage from "../utils/unlikeImage";
import likeImage from "../utils/likeImage";
import TouchableListItem from "./TouchableListItem";
import deleteImage from "../utils/deleteImage";


export default function Post({post}){

  const{user} =useContext(AuthContext)
  const {colors} = useTheme()
  const navigation = useNavigation();
  const[image, setImage] = useState(post)
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
      {text: 'OK', onPress: async() => { await deleteImage(image.id)
        navigation.navigate('Profile');
      }},
    ],{
      cancelable: true,
    });
  }
  useEffect(()=>{
    setLiked(imageIsLiked(image, user.id))
    setSaved(imageIsSaved(image, user.id))
  })
  return(
    
        <View>
          <View style= {{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5}}>
            <User user={image.user}/>
            <CustomIcon name = 'ellipsis-horizontal-outline' size={30} event={()=>setVisible(true)}></CustomIcon>
          </View>
          <Image style={[styles.image,{width: '100%'}]}
              source={{uri: baseURL + image.url} }>
          </Image>
          <View style={{paddingHorizontal:5}}>
            <View style ={{margin: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <BoldText text={image.users_liked ? (image.users_liked.length +" likes") : (0 +" likes")}/>
              <View style ={{flexDirection: 'row'}}>
              {liked ? (
                <CustomIcon name='heart' size={30} event={async()=>{
                  let result = await unlikeImage(image.id)
                  setImage(result)
                  setLiked(false)}}/>
              ) :(
              <CustomIcon name='heart-outline' size={30} event={async()=>{
                let result = await likeImage(image.id)
                setImage(result)
                setLiked(true)}}/>
                )}
              <CustomIcon name='chatbubbles-outline' event={()=>navigation.navigate('Comments', {image_id: image.id})} size={30}/>
              {/* <CustomIcon name='arrow-redo-outline' size={30}/> */}
              {saved ? (<CustomIcon name='bookmark' size={30} event={async()=>{
                  let result = await unsaveImage(image.id)
                  setImage(result)
                  setSaved(false)}}/>):
              (<CustomIcon name='bookmark-outline' size={30} event={async()=>{
                let result = await saveImage(image.id)
                setImage(result)
                setSaved(true)}}/>)}
              </View>
            </View>
            {image.description && <NormalText text={image.description}/>}
            {image.tags &&  <FlatList
              data={image.tags}
              renderItem={({item})=>{
                return(
                <TouchableOpacity onPress={()=>navigation.navigate('Tag', {id: item.id})}><OtherText text={item.tag}/></TouchableOpacity>
                )
              }}
              >
            </FlatList>}
            {image.tags && <View style={{width: '100%'}}>
            <FlatList
            data={image.tags}
            renderItem={({item})=><TouchableOpacity onPress={()=>navigation.navigate('Tag', {id: item.id})}><OtherText text={`#${item.tag}`}/></TouchableOpacity>}
            keyExtractor={(item) => item.id}
            horizontal
            />
          </View>}
            {image.comments &&
            <View>
              <TouchableOpacity onPress={()=>navigation.navigate('Comments', {image_id: image.id})}><OtherText text="View all comments"/></TouchableOpacity>
              
            </View>
            }
            <OtherText text={image.created_at + " ago"}/>
          </View>
          <Modal animationType="slide" visible={visible} transparent onRequestClose={()=>setVisible(false)}>
          <View style={[styles.overlayContainer, {backgroundColor: colors.card}]}>
            <CustomIcon name='chevron-down' size={30} event={()=>setVisible(false)}>
            </CustomIcon>
            {user.id == image.user.id && <TouchableListItem title='Edit' onPress={()=>navigation.navigate('EditPost', image)}/>}
            {user.id == image.user.id && <TouchableListItem title='Delete' onPress={handleDelete}/>}
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
    image:{
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
  