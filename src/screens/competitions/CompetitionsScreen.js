import { useNavigation } from "@react-navigation/native";
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import getCompetitions from "../../utils/getCompetitions";
import Competition from "../../components/Competition";

export default function CompetitionsScreen({route, navigation:{navigate}}){
  
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData(){
      let result = await getCompetitions(id)
      setCompetitions(result)
      setLoading(false)
    }
    fetchData()
  }, []);
  return(
    <SafeAreaView style={styles.container}>
      {loading ? <ActivityIndicator/> : 
        <View style={styles.competitions}>
            <FlatList
              data={competitions}
              renderItem={({item}) => {
              return(<Competition post={item}></Competition>)}}
              numColumns={3}
              keyExtractor = {( item, index) => item.id }
            ></FlatList>
          </View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingVertical:20,
    flex: 1,
    justifyContent: 'center'
  },
  competitions: {
    flex: 1,
    justifyContent: 'center'
  }
});
