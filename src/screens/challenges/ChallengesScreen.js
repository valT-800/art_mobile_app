import { useNavigation } from "@react-navigation/native";
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function ChallengesScreen({route, navigation:{navigate}}){
  const{user} = createContext(AuthContext)
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('hi');
    api.get('/api/challenges').then(response => {
      let apidata = response.data;
      console.log(apidata);
      if (apidata.length !== 0) {
        setChallenges(apidata.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }).catch(error => {
      console.log(error);
      setLoading(false);
    });
  }, [loading]);
  return(
    <SafeAreaView>
      <Text>All challenges</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
      paddingVertical:20,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    label:{
      paddingHorizontal:15
    },
    button:{
      width:"30%",
      height:40,
      backgroundColor:"#f00",
      borderRadius:20,
      textAlign:'center',
      justifyContent:'center',
      alignItems:'center',
      alignSelf:"center"
    },
    center:{
      textAlign:'center',
    },
    buttontext:{
      color:"#fff"
    },
    box:{
      marginTop:20
    },
    textViews:{
      textAlign:'center'
    },
  });
  