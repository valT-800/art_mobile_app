import { useNavigation } from "@react-navigation/native"
import { Image } from "expo-image"
import { Text, TouchableOpacity } from "react-native"
import NormalText from "./NormalText"

const User =({user})=>{
    const navigation =useNavigation()
    return(
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={()=>navigation.navigate('User', {id: user.id})}>
            <Image
              source={user.profile_photo_url}
              style={{width: 25, height: 25, borderRadius: 20, borderColor: 'gray', borderWidth: 1, margin: 5}}></Image>
            <NormalText text={user.username}/>
        </TouchableOpacity>
    )
}
export default User;