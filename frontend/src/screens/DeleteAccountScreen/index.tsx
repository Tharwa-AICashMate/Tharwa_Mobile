import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import PasswordInput from '@/componenets/PasswordInput';
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import Theme from '@/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUserId } from '@/utils/auth';
import { apiBase } from '@/utils/axiosInstance';
import { CommonActions } from '@react-navigation/native';
import { logoutUser } from "@/redux/slices/AuthSlice";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  EditProfile: undefined;
  Security: undefined;
  Settings: undefined;
  Help: undefined;
  Logout: undefined;
  Profile: undefined;
};

const { height, width } = Dimensions.get('window');

type DeleteAccountScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DeleteAccountScreen'>;

const API_BASE_URL = apiBase;

const DeleteAccountScreen: React.FC = () => {
  const navigation = useNavigation<DeleteAccountScreenNavigationProp>();
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const logout = async () => {
    dispatch(logoutUser())
  }

  const handleDeleteRequest = async () => {
    if (!password) {
      Alert.alert('Error', 'Please enter your password to confirm');
      return;
    }

    setLoading(true);
    try {
      const userId = await getCurrentUserId();
      if (!userId) {
        Alert.alert('Error', 'Unable to fetch user information');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/delete/get-email/${userId}`);
      const result = await response.json();

      if (!response.ok || !result.email) {
        Alert.alert('Error', 'Unable to fetch user email');
        return;
      }

      const userEmail = result.email;

      const verifyResponse = await fetch(`${API_BASE_URL}/delete/verify-password/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, password }),
      });

      const verifyResult = await verifyResponse.json();

      if (!verifyResponse.ok) {
        throw new Error(verifyResult.error || 'Password verification failed');
      }

      setShowModal(true);
    } catch (error) {
      Alert.alert('Error', 'Incorrect password or server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      const userId = await getCurrentUserId();
      if (!userId) {
        Alert.alert('Error', 'Unable to fetch user information');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Account deletion failed');
      }

      // Clear local storage
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('authToken');

      setShowModal(false);

      Alert.alert(
        'Account Deleted',
        'Your account has been successfully deleted.',
        [{
          text: 'OK',
          onPress: async () => {
            await logout();
          },
        }]
      );
    } catch (error) {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('authToken');

      setShowModal(false);

      Alert.alert(
        'Account Deleted',
        'Your account may have already been deleted.',
        [{
          text: 'OK',
          onPress: async () => {
            await logout();
          },
        }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={Theme.colors.highlight} translucent={false} />
      <Header title="Delete Account" />

      <View style={styles.content}>
        <Text style={styles.warningTitle}>
          Are You Sure You Want To Delete Your Account?
        </Text>

        <Text style={styles.warningText}>
          By deleting your account, you will lose all your data permanently including:
        </Text>

        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>• Transaction history</Text>
          <Text style={styles.bulletPoint}>• Saved budgets and goals</Text>
          <Text style={styles.bulletPoint}>• Account settings and preferences</Text>
          <Text style={styles.bulletPoint}>• All personal information</Text>
        </View>

        <Text style={styles.passwordLabel}>Please enter your password to confirm:</Text>

        <PasswordInput value={password} onChangeText={setPassword} />

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteRequest} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainCancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.mainCancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Confirmation Modal */}
      <Modal visible={showModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text style={styles.modalSubTitle}>Are You Sure You Want To Delete Your Account?</Text>

            <Text style={styles.modalText}>
              By deleting your account, you agree that you understand the consequences of this action.
              Your account will be permanently deleted with all associated data.
            </Text>

            <TouchableOpacity
              style={styles.confirmDeleteButton}
              onPress={handleDeleteConfirm}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.confirmDeleteButtonText}>Yes, Delete Account</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel} disabled={loading}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FECD3E',
  },
  content: {
    flex: 1,
    padding: 40,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    height: height,
    width: width,
    backgroundColor: 'white',
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  warningText: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'left',
  },
  bulletPoints: {
    marginBottom: 24,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'left',
  },
  passwordLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    textAlign: 'left',
  },
  deleteButton: {
    backgroundColor: '#FECD3E',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  mainCancelButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  mainCancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  modalSubTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  confirmDeleteButton: {
    backgroundColor: '#FECD3E',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  confirmDeleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DeleteAccountScreen;
