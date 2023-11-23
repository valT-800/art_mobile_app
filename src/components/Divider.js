import { StyleSheet, View } from "react-native"

const Divider =()=>{
    return(
        <View style = {styles.viewStyleForLine}></View>

    )
}
export default Divider;
const styles = StyleSheet.create({
viewStyleForLine: {
    color: '#dcdcdc',
    borderBottomColor: '#dcdcdc', 
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf:'stretch',
    width: "100%"
  }
})