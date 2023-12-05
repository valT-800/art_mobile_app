import { useContext } from "react";
import { Button, SafeAreaView, Text, TouchableOpacity, useColorScheme } from "react-native";
import { AuthContext } from "../AuthProvider";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import {NormalText} from "../components/AppTextComponents";
import ColorSchemeButton from "../components/ColorSchemeButton";
import TouchableListItem from "../components/TouchableListItem";

function SettingsScreen({ navigation :{navigate}}) {
    const { user, logout } = useContext(AuthContext)
    return (
      <SafeAreaView style={{ flex: 1}}>
        <TouchableListItem onPress={() => logout()} title='Logout'></TouchableListItem>
        <ColorSchemeButton/>
      </SafeAreaView>
    );
  }
  export default SettingsScreen;