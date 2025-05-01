import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Theme from '@/theme';
import styles from './HeadericonsWithTitle.styles';

interface HeaderProps {
  title: string;
  goBackTo?: string;
  bellNavigateTo?: string; 
}

export default function Header({ title, goBackTo, bellNavigateTo }: HeaderProps) {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleBack = () => {
    if (goBackTo) {
      navigation.navigate(goBackTo);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color={Theme.colors.secondery} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={{flexDirection:"row"}}>
    <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
        <Ionicons
          name="camera-outline"
          size={20}
          color="black"
          style={styles.bellIcon}
        />
      </TouchableOpacity>
    {/* <TouchableOpacity onPress={() => navigation.navigate(bellNavigateTo || 'Notification')}>
        <Ionicons
          name="notifications-outline"
          size={20}
          color="black"
          style={styles.bellIcon}
        />
      </TouchableOpacity> */}


      
    </View>
    </View>
  );
}
