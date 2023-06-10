import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import Album from "../../components/Album";
import getAlbums from "../../utils/getAlbums";

export default function AlbumsScreen({route, navigation:{navigate}}){
  const{user} = createContext(AuthContext)
  const[albums,setAlbums]=useState([]);
  const [loading, setLoading] = useState(true);

  const{id} = route.params;

  useEffect(() => {
    async function fetchData(){
      let result = await getAlbums(id)
      setAlbums(result)
      setLoading(false)
    }
    fetchData()
  }, []);
  
  return(
    <SafeAreaView style={styles.container}>
      {loading ? <ActivityIndicator/> : 
        <View style={styles.albums}>
            <FlatList
              data={albums}
              renderItem={({item}) => {
              return(<Album image={item}></Album>)}}
              numColumns={3}
              keyExtractor = {( item, index) => item.id }
            ></FlatList>
          </View>
          }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
      paddingVertical:20,
      flex: 1,
      justifyContent: 'center'
    },
    albums: {
      flex: 1,
      justifyContent: 'center'
    }
  });
  