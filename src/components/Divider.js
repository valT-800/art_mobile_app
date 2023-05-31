import { StyleSheet, View } from "react-native"

const Divider =()=>{
    return(
        <View style = {styles.viewStyleForLine}></View>

    )
}
export default Divider;
const styles = StyleSheet.create({
viewStyleForLine: {
    borderBottomColor: "grey", 
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf:'stretch',
    width: "100%"
  }
})