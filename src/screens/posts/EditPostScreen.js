import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {api, baseURL} from "../../services/api_base";
import CustomIcon from "../../components/CustomIcon";
import User from "../../components/User";
import { Image } from "expo-image";
import editPost from "../../utils/editPost";
import CustomMultilineInput from "../../components/CustomMultilineInput";

export default function EditPostScreen({navigation:{navigate, setOptions,goback}, route}){

    const{id, url, description, user} = route.params;
    const[newDescription, setDescription] = useState(description)

      setOptions({
        headerRight: () =>
          <CustomIcon name='checkmark' size={30}
            event={() => updatePost(id, newDescription)}
            />
        });

    function updatePost(){
      console.log('Description', newDescription)
      api.put(`api/user/posts/${id}`, {edited: true, description: newDescription}).then(response => {
          console.log("Posteeeeeeeeeee",response.data);
          navigate('Post', {id: response.data.id})
      }).catch(error => {
          console.log("Error", error.response);
      });
    }
    return(
        
          <SafeAreaView style={styles.container}>
            <ScrollView>
            <User user={user}/>
            <Image style={[styles.post,{width: '100%'}]}
                source={{uri: baseURL + url} }>
            </Image>
            <CustomMultilineInput
            style = {styles.input}
            value={newDescription}
            onChangeText={(text)=>setDescription(text)}
            />
            </ScrollView>
        </SafeAreaView>
        
                               
      )
  }
  
  const styles = StyleSheet.create({
      container:{
        paddingVertical:20,
      },
      post:{
        minHeight:300,
      }
    });
    