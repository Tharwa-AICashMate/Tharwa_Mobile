// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
//   Dimensions,
//   StatusBar,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";
// import PasswordInput from "../../componenets/PasswordInput";
// const { height, width } = Dimensions.get("window");
// import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
// import Theme from "@/theme";

// type PasswordSettingsScreenNavigationProp = any;

// const PasswordSettingsScreen: React.FC = () => {
//   const navigation = useNavigation<PasswordSettingsScreenNavigationProp>();

//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const [localError, setLocalError] = useState<string | null>(null);

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const handleChangePassword = () => {
//     if (!currentPassword || !newPassword || !confirmNewPassword) {
//       setLocalError("All fields are required");
//       return;
//     }

//     if (newPassword !== confirmNewPassword) {
//       setLocalError("Passwords do not match");
//       return;
//     }

//     if (newPassword.length < 8) {
//       setLocalError("Password must be at least 8 characters");
//       return;
//     }

//     setLocalError(null);
//     // Navigate to the PasswordChangeConfirmScreen after successful "change"
//     navigation.navigate("PasswordChangeConfirmScreen");
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar
//         barStyle="light-content"
//         backgroundColor={Theme.colors.highlight}
//         translucent={false}
//       />
//       <Header title="Password Settings" />

//       <ScrollView style={styles.scrollView}>
//         <View style={styles.section}>
//           <Text style={styles.label}>Current Password</Text>
//           <PasswordInput
//             value={currentPassword}
//             onChangeText={setCurrentPassword}
//           />

//           <Text style={styles.label}>New Password</Text>
//           <PasswordInput value={newPassword} onChangeText={setNewPassword} />

//           <Text style={styles.label}>Confirm New Password</Text>
//           <PasswordInput
//             value={confirmNewPassword}
//             onChangeText={setConfirmNewPassword}
//           />

//           {(localError) && (
//             <Text style={styles.errorText}>{localError}</Text>
//           )}

//           <TouchableOpacity
//             style={styles.changeButton}
//             onPress={handleChangePassword}
//           >
//             <Text style={styles.changeButtonText}>Change Password</Text>
//           </TouchableOpacity>
//         </View>

        
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FECD3E",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   section: {
//     backgroundColor: "white",
//     borderTopLeftRadius: 80,
//     borderTopRightRadius: 80,
//     height: height,
//     width: width,
//     padding: 40,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   label: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 12,
//     marginBottom: 4,
//   },
//   errorText: {
//     color: "red",
//     marginTop: 16,
//     textAlign: "center",
//   },
//   changeButton: {
//     backgroundColor: "#FECD3E",
//     borderRadius: 25,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     alignItems: "center",
//     marginTop: 24,
//   },
//   changeButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export default PasswordSettingsScreen;
// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   StatusBar,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";
// import PasswordInput from "../../componenets/PasswordInput";
// import axios from "axios";
// const { height, width } = Dimensions.get("window");
// import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
// import Theme from "@/theme";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Base URL for API calls
// const API_BASE_URL = "http://192.168.1.9:3000"; // Replace 3000 with your actual port number

// // Function to get current user ID
// const getCurrentUserId_1 = async () => {
//   // Implementation depends on your authentication system
//   // This is a placeholder that should be replaced with actual logic
//   try {
//     // Example: Get from AsyncStorage or other storage
//     const userId = await AsyncStorage.getItem('userId');
//     return userId;
//     // return "user-id-here"; // Replace with actual implementation
//   } catch (error) {
//     console.error("Error getting user ID:", error);
//     throw new Error("Failed to get user ID");
//   }
// };

// type PasswordSettingsScreenNavigationProp = any;

// const PasswordSettingsScreen: React.FC = () => {
//   const navigation = useNavigation<PasswordSettingsScreenNavigationProp>();

//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const [localError, setLocalError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const validateInputs = () => {
//     if (!currentPassword || !newPassword || !confirmNewPassword) {
//       setLocalError("All fields are required");
//       return false;
//     }

//     if (newPassword !== confirmNewPassword) {
//       setLocalError("Passwords do not match");
//       return false;
//     }

//     if (newPassword.length < 8) {
//       setLocalError("Password must be at least 8 characters");
//       return false;
//     }

//     return true;
//   };

//   const handleChangePassword = async () => {
//     if (!validateInputs()) return;
    
//     setIsLoading(true);
//     setLocalError(null);
    
//     try {
//       const userId = await getCurrentUserId_1();
      
//       // Get email by userId
//       const emailRes = await axios.get(
//         `${API_BASE_URL}/delete/get-email/${userId}`
//       );

//       if (emailRes.status !== 200) {
//         setLocalError("Failed to retrieve email");
//         return;
//       }

//       const email = emailRes.data.email;

//       // Verify current password
//       const verifyRes = await axios.post(
//         `${API_BASE_URL}/delete/verify-password/${userId}`,
//         {
//           email: email,
//           password: currentPassword,
//         }
//       );

//       if (verifyRes.status !== 200) {
//         setLocalError("Incorrect current password");
//         return;
//       }

//       // Update password
//       const updateRes = await axios.post(
//         `${API_BASE_URL}/delete/update-password/${userId}`,
//         {
//           newPassword: newPassword,
//         }
//       );

//       if (updateRes.status === 200) {
//         navigation.navigate("PasswordChangeConfirmScreen");
//       } else {
//         setLocalError("Failed to update password");
//       }
//     } catch (error: any) {
//       console.error("Error changing password:", error);
      
//       // More specific error handling
//       if (axios.isAxiosError(error)) {
//         if (!error.response) {
//           setLocalError("Network error. Please check your connection.");
//         } else if (error.response.status === 401) {
//           setLocalError("Incorrect current password");
//         } else if (error.response.status === 404) {
//           setLocalError("User not found");
//         } else {
//           setLocalError(`Server error: ${error.response.status}`);
//         }
//       } else {
//         setLocalError("Something went wrong. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar
//         barStyle="light-content"
//         backgroundColor={Theme.colors.highlight}
//         translucent={false}
//       />
//       <Header title="Password Settings" />

//       <ScrollView style={styles.scrollView}>
//         <View style={styles.section}>
//           <Text style={styles.label}>Current Password</Text>
//           <PasswordInput
//             value={currentPassword}
//             onChangeText={setCurrentPassword}
//           />

//           <Text style={styles.label}>New Password</Text>
//           <PasswordInput value={newPassword} onChangeText={setNewPassword} />

//           <Text style={styles.label}>Confirm New Password</Text>
//           <PasswordInput
//             value={confirmNewPassword}
//             onChangeText={setConfirmNewPassword}
//           />

//           {localError && (
//             <Text style={styles.errorText}>{localError}</Text>
//           )}

//           <TouchableOpacity
//             style={[styles.changeButton, isLoading && styles.disabledButton]}
//             onPress={handleChangePassword}
//             disabled={isLoading}
//           >
//             <Text style={styles.changeButtonText}>
//               {isLoading ? "Processing..." : "Change Password"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FECD3E",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   section: {
//     backgroundColor: "white",
//     borderTopLeftRadius: 80,
//     borderTopRightRadius: 80,
//     height: height,
//     width: width,
//     padding: 40,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   label: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 12,
//     marginBottom: 4,
//   },
//   errorText: {
//     color: "red",
//     marginTop: 16,
//     textAlign: "center",
//   },
//   changeButton: {
//     backgroundColor: "#FECD3E",
//     borderRadius: 25,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     alignItems: "center",
//     marginTop: 24,
//   },
//   changeButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   disabledButton: {
//     opacity: 0.7,
//   }
// });

// export default PasswordSettingsScreen;

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import PasswordInput from "../../componenets/PasswordInput";
import axios from "axios";
const { height, width } = Dimensions.get("window");
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import Theme from "@/theme";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUserId } from '@/utils/auth';

