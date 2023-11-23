import { useNavigation, useTheme } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, PostBackground} from "react-native";
import { baseURL } from "../services/api_base";

export default function Album({album}){

  const navigation = useNavigation();
  const[url, setUrl] = useState('https://posts.pexels.com/photos/1557652/pexels-photo-1557652.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')


  const firstPostUrl  = () => {

     //console.log(album.posts)
     if(album.posts > 0){
       let post = album.posts.shift()
       //console.log(post.url)
       setUrl(baseURL+post.url) 
     }
   }

    return(
    <View style={styles.container}>
      {firstPostUrl()}
      <TouchableOpacity onPress={()=> navigation.navigate('Album', {id: album.id})}>
        <PostBackground source={{uri: url}}
        style={styles.post}
        postStyle = {{borderRadius: 15}}>
        
          <Text style = {styles.title}>{album.title}</Text>
        
      </PostBackground>
      </TouchableOpacity>
    </View>
                             
    );
}
const styles = StyleSheet.create({
  container:{
    margin:5,
    height: 100,
    width: 100,
    shadowColor:'gray'
  },
  post:{
    height: 100,
    width: 100,
    shadowColor: 'gray',
    shadowRadius: 10,
    justifyContent: 'center',
    alignItems:'center',
    elevation: 10
  },
  title:{
    color:'white',
    fontWeight: 500
  }
});