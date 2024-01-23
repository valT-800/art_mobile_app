import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import {NormalText} from "../../components/AppTextComponents";
import CustomInput from "../../components/CustomInput";
import CustomMultilineInput from "../../components/CustomMultilineInput";
import {api} from "../../services/api_base"
function NewAlbumScreen({navigation: {navigate, setOptions}}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState([]);

    setOptions({
      headerRight: () =>
        <CustomIcon name='checkmark' size={30}
          event={async() => {
              await newAlbum(title, description)
            }}
          />
      });

      async function newAlbum (title, description) {
        await api.post('api/user/albums', {title, description})
        .then((response) => {
            console.log(response.data)        
            navigate('Profile')
        }).catch((err) => {
        console.log(err.response.data.message)
        setError(err.response.data.message)
      })
    }

    return(
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={{padding: 10, alignItems: 'center'}}>
            { error && error.title &&
            <Text style={{ color: 'red', marginBottom: 24 }}>{error.title}</Text>
            }
              <NormalText text='Title'/>
              <CustomInput
                onChangeText={setTitle}
                placeholder="Enter Title"
                value={title}
              />
              <NormalText text='Description'/>
              <CustomMultilineInput
                onChangeText={(text)=>setDescription(text)}
                value={description}
                placeholder="Enter Description"
            />
        </View>
        </ScrollView>
    </SafeAreaView>
    )
}

export default NewAlbumScreen;

const styles = StyleSheet.create({
    container:{
      flex: 1,
      paddingVertical:20,
      marginTop: 20
    },
  });