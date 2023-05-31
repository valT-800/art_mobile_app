import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BoldText from '../../components/BoldText';
import CustomButton from '../../components/CustomButton';
import { api } from '../../services/api_base';

const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
};

export default function AddImageToChallenges ({navigation: {navigate, goback}, route}) {
    const{id} = route.params;
    const [image, setImage] = useState(null);
    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync(options);

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      image ? navigate('NewPost', { image, challenge_id: id }) : pickImage
    }
    else{
      pickImage
    }
  };

  const takePhoto = async () => {
      let result = await ImagePicker.launchCameraAsync(options);
      console.log(result);
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        image ? navigate('NewPost', { image }) : takePhoto
      }
      
  };

  

    return (
      <View style={styles.container}>
        <CustomButton title = 'Select from existing' onPress={navigate('PickImageFromApp', {id})}></CustomButton>
        <CustomButton title='Select from gallery' onPress={pickImage}>
        </CustomButton>
        <CustomButton title = 'Take photo' onPress={takePhoto}>
        </CustomButton>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});