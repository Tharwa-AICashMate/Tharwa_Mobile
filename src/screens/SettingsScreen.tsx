
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< Updated upstream
import { AppDispatch, RootState } from '../store/store';
import { fetchUserSettings } from '../store/slices/settingsSlice';
=======
import { AppDispatch, RootState } from '@/redux/store';
import { fetchUserSettings } from '../redux/slices/settingsSlice';
>>>>>>> Stashed changes
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
            title=" Notifications Settings"
            icon={ <Ionicons name="notifications-outline" size={24} color="#FECD3E" />
          }
            onPress={() => navigation.navigate('NotificationSettings')}
          />
          <SettingsItem
            title="Password Settings"
            icon={<Ionicons name="key-outline" size={20} color="#FECD3E" />}
            onPress={() => navigation.navigate('PasswordSettings')}
          />
          <SettingsItem
            title="Delete Account"
            icon={<Ionicons name="trash-outline" size={20} color="#FECD3E" />}
            onPress={() => navigation.navigate('DeleteAccount')}
          />
            <SettingsItem
            title="Help Center"
            icon={<Ionicons name="help-circle-outline" size={20} color="#FECD3E" />}
            onPress={() => navigation.navigate('HelpCenter')}
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
