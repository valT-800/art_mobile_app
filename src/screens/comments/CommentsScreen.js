import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import CustomIcon from "../../components/CustomIcon";
import { useContext, useEffect, useState } from "react";
import {api} from "../../services/api_base";
import { AuthContext } from "../../AuthProvider";
import Comment from "../../components/Comment";
import Divider from "../../components/Divider";

export default function CommentsScreen({route, navigation:{navigate}}){

  const{user} = useContext(AuthContext)

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const[content, setContent] = useState('');
  const {image_id} = route.params;

  const getComments=()=>{
    console.log('Image id', image_id);
    api.get(`/api/comments/image/${image_id}`).then(response => {
      let apidata = response.data;
      console.log(apidata);
      if (apidata.length !== 0) {
        setComments(apidata.data);        
      }
      setLoading(false);
      setContent('');
    }).catch(error => {
      console.log(error);
      setLoading(false);
    });
  }
  const postComment =()=>{
    setLoading(true);
    if(content.trim() != ''){
      console.log('Comment', content)
      api.post('/api/user/comments', {
        content: content,
        image_id: image_id,
      }).then(res => {
        getComments();
      }).catch(error => {
        console.log(error);
      });
  }
}
  function isLiked(comment, user_id){
      
    return comment.users_liked && comment.users_liked.some((user) => user.id === user_id);
      
  }

  useEffect(() => {
    console.log('Image id', image_id);
    api.get(`/api/comments/image/${image_id}`).then(response => {
      let apidata = response.data;
      console.log(apidata);
      if (apidata.length !== 0) {
        setComments(apidata.data);        
      }
      setContent('');
      setLoading(false);
      
    }).catch(error => {
      console.log(error);
      setLoading(false);
    });
    
  }, [loading]);
  return(
    <SafeAreaView style = {{flex: 1}}>
      {!loading &&
      <View style={styles.list}>
      <FlatList 
      
        keyExtractor = {( item) => item.id }
        data={comments}
        renderItem={({item}) => {
          return(
            <View >
              <Comment item={item} liked= {isLiked(item, user.id)} ></Comment>
              <Divider></Divider>
          </View>
          )}}
      >
        
      </FlatList>
      </View>
      }
      <View style={styles.footer}>
      <TextInput
          multiline
          placeholder="Add a comment..."
          onChangeText={(text) => {
            setContent(text);
        }}/>
        <CustomIcon name='arrow-redo-outline' event={()=>postComment()} size={30}/>
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
