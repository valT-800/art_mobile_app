import { useNavigation } from "@react-navigation/native";
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import getChallenges from "../../utils/getChallenges";
import Challenge from "../../components/Challenge";

export default function ChallengesScreen({route, navigation:{navigate}}){
  
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData(){
      let result = await getChallenges(id)
      setChallenges(result)
      setLoading(false)
    }
    fetchData()
  }, []);
  return(
    <SafeAreaView style={styles.container}>
      {loading ? <ActivityIndicator/> : 
        <View style={styles.challenges}>
            <FlatList
              data={challenges}
              renderItem={({item}) => {
              return(<Challenge image={item}></Challenge>)}}
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
  challenges: {
    flex: 1,
    justifyContent: 'center'
  }
});
