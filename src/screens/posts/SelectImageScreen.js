import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as PostPicker from 'expo-image-picker';
import {BoldText} from '../../components/AppTextComponents';
import CustomButton from '../../components/CustomButton';
import pickPostFromGallery from '../../utils/pickPostFromGallery';
import takePhoto from '../../utils/takePhoto';


export default function SelectImageScreen ({navigation: {navigate}}) {
  const [post, setPost] = useState(null);

  const pickPost = async () => {
    // No permissions request is necessary for launching the post library
    let result = await pickPostFromGallery()
    setPost(result);
    post ? navigate('NewPost', { post, competition_id: null }) : pickPost
  };

  const openCamera = async () => {
    let result = await takePhoto()
      setPost(result);
      post ? navigate('NewPost', { post, competition_id: null }) : openCamera
}

    return (
      <View style={styles.container}>
        <CustomButton title='Select from gallery' onPress={pickPost}>
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