import Theme from "@/theme";
import React from "react";
import { View } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import styled from "styled-components/native";
import { StyleSheet, Dimensions } from "react-native";
interface TargetProgressProps {
  title: string;
  progress: number; // 0 to 100
  color: string;
  size?: number;
}

const Container = styled.View`
  align-items: center;
  margin-left:2%;
  margin-bottom:20px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: ${Theme.colors.background};
  margin-top: 6px;
  font-weight:600;
`;

export const TargetProgress: React.FC<TargetProgressProps> = ({
  title,
  progress,
  color,
  size = 95,
}) => {
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <Container style={styles.svg}>
      <Svg width={size} height={size} >
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={Theme.colors.background}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}

        />
        {/* Percentage text */}
        <SvgText
          x={size / 2}
          y={size / 2 + 5}
          fontSize="16"
          fontWeight="bold"
          fill={Theme.colors.background}
          textAnchor="middle"
        >
          {`${progress}%`}
        </SvgText>
      </Svg>
      <Title>{title}</Title>
    </Container>
  );
};


const styles = StyleSheet.create({
  svg: {
    backgroundColor: Theme.colors.accentLight,
    width: "40%",
    padding: 14,
    borderRadius:30
  },
  circle: {
    paddingBlock: 20
  }
})