import { Text } from "react-native";
import {  View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const TransactionsScreen = () => {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5fff9' }}>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Transactions</Text>  
        </View>
      </SafeAreaView>
    );
  };
  export default TransactionsScreen;