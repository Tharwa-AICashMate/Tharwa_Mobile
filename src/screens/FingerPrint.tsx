
import React, { useState, useEffect } from 'react'
import { StatusBar, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as LocalAuthentication from 'expo-local-authentication'
import { useNavigation, useRoute } from '@react-navigation/native'

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
                // Avoid duplicates
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
            <StatusBar style="light" backgroundColor="#00D09E" translucent={false} />
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