import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {api, baseURL} from "../../services/api_base";
import { AuthContext } from "../../AuthProvider";

export default function PostFullScreen({navigation:{navigate}, route}){
  const{user} = useContext(AuthContext);
  const{id} = route.params;
  const[post, setPost] = useState({})
  const[loading, setLoading] = useState(true)
  useEffect(() => {
    if(id){
    api.get(`api/posts/${id}`).then(response => {
      setPost(response.data.data);
      //console.log(post)
      setLoading(false)
    }).catch(error => {
      setLoading(false)
      //console.log("Error", error.response);
    });
  }
  },[loading])

    return(
    <SafeAreaView style={styles.container}>
      
      {loading ? <ActivityIndicator/> :  
      <View style={{flex:1}}>
        <Image resizeMode='contain' style={styles.image} source={{uri: baseURL+post.url}}>
        </Image>
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
