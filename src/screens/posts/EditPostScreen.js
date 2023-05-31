import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {api, baseURL} from "../../services/api_base";
import { AuthContext } from "../../AuthProvider";
import CustomIcon from "../../components/CustomIcon";
import User from "../../components/User";
import { Image } from "expo-image";
import { useTheme } from "@react-navigation/native";

export default function EditPostScreen({navigation:{navigate, setOptions}, route}){

    const{id, url, description, user} = route.params;
    const[newDescription, setDescription] = useState(description)
    const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    setOptions({
        headerRight: () =>
          <CustomIcon name='checkmark' size={30}
            event={() => editImage()}
            />
        });

    

    const editImage=()=>{
      api.put(`/api/user/images/${id}`, {edited: true, description: newDescription}).then(response => {
        console.log("Imageeeeeeeeeeee",response.data);
        navigate('Post', {id})
      }).catch(error => {
        
        console.log("Error", error.response);
      });
    }
  
   
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
    