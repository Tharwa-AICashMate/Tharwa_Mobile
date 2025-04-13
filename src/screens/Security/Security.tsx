
import React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import Theme from '@/theme';
import styles from './Security.styles';
type RootStackParamList = {
  ChangePin: undefined;
  FingerPrint: undefined;
  TermsAndConditions: undefined;
  Security: undefined;
};


type SecurityNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Security'
>;


interface SecurityProps {
  navigation: SecurityNavigationProp;
}

const Security: React.FC<SecurityProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Theme.colors.highlight} translucent={false} />
      <Header title="Security" />

      <View style={styles.contentBox}>
        <Text style={styles.title}>Security</Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('ChangePin')}
        >
          <Text style={styles.optionText}>Change Pin</Text>
          <Ionicons name="chevron-forward" size={20} color={Theme.colors.textLight} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('FingerPrint')}
        >
          <Text style={styles.optionText}>Fingerprint</Text>
          <Ionicons name="chevron-forward" size={20} color={Theme.colors.textLight} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('TermsAndConditions')}
        >
          <Text style={styles.optionText}>Terms And Conditions</Text>
          <Ionicons name="chevron-forward" size={20} color={Theme.colors.textLight} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Security;

