import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { findBestStore, runAnalysis } from "@/redux/slices/storeThunk";
import { RootState } from "@/redux/store";
import LocationDisplay from "@/componenets/LocationDisplay";
import GroceryInput from "@/componenets/GroceryInput";
import GroceryList from "@/componenets/GroceryList";
import StoreResult from "@/componenets/StoreResult";
import SearchRadiusSelector from "@/componenets/SearchRadiusSelector";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import StoreSummary from "@/componenets/StoreSummary";
import AnalysisContent from "@/componenets/AnalysisContent";
import AnalysisResult from "@/componenets/AnalysisResult";
import Theme from "@/theme";
import { Store } from "@/types/store";

type FilterType = "findBestStore" | "analysis";

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { analysisResults, analysisStatus } = useAppSelector(
    (state) => state.store
  );

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<FilterType>("findBestStore");

  const { items } = useAppSelector((state) => state.grocery);
  const { userLocation, locationDetected, searchRadius } = useAppSelector(
    (state) => state.store
  );
  const user = useAppSelector((state) => state.auth.user);

  const filtersmartGrocery = (Stores: Store[]): Store[] => {
    if (activeTab === "findBestStore") return Stores;
    return Stores.filter((Store: Store) => Store.type === activeTab);
  };

  const handleFindBestStore = async () => {
    setLoading(true);
    await dispatch(findBestStore());
    setLoading(false);
  };

  const handleAnalysis = async (message: string) => {
    setLoading(true);
    try {
      const analysisData = {
        userId: user?.id || "", // Assuming user has an 'id' property
        userCoordinates: {
          latitude: userLocation?.latitude || 0, // Provide default values if undefined
          longitude: userLocation?.longitude || 0,
        },
        inputs: message,
      };
      console.log("Analysis Data:", analysisData);
      await dispatch(runAnalysis(analysisData));
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const canSearch = items.length > 0 && locationDetected;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Smart Grocery Offers" />
      <LocationDisplay />
      <StoreSummary
        summary={{ findBestStore: [], analysis: [] }}
        onSelectTab={setActiveTab}
        activeTab={activeTab}
      />

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          {activeTab === "findBestStore" ? (
            <>
              <SearchRadiusSelector />
              <GroceryInput />
              <GroceryList />
              <TouchableOpacity
                style={[styles.findButton, !canSearch && styles.disabledButton]}
                onPress={handleFindBestStore}
                disabled={!canSearch || loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.findButtonText}>
                    Find Best Store ({searchRadius}km)
                  </Text>
                )}
              </TouchableOpacity>
              <StoreResult />
            </>
          ) : (
            <>
              <AnalysisContent onAnalyze={handleAnalysis} isLoading={loading} />
              {analysisStatus === "loading" && (
                <ActivityIndicator size="large" />
              )}
              {analysisStatus === "succeeded" && analysisResults && (
                <AnalysisResult result={analysisResults} />
              )}
              {analysisStatus === "failed" && (
                <Text style={styles.errorText}>
                  Failed to load analysis results
                </Text>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: Theme.colors.background,
    paddingTop: 40,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  findButton: {
    backgroundColor: Theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 15,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  findButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default HomeScreen;
