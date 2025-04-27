import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';

import ProfileHeader from '../../componenets/ProfileHeader/ProfileHeader';
import Header from '../../componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import UpdateButton from '@/componenets/Button/Button';
import Theme from '@/theme';
import styles from './Profile.styles';
import { getCurrentUserId } from '@/utils/auth';
import { apiBase } from '@/utils/axiosInstance';

type RootStackParamList = {
  Profile: undefined;
  ChangePin: undefined;
  GreenScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Profile: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const [full_name, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [updateMessage, setUpdateMessage] = useState<string>(''); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = await getCurrentUserId();
        setUserId(id);

        const response = await axios.get(`${apiBase}/profile/users/${id}`);
        const { full_name, mobile_num, email } = response.data;

        setFullName(full_name);
        setPhone(mobile_num);
        setEmail(email);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`${apiBase}/profile/users/${userId}`, {
        full_name,
        mobile_num: phone,
        email,
      });
      console.log('Updated user:', response.data);

      // عرض رسالة التحديث الناجح أسفل الزر
      setUpdateMessage('Data Updated Successfully');

      // إخفاء الرسالة بعد 2 ثانية
      setTimeout(() => {
        setUpdateMessage('');
      }, 2000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Theme.colors.highlight} translucent={false} />
      <Header title="Edit My Profile" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentBox}>
          <View style={styles.profileContent}>
            <ProfileHeader full_name={full_name} />
            <Text style={styles.sectionTitle}>Account Settings</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={full_name}
                onChangeText={setFullName}
                placeholder="Full Name"
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

            <UpdateButton
              onPress={handleUpdateProfile}
              title="Update Profile"
            />

            {updateMessage ? (
              <Text>{updateMessage}</Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
