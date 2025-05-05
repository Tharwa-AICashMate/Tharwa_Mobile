import Theme from "@/theme";
import React, { useCallback } from "react";
import {  ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import styled from "styled-components/native";
import { getCurrentUserId } from '@/utils/auth';
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message'; 
import { apiBase } from "@/utils/axiosInstance";

interface Goal {
  name: string;
  icon: string;
  current_amount: number;
  target_amount: number;
}

interface TargetProgressProps {
  size?: number;
  color: string;
}

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 7%;
  margin-right: 7%;
  margin-bottom: 20px;
`;

const GoalContainer = styled.View`
  align-items: center;
  width: 48%;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: ${Theme.colors.background};
  margin-top: 6px;
  font-weight: 600;
`;

export const TargetProgress: React.FC<TargetProgressProps> = ({
  size = 95,
  color,
}) => {
  const [goals, setGoals] = React.useState<Goal[]>([]);
  const [loading, setLoading] = React.useState(true);

  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const fetchGoals = useCallback(async () => {
    try {
      setLoading(true);
      const user_id = await getCurrentUserId();
      const response = await axios.get(`${apiBase}/goal/progress/${user_id}`);

    //  console.log("Fetched Goals:", response.data);

      if (Array.isArray(response.data) && response.data.length > 0) {
        setGoals(response.data);
      } else {
        console.log("Unexpected data format:", response.data);
      }
    } catch (error) {
      console.log("Failed to fetch goals:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchGoals();
      return () => {};
    }, [fetchGoals])
  );

  const showToast = (amount: number) => {
    Toast.show({
      type: 'success',
      text1: `🎯 Target Amount: ${amount}`,
      visibilityTime: 2000,
      position: 'bottom',
    });
  };

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="small" color={Theme.colors.background} />
      </Container>
    );
  }
  console.log(goals.length)
  return (
    <Container>
      {goals.map((goal, index) => {
        const progress = (goal.current_amount / goal.target_amount) * 100;
        const progressOffset = circumference - (progress / 100) * circumference;

        return (
          <GoalContainer key={index} style={styles.goal}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => showToast(goal.target_amount)}
              style={{ alignItems: 'center' }}
            >
              <Svg width={size} height={size}>
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
                  y={size / 2 + 15}
                  fontSize="16"
                  fontWeight="bold"
                  fill={Theme.colors.background}
                  textAnchor="middle"
                >
                  {`${Math.floor(progress)}%`}
                </SvgText>
              </Svg>
              {/* Icon */}
              <Ionicons
                name={goal.icon}
                size={32}
                color={Theme.colors.background}
                style={{
                  position: 'absolute',
                  top: size / 2 - 30,
                }}
              />
              {/* Goal Name */}
              <Title>{goal.name}</Title>
            </TouchableOpacity>
          </GoalContainer>
        );
      })}
    </Container>
  );
};

const styles = StyleSheet.create({
  goal: {
    backgroundColor: Theme.colors.accentLight,
    padding: 14,
    borderRadius: 30,
    minWidth:140,
    alignItems: "center",
  },
});
