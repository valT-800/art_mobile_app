import { useNavigation } from "@react-navigation/native";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomIcon from "./CustomIcon";
import User from "./User";
import Divider from "./Divider";
import { useState } from "react";
import NormalText from "./NormalText";
import OtherText from "./OtherText";
import { api } from "../services/api_base";

export default function Comment({item, liked}){

  const [comment, setComment]=useState(item)

  const navigation = useNavigation();
  const [full, setFull]=useState(false)

  const likeComment = (comment_id)=>{

    api.put(`api/user/comments/${comment_id}`, {user_liked: true})
    .then(response => {
      setComment(response.data.data)
    })
    .catch(error => {
      console.log("Error", error.response);

    })
  }
  const unlikeComment = (comment_id)=>{
    setLoading(true)
    api.put(`api/user/comments/${comment_id}`, {user_unliked: true})
    .then(response => {
      setComment(response.data.data)
    })
    .catch(error => {
      console.log("Error", error.response);

    })
  }
  
    return(
      <View>
          <User user={comment.user}></User>
          <TouchableOpacity onPress={()=> setFull(true)}>
              <View style = {styles.comment}>
                <View>
                  <NormalText text={comment.content}/>
                  {comment.comments && <OtherText text={"Comments "+comment.comments.length}/>}
                </View>
                <View style = {{flexDirection: 'row'}}>
                {liked ? <CustomIcon name='heart' size={15} event={()=>unlikeComment(comment.id)}/>
              : <CustomIcon name='heart-outline' size={15} event={()=>likeComment(comment.id)}/>}
                  <NormalText text = {comment.users_liked ? comment.users_liked.length : 0}></NormalText>
                </View>
              </View>
          </TouchableOpacity>
          {full && 
          <FlatList 
      
          keyExtractor = {( item) => item.id }
          data={comment.comments}
          renderItem={({item}) => {
            return(
              <View>
              <View style = {styles.comment}>
                <NormalText text={item.content}/>
                <CustomIcon name = 'heart-outline' size={15}></CustomIcon>
              </View>
            <Divider/>
            </View>
            )}}
            />
        }        
      </View>
                             
    )
}
const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    marginLeft: 30,
  }
})
