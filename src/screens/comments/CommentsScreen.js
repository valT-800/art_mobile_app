
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import CustomIcon from "../../components/CustomIcon";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import Comment from "../../components/Comment";
import Divider from "../../components/Divider";
import getPostComments from "../../utils/getPostComments";
import newComment from "../../utils/newComment";
import { MultilineText } from "../../components/AppTextComponents";
import CustomMultilineInput from "../../components/CustomMultilineInput";

export default function CommentsScreen({route, navigation:{navigate}}){

  const{user} = useContext(AuthContext)

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const[content, setContent] = useState('');
  const[parent, setParent]= useState(null);
  const {post_id} = route.params;

  
  const postComment =async()=>{
    setLoading(true);
    if(content.trim() != ''){
      //console.log('Comment', content)
      await newComment(content, post_id, parent)
      setContent('')
      setLoading(false)
      
  }
}

  useEffect(() => {
    async function fetchData(){
      let result = await getPostComments(post_id)
      setComments(result)
      setLoading(false)
      
    }
    fetchData()
  }, [loading]);
  return(
    <SafeAreaView style = {{flex: 1}}>
      {loading ? <ActivityIndicator/> : 
      <View style={styles.list}>
      <FlatList 
      
        keyExtractor = {( item) => item.id }
        data={comments}
        renderItem={({item}) => {
          return(
            <View >
              <Comment item={item} setParent={setParent} setContent={setContent}></Comment>
              <Divider></Divider>
          </View>
          )}}
      >
        
      </FlatList>
      </View>
      }
      <View style={styles.footer}>
      <CustomMultilineInput
          placeholder="Add a comment..."
          style={{flex:0.85}}
          value={content}
          onChangeText={(text) => {
            setContent(text);
        }}/>
        <CustomIcon style={{flex:0.15}} name='arrow-redo-outline' event={()=>postComment()} size={30}/>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    padding: 20,
    flex: 0.1
  },
  list: {
    top: 0,
    flex: 0.9,
    position: 'relative'
  }
})
