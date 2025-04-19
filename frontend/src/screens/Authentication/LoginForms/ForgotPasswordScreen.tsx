import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import Input from "@/componenets/UI/input";
import { navigationProps } from "@/types";
import SocialSignIn from "@/componenets/Login/SocialSignIn";
import { useDispatch, useSelector } from "react-redux";
import { isValidEmail } from "@/utils/validators";
import { forgetPassword } from "@/redux/slices/AuthSlice";
import { AppDispatch } from "@/redux/store";

const ForgotPasswordScreen: React.FC<navigationProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const { error, loading } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  async function handelForgetPassword() {
    const resultAction = await dispatch(forgetPassword(email));
    if (forgetPassword.fulfilled.match(resultAction)) {
      navigation.navigate("SecurityPin");
    } else {
      console.log("Invalid Email:", resultAction.error);
    }
  }

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
          keyboardType="email-address"
          value={email}
          validator={isValidEmail}
          onChangeText={setEmail}
          errorMessage={"please Enter a valid Email"}
          autoCapitalize="none"
          placeholder="example@example.com"
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handelForgetPassword}
        >
          <Text style={styles.primaryButtonText}>Next Step</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Text style={styles.secondaryButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <SocialSignIn />

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
