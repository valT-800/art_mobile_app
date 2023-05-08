import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Post({image}){

  const navigation = useNavigation();

  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


    return(
        <View>
            <TouchableOpacity style={{flexDirection: 'row'}}>
                <Image
                source={image.user.profile_photo}
                style={{width: 25, height: 25, borderRadius: 20, borderColor: 'gray', borderWidth: 1, margin: 5}}></Image>
                <Text>{image.user.username}</Text>
            </TouchableOpacity>
              {console.log(image)}
                <Image style={[styles.image,{width: '100%'}]}
                    source={image.url}
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={1000}
                    focusable = {true}>
                </Image>
                <View style ={{margin: 5}}>
                    <Text>Likes {image.users_liked ? image.users_liked.length : null}</Text>
                <Text>{image.description}</Text>
                <TouchableOpacity>
                    <Text>View all comments</Text>
                </TouchableOpacity>
            <Text>{image.created_at}</Text>
            </View>  
        </View>
                             
    )
}

const styles = StyleSheet.create({
    container:{
      paddingVertical:20,
    },
    image:{
      minHeight:300,
    }
  });
  