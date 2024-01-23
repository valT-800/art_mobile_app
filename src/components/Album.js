import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground, TouchableHighlight} from "react-native";
import { baseURL } from "../services/api_base";
import User from "./User";

export default function Album({album,size}){

  const navigation = useNavigation();
    return(
      <TouchableOpacity style={styles.container} onPress={()=> navigation.navigate('Album', {id: album.id})}>
        <ImageBackground source={{uri: album.post? baseURL+album.post.url: baseURL+'images/app/album_cover.jpg'}}
        style={[styles.image,{minHeight: size? size: 100}]}
        imageStyle = {{borderRadius: 15}}>
        <View style={{maxHeight: 70}}><Text style = {styles.title}>{album.title}</Text></View>
        <View style={{flex:1, flexDirection:'row',alignItems:'flex-end',justifyContent:'space-evenly',margin:5}}>
          <TouchableOpacity style={{flex:0.6}} onPress={()=>navigation.navigate('User',{id:album.user.id})}><Text style={styles.text}>{album.user.username}</Text></TouchableOpacity>
          <View style={{flex:0.4}}><Text style={styles.text}>{album.posts} posts</Text></View>
          </View>
      </ImageBackground>
      </TouchableOpacity>
                             
    );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding: 5,
    margin:5,
  },
  image:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    padding:5,
    color:'whitesmoke',
    fontWeight: 500,
    textShadowColor: 'black',
    textShadowRadius: 20,
  },
  text:{
  color:'whitesmoke',
  textShadowColor: 'black',
  textShadowRadius: 20,
  height: 20,
  width: 70,

}

});