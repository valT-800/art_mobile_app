import { useNavigation } from "@react-navigation/native"
import { Image } from "expo-image"
import { Text, TouchableOpacity } from "react-native"
import {NormalText} from "./AppTextComponents"
import { useContext } from "react"
import { AuthContext } from "../AuthProvider"

const User =({user})=>{
    const navigation =useNavigation()
    const{user: loggedUser} =useContext(AuthContext)
    //console.log(user)
    if(user){
    return(
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={()=>{loggedUser.id==user.id ? navigation.navigate('Profile') : navigation.navigate('User', {id: user.id})}}>
            <Image
              source={user.profile_photo_url}
              style={{width: 25, height: 25, borderRadius: 20, margin: 5,
              justifyContent: 'center',alignItems: 'center',}}></Image>
            <NormalText text={user.username}/>
        </TouchableOpacity>
    )}
}
export default User;