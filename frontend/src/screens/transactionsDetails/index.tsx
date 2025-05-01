import BalanceDisplay from "@/componenets/BalanceDisplay";
import ExpenseBrief from "@/componenets/expenceBrief";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import Theme from "@/theme";
import { supabase } from "config/supabase";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionsDetails({ route }: { route: any }) {
  const [loading, setLoading] = useState(false);
  const data = route?.params?.transaction;
 
  console.log(data);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title="Transaction" />
        <ExpenseBrief/>    

        <View style={styles.contentContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FFC107" />
              <Text style={styles.loadingText}>
                Loading transaction details...
              </Text>
            </View>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>
                  Quantity: {item.quantity}
                </Text>
                <Text style={styles.itemUnitPrice}>
                  Unit Price: ${Number(item.unitPrice)?.toFixed(2)}
                </Text>
              </View>
              )}
              showsVerticalScrollIndicator={false}
              initialNumToRender={3}
              windowSize={5}
              removeClippedSubviews={true}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFC107",
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.highlight,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  }, 
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemQuantity: {
    color: "#757575",
    marginVertical: 4,
  },
  itemUnitPrice: {
    color: "#4CAF50",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
});
