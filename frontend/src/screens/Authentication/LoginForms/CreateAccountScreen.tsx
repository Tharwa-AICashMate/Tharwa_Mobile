import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "./styles";
import Input from "@/componenets/UI/input";
import { navigationProps, User } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/slices/AuthSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

import { AppDispatch } from "@/redux/store";
import {
  doPasswordsMatch,
  isStrongPassword,
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
  isValidUsername,
} from "@/utils/validators";

const CreateAccountScreen: React.FC<navigationProps> = ({ navigation }) => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setphone] = useState<string>("");
  const [dob, setDob] = useState<Date>(new Date(2000, 0, 1));
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { error, loading } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  async function signUpWithEmail() {
    if (!doPasswordsMatch(confirmPassword, password)) return;
    const user: User = {
      fullName,
      email,
      phone,
      dob,
    };
    const resultAction = await dispatch(
      registerUser({ user, password })
    );
  
    if (registerUser.fulfilled.match(resultAction)) {
      navigation.navigate('LoginForm');
    } else {
      console.log("Signup failed:", resultAction.error);
    }
  }

 

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome</Text>
        </View>

        <View style={styles.form}>
          {error && <Text style={styles.errorText}>{error}</Text>}

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            <Input
              label="Full name"
              value={fullName}
              onChangeText={setFullName}
              errorMessage={"please provide a valid name"}
              autoCapitalize="none"
              placeholder="Your full name"
              validator={isValidName}
            />

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              errorMessage={"Invalid Email"}
              autoCapitalize="none"
              placeholder="example@example.com"
              validator={isValidEmail}
              keyboardType="email-address"
            />

            <Input
              label="phone Number"
              value={phone}
              onChangeText={setphone}
              errorMessage={"Invalid Number"}
              autoCapitalize="none"
              placeholder="+123456789"
              validator={isValidPhoneNumber}
            />

            <Input
              label="Date of birth"
              value={dob.toLocaleDateString()}
              autoCapitalize="none"
              placeholder="DD / MM / YYYY"
              editable={false}
              endIcon={
                <Ionicons
                  name="calendar-outline"
                  size={15}
                  // color={Theme.colors.text}
                  onPress={() => setShowDatePicker(true)}
                 
                />
              }
            />

            {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="default"
                onChange={(e) => {
                  setDob(new Date(e.nativeEvent.timestamp));
                  setShowDatePicker(false);
                }}
              />
            )}

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              errorMessage={"Invalid Password"}
              validator={isStrongPassword}
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              endIcon={
                <Image
                  source={
                    showPassword
                      ? require("@/assets/Eye-icon-open.png")
                      : require("@/assets/Eye-icon.png")
                  }
                  style={{ width: 25, height: 13 }}
                />
              }
              onEndIconPress={() => setShowPassword((prev) => !prev)}
            />

            <Input
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              errorMessage={"Passwords don't match"}
              autoCapitalize="none"
              validator={doPasswordsMatch.bind("", password)}
              secureTextEntry={!showConfirmPassword}
              endIcon={
                <Image
                  source={
                    showConfirmPassword
                      ? require("@/assets/Eye-icon-open.png")
                      : require("@/assets/Eye-icon.png")
                  }
                  style={{ width: 25, height: 13 }}
                />
              }
              onEndIconPress={() => setShowConfirmPassword((prev) => !prev)}
            />

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By continuing, you agree to
                <Text style={styles.termsLink}> Terms of Service </Text>
                and
                <Text style={styles.termsLink}> Privacy Policy</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={signUpWithEmail}
            >
              <Text style={styles.primaryButtonText}>Sign Up</Text>
            </TouchableOpacity>
              {loading && (
                <View >
                  <Text >Loading...</Text>
                </View>
              )}
            <View style={styles.link}>
              <Text style={styles.linkText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginForm")}
              >
                <Text style={styles.linkButton}>Log In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateAccountScreen;
