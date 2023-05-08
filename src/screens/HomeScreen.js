import React, { createContext, useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../services/api_base";
import { FlatList } from "react-native";
import { AuthContext } from "../AuthProvider";
import Post from "../hooks/Post";

export default function HomeScreen({navigation}){
  const{user} = useContext(AuthContext)
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    console.log('hi');
    api.get('/api/user/images').then(response => {
      let apidata = response.data;
      console.log(apidata);
      if (apidata.length !== 0) {
        setImages(apidata.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }).catch(error => {
      console.log(error);
      setLoading(false);
    });
  }, [loading]);
  

    return(
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
            data={images}
            renderItem={({item}) => {
              return(<Post image={item}/>)
          }}
          ></FlatList> 
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:{
    paddingVertical:20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  label:{
    paddingHorizontal:15
  },
  button:{
    width:"30%",
    height:40,
    backgroundColor:"#f00",
    borderRadius:20,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:"center"
  },
  center:{
    textAlign:'center',
  },
  buttontext:{
    color:"#fff"
  },
  box:{
    marginTop:20
  },
  textViews:{
    textAlign:'center'
  },
});
