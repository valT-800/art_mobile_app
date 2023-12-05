import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native";
import { api } from "../../services/api_base";
import { AuthContext } from "../../AuthProvider";
import User from "../../components/User";

export default function FollowersScreen({navigation}){
  const{user} = useContext(AuthContext)
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const onRefresh = () => {
    setUsers([])
    setCurrentPage(1)
    fetchUsers()
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

   const fetchUsers = async () => {
        
        api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        await api.get(`api/user/followers/?page=${currentPage}`).then(response => {
          const { data, meta } = response.data;
          const usersArray = Object.values(data); 
          setUsers((prevUsers) => [...prevUsers, ...usersArray]);
          setTotalPages(meta.total);
          //console.log(users)
          setLoading(false);
        }).catch(error => {
          //console.log("Error", error);
          setLoading(false);
      });
    }
  useEffect(() => {
    fetchUsers()

  }, [currentPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setLoading(true)
      console.log(totalPages)
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
    return(
    <SafeAreaView style={styles.container}>
      {users.length > 0 ? (
        <FlatList
          data={users}
          renderItem={({ item }) => <User user={item} />}
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
    paddingTop: 10,
    marginLeft: 10
  }
});
