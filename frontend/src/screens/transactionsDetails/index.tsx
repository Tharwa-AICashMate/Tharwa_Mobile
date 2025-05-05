import ExpenseBrief from "@/componenets/expenceBrief";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import Theme from "@/theme";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  I18nManager,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import i18next from "./../../../services/i18next";

export default function TransactionsDetails({ route }: { route: any }) {
  const [loading, setLoading] = useState(false);
  const data = route?.params?.transaction;
  const { t } = useTranslation();
  const isRTL = i18next.language === 'ar' || I18nManager.isRTL;

  const convertDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Header title={t("TransactionDetails.transaction")} />
        <ExpenseBrief />

        <View style={[styles.contentContainer,{direction:isRTL?'rtl':'ltr'}]}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FFC107" />
              <Text style={styles.loadingText}>{t("TransactionDetails.loading")}</Text>
            </View>
          ) : (
            <View style={styles.detailsContainer}>
              <Text style={styles.transactionTitle}>
                {data?.title || t("untitled_transaction")}
              </Text>

              <Text style={styles.transactionDate}>
                {" "}
                {convertDate(data?.created_at)}
              </Text>
              <Text style={styles.transactionCategory}>
                {t("TransactionDetails.category")}: {data?.category}
              </Text>
              <View>
              <Text style={styles.detailsTitle}>{t("TransactionDetails.items")}</Text>

              <FlatList
                data={data.details}
                keyExtractor={(item) => item.key || item.name}
                renderItem={({ item }) => (
                  <View style={styles.itemCard}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDetail}>
                      {t("TransactionDetails.quantity")}: {item.quantity}
                    </Text>

                    <Text style={styles.itemDetail}>
                      {t("TransactionDetails.unit_price")}: {Number(item.unitPrice)?.toFixed(2)}EGP
                    </Text>
                  </View>
                )}
                showsVerticalScrollIndicator={false}
                initialNumToRender={3}
                scrollEnabled={false}
                ListEmptyComponent={
                  <Text style={styles.emptyMessage}>{t("TransactionDetails.no_items")}</Text>
                }
                />
                </View>
                
              <View style={styles.amountBox}>
                <Text style={styles.totalLabel}>{t("TransactionDetails.total_amount")}</Text>
                <Text style={styles.totalAmount}>
                  {Number(data?.amount)?.toFixed(2)} EGP
                </Text>
              </View>

              {data?.description && (
                <View style={styles.descriptionCard}>
                  <Text style={styles.detailsTitle}>{t("TransactionDetails.notes")}</Text>
                  <Text style={styles.detailsText}>{data.description}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
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
    minHeight:450,
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingHorizontal: 20,
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
  detailsContainer: {
    flex: 1,
    marginTop: 20,
  },
  transactionTitle: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
    color: "#212121",
  },
  transactionDate: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 12,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  itemCard: {
    backgroundColor: "#F9F9F9",
    padding: 16,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  itemDetail: {
    fontSize: 14,
    color: "#555",
  },
  emptyMessage: {
    textAlign: "center",
    color: "#999",
    fontStyle: "italic",
    marginVertical: 10,
  },
  amountBox: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
  },
  totalLabel: {
    marginRight: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  descriptionCard: {
    backgroundColor: "#Fff",
    padding: 16,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  detailsText: {
    fontSize: 14,
    color: "#444",
  },
});
