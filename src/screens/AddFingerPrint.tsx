import React, { useState } from 'react'
import { StatusBar, Text, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as LocalAuthentication from 'expo-local-authentication'
import Dialog from 'react-native-dialog'
import { useNavigation, useRoute } from '@react-navigation/native'


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
                navigation.goBack()
                return
            }

            const isEnrolled = await LocalAuthentication.isEnrolledAsync()
            if (!isEnrolled) {
                Alert.alert(
                    'No Fingerprints Found',
                    'Please set up fingerprint authentication in your device settings first.'
                )
                navigation.goBack()
                return
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Scan your fingerprint to add it',
                disableDeviceFallback: false,
            })

            if (result.success) {
                setDialogVisible(true)
            } else {
                Alert.alert('Authentication Failed', 'Please try again', [
                    { text: 'Try Again', onPress: handleVerifyFingerprint },
                    { text: 'Cancel', onPress: () => navigation.goBack() }
                ])
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'An error occurred')
            navigation.goBack()
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
                        source={require('../../assets/Component.png')}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.highlight,
    },
    contentBox: {
        flex: 1,
        backgroundColor: Theme.colors.background,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    fingerprintContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        padding: 20,
    },
    instructionText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginTop: 20,
        marginBottom: 30,
        textAlign: 'center',
    },
    instructionParaghraph: {
        textAlign: 'center',
        fontSize: 15,
    },
    retryButton: {
        backgroundColor: Theme.colors.secondery,
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 30,
        marginTop: 80,
        width: 280,
    },
    retryButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
});