import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";

import styles from "./style";
import { navigationProps } from "@/types";
import axios from "axios";
import Theme from "@/theme";
import { useTranslation } from "react-i18next";


const { width } = Dimensions.get("window");

interface Slide {
  id: string;
  title: string;
  image: any;
}


const OnboardingScreen: React.FC<navigationProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<ScrollView>(null);
  const {t}=useTranslation()
  
  const slides: Slide[] = [
    {
      id: "1",
      title: t("onboarding.onboarding_page1"),
      image: require("@/assets/conis-hand.png"),
    },
    {
      id: "2",
      title: t("onboarding.onboarding_page2"),
      image: require("@/assets/closedwallet.png"),
    },
    {
      id: "3",
      title: t("onboarding.onboarding_page3"),
      image: require("@/assets/phone-hand.png"),
    },
    {
      id: "4",
      title: t("onboarding.onboarding_page4"),
      image: require("@/assets/onecoin.png"),
    },
    {
      id: "5",
      title: t("onboarding.onboarding_page5"),
      image: require("@/assets/openwallet.png"),
    },
    {
      id: "6",
      title: t("onboarding.onboarding_page6"),
      image: require("@/assets/coinstack.png"),
    },
  ];
  
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate("Login");
    }
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    if (index === slides.length - 1) {
      setTimeout(() => navigation.navigate("Login"), 1000);
    }
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.slideContainer}>
      <StatusBar barStyle="light-content" backgroundColor={Theme.colors.highlight} translucent={false} />
        <Text style={styles.title}>{slides[currentIndex].title}</Text>
        <View style={styles.slide}>
          <View style={styles.scroll}>
            <ScrollView
              ref={flatListRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScroll}
              bounces={false}
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                height: 280,
              }}
            >
              {slides.map((item) => (
                <View style={styles.imageContainer} key={item.id}>
                  <View style={styles.imageBackground}>
                    <Image source={item.image} style={styles.image} />
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View>
            <TouchableOpacity onPress={handleNext}>
              <Text style={styles.nextButtonText}>{t("onboarding.next")}</Text>
            </TouchableOpacity>
            <View style={styles.pagination}>
              {slides.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    index === currentIndex ? styles.paginationDotActive : {},
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
