import React from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import NotificationItem from '@/componenets/NotificationItem/NotificationItem';

interface HomeScreenHeaderProps {}

const HomeScreenHeader: React.FC<HomeScreenHeaderProps> = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi, Welcome Back</Text>
      <Text style={styles.subGreeting}>Good Morning</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFDA63',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,

  },
  greeting: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 28,
    color: '#000',
    marginBottom: 5,
  },
  subGreeting: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#000',
  },
});

export default HomeScreenHeader;