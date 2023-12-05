import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native";
import { api } from "../../services/api_base";
import { AuthContext } from "../../AuthProvider";
import Competition from "../../components/Competition";

export default function CompetitionsScreen({navigation}){
  const{user} = useContext(AuthContext)
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const onRefresh = () => {
    setCompetitions([])
    setCurrentPage(1)
    fetchCompetitions()
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

   const fetchCompetitions = async () => {
        
        api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        await api.get(`api/competitions/?page=${currentPage}`).then(response => {
          const { data, meta } = response.data;
          const competitionsArray = Object.values(data); 
          setCompetitions((prevCompetitions) => [...prevCompetitions, ...competitionsArray]);
          setTotalPages(meta.last_page);
          console.log(competitionsArray)
          setLoading(false);
        }).catch(error => {
          //console.log("Error", error);
          setLoading(false);
      });
    }
  useEffect(() => {
    fetchCompetitions()

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
      {competitions.length > 0 ? (
        <FlatList
          data={competitions}
          numColumns={3}
          renderItem={({ item }) => <Competition competition={item} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          key={`competitionsList-3`}
          contentContainerStyle={styles.competitions}
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
  competitions:{
    justifyContent: 'space-around',
    alignItems:'center'
    
  }
});
