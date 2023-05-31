import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../AuthProvider";
import React, { useContext, useEffect, useState } from 'react';
import { api } from "../../services/api_base";
import BoldText from "../../components/BoldText";
import NormalText from "../../components/NormalText";
import CustomIcon from "../../components/CustomIcon";
import CustomButton from "../../components/CustomButton";
import ImageComponent from "../../components/Image";

export default function ChallengeScreen({route, navigation:{navigate}}){
  const{user} = useContext(AuthContext)
  const[challenge,setChallenge]=useState({});
  const [loading, setLoading] = useState(true);

  const{id} = route.params;

  const addPhoto= ()=>{
    navigate('AddToChallenge', {id});
  }
  useEffect(() => {
    //api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    api.get(`api/challenges/${id}`).then(response => {
      let apidata = response.data;
      console.log(apidata);
      if (apidata.length !== 0) {
        setChallenge(apidata.data);
      }
      setLoading(false);
      
    }).catch(error => {
      console.log(error);
      setLoading(false);
    });
  }, [loading]);
  
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
          </View>
          <CustomButton title="Participate" onPress={()=>addPhoto()} />
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
  