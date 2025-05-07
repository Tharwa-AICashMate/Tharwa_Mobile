import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Theme from '@/theme';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { resetAddStoreStatus } from '@/redux/slices/storeSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootState } from '@/redux/store';

const StoreModal = ({ 
  visible, 
  onClose, 
  onSubmit, 
  initialData = { 
    name: '', 
    city: '', 
    country: '' 
  } 
}) => {
  const { t } = useTranslation();
  const [storeName, setStoreName] = useState(initialData.name);
  const [storeCity, setStoreCity] = useState(initialData.city);
  const [storeCountry, setStoreCountry] = useState(initialData.country);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const dispatch = useAppDispatch();
  const { addLocationStatus } = useAppSelector((state: RootState) => state.store);

  useEffect(() => {
    if (addLocationStatus === 'succeeded') {
      setShowSuccessModal(true);
      dispatch(resetAddStoreStatus());
    }
  }, [addLocationStatus, dispatch]);

  const handleSubmit = () => {
    onSubmit({
      name: storeName,
      city: storeCity,
      country: storeCountry
    });
    onClose();
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('addStoreScreen.confirmStoreDetails')}</Text>
            
            <Text style={styles.inputLabel}>{t('addStoreScreen.storeName')}</Text>
            <TextInput
              style={styles.input}
              value={storeName}
              onChangeText={setStoreName}
              placeholder={t('addStoreScreen.enterStoreName')}
            />
            
            <Text style={styles.inputLabel}>{t('addStoreScreen.city')}</Text>
            <TextInput
              style={styles.input}
              value={storeCity}
              onChangeText={setStoreCity}
              placeholder={t('addStoreScreen.enterCity')}
            />
            
            <Text style={styles.inputLabel}>{t('addStoreScreen.country')}</Text>
            <TextInput
              style={styles.input}
              value={storeCountry}
              onChangeText={setStoreCountry}
              placeholder={t('addStoreScreen.enterCountry')}
            />
            
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]} 
                onPress={onClose}
              >
                <Text style={styles.buttonText}>{t('common.cancel')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.submitButton]} 
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>{t('common.confirm')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Success Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.successModalContainer}>
          <View style={styles.successModalContent}>
            <Icon name="check-circle" size={60} color={Theme.colors.primary} />
            <Text style={styles.successModalTitle}>{t('addStoreScreen.thankYou')}</Text>
            <Text style={styles.successModalText}>
              {t('addStoreScreen.storeAdded', { storeName: storeName })}
            </Text>
            <Pressable
              style={styles.successModalButton}
              onPress={() => setShowSuccessModal(false)}
            >
              <Text style={styles.successModalButtonText}>{t('addStoreScreen.ok')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: Theme.colors.text,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
    color: Theme.colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f1f1f1',
  },
  submitButton: {
    backgroundColor: Theme.colors.primary,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 14,
  },
  
  // Success Modal Styles
  successModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  successModalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  successModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  successModalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  successModalButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  successModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StoreModal;