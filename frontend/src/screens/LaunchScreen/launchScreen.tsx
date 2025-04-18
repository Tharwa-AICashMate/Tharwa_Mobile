import { navigationProps } from "@/types";
import React, { useEffect, useRef } from "react";
import { Animated, Image, SafeAreaView, Text, View } from "react-native";
import styles from "./styles";

const LaunchScreen: React.FC<navigationProps> = ({ navigation }) => {
  const logoOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(logoOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace("Onboarding");
      });
    }, 3000);
    return () => clearTimeout(timer);

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.splashScreen, { opacity: logoOpacity }]}>
        <View style={styles.ContentContainer}>
          <Image source={require("@/assets/logo.png")} style={styles.logo} />
          <Text style={styles.logoText}>Tharwa</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default LaunchScreen;
