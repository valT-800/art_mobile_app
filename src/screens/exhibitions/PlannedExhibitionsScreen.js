import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native";
import { api } from "../../services/api_base";
import { AuthContext } from "../../AuthProvider";
import Exhibition from "../../components/Exhibition";

export default function PlannedExhibitionsScreen({navigation:{navigate},route}){
  const{user} = useContext(AuthContext)
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {post_id} = route.params;
  const onRefresh = () => {
    setExhibitions([])
    setCurrentPage(1)
    fetchExhibitions()
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  async function inviteUser(id){
    api.post(`api/gallery/invite/exhibition/${id}/post/${post_id}`).then(response => {       
      console.log(response.data)
      Alert.alert('',response.data.message)
      }).catch(error => {
        console.log("Error", error.response);
      });
}

   const fetchExhibitions = async () => {
        await api.get(`api/planned-exhibitions/user/${user.id}/?page=${currentPage}`).then(response => {
          const { data, meta } = response.data;
          const exhibitionsArray = Object.values(data); 
          setExhibitions((prevExhibitions) => [...prevExhibitions, ...exhibitionsArray]);
          setTotalPages(meta.last_page);
          console.log(exhibitionsArray)
          setLoading(false);
        }).catch(error => {
          //console.log("Error", error);
          setLoading(false);
      });
    }
  useEffect(() => {
    fetchExhibitions()

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
      {!loading ? (
        <FlatList
          data={exhibitions}
          numColumns={2}
          renderItem={({ item }) => <Exhibition exhibition={item} size={150} onPress={()=>inviteUser(item.id)}/>}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          keyExtractor = {( item, index) => item.id }
          contentContainerStyle={styles.exhibitions}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
        />
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  exhibitions:{
    flex:1,
    
  }
});
