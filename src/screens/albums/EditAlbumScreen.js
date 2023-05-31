import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../AuthProvider";
import {api} from "../../services/api_base";
import CustomInput from "../../components/CustomInput";
import NormalText from "../../components/NormalText";

export default function EditAlbumScreen({route, navigation:{navigate, setOptions}}){

  const{id, title, description} = route.params;
    const[newDescription, setDescription] = useState(description)
    const[newTitle, setTitle] = useState(title)

    setOptions({
        headerRight: () =>
          <CustomIcon name='checkmark' size={30}
            event={() => editAlbum()}
            />
        });

    

    const editAlbum=()=>{
      api.put(`/api/user/albums/${id}`, {title: newTitle, description: newDescription}).then(response => {
        
        navigate('Album', {id})
      }).catch(error => {
        
        console.log("Error", error.response);
      });
    }
  
    return(
        <SafeAreaView style= {styles.container}>
          <View style = {{padding: 10, alignItems: 'center'}}>
          <NormalText text='Title'/>
            <CustomInput
            value={newTitle}
            onChangeText={(text)=>setTitle(text)}
            />
            <NormalText text='Description'/>
          <CustomInput
            value={newDescription}
            onChangeText={(text)=>setDescription(text)}
            />
          </View>
        </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    flex: 1
  },
  images: {
    justifyContent: 'center',
    flex: 1
  },
  input:{
    marginTop: 10,
    borderColor: 'grey',
    borderWidth: 1,
    minHeight: 100,
  }
});
