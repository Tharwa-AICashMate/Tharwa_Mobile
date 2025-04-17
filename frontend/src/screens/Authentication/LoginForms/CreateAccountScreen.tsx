import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import styles from './styles';
import Input from '@/componenets/UI/input';
import { navigationProps } from '@/types';


const CreateAccountScreen: React.FC<navigationProps> = ({ navigation }) => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome</Text>
          </View>

          <View style={styles.form}>
           <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer} >
            <Input
              label="Full name"
              value={fullName}
              onChangeText={setFullName}
              errorMessage={''}
              autoCapitalize="none"
              placeholder="Your full name"
            />

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              errorMessage={''}
              autoCapitalize="none"
              placeholder="example@example.com"
            />

            <Input
              label="Mobile Number"
              value={mobile}
              onChangeText={setMobile}
              errorMessage={''}
              autoCapitalize="none"
              placeholder="+123456789"
            />

            <Input
              label="Date of birth"
              value={dob}
              onChangeText={setDob}
              errorMessage={''}
              autoCapitalize="none"
              placeholder="DD / MM / YYYY"
            />

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              errorMessage={''}
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              endIcon={
                <Image
                  source={
                    showPassword
                      ? require('@/assets/Eye-icon-open.png')
                      : require('@/assets/Eye-icon.png')
                  }
                  style={{ width: 25, height: 13 }}
                />
              }
              onEndIconPress={() => setShowPassword((prev) => !prev)}
            />

            <Input
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              errorMessage={''}
              autoCapitalize="none"
              secureTextEntry={!showConfirmPassword}
              endIcon={
                <Image
                  source={
                    showConfirmPassword
                      ? require('@/assets/Eye-icon-open.png')
                      : require('@/assets/Eye-icon.png')
                  }
                  style={{ width: 25, height: 13 }}
                />
              }
              onEndIconPress={() => setShowConfirmPassword((prev) => !prev)}
            />

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By continuing, you agree to
                <Text style={styles.termsLink}> Terms of Service </Text>
                and
                <Text style={styles.termsLink}> Privacy Policy</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('SecurityPin')}
            >
              <Text style={styles.primaryButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.link}>
              <Text style={styles.linkText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('LoginForm')}>
                <Text style={styles.linkButton}>Log In</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
          </View>
        </View>
    </KeyboardAvoidingView>
  );
};

export default CreateAccountScreen;


