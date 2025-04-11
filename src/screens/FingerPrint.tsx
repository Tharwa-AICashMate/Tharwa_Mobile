import React, { useState, useEffect } from 'react'
import { StatusBar, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as LocalAuthentication from 'expo-local-authentication'
import Dialog from 'react-native-dialog'
import { useNavigation } from '@react-navigation/native'

// Assuming your Header component exists in the correct path
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle'

interface Fingerprint {
  id: string
  name: string
}

export default function FingerPrint() {
  const [fingerprints, setFingerprints] = useState<Fingerprint[]>([])
  const [dialogVisible, setDialogVisible] = useState(false)
  const [fingerprintName, setFingerprintName] = useState('')
  const navigation = useNavigation()

  useEffect(() => {
    checkBiometricSupport()
  }, [])

  const checkBiometricSupport = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync()
      if (!hasHardware) {
        Alert.alert('Error', 'Biometric authentication is not available on this device')
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to check biometric availability')
    }
  }

  const handleAddFingerprint = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync()
      if (!hasHardware) {
        Alert.alert('Error', 'Biometric authentication is not available on this device')
        return
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync()
      if (!isEnrolled) {
        Alert.alert(
          'No Fingerprints Found',
          'Please set up fingerprint authentication in your device settings first.'
        )
        return
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Scan your fingerprint to add it',
        disableDeviceFallback: false,
      })

      if (result.success) {
        // Show dialog to name the fingerprint
        setDialogVisible(true)
      } else {
        Alert.alert('Authentication Failed', 'Please try again')
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred')
    }
  }

  const handleSaveFingerprint = () => {
    if (fingerprintName.trim() === '') {
      Alert.alert('Invalid Name', 'Please enter a name for your fingerprint')
      return
    }

    // Add new fingerprint to the list
    const newFingerprint: Fingerprint = {
      id: Date.now().toString(),
      name: fingerprintName,
    }

    setFingerprints([...fingerprints, newFingerprint])
    setDialogVisible(false)
    setFingerprintName('')
    Alert.alert('Success', 'Fingerprint added successfully')
  }

  const navigateToFingerprintDetails = (fingerprint: Fingerprint) => {
    navigation.navigate('FingerprintDetails', {
      fingerprint,
      deleteFingerprint: (id: string) => {
        setFingerprints((prev) => prev.filter(fp => fp.id !== id))
      }
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#00D09E" translucent={false} />
      <Header title="Fingerprint" />

      <View style={styles.contentBox}>
        <View style={styles.listContainer}>
          {/* Add A Fingerprint Option */}
          <TouchableOpacity style={styles.listItem} onPress={handleAddFingerprint}>
            <View style={styles.itemLeft}>
              <View style={[styles.iconContainer, styles.addIconContainer]}>
                <Ionicons name="add" size={30} color="#fff" />
              </View>
              <Text style={styles.itemText}>Add A Fingerprint</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>

          {/* Display saved fingerprints */}
          {fingerprints.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.listItem}
              onPress={() => navigateToFingerprintDetails(item)}
            >
              <View style={styles.itemLeft}>
                <View style={[styles.iconContainer, styles.fingerprintIconContainer]}>
                  <Ionicons name="finger-print" size={30} color="#fff" />
                </View>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Fingerprint naming dialog */}
        <Dialog.Container visible={dialogVisible}>
          <Dialog.Title>Name Your Fingerprint</Dialog.Title>
          <Dialog.Description>
            Please enter a name for this fingerprint
          </Dialog.Description>
          <Dialog.Input
            value={fingerprintName}
            onChangeText={setFingerprintName}
            placeholder="e.g. Right Thumb"
          />
          <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
          <Dialog.Button label="Save" onPress={handleSaveFingerprint} />
        </Dialog.Container>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D09E',
  },
  contentBox: {
    flex: 1,
    backgroundColor: '#F1FFF3',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  listContainer: {
    width: '110%',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    backgroundColor: '#F1FFF3',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  addIconContainer: {
    backgroundColor: '#4D9FEC',
  },
  fingerprintIconContainer: {
    backgroundColor: 'lightblue',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
})
