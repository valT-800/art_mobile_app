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

  useEffect(() => {
    api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    api.get(`api/user/users/following/images/?page=${currentPage}`).then(response => {
      console.log("Imagessss", response.data)
      const { data, meta } = response.data;
      setImages((prevImage) => [...prevImage, ...data]);
      setTotalPages(meta.total_pages);

      setLoading(false);
    }).catch(error => {
      console.log("Error", error);
      setLoading(false);
    });
  }, [currentPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
    return(
    <SafeAreaView>
        {loading ? ( <ActivityIndicator/>):
        ( <FlatList
            data={images}
            renderItem={({item}) => {
              return(<Post post={item}/>)
          }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ></FlatList> )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:{
    paddingVertical:20,
  }
});
