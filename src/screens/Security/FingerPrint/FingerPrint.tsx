
import React, { useState, useEffect } from 'react'
import { StatusBar, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as LocalAuthentication from 'expo-local-authentication'
import { useNavigation, useRoute } from '@react-navigation/native'
import styles from './FingerPrint.styles'
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle'
import Theme from '@/theme'

interface Fingerprint {
    id: string
    name: string
}

export default function FingerPrint() {
    const [fingerprints, setFingerprints] = useState<Fingerprint[]>([])
    const navigation = useNavigation()
    const route = useRoute()
    const fingerprint = route.params?.fingerprint 

    useEffect(() => {
        checkBiometricSupport()
       
        if (fingerprint) {
            setFingerprints((prev) => {
                if (!prev.some((fp) => fp.id === fingerprint.id)) {
                    return [...prev, fingerprint]
                }
                return prev
            })
        }
    }, [fingerprint])

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

    const handleAddFingerprint = () => {
        navigation.navigate('AddFingerPrint', {
            addFingerprint: (newFingerprint: Fingerprint) => {
                setFingerprints((prev) => [...prev, newFingerprint])
            },
        })
    }

    const navigateToFingerprintDetails = (fingerprint: Fingerprint) => {
        navigation.navigate('FingerprintDetails', {
            fingerprint,
            deleteFingerprint: (id: string) => {
                setFingerprints((prev) => prev.filter((fp) => fp.id !== id))
            },
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor={Theme.colors.highlight} translucent={false} />
            <Header title="Fingerprint"  />

            <View style={styles.contentBox}>
                <View style={styles.listContainer}>
                    <TouchableOpacity style={styles.listItem} onPress={handleAddFingerprint}>
                        <View style={styles.itemLeft}>
                            <View style={[styles.iconContainer, styles.addIconContainer]}>
                                <Ionicons name="add" size={30} color="#fff" />
                            </View>
                            <Text style={styles.itemText}>Add A Fingerprint</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="#999" />
                    </TouchableOpacity>

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
            </View>
        </View>
    )
}

