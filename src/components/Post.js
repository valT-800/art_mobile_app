
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomIcon from "./CustomIcon";
import User from "./User";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import {api, baseURL } from "../services/api_base";
import BoldText from "./BoldText";
import NormalText from "./NormalText";
import OtherText from "./OtherText";


export default function Post({post}){

  const{user} =useContext(AuthContext)
  const navigation = useNavigation();
  const[image, setImage] = useState(post)
  const [loggedUser, setLoggedUser] = useState({})
  const[loading, setLoading] = useState(false)
  const[likedImages, setLikedImages] =useState([])
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const likeImage = (image_id)=>{
    setLoading(true)
    api.put(`api/user/images/${image_id}`, {user_liked: true})
    .then(response => {
      // console.log("Image", response.data)
      setImage(response.data.data.data)
      setLoading(false)
    })
    .catch(error => {
      console.log("Error", error.response);
      setLoading(false)
    })
  }
  const unlikeImage = (image_id)=>{
    setLoading(true)
    api.put(`api/user/images/${image_id}`, {user_unliked: true})
    .then(response => {
        
      // console.log("Image", response.data)
      setImage(response.data.data.data)
      setLoading(false)
    })
    .catch(error => {
      console.log("Error", error.response);
      setLoading(false)
    })
  }
  const saveImage = (image_id)=>{
    setLoading(true)
    api.put(`api/user/images/${image_id}`, {user_saved: true})
    .then(response => {
        
      // console.log("Image", response.data)
      setImage(response.data.data.data)
      setLoading(false)
    })
    .catch(error => {
      console.log("Error", error.response);
      setLoading(false)
    })
  }
  const unsaveImage = (image_id)=>{
    setLoading(true)
    api.put(`api/user/images/${image_id}`, {user_unsaved: true})
    .then(response => {
        
      // console.log("Image", response.data)
      setImage(response.data.data.data)
      setLoading(false)
    })
    .catch(error => {
      console.log("Error", error.response);
      setLoading(false)
    })
  }
  const isLiked = (image, user_id) => {

    return image.users_liked && image.users_liked.some((user) => user.id === user_id);
    
  };
  const isSaved = (image, user_id) => {

    return image.users_saved && image.users_saved.some((user) => user.id === user_id);
    
  };
  return(
      
        <View>
          {!loading &&
        <View>
          <View style= {{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5}}>
            <User user={image.user}/>
            <CustomIcon name = 'ellipsis-horizontal-outline' size={30} event={()=>navigation.navigate('EditPost', image)}></CustomIcon>
          </View>
          <Image style={[styles.image,{width: '100%'}]}
              source={{uri: baseURL + image.url} }>
          </Image>
          <View style={{paddingHorizontal:5}}>
            <View style ={{margin: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <BoldText text={image.users_liked ? (image.users_liked.length +" likes") : (0 +" likes")}/>
              <View style ={{flexDirection: 'row'}}>
              {isLiked(image, user.id) ? (
                <CustomIcon name='heart' size={30} event={()=>unlikeImage(image.id)}/>
              ) :(
              <CustomIcon name='heart-outline' size={30} event={()=>likeImage(image.id)}/>
                )}
              <CustomIcon name='chatbubbles-outline' event={()=>navigation.navigate('Comments', {image_id: image.id})} size={30}/>
              <CustomIcon name='arrow-redo-outline' size={30}/>
              {isSaved(image, user.id) ? (<CustomIcon name='bookmark' size={30} event={()=>{unsaveImage(image.id)}}/>):
              (<CustomIcon name='bookmark-outline' size={30} event={()=>{saveImage(image.id)}}/>)}
              </View>
            </View>
            {image.description && <NormalText text={image.description}/>}
            {image.comments &&
            <View>
              <TouchableOpacity onPress={()=>navigation.navigate('Comments', {image_id: image.id})}><OtherText text="View all comments"/></TouchableOpacity>
              
            </View>
            }
            <OtherText text={image.created_at + " ago"}/>
          </View>
        </View>
        }
      </View>
      
                             
    )
}

const styles = StyleSheet.create({
    container:{
      paddingVertical:20,
    },
    image:{
      minHeight:300,
    }
  });
  