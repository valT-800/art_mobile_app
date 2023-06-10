import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import SearchBar from "../components/SearchBar";
import Album from "../components/Album";
import Challenge from "../components/Challenge";
import {api} from "../services/api_base";
import { AuthContext } from "../AuthProvider";
import ImageComponent from "../components/Image";
import List from "../components/SearchList";
import NormalText from "../components/NormalText";

function GlobalScreen({navigation: {navigate}}){
    
    const{user} = useContext(AuthContext)
    const [challenges, setChallenges] = useState([])
    const [albums, setAlbums] = useState([])
    const [images, setImages] = useState([])
    const[loading, setLoading]=useState(true)
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const[data, setData] = useState([])
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

    const getChallenges=()=>{
        api.get('/api/challenges')
        .then(response => {
            setChallenges(response.data.data)
        })
        .catch(error => {
            console.log(error.response);
        })
    }
    const getAlbums=()=>{
        api.get('/api/albums')
        .then(response => {
        setAlbums(response.data.data);})
        .catch(error => {
            console.log(error.response);
        })
    }

    const getImages=()=>{
        api.get(`api/images/?page=${currentPage}`)
        .then(response => {
            //console.log("API Response:", response.data); // Log the response for debugging
            const { data, meta } = response.data;
            const imagesArray = Object.values(data); // Convert the object into an array of objects
            setImages((prevImages) => [...prevImages, ...imagesArray]);
            setTotalPages(meta.last_page);
            setLoading(false);
    })
        .catch(error => {
            console.log(error.response);
            setLoading(false)
        })
    }

    const handleScrollEnd = (event) => {
          console.log(currentPage)
          if (currentPage < totalPages) {
            
          setCurrentPage((prevPage) => prevPage + 1);
          console.log(currentPage)
          setLoading(true);
          //getImages() 
        }
      };

    useEffect(()=>{
        getAlbums();
        getChallenges();
        getImages();
    

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
                <NormalText text = "Challenges" />
                <View style = {styles.albums}>
                    <FlatList
                        keyExtractor = {( item) => item.id }
                        contentContainerStyle={{
                        flexGrow: 1,
                        flexDirection:'row'
                        }}
                        horizontal={true}
                        nestedScrollEnabled={true}
                        data={challenges}
                        renderItem={({item}) => {
                        return(<Challenge challenge={item}></Challenge>)}}
                ></FlatList>
                </View>
                <View style={styles.images}>
                <FlatList
                data={images}
                renderItem={({item}) => {
                return(<ImageComponent image={item}></ImageComponent>)}}
                numColumns={3}
                keyExtractor = {( item, index) => item.id }
                ></FlatList>
            </View>
            {loading && <ActivityIndicator/>}
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
        flex: 1,
    },
    albums: {
        alignItems: 'flex-start',
    },
    images: {
      justifyContent: 'center',
      flex: 1
      
    }
  });