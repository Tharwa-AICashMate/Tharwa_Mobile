

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
import i18next from 'i18next';

import ProfileHeader from '../../componenets/ProfileHeader/ProfileHeader';
import Header from '../../componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import UpdateButton from '@/componenets/Button/Button';
import Theme from '@/theme';
import { createStyles } from './Profile.styles'; // استيراد الدالة
import { getCurrentUserId } from '@/utils/auth';
import { apiBase } from '@/utils/axiosInstance';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';

type RootStackParamList = {
  Profile: undefined;
  ChangePin: undefined;
  GreenScreen: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Profile: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();

  const isRTL = i18next.language === 'ar' || I18nManager.isRTL;
  const styles = createStyles(isRTL); // استخدام الدالة مع isRTL

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
        console.log('Failed to fetch user:', error);
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

      setUpdateMessage('Data Updated Successfully');

      setTimeout(() => {
        setUpdateMessage('');
      }, 2000);
    } catch (error) {
      console.log('Failed to update profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Theme.colors.highlight} translucent={false} />
      <Header title={t("EditProfile.editProfile")} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentBox}>
          <View style={styles.profileContent}>
            <ProfileHeader full_name={full_name} />
            <Text style={styles.sectionTitle}>{t("EditProfile.accountSettings")}</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t("EditProfile.fullName")}</Text>
              <TextInput
                style={styles.input}
                value={full_name}
                onChangeText={setFullName}
                placeholder={t("EditProfile.fullNamePlaceholder")}
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t("EditProfile.phone")}</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder={t("EditProfile.phonePlaceholder")}
                keyboardType="phone-pad"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t("EditProfile.emailAddress")}</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder={t("EditProfile.emailPlaceholder")}
                keyboardType="email-address"
                placeholderTextColor="#999"
                editable={false}
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>{t("EditProfile.pushNotifications")}</Text>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: '#ccc', true: Theme.colors.highlight }}
                thumbColor={pushNotifications ? '#fff' : '#f4f3f4'}
              />
            </View>
      <View style={styles.updateButton}>
            <UpdateButton
              onPress={handleUpdateProfile}
              title={t("EditProfile.updateProfile")}
            />
</View>
            {updateMessage ? (
              <Text>{t("EditProfile.successUpdate")}</Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
