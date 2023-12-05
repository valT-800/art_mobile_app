import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from 'react';
import {BoldText, Header} from "../../components/AppTextComponents";
import {NormalText} from "../../components/AppTextComponents";
import CustomButton from "../../components/CustomButton";
import ImageComponent from "../../components/Post";
import getCompetition from "../../utils/getCompetition";

export default function CompetitionScreen({route, navigation:{navigate}}){

  const[competition,setCompetition]=useState({});
  const [loading, setLoading] = useState(true);

  const{id} = route.params;

  useEffect(() => {
    async function fetchData(){
      let result = await getCompetition(id)
      setCompetition(result)
      setLoading(false)
    }
    fetchData()
  }, []);
  
  if(loading){
    return(
      <SafeAreaView>
      <ActivityIndicator/>
    </SafeAreaView>
    )
    
  }else{
    return(
        <SafeAreaView style= {styles.container}>
          <View style = {{padding: 10, alignItems: 'center'}}>
            <Header text={competition.title}/>
            <NormalText text={competition.description}/>
            <CustomButton title="Participate" onPress={()=>navigate('AddToCompetition', {id})} />
          </View>
          
          <View style={styles.posts}>
            {competition.posts &&
            <FlatList
              data={competition.posts}
              renderItem={({item}) => {
              return(<ImageComponent post={item}></ImageComponent>)}}
              numColumns={3}
              keyExtractor = {( item, index) => item.id }
            ></FlatList>
            }
          </View>
          
        </SafeAreaView>

  );
}
}
const styles = StyleSheet.create({
    container:{
      justifyContent: 'center',
      flex: 1,
      marginTop: 30,
      paddingTop: 20
    },
    posts: {
      justifyContent: 'center',
      flex: 1
    }
  });
  