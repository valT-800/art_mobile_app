import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground} from "react-native";

export default function Album({album, size}){

  const navigation = useNavigation();
  const[url, setUrl] = useState('https://images.pexels.com/photos/1557652/pexels-photo-1557652.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')


  const firstImageUrl  = ()=>{

    console.log(album.images)
    if(album.images.length > 0){
      let image = album.images.shift()
      console.log(image.url)
      setUrl(image.url) 
    }
  }
    return(
    <View style={[styles.container]}>
      {firstImageUrl()}
      <ImageBackground source={{uri: url}}
      style={{height: 100, width: 100, opacity: 0.6}}
        >
        <TouchableOpacity onPress={()=> navigation.navigate('Album', {id:album.id})}> 
          <Text style = {{padding: 5, opacity: 2}}>{album.title}</Text>
        </TouchableOpacity>
        </ImageBackground>
    </View>
                             
    );
}

const styles = StyleSheet.create({
    container:{
      padding:10,
    },
    image:{
      minHeight: 50,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    label:{
      paddingHorizontal:15
    },
    button:{
      width:"30%",
      height:40,
      backgroundColor:"#f00",
      borderRadius:20,
      textAlign:'center',
      justifyContent:'center',
      alignItems:'center',
      alignSelf:"center"
    },
    center:{
      textAlign:'center',
    },
    buttontext:{
      color:"#fff"
    },
    box:{
      marginTop:20
    },
    textViews:{
      textAlign:'center'
    }
  });
  