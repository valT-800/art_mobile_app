import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {NormalText} from "./AppTextComponents";
import {BoldText} from "./AppTextComponents";
import { useNavigation } from "@react-navigation/native";
import getUsers from "../utils/getUsers";
import getAlbums from "../utils/getAlbums";
import getCompetitions from "../utils/getCompetitions";
import TouchableSection from "./TouchableSection";
import User from "./User";
import Competition from "./Competition";
import getExhibitions from "../utils/getExhibitions";

// definition of the Item, which will be rendered in the FlatList
const Item = ({item, onPress}) => (
   
  <View style={styles.item}>
    <TouchableOpacity onPress={onPress}>
    <BoldText text={item.title}/>
    </TouchableOpacity>
  </View>
);

// the filter
const List = ({searchPhrase, setClicked, data, setData}) => {
  
  const[pressedSection, setPressedSection]=useState('Users')
  const navigation = useNavigation()

  const renderAlbums = ({ item }) => {
    // when no input, show all
    if (searchPhrase.trim() === "") {
      return <Item item={item} onPress={()=>navigation.navigate('Album', {id: item.id })} />;
    }
    else{
      // filter of the title
    if (item.title && item.title.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item item={item} onPress={()=>navigation.navigate('Album', {id: item.id })}/>;
    }
    // filter of the description
    if (item.description && item.description.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item item={item} onPress={()=>navigation.navigate('Album', {id: item.id })}/>;
    }
    }
    
  };
  const renderCompetitions = ({ item }) => {
    
      // filter of the title
    if (item.title && item.title.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item item={item} onPress={()=>navigation.navigate('Competition', {id: item.id })}/>;
    }
    // filter of the description
    if (item.description && item.description.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item item={item} onPress={()=>navigation.navigate('Competition', {id: item.id })}/>;
    }
    
  };
  const renderExhibitions = ({ item }) => {
    
      // filter of the title
    if (item.title && item.title.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item item={item} onPress={()=>navigation.navigate('Exhibition', {id: item.id })}/>;
    }
    // filter of the description
    if (item.description && item.description.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item item={item} onPress={()=>navigation.navigate('Exhibition', {id: item.id })}/>;
    }
    
  };
  const renderUsers = ({ item }) => {
      // filter of the title
    if (item.name && item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <User user={item} />;
    }
    // filter of the description
    if (item.username && item.username.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <User user={item} />;
    }
    if (item.email && item.email.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <User user={item} />;
    }
    
  };

  const renderItem=({item})=>{
    if (pressedSection=='Albums') return renderAlbums({item})
    if (pressedSection=='Competitions') return renderCompetitions({item})
    if (pressedSection=='Users') return renderUsers({item})
    if (pressedSection=='Exhibitions') return renderExhibitions({item})
  }
  
  useEffect(()=>{
    fetchData=async()=>{
      let response = await getUsers()
      setData(response)
    }
    fetchData()
  },[])

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <View style = {{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: '100%', flexWrap:'wrap'}}>
            <TouchableSection title = 'Users' 
            pressedSection = 'Users' 
            onPress={async() => {
              setData([])
              setPressedSection('Users')
              let response = await getUsers();
              setData(response)
            }} 
            pressed = {pressedSection}/>
            <TouchableSection title = 'Albums'
            pressedSection = 'Albums'
            onPress={async() => {
              setData([])
              setPressedSection('Albums')
              let response = await getAlbums()
              //console.log(response)
              setData(response)
            }} 
            pressed = {pressedSection}/>
            <TouchableSection title = 'Competitions'
            pressedSection = 'Competitions'
            onPress={async() => {
              setData([])
              setPressedSection('Competitions')
              let response = await getCompetitions()
              setData(response)
            }} 
             pressed = {pressedSection}/>
             <TouchableSection title = 'Exhibitions'
             pressedSection = 'Exhibitions'
             onPress={async() => {
               setData([])
               setPressedSection('Exhibitions')
               let response = await getExhibitions()
               setData(response)
             }} 
              pressed = {pressedSection}/>
          </View>
          
          <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
          />
        
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 10,
    padding:5,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});