import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {TouchableHighlight, TouchableOpacity, View} from "react-native";
import {NormalText} from "./AppTextComponents";

const TouchableSection=({title,pressedSection, onPress, pressed})=>{
    const {colors} = useTheme()
    return(
        <View style={{paddingHorizontal: 4, marginRight: 4, marginBottom: 4, borderRadius: 10, borderWidth: pressed==pressedSection ? 4 : 2, borderColor: pressed==pressedSection ? colors.primary : colors.card}}>
            <TouchableOpacity onPress = {onPress}>
                <NormalText text={title}/>      
            </TouchableOpacity>
            {/*pressed==pressedSection && <View style={{height: 4, borderRadius: 10, borderColor: colors.text, borderWidth: 2, alignSelf:'stretch', width: "100%" }}></View>*/}
        </View>
    )
}
export default TouchableSection