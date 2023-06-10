import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from 'react';
import BoldText from "../../components/BoldText";
import NormalText from "../../components/NormalText";
import CustomButton from "../../components/CustomButton";
import ImageComponent from "../../components/Image";
import getChallenge from "../../utils/getChallenge";

export default function ChallengeScreen({route, navigation:{navigate}}){

  const[challenge,setChallenge]=useState({});
  const [loading, setLoading] = useState(true);

  const{id} = route.params;

  useEffect(() => {
    async function fetchData(){
      let result = await getChallenge(id)
      setChallenge(result)
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
            <BoldText text={challenge.title}/>
            <NormalText text={challenge.description}/>
            <CustomButton title="Participate" onPress={()=>navigate('AddToChallenge', {id})} />
          </View>
          
          <View style={styles.images}>
            {challenge.images &&
            <FlatList
              data={challenge.images}
              renderItem={({item}) => {
              return(<ImageComponent image={item}></ImageComponent>)}}
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
      flex: 1
    },
    images: {
      justifyContent: 'center',
      flex: 1
    }
  });
  