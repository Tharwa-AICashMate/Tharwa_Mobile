import { navigationProps } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "./styles";

const { height } = Dimensions.get("screen");

const LaunchScreen: React.FC<navigationProps> = ({ navigation }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const loginSlideUp = useRef(new Animated.Value(height)).current;
  useEffect(() => {
    const timer = setTimeout(() => {
      // Animated.timing(logoOpacity, {
      //   toValue: 0,
      //   duration: 500,
      //   useNativeDriver: true,
      // }).start();
      // setShowLogin(true);

      // Animated.timing(loginSlideUp, {
      //   toValue: 0.35 * height,
      //   duration: 1000,
      //   useNativeDriver: true,
      // }).start(() => {
        navigation.replace("Onboarding");
    //     setShowSplash(false);
    //   });
     }, 3000);
    

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      {showSplash && (
        <Animated.View style={[styles.splashScreen, { opacity: logoOpacity }]}>
          <View style={styles.ContentContainer}>
            <Image source={require("@/assets/logo.png")} style={styles.logo} />
            <Text style={styles.logoText}>Tharwa</Text>
          </View>
        </Animated.View>
      )}

      {showLogin && (
        <Animated.View
          style={[
            styles.loginContainer,
            { transform: [{ translateY:  loginSlideUp }] },
          ]}
        >
          <View style={styles.loginScreenContainer}>
          
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default LaunchScreen;
