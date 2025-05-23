// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { StatusBar } from 'expo-status-bar';
// import { useNavigation } from '@react-navigation/native';
// import ProfileHeader from '../../componenets/ProfileHeader/ProfileHeader';
// import Header from '../../componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import Theme from '@/theme';
// import useDynamicStyles from './ProfileMenu.styles'; 
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '@/redux/store';
// import { logoutUser } from "@/redux/slices/AuthSlice";
// import { getCurrentUserId } from '@/utils/auth';
// import axios from 'axios';
// import { apiBase } from '@/utils/axiosInstance';
// import { useTranslation } from 'react-i18next';

// type RootStackParamList = {
//   EditProfile: undefined;
//   Security: undefined;
//   Settings: undefined;
//   Help: undefined;
//   Logout: undefined;
//   Profile: undefined;
// };

// type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

// interface MenuItemProps {
//   icon: keyof typeof Ionicons.glyphMap;
//   label: string;
//   onPress: () => void;
// }

// const Profile: React.FC = () => {
//   const styles = useDynamicStyles(); 

//   const [full_name, setFullName] = useState<string>('');
//   const [userId, setUserId] = useState<string>('');
//   const navigation = useNavigation<ProfileNavigationProp>();
//   const dispatch = useDispatch<AppDispatch>();
//   const { t } = useTranslation();

//   const logout = async () => {
//     dispatch(logoutUser());
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const id = await getCurrentUserId();
//         setUserId(id);

//         const response = await axios.get(`${apiBase}/profile/users/${id}`);
//         const { full_name } = response.data;

//         setFullName(full_name);
//       } catch (error) {
//         console.log('Failed to fetch user:', error);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <StatusBar style="light" backgroundColor={Theme.colors.highlight} translucent={false} />
//       <Header title={t("profileScreen.profile")} />

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.contentBox}>
//           <View style={styles.profileContent}>
//             <ProfileHeader full_name={full_name} />
//             <MenuItem icon="person" label={t("profileScreen.editProfile")} onPress={() => navigation.navigate('EditProfile')} />
//             <MenuItem icon="settings" label={t("profileScreen.settings")} onPress={() => navigation.navigate('SettingsScreen')} />
//             <MenuItem icon="help-circle" label={t("profileScreen.help")} onPress={() => navigation.navigate('HelpCenterScreen')} />
//             <MenuItem icon="log-out-outline" label={t("profileScreen.logout")} onPress={logout} />
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onPress }) => {
//   const styles = useDynamicStyles(); 

//   return (
//     <TouchableOpacity style={styles.menuItem} onPress={onPress}>
//       <View style={styles.iconWrapper}>
//         <Ionicons name={icon} size={30} color="white" />
//       </View>
//       <Text style={styles.menuText}>{label}</Text>
//     </TouchableOpacity>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import ProfileHeader from '../../componenets/ProfileHeader/ProfileHeader';
import Header from '../../componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Theme from '@/theme';
import useDynamicStyles from './ProfileMenu.styles';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { logoutUser } from "@/redux/slices/AuthSlice";
import { getCurrentUserId } from '@/utils/auth';
import axios from 'axios';
import { apiBase } from '@/utils/axiosInstance';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/utils/supabase'; 

type RootStackParamList = {
  EditProfile: undefined;
  Security: undefined;
  Settings: undefined;
  Help: undefined;
  Logout: undefined;
  Profile: undefined;
  Login: undefined; 
};

type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

const Profile: React.FC = () => {
  const styles = useDynamicStyles();
  const [full_name, setFullName] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const navigation = useNavigation<ProfileNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const logout = async () => {
    try {

      const { data: session } = await supabase.auth.getSession();
      console.log("Session before logout:", session);
      await dispatch(logoutUser()).unwrap();

      navigation.navigate("Login");
    } catch (error) {
      console.log("Logout failed:", error);
      Alert.alert(t("profileScreen.error"), t("profileScreen.logoutFailed"));
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = await getCurrentUserId();
        setUserId(id);

        const response = await axios.get(`${apiBase}/profile/users/${id}`);
        const { full_name } = response.data;

        setFullName(full_name);
      } catch (error) {
        console.log('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Theme.colors.highlight} translucent={false} />
      <Header title={t("profileScreen.profile")} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentBox}>
          <View style={styles.profileContent}>
            <ProfileHeader full_name={full_name} />
            <MenuItem icon="person" label={t("profileScreen.editProfile")} onPress={() => navigation.navigate('EditProfile')} />
            <MenuItem icon="settings" label={t("profileScreen.settings")} onPress={() => navigation.navigate('SettingsScreen')} />
            <MenuItem icon="help-circle" label={t("profileScreen.help")} onPress={() => navigation.navigate('HelpCenterScreen')} />
            <MenuItem icon="log-out-outline" label={t("profileScreen.logout")} onPress={logout} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onPress }) => {
  const styles = useDynamicStyles();

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
