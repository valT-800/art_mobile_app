import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {  Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { baseURL } from "../services/api_base";

export default function Challenge({challenge}){

  const navigation = useNavigation();
  const[url, setUrl] = useState('https://img.freepik.com/free-vector/illustration-business-concept_53876-37559.jpg')


  const firstImageUrl  = () => {

    //console.log(album.images)
    if(challenge.images.length > 0){
      let image = challenge.images.shift()
      //console.log(image.url)
      setUrl(baseURL+image.url) 
    }
  }

    return(
      <View style={[styles.container]}>
      {firstImageUrl()}
      <TouchableOpacity onPress={()=> navigation.navigate('Challenge', {id: challenge.id})}>
        <ImageBackground source={{uri: url}}
        style={styles.image}
        imageStyle = {{borderRadius: 15, opacity: 0.5}}>
          <Text style = {{padding: 5, opacity: 2}}>{challenge.title}</Text>
        
      </ImageBackground>
      </TouchableOpacity>
    </View>
                     
    );
}


const styles = StyleSheet.create({
  container:{
    padding:10,
    elevation: 2,
  },
  image:{
    height: 100,
    width: 100,
  }
});
