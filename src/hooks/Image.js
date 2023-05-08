import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ImageComponent({image, size}){

  const navigation = useNavigation();

  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


    return(
      <TouchableOpacity
      style={{padding:5}}
       onPress={()=> navigation.navigate('Image', image)}>
          {console.log(image)}
          <Image style={styles.image}
              source={image.url}
              placeholder={blurhash}
              contentFit="cover"
              transition={1000}
              focusable = {true}>
          </Image>
      </TouchableOpacity>
      
                             
    )
}

const styles = StyleSheet.create({
    
    image:{
      width:100,
      height: 100,
    }
  });
  