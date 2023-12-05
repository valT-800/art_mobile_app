import { SafeAreaView, StyleSheet, View } from "react-native";
import { useState } from "react";
import {NormalText} from "../../components/AppTextComponents";
import CustomInput from "../../components/CustomInput";
import newAlbum from "../../utils/newAlbum";

function NewAlbumScreen({navigation: {navigate, setOptions}}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    setOptions({
      headerRight: () =>
        <CustomIcon name='checkmark' size={30}
          event={async() => {
              await newAlbum(title, description)
              navigate('Profile')
            }}
          />
      });

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
      marginTop: 20
    },
  });