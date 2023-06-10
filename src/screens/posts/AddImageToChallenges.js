import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../../components/CustomButton';
import pickImageFromGallery from '../../utils/pickImageFromGallery';
import takePhoto from '../../utils/takePhoto';

export default function SelectImageScreen ({navigation: {navigate}, route}) {
    const{id} = route.params;
    const [image, setImage] = useState(null);
    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
    let result = await pickImageFromGallery()
    setImage(result);
    image ? navigate('NewPost', { image, challenge_id: id }) : pickImage
    
  };

  const openCamera = async () => {
      let result = await takePhoto()
        setImage(result);
        image ? navigate('NewPost', { image, challenge_id: id }) : openCamera
  }

  

    return (
      <View style={styles.container}>
        {id && <CustomButton title = 'Select from existing' onPress={()=>navigate('PickImageFromApp', {id})}></CustomButton>}
        <CustomButton title='Select from gallery' onPress={pickImage}>
        </CustomButton>
        <CustomButton title = 'Take photo' onPress={openCamera}>
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