import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from "@expo/vector-icons";
import Theme from '@/theme';

interface TravelProgressCircleProps {
  progress: number;
  categoryName: string;
  icon:string
}

const ProgressCircle: React.FC<TravelProgressCircleProps> = ({ 
  progress , 
  categoryName,
  icon
}) => {
  const size = 80;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;



  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#A5DEE0"
            strokeWidth={strokeWidth}
          />
          
          {/* Progress arc */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#285E61"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            fill="transparent"
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
        
    
        <View style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Ionicons
            name={icon as any}
            size={34}
            color="#FFFFFF"
          />
        </View>
      </View>
      
      {/* Category */}
      <Text style={{ marginTop: 3 ,color:Theme.colors.background}}>{categoryName}</Text>
    </View>
  );
};

export default ProgressCircle;