
import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Image, SafeAreaView, TextInput, View, Text, ActivityIndicator } from 'react-native';
import {api} from '../../services/api_base';
import { AuthContext } from '../../AuthProvider';
import SelectDropdown from 'react-native-select-dropdown';
import CustomIcon from '../../components/CustomIcon';

export default function NewPostScreen ({ navigation: {navigate, setOptions}, route }) {
  
  const{user} = useContext(AuthContext);
  const [description, setDescription ] = useState('');
  const[album, setAlbum]=useState(null)
  const[albums, setAlbums]=useState([])
  const[loading, setLoading] =useState(true)
  const { image, album_id, challenge_id } = route.params;

  setOptions({
    headerRight: () =>
      <CustomIcon name='arrow-forward' size={30}
        event={() => {
          console.log(description, image)
            uploadImage()
              //ApiImages.shared.post( description, image );
          
          }}
        />
    });

 const uploadImage = () => {

  let filename = image.toString();
  //let compressedImage = await reduceImageAsync(image);
  //let filename = compressedImage.uri.toString();
  let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    //let uri = compressedImage.uri
    let formData = new FormData();
    //console.log(compressedImage)
    //formData.append('image', { uri, name: filename, type });
    formData.append('image', { uri:image, name: filename, type });
    formData.append('description', description)
    formData.append('album_id', album.id)
    api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    api.post('/api/user/images', formData, 
    {headers: { 'Content-Type': 'multipart/form-data',
   }},
   )
    .then((response) => {
      console.log('Image uploaded successfully.', response)
        navigate('Home');
    }).catch((err) => console.log(err))
}

  useEffect(()=>{
    api.get('/api/user/albums').then((response) => {
      let apidata = response.data;
      console.log(apidata);
      if (apidata.length !== 0) {
        setAlbums(apidata.data);
      }
      setLoading(false)
    }).catch(error => {
      console.log(error);
      setLoading(false)
    });
  }, [loading]);
  
  
    return (
      <SafeAreaView style={{ padding: 10 }}>
        {loading ? (
          <View><ActivityIndicator/></View>
        ):(
          <View>
        <View style={{flexDirection:'row'}}>
        <Image
          source={{ uri: image }}
          style={{ resizeMode: 'contain', aspectRatio: 1, width: 72 }}
        />
        <TextInput
          multiline
          style={{ flex: 1, paddingHorizontal: 16 }}
          placeholder="Add a neat description..."
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        </View>
        <View style={{flexDirection:'row'}}>
          <Text>Select album</Text>
          <SelectDropdown
            data={albums}
            onSelect={(selectedItem)=>{
              setAlbum(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem.title
            }}
            rowTextForSelection={(item) => {
              return item.title
            }}
          ></SelectDropdown>
        </View>
        </View>
        )}
      </SafeAreaView>
    );
}