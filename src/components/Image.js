import { useNavigation } from "@react-navigation/native";
import { Post } from "expo-post";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { baseURL } from "../services/api_base";

export default function PostComponent({post}){

  const navigation = useNavigation();


    return(
      <View style={{
        flex: 1,
        flexDirection: 'column',
        margin: 1
      }}>
      <TouchableOpacity
       onPress={()=> navigation.navigate('Post', {id: post.id})}>
          <Post style={styles.post}
              source={baseURL + post.url }
              >
          </Post>
          
      </TouchableOpacity>
      </View>
                             
    )
}

const styles = StyleSheet.create({
    
    post:{
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      
    }
  });
  