import { useNavigation, useTheme } from "@react-navigation/native";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { baseURL } from "../services/api_base";
import { BoldText, NormalText, OtherText } from "./AppTextComponents";
import Timer from "./Timer";

export default function Exhibition({exhibition,size,onPress}){

  const navigation = useNavigation();
  const {colors} = useTheme()

  return(
    <TouchableOpacity style={[styles.container,{backgroundColor: colors.card}]} onPress={onPress ? onPress : ()=> navigation.navigate('Exhibition', {id: exhibition.id})}>
      <View style={{maxHeight: 70,alignItems:'center'}}><BoldText text={exhibition.title}/></View>
      {exhibition.starts_in && <Timer interval={exhibition.starts_in} size={'small'}/> }
      {!exhibition.starts_in && exhibition.post &&
      <Image source={{uri: exhibition.post? baseURL+exhibition.post.url: baseURL+'images/app/competition_cover.jpg'}}
          style={[styles.image,{height: size? size: 90}]}>
      </Image>}
      {exhibition.public==1 && <View style={{flex:1,flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between',margin:5}}>
        <TouchableOpacity style={{flex: 0.6}} onPress={()=>navigation.navigate('User',{id:exhibition.user.id})}><NormalText text={exhibition.user.username}/></TouchableOpacity>
        {exhibition.post && <View style={{flex:0.4,alignItems:'flex-end'}}><OtherText text={exhibition.posts+' posts'}/></View>}
      </View>}
      </TouchableOpacity>
                     
    );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding:5,
    margin:5,
    borderRadius: 10,
    maxWidth:'50%',
  },
  image:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
});
