import { useContext } from "react";
import { Button, SafeAreaView } from "react-native";
import { AuthContext } from "../AuthProvider";
import ColorSchemeButton from "../components/ColorSchemeButton";
import TouchableListItem from "../components/TouchableListItem";

function NotificationsScreen({ navigation :{navigate}}) {
    const { user, logout } = useContext(AuthContext)
    return (
      <SafeAreaView style={{ flex: 1}}>
        <TouchableListItem title='Notification'></TouchableListItem>
      </SafeAreaView>
    );
  }
  export default SettingsScreen;