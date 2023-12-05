import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { baseURL } from "../services/api_base";

export default function ImageComponent({post}){

  const navigation = useNavigation();


    return(
      <View style={{
        flex: 1,
        margin: 1
      }}>
      <TouchableOpacity
       onPress={()=> navigation.navigate('Post', {id: post.id})}>
          <Image style={styles.image}
              source={baseURL + post.url }
              >
          </Image>
          
      </TouchableOpacity>
      </View>
                             
    )
}

const styles = StyleSheet.create({
    
    image:{
      minHeight:150,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    }
  });
  