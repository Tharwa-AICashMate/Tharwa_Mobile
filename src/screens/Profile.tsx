import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import ProfileHeader from '../componenets/ProfileHeader/ProfileHeader';
import Header from '../componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Theme from '@/theme';
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
            <MenuItem icon="settings" label="Setting" onPress={() => navigation.navigate('Settings')} />
            <MenuItem icon="help-circle" label="Help" onPress={() => navigation.navigate('Help')} />
            <MenuItem icon="log-out-outline" label="Logout" onPress={() => navigation.navigate('Logout')} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.highlight,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 50,
  },
  contentBox: {
    flex: 1,
    backgroundColor:Theme.colors.background,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  profileContent: {
    alignItems: 'center',
    marginTop: -70,
    width: '110%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
  },
  iconWrapper: {
    backgroundColor: '#00aaff',
    padding: 10,
    borderRadius: 30,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color:Theme.colors.textLight,
  },
});
