import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native"
import CustomButton from "../components/CustomButton";
import { AuthContext } from "../AuthProvider";

export default function NewContentScreen ({navigation: {navigate}})
{
    const {user} = useContext(AuthContext);

    return(
        <SafeAreaView style = {styles.container}>
            {user.roles.some(r=>r.name=='user') && <CustomButton title='New post' onPress={()=>navigate('SelectFile')} style={styles.button}/>}
            {user.roles.some(r=>r.name=='user') && <CustomButton title='New album' onPress={()=>navigate('NewAlbum')} style={styles.button}/>}
            {user.roles.some(r=>r.name=='gallery') && <CustomButton title='New competition' onPress={()=>navigate('NewCompetition')} style={styles.button}/>}
            {user.roles.some(r=>r.name=='gallery') && <CustomButton title='New exhibition' onPress={()=>navigate('NewExhibition')} style={styles.button}/>}
        </SafeAreaView>
    )
}
styles = StyleSheet.create({
    container:{
        flex:1,
        flexGrow: 1,
        justifyContent:"center",
        alignItems:"center"
    },
    button:{
        width:'60%',
        height:'10%'
    }
})