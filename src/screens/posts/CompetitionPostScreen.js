import React, { createContext, useContext, useDeferredValue, useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {api, baseURL} from "../../services/api_base";
import Post from "../../components/Post";
import CustomButton from "../../components/CustomButton";
import { AuthContext } from "../../AuthProvider";
import User from "../../components/User";
import { NormalText } from "../../components/AppTextComponents";

export default function CompetitionPostScreen({navigation:{navigate}, route}){
  const{user} = useContext(AuthContext);
  const{id,competition_id} = route.params;
  const[post, setPost] = useState({})
  const[loading, setLoading] = useState(true)
  const[voted, setVoted] = useState(true)
  const[votes, setVotes] = useState(0)
  useEffect(() => {
    fetchPost()
    getVotes()
  },[])

  function fetchPost () {
    api.get(`api/posts/${id}`).then(response => {
      setPost(response.data.data);
      //console.log(post)   
      user.id!=response.data.data.user.id && checkIfVoted(response.data.data)
      setLoading(false)
    }).catch(error => {
      setLoading(false)
      //console.log("Error", error.response);
    });
  }
  async function vote(){

    let result = await api.post(`api/user/vote/competition/${competition_id}/post/${id}`)
    .then(response => {
        setVoted(response.data.voted)
        getVotes()
    })
    .catch(error => {
      console.log('Error ', error.response)
    })
    return result
  }
  async function checkIfVoted(post){
    console.log(post.id)
    await api.put(`api/user/voted/competition/${competition_id}`,{post_id:post.id}).then(response => {
      console.log('Voted',response.data.voted)
      setVoted(response.data.voted)
  }).catch(error => {
    console.log(error.response);
  })}
  async function getVotes(){
    await api.get(`api/users-voted/competition/${competition_id}/post/${id}`).then(response => {
      console.log('Votes',response.data.users_voted)
      setVotes(response.data.users_voted)
  }).catch(error => {
    console.log(error.response);
  })}

    return(
    <SafeAreaView style={styles.container}>
      
      {loading ? <ActivityIndicator/> :  
      <View style={{flex:1}}>
        <TouchableOpacity style={{flex:1}} onPress={()=>navigate('Post', {id: id})}>
        <Image resizeMode='cover' style={styles.image} source={{uri: baseURL+post.url}}>
        </Image>
        </TouchableOpacity>
        <View style={{alignItems:'center'}}>
          <View style={{flexDirection:'row', width:'100%',justifyContent:'space-between',alignItems:'center'}}>
        <User user={post.user}/>
        <NormalText text={votes +' votes'}/>
        </View>
        {!voted && <CustomButton title="Vote" onPress={()=>vote()}/>}
        </View>
      </View>} 
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingVertical:20,
  },
  image:
  {
    flex:1,
  }
});
