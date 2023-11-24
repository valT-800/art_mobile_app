import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import SearchBar from "../components/SearchBar";
import Album from "../components/Album";
import Competition from "../components/Competition";
import {api} from "../services/api_base";
import { AuthContext } from "../AuthProvider";
import ImageComponent from "../components/Image";
import List from "../components/SearchList";
import { NormalText } from "../components/AppTextComponents";

function GlobalScreen({navigation: {navigate}}){
    
    const{user} = useContext(AuthContext)
    const [competitions, setCompetitions] = useState([])
    const [albums, setAlbums] = useState([])
    const [posts, setPosts] = useState([])
    const[loading, setLoading]=useState(true)
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const[data, setData] = useState([])
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

    const getCompetitions=()=>{
        api.get('/api/competitions')
        .then(response => {
            setCompetitions(response.data.data)
        })
        .catch(error => {
            //console.log(error.response);
        })
    }
    const getAlbums=()=>{
        api.get('/api/albums')
        .then(response => {
        setAlbums(response.data.data);})
        .catch(error => {
            //console.log(error.response);
        })
    }

    const getPosts = async () => {
        
        await api.get(`api/posts/?page=${currentPage}`).then(response => {
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

    const handleScrollEnd = (event) => {
          //console.log(currentPage)
          if (currentPage < totalPages) {
            
          setCurrentPage((prevPage) => prevPage + 1);
          //console.log(currentPage)
          setLoading(true);
          //getPosts() 
        }
      };

    useEffect(()=>{
        getAlbums();
        getCompetitions();
        getPosts();
    

    },[currentPage])
    return(
        <SafeAreaView style = {styles.container}>
            <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
            />
            {clicked ? (
                
                <List
                    searchPhrase={searchPhrase}
                    data={data}
                    setData={setData}
                    setClicked={setClicked}
                />

            ):(
            <View style={{flex: 1, justifyContent: 'center'}}>
                <ScrollView onScrollEndDrag={handleScrollEnd} scrollEventThrottle={16}>
                <NormalText text="Albums"/>
                <View style = {styles.albums}>
                    <FlatList
                    keyExtractor = {( item) => item.id }
                    contentContainerStyle={{
                    flexGrow: 1,
                    flexDirection:'row'
                    }}
                    horizontal={true}
                    nestedScrollEnabled={true}
                    data={albums}
                    renderItem={({item}) => {
                        return(<Album album={item}></Album>)}}
                    ></FlatList>
                </View>
                <NormalText text = "Competitions" />
                <View style = {styles.albums}>
                    <FlatList
                        keyExtractor = {( item) => item.id }
                        contentContainerStyle={{
                        flexGrow: 1,
                        flexDirection:'row'
                        }}
                        horizontal={true}
                        nestedScrollEnabled={true}
                        data={competitions}
                        renderItem={({item}) => {
                        return(<Competition competition={item}></Competition>)}}
                ></FlatList>
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
            {loading && <ActivityIndicator size={'large'}/>}
            </ScrollView>
          </View>
          )}
          
          
        </SafeAreaView>
    )
}
export default GlobalScreen;

const styles = StyleSheet.create({
    container:{
        justifyContent: 'flex-start',
        flex: 1
    },
    albums: {
        alignItems: 'flex-start',
    },
    posts: {
      justifyContent: 'center',
      flex: 1
      
    }
  });