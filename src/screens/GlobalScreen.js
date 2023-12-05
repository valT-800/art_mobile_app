import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import SearchBar from "../components/SearchBar";
import Album from "../components/Album";
import Competition from "../components/Competition";
import {api} from "../services/api_base";
import { AuthContext } from "../AuthProvider";
import ImageComponent from "../components/Image";
import List from "../components/SearchList";
import { NormalText } from "../components/AppTextComponents";
import TouchableText from "../components/TouchableText";
import TouchableSection from "../components/TouchableSection";
import Exhibition from "../components/Exhibition";

function GlobalScreen({navigation: {navigate}}){
    
    const{user} = useContext(AuthContext)
    const [competitions, setCompetitions] = useState([])
    const [exhibitions, setExhibitions] = useState([])
    const [albums, setAlbums] = useState([])
    const [posts, setPosts] = useState([])
    const[pressedSection, setPressedSection]=useState('Posts')
    const[loading, setLoading]=useState(true)
    const[refresh, setRefresh]=useState(false)
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const[data, setData] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const onRefresh = () => {
        setPosts([])
        setAlbums([])
        setCompetitions([])
        setExhibitions([])
        setCurrentPage(1)
        setPressedSection('Posts')
        getPosts()
        setTimeout(() => {
            setRefresh(false)
        }, 1000);
    };

    const getAlbums = async () => {
        api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        await api.get(`api/albums/?page=${currentPage}`).then(response => {
          const { data, meta } = response.data;
          const albumsArray = Object.values(data); 
          setAlbums((prevAlbums) => [...prevAlbums, ...albumsArray]);
          setTotalPages(meta.last_page);
          setLoading(false);
        }).catch(error => {
          console.log("Error", error);
          setLoading(false);
      });
    }

    const getCompetitions = async () => {
        await api.get(`api/competitions/?page=${currentPage}`).then(response => {
          const { data, meta } = response.data;
          const competitionsArray = Object.values(data); 
          setCompetitions((prevCompetitions) => [...prevCompetitions, ...competitionsArray]);
          setTotalPages(meta.total);
          setLoading(false);
        }).catch(error => {
          console.log("Error", error);
          setLoading(false);
      });
    }
    const getExhibitions = async () => {
        await api.get(`api/exhibitions/?page=${currentPage}`).then(response => {
          const { data, meta } = response.data;
          const exhibitionsArray = Object.values(data); 
          setExhibitions((prevExhibitions) => [...prevExhibitions, ...exhibitionsArray]);
          setTotalPages(meta.last_page);
          setLoading(false);
        }).catch(error => {
          console.log("Error", error);
          setLoading(false);
      });
    }

    const getPosts = async () => {
        
        await api.get(`api/posts/?page=${currentPage}`).then(response => {
          const { data, meta } = response.data;
          //console.log(data)
          const postsArray = Object.values(data); 
          setPosts((prevPosts) => [...prevPosts, ...postsArray]);
          setTotalPages(meta.last_page);
          setLoading(false);
        }).catch(error => {
          console.log("Error", error);
          setLoading(false);
      });
    }

    const handleLoadMore = (event) => {
          if (currentPage < totalPages) {
            
          setCurrentPage((prevPage) => prevPage + 1);
          setLoading(true);
        }
      };
    useEffect(()=>{
        if(pressedSection=='Posts') getPosts();
        else if(pressedSection=='Competitions') getCompetitions();
        else if(pressedSection=='Exhibitions') getExhibitions();
        else getAlbums()

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
            <View style={{flex: 1}}>
                <View style = {{margin: 5, flexDirection:'row'}}>
                    <TouchableSection title = 'Posts'
                        onPress={() => {
                        setPosts([])
                        setCurrentPage(1)
                        getPosts()
                        setPressedSection('Posts')
                        }} 
                        pressed = {pressedSection}/>
                    <TouchableSection title = 'Competitions'
                        onPress={() => {
                        setCompetitions([])
                        setCurrentPage(1)
                        getCompetitions()
                        setPressedSection('Competitions')
                        }} 
                        pressed = {pressedSection}/>
                    <TouchableSection title = 'Exhibitions'
                        onPress={() => {
                        setExhibitions([])
                        setCurrentPage(1)
                        getExhibitions()
                        setPressedSection('Exhibitions')
                        }}
                        pressed = {pressedSection}/>       
                    <TouchableSection title = 'Albums'
                        onPress={() => {
                        setAlbums([])
                        setCurrentPage(1)
                        getAlbums()
                        setPressedSection('Albums')
                        }}
                        pressed = {pressedSection}/>
                    </View>
                <View>
                { pressedSection === "Posts" &&    
                <FlatList
                data={posts}
                contentContainerStyle={styles.posts}
                renderItem={({item}) => <ImageComponent post={item} />}
                numColumns={3}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                key={`postsList-3`}
                refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                }
                />}
                {pressedSection === "Competitions" &&
                <FlatList
                data={competitions}   
                contentContainerStyle={styles.items}
                numColumns={3}
                renderItem={({ item }) => <Competition competition={item} />}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                key={`competitionsList-3`}
                refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                }
                />}
                {pressedSection === "Exhibitions" &&
                <FlatList
                data={exhibitions}
                contentContainerStyle={styles.items}
                numColumns={3}
                renderItem={({ item }) => <Exhibition exhibition={item} />}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                key={`exhibitionsList-3`}
                refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                }
                />}
                {pressedSection === "Albums" &&
                <FlatList
                data={albums}
                contentContainerStyle={styles.items}
                numColumns={3}
                renderItem={({ item }) => <Album album={item} />}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                key={`albumsList-3`}
                refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                }
                />}
            {loading && <ActivityIndicator size={'large'}/>}
            </View>
          </View>
          )}
          
          
        </SafeAreaView>
    )
}
export default GlobalScreen;

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        flex: 1,
    },
    items: {
        alignContent: 'space-around',
        alignItems:'center',
        flex:1
    },
    posts:{
        flex:1
    }
  });