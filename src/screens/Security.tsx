// screens/Security.tsx
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

// Define the navigation stack param list
type RootStackParamList = {
  ChangePin: undefined;
  FingerPrint: undefined;
  TermsAndConditions: undefined;
  Security: undefined;
};

// Define the navigation prop type for the Security screen
type SecurityNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Security'
>;

// Props interface
interface SecurityProps {
  navigation: SecurityNavigationProp;
}

const Security: React.FC<SecurityProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#00D09E" translucent={false} />
      <Header title="Security" />

      <View style={styles.contentBox}>
        <Text style={styles.title}>Security</Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('ChangePin')}
        >
          <Text style={styles.optionText}>Change Pin</Text>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('FingerPrint')}
        >
          <Text style={styles.optionText}>Fingerprint</Text>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('TermsAndConditions')}
        >
          <Text style={styles.optionText}>Terms And Conditions</Text>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Security;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D09E',
  },
  contentBox: {
    flex: 1,
    backgroundColor: '#F1FFF3',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingVertical: 30,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 30,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E2F4E7',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
  },
});
