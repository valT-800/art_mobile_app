import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {  Post, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { baseURL } from "../services/api_base";

export default function Exhibition({exhibition}){

  const navigation = useNavigation();
  const[url, setUrl] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6MZSGFFo2KYnkE9K23hpeloGmGBEe1L_yYA&usqp=CAU')


  const firstPostUrl  = () => {

    //console.log(album.posts)
    if(exhibition.posts.length > 0){
      let post = exhibition.posts.shift()
      //console.log(post.url)
      setUrl(baseURL+post.url) 
    }
  }

    return(
      <View style={styles.container}>
      {firstPostUrl()}
      <TouchableOpacity onPress={()=> navigation.navigate('Exhibition', {id: exhibition.id})}>
          <ImageBackground source={{uri: url}}
          imageStyle={{borderRadius: 10}}
        style={styles.image}>
          <Text style = {styles.title}>{exhibition.title}</Text> 
      </ImageBackground>
      </TouchableOpacity>
    </View>
                     
    );
}


const styles = StyleSheet.create({
  container:{
    margin:5,
    justifyContent:'center',
    alignItems:'center',
  },
  image:{
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems:'center'
  },
  title:{
    padding: 5,
    color:'white',
    fontWeight: 500,
    textShadowColor: 'black',
    textShadowRadius: 20,
  }
});
