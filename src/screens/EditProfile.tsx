// screens/Profile.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ProfileHeader from '../componenets/ProfileHeader/ProfileHeader';
import Header from '../componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import UpdateButton from '@/componenets/Button/Button';
import Theme from '@/theme';

type RootStackParamList = {
  Profile: undefined;
  ChangePin: undefined;
  GreenScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Profile: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const [username, setUsername] = useState<string>('John Smith');
  const [phone, setPhone] = useState<string>('+44 555 5555 55');
  const [email, setEmail] = useState<string>('example@example.com');
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#00D09E" translucent={false} />
      <Header title="Edit My Profile" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentBox}>
          <View style={styles.profileContent}>
            <ProfileHeader />
            <Text style={styles.sectionTitle}>Account Settings</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone"
                keyboardType="phone-pad"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
                keyboardType="email-address"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Push Notifications</Text>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: '#ccc', true: Theme.colors.highlight }}
                thumbColor={pushNotifications ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Turn Dark Theme</Text>
              <Switch
                value={darkTheme}
                onValueChange={setDarkTheme}
                trackColor={{ false: '#ccc', true: Theme.colors.highlight }}
                thumbColor={darkTheme ? '#fff' : '#f4f3f4'}
              />
            </View>

            <UpdateButton
              onPress={() => {
                console.log('Profile updated');
              }}
              title="Update Profile"
            />
          </View>
        </View>
      </ScrollView>
    </View>
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
    backgroundColor: Theme.colors.background,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    alignSelf: 'flex-start',
    marginVertical: 20,
    marginLeft: '10%',
    color: '#000',
  },
  inputGroup: {
    width: '80%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 15,
    marginBottom: 8,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    backgroundColor: Theme.colors.secondery,
    borderRadius: 15,
    padding: 12,
    fontSize: 14,
  },
  switchRow: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: Theme.colors.textLight,
    fontWeight: '500',
  },
});
