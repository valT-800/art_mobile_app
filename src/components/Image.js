import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { baseURL } from "../services/api_base";
import CustomButton from "./CustomButton";

export default function ImageComponent({post,competition_id}){

  const navigation = useNavigation();

    return(
      <View style={{
        flex: 1,
        margin: 4
      }}>
      <TouchableOpacity
       onPress={()=>
        {competition_id ? navigation.navigate('CompetitionPost', {id: post.id,competition_id:competition_id})
         : navigation.navigate('Post', {id: post.id})}}>
          <Image style={styles.image}
              source={baseURL + post.url }>
          </Image>     
      </TouchableOpacity>
      </View>                             
    )
}

const styles = StyleSheet.create({
    
    image:{
      minHeight:200,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    }
  });
  