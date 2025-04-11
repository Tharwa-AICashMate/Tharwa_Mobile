import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userId: {
    fontSize: 13,
    color: '#555',
  },
});
