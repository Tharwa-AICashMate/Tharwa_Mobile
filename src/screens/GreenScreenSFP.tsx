import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import Theme from '@/theme';

interface Fingerprint {
    id: string;
    name: string;
}

const GreenScreenSFP: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { fingerprint } = route.params as { fingerprint?: Fingerprint }; 

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.goBack(); 
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigation, fingerprint]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/success.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.text}>The FingerPrint Has Been Successfully Added</Text>
        </View>
    );
};

export default GreenScreenSFP;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.highlight,
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
        color: Theme.colors.secondery,
        fontWeight: '600',
        textAlign: 'center',
    },
});