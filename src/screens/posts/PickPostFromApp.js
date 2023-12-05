import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Post } from 'expo-image';
import { api, baseURL } from '../../services/api_base';
import {NormalText} from '../../components/AppTextComponents';
import AddPostToCompetition from '../../utils/addPostToCompetition';


function PickPostFromApp({navigation:{navigate}, route}){
    const{id} = route.params;
    const[posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleLoadMore = () => {
        if (currentPage < totalPages) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      };

      
      useEffect(() => {
        
        api.get('api/user/posts')
          .then(response => {
            const{data, meta} = response.data;
            setPosts((prevPost) => [...prevPost, ...data]);
            setTotalPages(meta.total_pages);
          })
          .catch(error => {
            //console.log("Error", error.response);   
          })   
          
      }, [currentPage]);

    return(
    <SafeAreaView style={styles.container}>
        <NormalText text='Pick'/>
        <View style={styles.container}>
        <FlatList
            data={posts}
              renderItem={({item}) => {
              return(
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    margin: 1
                }}>
                <TouchableOpacity
                onPress={async()=> {
                  AddPostToCompetition(item.id, {id})
                  navigate('Competition', {id})}}>
                    <Post style={styles.post}
                        source={baseURL + item.url }></Post>
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
  export default PickPostFromApp;

  
const styles = StyleSheet.create({
    container:{
      justifyContent: 'center',
      flex: 1
    },
    post:{
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        
      }
  });
  