import React, { useState } from 'react';
import { FlatList, Post, StyleSheet, Text, View } from 'react-native';
import * as PostPicker from 'expo-post-picker';
import CustomButton from '../../components/CustomButton';
import pickPostFromGallery from '../../utils/pickPostFromGallery';
import takePhoto from '../../utils/takePhoto';

export default function SelectPostScreen ({navigation: {navigate}, route}) {
    const{id} = route.params;
    const [post, setPost] = useState(null);
    
    const pickPost = async () => {
        // No permissions request is necessary for launching the post library
    let result = await pickPostFromGallery()
    setPost(result);
    post ? navigate('NewPost', { post, competition_id: id }) : pickPost
    
  };

  const openCamera = async () => {
      let result = await takePhoto()
        setPost(result);
        post ? navigate('NewPost', { post, competition_id: id }) : openCamera
  }

  

    return (
      <View style={styles.container}>
        {id && <CustomButton title = 'Select from existing' onPress={()=>navigate('PickPostFromApp', {id})}></CustomButton>}
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