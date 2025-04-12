import {  Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardScreen = () => {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5fff9' }}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Dashboard</Text>
          
        </View>
      </SafeAreaView>
    );
  };
  export default DashboardScreen;