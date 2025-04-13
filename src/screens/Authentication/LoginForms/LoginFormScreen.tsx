import { navigationProps } from "@/types";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./styles";
import Input from "@/componenets/UI/input";
import { ScrollView } from "react-native-gesture-handler";

const LoginFormScreen: React.FC<navigationProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome</Text>
      </View>

      <View style={styles.form}>
        
        <Input
          label="Username or email"
          value={username}
          onChangeText={setUsername}
          errorMessage={""}
          autoCapitalize="none"
          placeholder="example@example.com"
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          errorMessage={""}
          autoCapitalize="none"
          endIcon={
            <Image
              source={showPassword? require("@/assets/Eye-icon-open.png") :require("@/assets/Eye-icon.png")}
              style={{ width: 25, height:13 }}
            />
          }
          onEndIconPress={() => setShowPassword((show) => !show)}
        />
        
        <TouchableOpacity style={styles.primaryButton} onPress={() => {}}>
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
            <Text style={styles.linkButton}> Sign Up</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
};

export default LoginFormScreen;
