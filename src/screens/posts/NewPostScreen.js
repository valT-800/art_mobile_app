
import React, { useContext, useEffect, useState } from 'react';
import { Button, Post, SafeAreaView, TextInput, View, Text, ActivityIndicator, Modal, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import CustomIcon from '../../components/CustomIcon';
import getUserAlbums from '../../utils/getUserAlbums';
import getTags from '../../utils/getTags';
import uploadPost from '../../utils/uploadPost';
import {NormalText} from '../../components/AppTextComponents';
import { useTheme } from '@react-navigation/native';
import { api } from '../../services/api_base';
import { AuthContext } from '../../AuthProvider';

export default function NewPostScreen ({ navigation: {navigate, setOptions}, route }) {
  
  const {user}=useContext(AuthContext)
  const {colors} =useTheme()
  const[description, setDescription ] = useState('');
  const[album_id, setAlbumId]=useState(null)
  const[albums, setAlbums]=useState([])
  const[loading, setLoading] =useState(true)
  const { post, competition_id } = route.params;
  const[tags, setTags] = useState([])
  const[filteredTags, setFilteredTags] = useState([])
  const[allTags, setAllTags] = useState([])
  const[visible, setVisible]=useState(false)
  const[inputValue, setInputValue] = useState('')
  setOptions({
    headerRight: () =>
      <CustomIcon name='checkmark' size={30}
        event={handleUpload}
        />
    });

     const handleUpload=async()=>{
      api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      //console.log(description, post, album_id, competition_id, tags)
      let result = await uploadPost(post, description, album_id, competition_id, {tags})
      //console.log(result)
      if(result) navigate('Post', {id: result})
      else navigate('SelectImage'); 
       
    }
    const handleInputChange = async(text) => {

      setInputValue(text)
      if (text.includes(" ")) {
          const newTag = text.replace(" ", "");
          selectTag(newTag)
      }else{
        //const extractedTags = text.match(/#(\w+)/g);
        //console.log(extractedTags)
        let result = await getTags()
        //console.log(result)
        setAllTags(result)
        //const formattedTags = extractedTags ? extractedTags.map((tag) => tag.slice(1)) : [];
        const formattedTag = text.replace(" ", "");
        //console.log(formattedTag)
        //console.log(text.toLowerCase())
        //const filtered = allTags.filter((item) => item.tag.toLowerCase().includes(text.toLowerCase().replace('#', '')));    
        const filtered = allTags.filter((item) => item.tag.toLowerCase().includes(formattedTag.toLowerCase()));
        //console.log(filtered)
        setFilteredTags(filtered);
      }
      
    };

    const selectTag = (tag) => {
      //setInputValue(`${inputValue.replace(tag, '')}#${tag} `);
      setInputValue('')
      if (!tags.includes(tag)) {
        setTags([...tags, tag]);
      }
    };

  useEffect(() => {
    async function fetchData(){
      let result = await getUserAlbums()
      setAlbums(result)
      setLoading(false)
      
    }
    fetchData()
  }, [loading]);

    return (
      <SafeAreaView style={{ padding: 10 }}>
        {loading ? (
          <View><ActivityIndicator/></View>
        ):(
          <View style = {{alignItems: 'center'}}>
          <Post
            source={{ uri: post }}
            style={{ resizeMode: 'contain', aspectRatio: 1, width: 72 }}
          />
          <View style={{alignSelf: 'flex-start'}}>
          <TextInput
            multiline
            style={{ paddingHorizontal: 16, height: 100, width: '100%', alignSelf: 'flex-start' }}
            placeholder="Add a neat description..."
            onChangeText={(text)=>setDescription(text)}
          />
          <TextInput
            style={{ paddingHorizontal: 16, height: 20, width: '100%', alignSelf: 'flex-start' }}
            placeholder="Add tags..."
            value={inputValue}
            autoCapitalize='none'
            onChangeText={(text)=>handleInputChange(text)}
          />
          {tags && <View style={{width: '100%'}}>
            <FlatList
            data={tags}
            renderItem={({item})=><NormalText text = {`#${item}`}/>}
            keyExtractor={(item) => item.toString()}
            horizontal
            />
          </View>}

          { filteredTags &&
          <View style={[styles.overlayContainer, {backgroundColor: colors.card}]}>
            <FlatList
              data={filteredTags}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectTag(item.tag)}>
                  <NormalText text={item.tag}/>
                </TouchableOpacity>
              )}
            />
          </View>}
        <SelectDropdown
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
        ></SelectDropdown>
        </View>
        </View>
        )}
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  overlayContainer: {
    width: '100%',
  },
});