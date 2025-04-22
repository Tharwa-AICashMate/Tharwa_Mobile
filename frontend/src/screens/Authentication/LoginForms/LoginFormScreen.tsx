import { navigationProps } from "@/types";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import Input from "@/componenets/UI/input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { loginUser } from "@/redux/slices/AuthSlice";
import { isStrongPassword, isValidEmail } from "@/utils/validators";
import SocialSignIn from "@/componenets/Login/SocialSignIn";

const LoginFormScreen: React.FC<navigationProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { error, loading } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    const resultAction = await dispatch(loginUser({ email, password }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome</Text>
      </View>

      <View style={styles.form}>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <Input
          label="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
          errorMessage={"Invalid Email"}
          validator={isValidEmail}
          autoCapitalize="none"
          placeholder="example@example.com"
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          validator={isStrongPassword}
          errorMessage={"Invalid Password"}
          autoCapitalize="none"
          autoComplete="off"
          secureTextEntry={showPassword}
          endIcon={
            <Image
              source={
                !showPassword
                  ? require("@/assets/Eye-icon.png")
                  : require("@/assets/Eye-icon-open.png")
              }
              style={{ width: 25, height: 13, objectFit: "contain" }}
            />
          }
          onEndIconPress={() => setShowPassword((show) => !show)}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Text style={styles.secondaryButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fingerprintButton}
          onPress={() => navigation.navigate("Fingerprint")}
        >
          <Text style={styles.fingerprintText}>Use Fingerprint To Access</Text>
        </TouchableOpacity>

        <SocialSignIn/> 
        <View style={styles.link}>
          <Text style={styles.linkText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <Text style={styles.linkButton}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginFormScreen;
