import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import styles from './ProfileHeader.style';
const ProfileHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150?img=56' }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>John Smith</Text>
      <Text style={styles.userId}>ID: 25030024</Text>
    </View>
  );
};

export default ProfileHeader;

