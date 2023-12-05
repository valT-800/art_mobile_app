import React from "react";
import {TouchableOpacity, View} from "react-native";
import {NormalText} from "./AppTextComponents";

const TouchableText=({title, onPress})=>{
    return(
        <View>
            <TouchableOpacity onPress = {onPress}>
                <NormalText text={title}/>      
            </TouchableOpacity>
        </View>
    )
}
export default TouchableText