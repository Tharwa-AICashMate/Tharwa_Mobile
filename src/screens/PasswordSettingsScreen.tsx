
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< Updated upstream
import { AppDispatch, RootState } from '../store/store';
import { changePassword, resetPasswordChangeSuccess } from '../store/slices/settingsSlice';
=======
import { AppDispatch, RootState } from '../redux/store';
import { changePassword, resetPasswordChangeSuccess } from '../redux/slices/settingsSlice';
>>>>>>> Stashed changes
import PasswordInput from '../componenets/PasswordInput';
const { height, width } = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';

type PasswordSettingsScreenNavigationProp = any; 


const PasswordSettingsScreen: React.FC = () => {
  const navigation = useNavigation<PasswordSettingsScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, passwordChangeSuccess } = useSelector(
    (state: RootState) => state.settings
  );

  const handleBack = () => {
    navigation.goBack();
  };
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setLocalError('All fields are required');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setLocalError('Password must be at least 8 characters');
      return;
    }

    setLocalError(null);
    dispatch(changePassword({
      currentPassword,
      newPassword,
      confirmNewPassword
    }));
  };

  React.useEffect(() => {
    if (passwordChangeSuccess) {
      navigation.navigate('PasswordChangeConfirm');
      dispatch(resetPasswordChangeSuccess());
    }
  }, [passwordChangeSuccess, navigation, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={handleBack} >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Password Settings</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.label}>Current Password</Text>
          <PasswordInput
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          
          <Text style={styles.label}>New Password</Text>
          <PasswordInput
            value={newPassword}
            onChangeText={setNewPassword}
          />
          
          <Text style={styles.label}>Confirm New Password</Text>
          <PasswordInput
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
          />
          
          {(error || localError) && (
            <Text style={styles.errorText}>{error || localError}</Text>
          )}
          
          <TouchableOpacity
            style={styles.changeButton}
            onPress={handleChangePassword}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.changeButtonText}>Change Password</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    backgroundColor: '#FECD3E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    height: height , 
    width: width ,   
    padding: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    marginBottom: 4,
  },
  errorText: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
  changeButton: {
    backgroundColor: '#FECD3E',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 24,
  },
  changeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PasswordSettingsScreen;

