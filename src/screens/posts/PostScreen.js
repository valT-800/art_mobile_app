import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {api} from "../../services/api_base";
import Post from "../../components/Post";


export default function PostScreen({navigation, route}){

  const{id} = route.params;
  const[post, setPost] = useState({})
  const[loading, setLoading] = useState(true)
  
  useEffect(() => {
    api.get(`api/posts/${id}`).then(response => {
      setPost(response.data.data);
      //console.log(post)
      setLoading(false)
    }).catch(error => {
      setLoading(false)
      //console.log("Error", error.response);
    });
  },[loading])

    return(
    <SafeAreaView style={styles.container}>
      {loading ? <ActivityIndicator/> :  <Post post={post}/>}
       
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:{
    paddingVertical:20,
    marginTop: 50
  },
});
