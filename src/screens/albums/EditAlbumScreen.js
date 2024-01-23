import {useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomInput from "../../components/CustomInput";
import {NormalText} from "../../components/AppTextComponents";
import editAlbum from "../../utils/editAlbum";
import CustomMultilineInput from "../../components/CustomMultilineInput";

export default function EditAlbumScreen({route, navigation:{navigate, setOptions}}){

  const{id, title, description} = route.params;
    const[newDescription, setDescription] = useState()
    const[newTitle, setTitle] = useState()

    setOptions({
      headerRight: () =>
        <CustomIcon name='checkmark' size={30}
          event={async() => {
            await editAlbum(id, newTitle, newDescription)
          navigate('Album', id)}}
          />
      });
      
    useEffect(()=>{
      setDescription(description)
      setTitle(title)
    },[])
    return(
        <SafeAreaView style= {styles.container}>
          <ScrollView>
          <View style = {{padding: 10, alignItems: 'center'}}>
          <NormalText text='Title'/>
            {title && <CustomInput
            value={newTitle}
            onChangeText={setTitle}
            />}
            <NormalText text='Description'/>
          {description && <CustomMultilineInput
            value={newDescription}
            onChangeText={setDescription}
            />}
          </View>
          </ScrollView>
        </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 20
  },
  posts: {
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
