import React from "react";
import { Dimensions, StyleSheet, ScrollView } from "react-native";
import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/Feather';
import Theme from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  SearchScreen: undefined;
  CalendarScreen: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface BarChartData {
  day?: string;
  week?: string;
  month?: string;
  year?: string;
  income: number;
  expenses: number;
}

interface BarChartProps {
  data: BarChartData[];
  maxValue: number;
  period: "Weekly" | "Monthly" | "Year";
}

const Container = styled.View`
  background-color: ${Theme.colors.secondery};
  border-radius: 20px;
  padding: 16px;
  margin: 10px 0;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #666666;
  margin-bottom: 8px;
`;

const IconContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 16px;
  margin-top: -30px;
`;

const IconButton = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  background-color: #ffcc00;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
`;

const ChartWithYAxis = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const YAxis = styled.View`
  justify-content: space-between;
  height: 180px;
  margin-right: 8px;
`;

const YAxisLabel = styled.Text`
  font-size: 10px;
  color: #999999;
`;

const ChartContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  height: 180px;
  margin-top: 8px;
  flex: 1;
`;

const BarGroup = styled.View`
  flex-direction: column;
  align-items: center;
  width: ${(props) => props.width}px;
`;

const BarsWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const Bar = styled.View<{ height: number; isIncome: boolean }>`
  width: 6px;
  height: ${(props) => props.height}px;
  background-color: ${(props) => (props.isIncome ?  "#FFC312":"#3B3B98")};
  border-radius: 3px;
  margin: 0 2px;
`;

const DayLabel = styled.Text`
  text-align: center;
  margin-top: 6px;
  color: #999999;
  font-size: 12px;
`;

export const BarChart: React.FC<BarChartProps> = ({ data, maxValue, period }) => {
  const getBarHeight = (value: number) => {
    const maxHeight = 140;
    return (value / maxValue) * maxHeight;
  };

  const yAxisLabels =
    period === "Weekly" ? [10000,8000, 6000, 4000, 2000, 0] :
    period === "Monthly" ? [20000, 16000, 12000, 8000, 4000, 0] :
    [200000, 150000, 100000, 50000, 0];

  const navigation = useNavigation<NavigationProp>();

  // Calculate width for each bar based on the period type
  const calculateBarWidth = (totalItems: number, period: string) => {
    const availableWidth = Dimensions.get("window").width * 0.88; // 88% of the screen width
    
    if (period === "Weekly") {

      return availableWidth / totalItems * 0.85; 
    } else if (period === "Monthly") {

      return availableWidth / totalItems * 1; 
    } else if (period === "Year") {
      return availableWidth / totalItems * 0.8; 
    }
    return availableWidth / totalItems; 
  };

  const barWidth = calculateBarWidth(data.length, period);

  return (
    <Container style={styles.container}>
      <Title>Income & Expenses</Title>

      <IconContainer>
        <IconButton onPress={() => navigation.navigate('SearchScreen')}>
          <Icon name="search" size={24} color={Theme.colors.textLight} />
        </IconButton>
        {/* <IconButton onPress={() => navigation.navigate('CalenderScreen')}>
          <Icon name="calendar" size={24} color={Theme.colors.textLight} />
        </IconButton> */}
      </IconContainer>

      <ChartWithYAxis>
        <YAxis>
          {yAxisLabels.map((label, index) => (
            <YAxisLabel key={index}>{label}</YAxisLabel>
          ))}
        </YAxis>

        {period === "Monthly" ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ChartContainer>
              {data.map((item, index) => (
                <BarGroup key={index} width={calculateBarWidth(data.length, "Monthly")}>
                  <BarsWrapper>
                    <Bar height={getBarHeight(item.income)} isIncome={true} />
                    <Bar height={getBarHeight(item.expenses)} isIncome={false} />
                  </BarsWrapper>
                  <DayLabel>{item.month}</DayLabel>
                </BarGroup>
              ))}
            </ChartContainer>
          </ScrollView>
        ) : (
          <ChartContainer>
            {data.map((item, index) => (
              <BarGroup key={index} width={barWidth}>
                <BarsWrapper>
                  <Bar height={getBarHeight(item.income)} isIncome={true} />
                  <Bar height={getBarHeight(item.expenses)} isIncome={false} />
                </BarsWrapper>
                <DayLabel>{period === "Weekly" ? item.week : item.year}</DayLabel>
              </BarGroup>
            ))}
          </ChartContainer>
        )}
      </ChartWithYAxis>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "88%",
    marginLeft: "7%",
    marginTop: "7%",
  },
});
