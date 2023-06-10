import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { api, baseURL } from '../../services/api_base';
import NormalText from '../../components/NormalText';
import addImageToChallenges from '../../utils/addImageToChallenges';


function PickImageFromApp({navigation:{navigate}, route}){
    const{id} = route.params;
    const[images, setImages] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleLoadMore = () => {
        if (currentPage < totalPages) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      };

      
      useEffect(() => {
        
        api.get('api/user/images')
          .then(response => {
            const{data, meta} = response.data;
            setImages((prevImage) => [...prevImage, ...data]);
            setTotalPages(meta.total_pages);
          })
          .catch(error => {
            console.log("Error", error.response);   
          })   
          
      }, [currentPage]);

    return(
    <SafeAreaView style={styles.container}>
        <NormalText text='Pick'/>
        <View style={styles.container}>
        <FlatList
            data={images}
              renderItem={({item}) => {
              return(
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    margin: 1
                }}>
                <TouchableOpacity
                onPress={async()=> {
                  addImageToChallenges(item.id, {id})
                  navigate('Challenge', {id})}}>
                    <Image style={styles.image}
                        source={baseURL + item.url }></Image>
                    </TouchableOpacity>
                </View>
              )}}
              numColumns={3}
              keyExtractor = {( item, index) => item.id }
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.1}
        ></FlatList>
        </View>
    </SafeAreaView>
    )
  }
  export default PickImageFromApp;

  
const styles = StyleSheet.create({
    container:{
      justifyContent: 'center',
      flex: 1
    },
    image:{
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        
      }
  });
  