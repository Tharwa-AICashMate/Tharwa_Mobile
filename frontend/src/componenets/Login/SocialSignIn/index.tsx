import React, { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import * as Linking from "expo-linking";
import { useDispatch } from "react-redux";
import {
  createSessionFromUrl,
  loginWithProvider,
} from "@/redux/slices/AuthSlice";
import { AppDispatch } from "@/redux/store";
import { Provider } from "@supabase/supabase-js";

export default function SocialSignIn() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const checkDeepLink = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        console.log("Received redirect URL:", url);
        createSessionFromUrl(url);
      }
    };

    checkDeepLink();

    const subscription = Linking.addEventListener("url", async ({ url }) => {
      console.log("URL event:", url);
      await createSessionFromUrl(url);
    });

    return () => subscription.remove();
  }, []);

  const signUpWithProvider = async (provider: Provider) => {
    dispatch(loginWithProvider(provider));
  };

  return (
    <>
      <Text style={styles.linkText}>or sign up with </Text>

      <View style={styles.socialIcons}>
        <TouchableOpacity
          style={styles.socialIcon}
          onPress={() => signUpWithProvider("facebook")}
        >
          <Image
            source={require("@/assets/Facebook-icon.png")}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialIcon}
          onPress={() => signUpWithProvider("google")}
        >
          <Image
            source={require("@/assets/Google-icon.png")}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
