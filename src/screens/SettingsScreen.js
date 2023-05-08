import { useContext } from "react";
import { Button, SafeAreaView, Text } from "react-native";
import { AuthContext } from "../AuthProvider";

function SettingsScreen({ navigation :{navigate}}) {
    const { user, logout } = useContext(AuthContext)
  
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings Screen</Text>
        <Text>User: {user.name}</Text>
        <Button title="Go to Dashboard" onPress={() => navigate('Dashboard')} />
        <Button title="Logout" onPress={() => logout()} />
  
      </SafeAreaView>
    );
  }
  export default SettingsScreen;