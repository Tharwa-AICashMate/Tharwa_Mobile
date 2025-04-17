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
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { deleteAccount } from '../redux/slices/settingsSlice';
import PasswordInput from '../componenets/PasswordInput';
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import Theme from '@/theme';
const { height, width } = Dimensions.get('window');

type DeleteAccountScreenNavigationProp = any;

const DeleteAccountScreen: React.FC = () => {
  const navigation = useNavigation<DeleteAccountScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.settings);

  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const handleBack = () => {
    navigation.goBack();
  };
  const handleDeleteRequest = () => {
    if (!password) {
      Alert.alert('Error', 'Please enter your password to confirm');
      return;
    }
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteAccount(password)).unwrap();
      setShowModal(false);
      Alert.alert(
        'Account Deleted',
        'Your account has been successfully deleted.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (err) {
      console.error('Error deleting account:', err);
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
        
        <Text style={styles.passwordLabel}>
          Please enter your password to confirm:
        </Text>
        
        <PasswordInput
          value={password}
          onChangeText={setPassword}
        />
        
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteRequest}
        >
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.mainCancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.mainCancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Confirmation Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text style={styles.modalSubTitle}>Are You Sure You Want To Log Out?</Text>
            
            <Text style={styles.modalText}>
              By deleting your account, you agree that you understand the consequences of this action. Your account will be permanently deleted with all associated data.
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
            
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FECD3E',
  },
  header: {
    padding: 16,
    backgroundColor: '#FECD3E ',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 40,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    height: height , 
    width: width ,  
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
  errorText: {
    color: '#d32f2f',
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
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
  // Modal Styles
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