import { useNavigation } from "@react-navigation/native";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomIcon from "./CustomIcon";
import User from "./User";
import Divider from "./Divider";
import { useContext, useEffect, useState } from "react";
import {NormalText} from "./AppTextComponents";
import {OtherText} from "./AppTextComponents";
import { api } from "../services/api_base";
import { AuthContext } from "../AuthProvider";
import commentIsLiked from "../utils/commentIsLiked";
import unlikeComment from "../utils/unlikeComment";
import likeComment from "../utils/likeComment";

export default function Comment({item, setParent, setContent}){

  const{user} =useContext(AuthContext)
  const [comment, setComment]=useState(item)
  const[liked, setLiked] = useState(false)
  const [full, setFull]=useState(false)

  useEffect(()=>{
    setLiked(commentIsLiked(comment, user.id))
  }, [liked])
  
    return(
      
      <View>
          <User user={comment.user}></User>
          <TouchableOpacity onPress={()=> {setFull(!full)
            setParent(comment)
            setContent('@'+comment.user.username)
          }}>
              <View style = {styles.comment}>
                <View style={{flex:0.85}}>
                  <NormalText text={comment.content}/>
                  {comment.comments && <OtherText text={"Comments "+comment.comments.length}/>}
                </View>
                <View style = {{flexDirection: 'row',flex:0.15}}>
                {liked ? <CustomIcon name='heart' size={20} event={async ()=>{
                  let result = await unlikeComment(comment.id)
                  //console.log(result)
                  setComment(result)
                  setLiked(false)
                  }}/>
              : <CustomIcon name='heart-outline' size={20} event={async ()=>{
                let result = await likeComment(comment.id)
                //console.log(result)
                setComment(result)
                setLiked(true)
                }}/>}
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
              <View style={{marginLeft: 20}}>
                <Divider/>
                <Comment item={item} setParent={setParent} setContent={setContent}></Comment>
                   
            </View>
            )}}
            />
        }        
      </View>
                             
    )
}
const styles = StyleSheet.create({
  comment: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    marginLeft: 30,
  }
})
