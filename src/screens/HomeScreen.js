import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {api} from "../services/api_base";
import { FlatList } from "react-native";
import { AuthContext } from "../AuthProvider";
import Post from "../components/Post";

export default function HomeScreen({navigation}){
  const{user} = useContext(AuthContext)
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

   const fetchImages = async () => {
        
        api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        await api.get(`api/user/users/following/images/?page=${currentPage}`).then(response => {
          const { data, meta } = response.data;
          const imagesArray = Object.values(data); 
          setImages((prevImages) => [...prevImages, ...imagesArray]);
          setTotalPages(meta.last_page);
          setLoading(false);
        }).catch(error => {
          console.log("Error", error);
          setLoading(false);
      });
    }
  useEffect(() => {
    fetchImages()

  }, [currentPage]);

  const handleLoadMore = () => {
    setLoading(true)
    if (currentPage < totalPages) {
      console.log(currentPage)
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
    return(
    <SafeAreaView style={styles.container}>
      {images.length > 0 ? (
        <FlatList
          data={images}
          renderItem={({ item }) => <Post post={item} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <ActivityIndicator />
      )}
      {loading && <ActivityIndicator/>}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center'
  }
});
