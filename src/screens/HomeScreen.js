import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {api} from "../services/api_base";
import { FlatList } from "react-native";
import { AuthContext } from "../AuthProvider";
import Post from "../components/Post";

export default function HomeScreen({navigation}){
  const{user} = useContext(AuthContext)
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const onRefresh = () => {
    setPosts([])
    setCurrentPage(1)
    fetchPosts()
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

   const fetchPosts = async () => {
        
        api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        await api.get(`api/user/users/following/posts/?page=${currentPage}`).then(response => {
          const { data, meta } = response.data;
          const postsArray = Object.values(data); 
          setPosts((prevPosts) => [...prevPosts, ...postsArray]);
          setTotalPages(meta.last_page);
          setLoading(false);
        }).catch(error => {
          //console.log("Error", error);
          setLoading(false);
      });
    }
  useEffect(() => {
    fetchPosts()

  }, [currentPage]);

  const handleLoadMore = () => {
    setLoading(true)
    if (currentPage < totalPages) {
      //console.log(currentPage)
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
    return(
    <SafeAreaView style={styles.container}>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={({ item }) => <Post item={item} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
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
    justifyContent: 'center',
    paddingTop: 10
  }
});
