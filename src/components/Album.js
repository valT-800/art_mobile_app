import { useNavigation, useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground} from "react-native";
import { baseURL } from "../services/api_base";

export default function Album({album}){

  const navigation = useNavigation();
  const {colors} = useTheme();
  // const[url, setUrl] = useState('https://images.pexels.com/photos/1557652/pexels-photo-1557652.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')


  // const firstImageUrl  = () => {

  //   //console.log(album.images)
  //   if(album.images ){
  //     let image = album.images.shift()
  //     //console.log(image.url)
  //     setUrl(baseURL+image.url) 
  //   }
  // }

    return(
    <View style={[{backgroundColor: colors.card, shadowColor: colors.border}, styles.container]}>
      {/* {firstImageUrl()} */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
      <TouchableOpacity onPress={()=> navigation.navigate('Album', {id: album.id})}>
      <Text style = {{padding: 5, opacity: 2}}>{album.title}</Text>
        {/* <ImageBackground source={{uri: url}}
        style={styles.image}
        imageStyle = {{borderRadius: 15, opacity: 0.5}}>
        
          <Text style = {{padding: 5, opacity: 2}}>{album.title}</Text>
        
      </ImageBackground> */}
      </TouchableOpacity>
      </View>
    </View>
                             
    );
}
const styles = StyleSheet.create({
  container:{
    margin:5,
    elevation: 2,
    shadowRadius: 10,
    borderRadius: 10,
    height: 100,
    width: 100,
  },
  image:{
    height: 100,
    width: 100,
    shadowColor: 'gray',
    shadowRadius: 2
  }
});