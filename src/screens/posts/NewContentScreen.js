import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../../components/CustomButton';

const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.7,
};

export default function NewContentScreen ({navigation: {navigate}}) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync(options);

    console.log(result.assets[0].uri);

    if (result.assets[0].uri) {
      navigate('NewPost', { image: result.assets[0].uri})
    }
    else{
      pickImage
    }
  };

  const takePhoto = async () => {
      let result = await ImagePicker.launchCameraAsync(options);
      console.log(result.assets[0].uri);
      if (result.assets[0].uri) {
        navigate('NewPost', { image: result.assets[0].uri})
      }else{
        takePhoto
      }

  };

    return (
      <View style={styles.container}>
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