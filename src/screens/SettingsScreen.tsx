
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchUserSettings } from '../store/slices/settingsSlice';
import SettingsItem from '../componenets/SettingsItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';


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
      <View style={styles.header}>
        
      <TouchableOpacity onPress={handleBack} >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <SettingsItem
            title="Application Settings"
            onPress={() => navigation.navigate('NotificationSettingsScreen')}
          />
          <SettingsItem
            title="Password Settings"
            onPress={() => navigation.navigate('PasswordSettingsScreen')}
          />
          <SettingsItem
            title="Delete Account"
            onPress={() => navigation.navigate('DeleteAccountScreen')}
          />
            <SettingsItem
            title="Help Center"
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
