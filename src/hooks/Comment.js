import { useNavigation } from "@react-navigation/native";
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Comment({comment}){

  const navigation = useNavigation();

    return(
        <View>
            <TouchableOpacity onPress={()=> navigation.navigate('Comment', comment)}>
                <Text>{comment.username}</Text>
                <Text>{comment.content}</Text>
            </TouchableOpacity>
                    
        </View>
                             
    )
}

const styles = StyleSheet.create({
    container:{
      paddingVertical:20,
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
    },
  });
  