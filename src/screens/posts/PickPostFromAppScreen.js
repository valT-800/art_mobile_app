import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { api, baseURL } from '../../services/api_base';
import {NormalText} from '../../components/AppTextComponents';
import addPostToCompetition from '../../utils/addPostToCompetition';
import { AuthContext } from '../../AuthProvider';


export default function PickPostFromAppScreen({navigation:{navigate}, route}){
    const{id} = route.params;
    const{user} = useContext(AuthContext)
    const[posts, setPosts] = useState([])
    const[loading, setLoading]=useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleLoadMore = () => {
        if (currentPage < totalPages) {
          setCurrentPage((prevPage) => prevPage + 1);
          setLoading(true)
        }
      };

      async function fetchPosts()
      {
        await api.get(`api/posts/user/${user.id}`)
          .then(response => {
            const{data, meta} = response.data;
            setPosts((prevPost) => [...prevPost, ...data]);
            setTotalPages(meta.total_pages);
            setLoading(false)
          })
          .catch(error => {
            //console.log("Error", error.response);
            setLoading(false)
          })   
      }
      
      useEffect(() => {
        fetchPosts()
      }, [currentPage]);
      
      if(loading){
        return <ActivityIndicator/>
      }
      else
      {
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
                  addPostToCompetition(item.id, {id})
                  navigate('Competition', {id})}}>
                    <Image style={styles.post}
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
}

  
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
  