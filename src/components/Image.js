import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { baseURL } from "../services/api_base";

export default function ImageComponent({image}){

  const navigation = useNavigation();


    return(
      <View style={{
        flex: 1,
        flexDirection: 'column',
        margin: 1
      }}>
      <TouchableOpacity
       onPress={()=> navigation.navigate('Post', {id: image.id})}>
          <Image style={styles.image}
              source={baseURL + image.url }
              >
          </Image>
          
      </TouchableOpacity>
      </View>
                             
    )
}

const styles = StyleSheet.create({
    
    image:{
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      
    }
  });
  