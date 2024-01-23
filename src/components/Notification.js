import { useNavigation, useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View} from "react-native";
import { BoldText, NormalText, OtherText } from "./AppTextComponents";
import CustomButton from './CustomButton';
import { api } from "../services/api_base";
import { useState } from "react";
export default function Notification({notification}){

  const navigation = useNavigation();
  const {colors} = useTheme();
  const[removed,setRemoved] = useState(false)
  async function acceptInvitation(){
    await api.post(`api/user/accept-invitation/exhibition/${notification.related_id}/post/${notification.related2_id}`).then(response => {       
      setRemoved(true)
    }).catch(error => {
        
        console.log("Error", error.response);
      });
}
async function declineInvitation(){
  await api.post(`api/user/decline-invitation/exhibition/${notification.related_id}/post/${notification.related2_id}`).then(response => {       
    setRemoved(true)
    }).catch(error => {
      
      console.log("Error", error.response);
    });
}
  const navigateTo = () =>
  {
    notification.notification.related_table == 'exhibitions' && navigation.navigate('Exhibition', {id: notification.related_id})
    notification.notification.related_table == 'winnings' && navigation.navigate('Competition', {id: notification.related_id})
    notification.notification.related_table == 'competitions' && navigation.navigate('Competition', {id: notification.related_id})
    notification.notification.related_table == 'posts' && navigation.navigate('Post', {id: notification.related_id})
  }
    return(
    <View style={[styles.container, {backgroundColor: colors.card}]}>
      <TouchableOpacity onPress={navigateTo}>
        <BoldText text={notification.notification.title}></BoldText>
          <NormalText text={notification.notification.description}></NormalText>
      </TouchableOpacity>
      {notification.notification.title == 'Invitation to exhibition' && !removed &&
      <View style = {{flexDirection: 'row'}}>
        <CustomButton title='Accept' style={{backgroundColor: 'rgba(0,255,0,0.4)'}} onPress={acceptInvitation}
        />
        <CustomButton title='Decline' style={{backgroundColor: 'lightgrey'}} onPress={declineInvitation}
        />
      </View>}
      <View style={{alignSelf:'flex-end'}}>
      <OtherText text={notification.created_at + " ago"}/></View>
    </View>
                             
    );
}
const styles = StyleSheet.create({
  container:{
    margin: 5,
    padding:10,
    borderRadius: 20,
    minWidth:'80%'
  },
});