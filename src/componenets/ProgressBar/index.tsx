import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import styles from './style';

interface ProgressBarProps {
  percentage: number;
  amount: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, amount }) => {
  const containerWidth = Dimensions.get('window').width - 32; 
  const progressWidth = (percentage / 100) * containerWidth;

  return (
    <View style={styles.container}>
      
      <View
        style={[
          styles.fill,
          {
            width: progressWidth,
          },
        ]}
      >
        <Text style={styles.percentageText}>{`${percentage}%`}</Text>
      </View>

    
      <View style={styles.empty}>
        <Text style={styles.amountText}>
          ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>
      </View>
    </View>
  );
};



export default ProgressBar;