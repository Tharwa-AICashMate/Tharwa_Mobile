import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { navigationProps } from "@/types";
import styles from "./styles";

const LoginScreen: React.FC<navigationProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.loginScreenContainer}>
        <Image source={require("@/assets/logo2.png")} />
        <Text style={styles.title}>Tharwa</Text>
        <Text style={styles.subtitle}>
          Begin your journey to financial peace The Tharwa way.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("LoginForm")}
        >
          <Text style={styles.primaryButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Text style={styles.secondaryButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

