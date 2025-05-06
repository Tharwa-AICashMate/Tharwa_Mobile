import { navigationProps } from "@/types";
import React, { useEffect, useRef } from "react";
import { Animated, Image, SafeAreaView, StatusBar, Text, View } from "react-native";
import styles from "./styles";
import Theme from "@/theme";
import { useTranslation } from "react-i18next";

const LaunchScreen: React.FC<navigationProps> = ({ navigation }) => {
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const {t}=useTranslation()

  useEffect(() => {
   
    const timer = setTimeout(() => {
      if( navigation){
      Animated.timing(logoOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        navigation?.replace("Onboarding");
      });}
    }, 3000);
    return () => clearTimeout(timer);

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.splashScreen, { opacity: logoOpacity }]}>
        <View style={styles.ContentContainer}>
      <StatusBar barStyle="light-content" backgroundColor={Theme.colors.highlight} translucent={false} />

          <Image source={require("@/assets/logo.png")} style={styles.logo} />
          <Text style={styles.logoText}>{t("logo")}</Text>
          {!navigation && <Text style={styles.noInternet}>{t("noInternet")}</Text>}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default LaunchScreen;
