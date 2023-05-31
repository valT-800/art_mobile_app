import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../AuthProvider";
import {api} from "../../services/api_base";
import ImageComponent from "../../components/Image";
import BoldText from "../../components/BoldText";
import NormalText from "../../components/NormalText";
import CustomButton from "../../components/CustomButton";

export default function AlbumScreen({route, navigation:{navigate}}){
  const{user} = createContext(AuthContext)
  const[album,setAlbum]=useState([]);
  const [loading, setLoading] = useState(true);

  const{id} = route.params;

  useEffect(() => {
    api.get('/api/albums/'+id).then(response => {
      let apidata = response.data;
      console.log(apidata);
      if (apidata.length !== 0) {
        setAlbum(apidata.data);
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
          <View style={{alignItems: 'flex-end'}}>
          <CustomIcon name = 'pencil-outline' size={30} event={()=>navigate('EditAlbum', album)}></CustomIcon>
          </View>
          <View style = {{padding: 10, alignItems: 'center'}}>
            <BoldText text={album.title}/>
          <NormalText text={album.description}/>
          </View>
          
          <View style={styles.images}>
            {album.images &&
            <FlatList
              data={album.images}
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
