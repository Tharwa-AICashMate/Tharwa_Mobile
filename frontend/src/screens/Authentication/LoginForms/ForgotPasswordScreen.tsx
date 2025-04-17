import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import Input from "@/componenets/UI/input";
import { navigationProps } from "@/types";


const ForgotPasswordScreen: React.FC<navigationProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Forgot Password</Text>
      </View>

      <View style={styles.form}>
        <View>
          <Text
            style={[styles.secondaryButtonText, { alignSelf: "flex-start" }]}
          >
            Reset Password?
          </Text>
          <Text style={styles.linkText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
          </Text>
        </View>

        <Input
          label="Enter Email Adress"
          value={email}
          onChangeText={setEmail}
          errorMessage={""}
          autoCapitalize="none"
          placeholder="example@example.com"
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("SecurityPin")}
        >
          <Text style={styles.primaryButtonText}>Next Step</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Text style={styles.secondaryButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.linkText}>or sign up with </Text>

        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.socialIcon}>
            <Image
              source={require("@/assets/Facebook-icon.png")}
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialIcon}>
            <Image
              source={require("@/assets/Google-icon.png")}
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.link}>
          <Text style={styles.linkText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <Text style={styles.linkButton}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
