import { useNavigation, useTheme } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground} from "react-native";
import { baseURL } from "../services/api_base";

export default function Album({album}){

  const navigation = useNavigation();
  const[url, setUrl] = useState('https://studioandme.co.za/wp-content/uploads/2021/03/Creative_Minimal_Abstract_Art-Print_2_A4.pdf.png')


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
      <TouchableOpacity onPress={()=> navigation.navigate('Album', {id: album.id})}>
        <ImageBackground source={{uri: url}}
        style={styles.image}
        imageStyle = {{borderRadius: 15}}>
        
          <Text style = {styles.title}>{album.title}</Text>
        
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
    color:'white',
    fontWeight: 500,
    textShadowColor: 'black',
    textShadowRadius: 20,
  }
});