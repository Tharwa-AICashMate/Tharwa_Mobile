
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchUserSettings } from '../redux/slices/settingsSlice';
import SettingsItem from '../componenets/SettingsItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Theme from '@/theme';
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';


const { height, width } = Dimensions.get('window');

type SettingsScreenNavigationProp = any;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { userSettings, loading } = useSelector((state: RootState) => state.settings);
  const handleBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    dispatch(fetchUserSettings());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Theme.colors.highlight} translucent={false} />
      <Header title="Settings" />

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <SettingsItem
            title=" Notifications Settings"
            icon={ <Ionicons name="notifications-outline" size={24} color="#FECD3E" />
          }
            onPress={() => navigation.navigate('NotificationSettingsScreen')}
          />
          <SettingsItem
            title="Password Settings"
            icon={<Ionicons name="key-outline" size={20} color="#FECD3E" />}
            onPress={() => navigation.navigate('PasswordSettingsScreen')}
          />
          <SettingsItem
            title="Delete Account"
            icon={<Ionicons name="trash-outline" size={20} color="#FECD3E" />}
            onPress={() => navigation.navigate('DeleteAccountScreen')}
          />
            <SettingsItem
            title="Help Center"
            icon={<Ionicons name="help-circle-outline" size={20} color="#FECD3E" />}
            onPress={() => navigation.navigate('HelpCenterScreen')}
          />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FECD3E',
  },
  header: {
    padding: 16,
    backgroundColor: '#FECD3E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    height: height , 
    width: width ,  
    alignSelf: 'center',
    padding: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default SettingsScreen;
