import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {api} from "../../services/api_base";
import Post from "../../components/Post";


export default function PostScreen({navigation, route}){

  const{id} = route.params;
  const[image, setImage] = useState({})
  const[loading, setLoading] = useState(true)
  
  useEffect(() => {
    api.get(`api/images/${id}`).then(response => {
      setImage(response.data.data);
      setLoading(false)
    }).catch(error => {
      setLoading(false)
      console.log("Error", error.response);
    });
  },[loading])

    return(
    <SafeAreaView style={styles.container}>
      {loading ? <ActivityIndicator/> :  <Post post={image}/>}
       
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:{
    paddingVertical:20,
  },
});
