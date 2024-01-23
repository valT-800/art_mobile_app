
import React, { useContext, useEffect, useState } from 'react';
import { Button, Post, SafeAreaView, TextInput, View, Text, ActivityIndicator, Modal, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import CustomIcon from '../../components/CustomIcon';
import getUserAlbums from '../../utils/getUserAlbums';
import getTags from '../../utils/getTags';
//import uploadPost from '../../utils/uploadPost';
import {NormalText} from '../../components/AppTextComponents';
import { useTheme } from '@react-navigation/native';
import { api } from '../../services/api_base';
import { AuthContext } from '../../AuthProvider';
import CustomMultilineInput from '../../components/CustomMultilineInput';

export default function NewPostScreen ({ navigation: {navigate, setOptions}, route }) {
  
  const {user}=useContext(AuthContext)
  const {colors} =useTheme()
  const[description, setDescription ] = useState('');
  const[album_id, setAlbumId]=useState(null)
  const[albums, setAlbums]=useState([])
  const[loadingAlbums, setLoadingAlbums] =useState(true)
  const { image, competition_id } = route.params;
  const[loading, setLoading]=useState(false)
  const[inputValue, setInputValue] = useState('')
  
  const [error, setError] = useState([]);

  setOptions({
    headerRight: () =>
      <CustomIcon name='checkmark' size={30}
        event={()=>{
          handleUpload()
          setLoading(true)
        }}
        />
  });
  
     const handleUpload=async()=>{
      console.log(description, image, album_id, competition_id)
      let result = await uploadPost(image, description, album_id, competition_id)
      console.log(result)
      if(result) navigate('Profile')
      else setLoading(false); 
       
    }
    async function uploadPost(image, description, album_id, competition_id){
      let filename = image.toString();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let cleanUri =
      Platform.OS === "ios"
        ? image.replace("file:/", "")
        : image;
      console.log(image,description,filename,type)
      let formData = new FormData();
      formData.append('image', { uri:cleanUri, name: filename, type });
      formData.append('description', description)
      if(album_id!=null || album_id!=undefined) formData.append('album_id', album_id)
      //if(competition_id!=null || competition_id!=undefined) formData.append('competition_id', competition_id)
      api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      let result = await api.post('api/user/posts', formData, 
      {headers: { 'Accept': 'application/json','Content-Type': 'multipart/form-data',}})
      .then((response) => {
          //console.log('Post uploaded successfully.', response.data)
          return response.data
            
      }).catch((err) => {
        console.log(err.response)
        setError(err.response.data.message)})
      return result
    }

  useEffect(() => {
    async function fetchData(){
      await api.get(`api/albums-short/user/${user.id}`).then(response => {
        console.log(response.data)
        setAlbums(response.data.data)
        setLoadingAlbums(false)
      }).catch(error => {
        console.log("Error", error);
        setLoadingAlbums(false)
    },[]);
      
    }
    fetchData()
  }, [loadingAlbums]);

    return (
      <SafeAreaView style={{ padding: 10 }}>
        {loading ? (
          <View><ActivityIndicator/></View>
        ):(
          <ScrollView>
          <View style = {{alignItems: 'center', minHeight:'50%'}}>
          { error && 
            <Text style={{ color: 'red', marginBottom: 24 }}>{error}</Text>
            } 
          <Image
            source={{ uri: image }}
            style={{ resizeMode: 'contain', aspectRatio: 1, width: 350 }}
          />
          <View style={{alignSelf: 'flex-start'}}>
          <CustomMultilineInput
            //style={{ paddingHorizontal: 16, height: 100, width: '100%', alignSelf: 'flex-start' }}
            placeholder="Add a neat description..."
            onChangeText={(text)=>setDescription(text)}
          />
        {albums && <SelectDropdown
        style={{borderRadius: 20}}
            defaultButtonText='Select album'
            data={albums}
            onSelect={(selectedItem)=>{
              setAlbumId(selectedItem.id)
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem.title
            }}
            rowTextForSelection={(item) => {
              return item.title
            }}
        ></SelectDropdown>}
        </View>
        </View>
        </ScrollView>
        )}
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  overlayContainer: {
    width: '100%',
  },
});