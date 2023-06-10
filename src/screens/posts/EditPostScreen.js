import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {api, baseURL} from "../../services/api_base";
import { AuthContext } from "../../AuthProvider";
import CustomIcon from "../../components/CustomIcon";
import User from "../../components/User";
import { Image } from "expo-image";
import { useTheme } from "@react-navigation/native";
import editImage from "../../utils/editImage";

export default function EditPostScreen({navigation:{navigate, setOptions}, route}){

    const{id, url, description, user} = route.params;
    const[newDescription, setDescription] = useState(description)

    setOptions({
        headerRight: () =>
          <CustomIcon name='checkmark' size={30}
            event={async() => {
              await editImage(id, newDescription)
              navigate('Post', {id})}}
            />
        });
  
   
    return(
        
          <SafeAreaView style={styles.container}>
            
            <User user={user}/>
            <Image style={[styles.image,{width: '100%'}]}
                source={{uri: baseURL + url} }>
            </Image>
            <TextInput
            style = {styles.input}
            value={newDescription}
            onChangeText={(text)=>setDescription(text)}
            />
            
        </SafeAreaView>
        
                               
      )
  }
  
  const styles = StyleSheet.create({
      container:{
        paddingVertical:20,
      },
      image:{
        minHeight:300,
      },
      input:{
        marginTop: 10,
        borderColor: 'grey',
        borderWidth: 1,
        minHeight: 100,
      }
    });
    