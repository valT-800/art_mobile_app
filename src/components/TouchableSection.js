import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {TouchableHighlight, TouchableOpacity, View} from "react-native";
import NormalText from "./NormalText";

const TouchableSection=({title, onPress, pressed})=>{
    const colors = useTheme()
    return(
        <View>
            <TouchableOpacity onPress = {onPress}>
                <NormalText text={title}/>      
            </TouchableOpacity>
            {pressed==title && <View style={{height: 5, borderRadius: 10, borderColor: colors.text }}></View>}
        </View>
    )
}
export default TouchableSection