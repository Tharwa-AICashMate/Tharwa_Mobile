import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    MainApp: { screen: string; params?: { screen: string } };
    GreenScreen: undefined;
    Profile: undefined;
    FingerPrint: undefined;
    ProfileMain: undefined;
    EditProfile: undefined;
    Security: undefined;
    Settings: undefined;
    Help: undefined;
    Logout: undefined;
    Notification: undefined;
    ChangePin: undefined;
    TermsAndConditions: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const GreenScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('MainApp', {
                screen: 'Profile',
                params: { screen: 'Profile' },
            });
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/success.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.text}>The FingerPrint Has Been Successfully Deleted</Text>
        </View>
    );
};

export default GreenScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00D09E',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 30,
    },
    text: {
        fontSize: 20,
        width: '60%',
        color: '#DFF7E2',
        fontWeight: '600',
        textAlign: 'center',
    },
});
