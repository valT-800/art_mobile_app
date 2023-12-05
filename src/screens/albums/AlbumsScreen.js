import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native";
import { api } from "../../services/api_base";
import { AuthContext } from "../../AuthProvider";
import Album from "../../components/Album";

export default function AlbumsScreen({navigation}){
  const{user} = useContext(AuthContext)
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const onRefresh = () => {
    setAlbums([])
    setCurrentPage(1)
    fetchAlbums()
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

   const fetchAlbums = async () => {
        
        api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        await api.get(`api/albums/?page=${currentPage}`).then(response => {
          const { data, meta } = response.data;
          const albumsArray = Object.values(data); 
          setAlbums((prevAlbums) => [...prevAlbums, ...albumsArray]);
          setTotalPages(meta.last_page);
          console.log(albumsArray)
          setLoading(false);
        }).catch(error => {
          //console.log("Error", error);
          setLoading(false);
      });
    }
  useEffect(() => {
    fetchAlbums()

  }, [currentPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      //console.log(currentPage)
      setLoading(true)
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
    return(
    <SafeAreaView style={styles.container}>
      {albums.length > 0 ? (
        <FlatList
          data={albums}
          numColumns={3}
          renderItem={({ item }) => <Album album={item} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          key={`albumsList-3`}
          contentContainerStyle={styles.albums}
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
    marginTop: 65,
  },
  albums:{
    justifyContent: 'space-around',
    alignItems:'center'
    
  }
});
