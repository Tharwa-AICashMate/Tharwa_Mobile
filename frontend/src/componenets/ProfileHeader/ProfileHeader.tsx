import React from 'react';
import { View, Text } from 'react-native';
import styles from './ProfileHeader.style';

type ProfileHeaderProps = {
  full_name?: string | null; 
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ full_name }) => {
  const getInitials = (name?: string | null) => {
    const safeName = name?.trim() || ''; // safely handle null/undefined
    const parts = safeName.split(' ');
    const firstInitial = parts[0]?.[0] || '';
    const secondInitial = parts[1]?.[0] || '';
    return (firstInitial + secondInitial).toUpperCase();
  };

  return (
    <View style={styles.container}>
      <View style={styles.initialsCircle}>
         <Text style={styles.initialsText}>{getInitials(full_name)}</Text>
       </View>
       <Text style={styles.name}>{full_name || 'No Name'}</Text>
    </View>
  );
};

export default ProfileHeader;
