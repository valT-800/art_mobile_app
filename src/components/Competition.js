import { useNavigation, useTheme } from "@react-navigation/native";
import { useState } from "react";
import {  StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from "react-native";
import { baseURL } from "../services/api_base";
import { BoldText, NormalText, OtherText } from "./AppTextComponents";
import Timer from "./Timer";

export default function Competition({competition,size}){

  const navigation = useNavigation();
  const {colors} = useTheme()
    return(
      <TouchableOpacity style={[styles.container,{backgroundColor: colors.card}]} onPress={()=> navigation.navigate('Competition', {id: competition.id})}>
      <View style={{maxHeight: 70,alignItems:'center'}}><BoldText text={competition.title}/></View>
      {competition.starts_in && <Timer interval={competition.starts_in} size={'small'}/> }
      {!competition.starts_in && competition.post &&
      <ImageBackground source={{uri: competition.post? baseURL+competition.post.url: baseURL+'images/app/competition_cover.jpg'}}
      imageStyle={{borderRadius:10}}
          style={[styles.image,{height: size? size: 100}]}>
       {competition.ends_in &&  <Timer interval={competition.ends_in} size={'small'}/>}
      </ImageBackground>}
      {!competition.starts_in && !competition.post && competition.ends_in && <Timer interval={competition.ends_in} size={'small'}/>}
      {competition.public==1 && <View style={{flex:1,flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between',margin:5}}>
        <TouchableOpacity style={{flex: 0.6}} onPress={()=>navigation.navigate('User',{id:competition.user.id})}><NormalText text={competition.user.username}/></TouchableOpacity>
          {competition.post && <View style={{flex:0.4,alignItems:'flex-end'}}><OtherText text={competition.posts + ' posts'}/></View>}
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10
  }
});
