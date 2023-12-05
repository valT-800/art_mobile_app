import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react';
import { api } from "../../services/api_base";
import { CustomHeader, MultilineText } from "../../components/AppTextComponents";
import CustomButton from "../../components/CustomButton";
import ImageComponent from "../../components/Image";
import getExhibition from "../../utils/getExhibition";

export default function ExhibitionScreen({route, navigation:{navigate}}){
  const[exhibition,setExhibition]=useState([]);
  const [loading, setLoading] = useState(true);
  const[visibleDescription, setVisibleDescription] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([])
  const{id} = route.params;

  useEffect(() => {
    async function fetchData(){
      let result = await getExhibition(id)
      setExhibition(result)
      setLoading(false)
    }
    fetchData()
  }, []);
  useEffect(() => {
    getPosts()
  }, [currentPage]);

  const getPosts = async () => {
    await api.get(`api/exhibition-posts/${id}/?page=${currentPage}`).then(response => {
      const { data, meta } = response.data;
      const postsArray = Object.values(data); 
      setPosts((prevPosts) => [...prevPosts, ...postsArray]);
      setTotalPages(meta.last_page);
      setLoading(false);
    }).catch(error => {
      console.log("Error", error);
      setLoading(false);
  });
}

  if(loading){
    return(
      <SafeAreaView>
      <ActivityIndicator/>
    </SafeAreaView>
    )
    
  }else{
    return(
        <SafeAreaView style= {styles.container}>
          <View style = {{alignItems: 'center'}}>
            <CustomHeader text={exhibition.title}/>
            <TouchableOpacity onPress={()=>setVisibleDescription(!visibleDescription)}><Text style={{color:'grey'}}>About</Text></TouchableOpacity>
            {visibleDescription && <ScrollView style={{maxHeight:'50%'}}>
            <MultilineText text={exhibition.description}/>
            </ScrollView>}
          </View>
          <View style={styles.posts}>
            <FlatList
              data={posts}
              renderItem={({item}) => {
              return(<ImageComponent post={item}></ImageComponent>)}}
              numColumns={3}
              keyExtractor = {( item, index) => item.id }
            ></FlatList> 
          </View>
          
        </SafeAreaView>

  );
}
}
const styles = StyleSheet.create({
    container:{
      justifyContent: 'center',
      flex: 1,
      marginTop: 70,
    },
    posts: {
      justifyContent: 'center',
      flex: 1
    }
  });
  