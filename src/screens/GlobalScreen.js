import React from "react";
import { SafeAreaView, Text } from "react-native";

function GlobalScreen({navigation: {navigate}}){

    return(
        <SafeAreaView>
            <Text>This is global screen</Text>
        </SafeAreaView>
    )
}
export default GlobalScreen;