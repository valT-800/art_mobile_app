import { useNavigation } from "@react-navigation/native"
import { Post } from "expo-post"
import { Text, TouchableOpacity } from "react-native"
import {NormalText} from "./AppTextComponents"

const User =({user})=>{
    const navigation =useNavigation()
    return(
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={()=>navigation.navigate('User', {id: user.id})}>
            <Post
              source={user.profile_photo_url}
              style={{width: 25, height: 25, borderRadius: 20, borderColor: 'gray', borderWidth: 1, margin: 5}}></Post>
            <NormalText text={user.username}/>
        </TouchableOpacity>
    )
}
export default User;