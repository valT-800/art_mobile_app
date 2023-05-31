import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {api} from "../../services/api_base";
import { useState } from "react";
import NormalText from "../../components/NormalText";
import CustomInput from "../../components/CustomInput";

function NewAlbumScreen({navigation: {navigate, setOptions}}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    setOptions({
      headerRight: () =>
        <CustomIcon name='checkmark' size={30}
          event={() => {
              setData()
            
            }}
          />
      });

    const setData = () => {
        api.post('api/user/albums', {
            title: title,
            description: description
        })
        .then(() => {
            navigate('Profile');
        }).catch((err) => console.log(err))
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={{padding: 10, alignItems: 'center'}}>
              <NormalText text='Title'/>
              <CustomInput
                onChangeText={setTitle}
                placeholder="Enter Title"
                value={title}
              />
              <NormalText text='Description'/>
              <CustomInput
                onChangeText={setDescription}
                value={description}
                placeholder="Enter Description"
              />
        </View>
    </SafeAreaView>
    )
}

export default NewAlbumScreen;

const styles = StyleSheet.create({
    container:{
      flex: 1,
      paddingVertical:20,
    },
  });