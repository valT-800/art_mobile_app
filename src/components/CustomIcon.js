import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native";
import { useState } from "react"

export default CustomIcon=({name, color, event, size})=>{
    
  const { colors } = useTheme();
    return(
        <Ionicons name={name} size={size} style = {{margin: 3}} color={colors.primary} onPress={event}/>
    )
}