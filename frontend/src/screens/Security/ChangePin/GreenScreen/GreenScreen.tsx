// screens/GreenScreen.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Theme from '@/theme';
import styles from './GreenScreen.styles';

type RootStackParamList = {
  MainApp: { screen: string; params?: { screen: string } };
  GreenScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const GreenScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('MainApp', {
        screen: 'Profile',
        params: {
          screen: 'Profile',
        },
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../../assets/success.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Pin Has Been Changed Successfully</Text>
    </View>
  );
};

export default GreenScreen;

