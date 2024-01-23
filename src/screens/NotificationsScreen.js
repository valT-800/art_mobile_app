import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native";
import { AuthContext } from "../AuthProvider";
import Notification from "../components/Notification";
import { api } from "../services/api_base";

export default function NotificationsScreen({navigation:{navigate}}){
  const{user} = useContext(AuthContext)
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const onRefresh = () => {
    setNotifications([])
    setCurrentPage(1)
    fetchNotifications()
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
   const fetchNotifications = async () => {
        await api.get(`api/user/notifications/?page=${currentPage}`).then(response => {
          const { data, meta } = response.data;
          const notificationsArray = Object.values(data); 
          setNotifications((prevNotifications) => [...prevNotifications, ...notificationsArray]);
          setTotalPages(meta.last_page);
          console.log('Notifications',notificationsArray)
          setLoading(false);
        }).catch(error => {
          //console.log("Error", error);
          setLoading(false);
      });
    }
  useEffect(() => {
    fetchNotifications()

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
          data={notifications}
          renderItem={({ item }) => <Notification notification={item}/>}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          key={`notificationsList-2`}
          contentContainerStyle={styles.notifications}
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
    justifyContent: 'center',
  },
  notifications:{
    alignItems:'center'
    
  }
});