// Base URL for API calls
const API_BASE_URL = "http://192.168.1.9:3000"; // Replace 3000 with your actual port number

type PasswordSettingsScreenNavigationProp = any;

const PasswordSettingsScreen: React.FC = () => {
  const navigation = useNavigation<PasswordSettingsScreenNavigationProp>();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const validateInputs = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setLocalError("All fields are required");
      return false;
    }

    if (newPassword !== confirmNewPassword) {
      setLocalError("Passwords do not match");
      return false;
    }

    if (newPassword.length < 8) {
      setLocalError("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const handleChangePassword = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    setLocalError(null);

    try {
      const userId = await getCurrentUserId(); 
      console.log(userId); // Correct usage here

      // Get email by userId
      const emailRes = await axios.get(
        `${API_BASE_URL}/delete/get-email/${userId}`
      );

      if (emailRes.status !== 200) {
        setLocalError("Failed to retrieve email");
        return;
      }

      const email = emailRes.data.email;

      // Verify current password
      const verifyRes = await axios.post(
        `${API_BASE_URL}/delete/verify-password/${userId}`,
        {
          email: email,
          password: currentPassword,
        }
      );

      if (verifyRes.status !== 200) {
        setLocalError("Incorrect current password");
        return;
      }

      // Update password
      const updateRes = await axios.post(
        `${API_BASE_URL}/delete/update-password/${userId}`,
        {
          newPassword: newPassword,
        }
      );

      if (updateRes.status === 200) {
        navigation.navigate("PasswordChangeConfirm");
      } else {
        setLocalError("Failed to update password");
      }
    } catch (error: any) {
      console.error("Error changing password:", error);

      if (axios.isAxiosError(error)) {
        if (!error.response) {
          setLocalError("Network error. Please check your connection.");
        } else if (error.response.status === 401) {
          setLocalError("Incorrect current password");
        } else if (error.response.status === 404) {
          setLocalError("User not found");
        } else {
          setLocalError(`Server error: ${error.response.status}`);
        }
      } else {
        setLocalError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.highlight}
        translucent={false}
      />
      <Header title="Password Settings" />

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.label}>Current Password</Text>
          <PasswordInput
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />

          <Text style={styles.label}>New Password</Text>
          <PasswordInput value={newPassword} onChangeText={setNewPassword} />

          <Text style={styles.label}>Confirm New Password</Text>
          <PasswordInput
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
          />

          {localError && (
            <Text style={styles.errorText}>{localError}</Text>
          )}

          <TouchableOpacity
            style={[styles.changeButton, isLoading && styles.disabledButton]}
            onPress={handleChangePassword}
            disabled={isLoading}
          >
            <Text style={styles.changeButtonText}>
              {isLoading ? "Processing..." : "Change Password"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FECD3E",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: "white",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    height: height,
    width: width,
    padding: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginTop: 12,
    marginBottom: 4,
  },
  errorText: {
    color: "red",
    marginTop: 16,
    textAlign: "center",
  },
  changeButton: {
    backgroundColor: "#FECD3E",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 24,
  },
  changeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.7,
  }
});

export default PasswordSettingsScreen;
