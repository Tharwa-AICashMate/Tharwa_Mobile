import React, { useState } from 'react'
import { StatusBar, Text, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as LocalAuthentication from 'expo-local-authentication'
import Dialog from 'react-native-dialog'
import { useNavigation, useRoute } from '@react-navigation/native'
import styles from "../../Security/FingerPrint/AddFingerPrint/AddFingerPrint.styles"

import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle'
import Theme from '@/theme'

interface Fingerprint {
    id: string
    name: string
}

export default function AddFingerPrint() {
    const [dialogVisible, setDialogVisible] = useState(false)
    const [fingerprintName, setFingerprintName] = useState('')
    const navigation = useNavigation()
    const route = useRoute()
    const { addFingerprint } = route.params || {}

    const handleVerifyFingerprint = async () => {
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
                promptMessage: 'Scan your fingerprint to continue',
                disableDeviceFallback: false,
            })

            if (result.success) {
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'MainApp',
                            state: {
                                routes: [{ name: 'Profile' }],
                            },
                        },
                    ],
                })
            } else {
                Alert.alert('Authentication Failed', 'Fingerprint not recognized. Please try again.')
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'An unexpected error occurred')
        }
    }

    const handleSaveFingerprint = () => {
        if (fingerprintName.trim() === '') {
            Alert.alert('Invalid Name', 'Please enter a name for your fingerprint')
            return
        }

        const newFingerprint: Fingerprint = {
            id: Date.now().toString(),
            name: fingerprintName,
        }

        if (addFingerprint) {
            addFingerprint(newFingerprint)
        }

        setDialogVisible(false)
        setFingerprintName('')
        Alert.alert('Success', 'Fingerprint added successfully', [
            {
                text: 'OK',
                onPress: () =>
                    navigation.navigate('GreenScreenSFP', { fingerprint: newFingerprint }),
            },
        ])
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor={Theme.colors.highlight} translucent={false} />
            <Header title="Add Fingerprint" />

            <View style={styles.contentBox}>
                <View style={styles.fingerprintContainer}>
                    <Image
                        source={require('../../../../assets/Component.png')}
                        style={{ width: 120, height: 120, marginTop: -40, marginBottom: 20 }}
                        resizeMode="contain"
                    />
                    <Text style={styles.instructionText}>Use Fingerprint To Access</Text>
                    <Text style={styles.instructionParaghraph}>
                        Here You Can Add Biometric So Use It In Several Places
                    </Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={handleVerifyFingerprint}
                    >
                        <Text style={styles.retryButtonText}>Use Touch Id</Text>
                    </TouchableOpacity>
                </View>

                {/* Fingerprint naming dialog (not used after change) */}
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
                    <Dialog.Button
                        label="Cancel"
                        onPress={() => {
                            setDialogVisible(false);
                            navigation.goBack();
                        }}
                    />
                    <Dialog.Button label="Save" onPress={handleSaveFingerprint} />
                </Dialog.Container>
            </View>
        </View>
    );
}
