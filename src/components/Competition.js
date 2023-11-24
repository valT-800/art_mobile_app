import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {  Post, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { baseURL } from "../services/api_base";

export default function Competition({competition}){

  const navigation = useNavigation();
  const[url, setUrl] = useState('https://img.freepik.com/free-vector/illustration-business-concept_53876-37559.jpg')


  const firstPostUrl  = () => {

    //console.log(album.posts)
    if(competition.posts.length > 0){
      let post = competition.posts.shift()
      //console.log(post.url)
      setUrl(baseURL+post.url) 
    }
  }

    return(
      <View style={styles.container}>
      {firstPostUrl()}
      <TouchableOpacity onPress={()=> navigation.navigate('Competition', {id: competition.id})}>
        <ImageBackground source={{uri: url}}
        style={styles.post}
        postStyle = {{borderRadius: 15}}>
          <Text style = {styles.title}>{competition.title}</Text>
        
      </ImageBackground>
      </TouchableOpacity>
    </View>
                     
    );
}


const styles = StyleSheet.create({
  container:{
    margin:5,
    elevation: 2,
    borderRadius: 10,
    shadowRadius: 10,
    height: 100,
    width: 100,
    shadowColor:'gray'
  },
  post:{
    height: 100,
    width: 100,
    shadowColor: 'gray',
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems:'center'
  },
  title:{
    padding: 5,
    color:'white',
    fontWeight: 500
  }
});
