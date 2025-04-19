import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
<<<<<<< HEAD
import ProfileHeader from '../../componenets/ProfileHeader/ProfileHeader';
import Header from '../../componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
=======
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import Header from '../../components/HeaderIconsWithTitle/HeadericonsWithTitle';
>>>>>>> HomePage
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Theme from '@/theme';
import styles from './ProfileMenu.styles'; 
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { logoutUser } from "@/redux/slices/AuthSlice";

type RootStackParamList = {
  EditProfile: undefined;
  Security: undefined;
  Settings: undefined;
  Help: undefined;
  Logout: undefined;
  Profile: undefined;
};

type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

const Profile: React.FC = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const logout = async() =>{
    dispatch(logoutUser())
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Theme.colors.highlight} translucent={false} />
      <Header title="Profile" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentBox}>
          <View style={styles.profileContent}>
            <ProfileHeader />
            <MenuItem icon="person" label="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
            <MenuItem icon="shield-checkmark" label="Security" onPress={() => navigation.navigate('Security')} />
            <MenuItem icon="settings" label="Settings" onPress={() => navigation.navigate('SettingsScreen')} />
            <MenuItem icon="help-circle" label="Help" onPress={() => navigation.navigate('HelpCenterScreen')} />
            <MenuItem icon="log-out-outline" label="Logout" onPress={logout} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={30} color="white" />
      </View>
      <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Profile;
