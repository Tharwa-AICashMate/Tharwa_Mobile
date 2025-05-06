import React from "react";
import { Dimensions, StyleSheet, ScrollView, I18nManager } from "react-native";
import styled from "styled-components/native";
import Icon from 'react-native-vector-icons/Feather';
import Theme from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

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
  background-color: ${(props) => (props.isIncome ? "#FFC312" : "#3B3B98")};
  border-radius: 3px;
  margin: 0 2px;
`;

const DayLabel = styled.Text`
  text-align: center;
  margin-top: 6px;
  color: #999999;
  font-size: 12px;
`;

const getDynamicYAxis = (maxValue: number) => {
  const rawStep = maxValue / 5;
  let magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  let step = Math.ceil(rawStep / magnitude) * magnitude;
  
  if (step === 0) step = 1;  const labels = [];

  for (let i = 5; i >= 0; i--) {
    labels.push(Math.round(i * step));
  }

  return labels;
};


export const BarChart: React.FC<BarChartProps> = ({ data, period }) => {
  const navigation = useNavigation<NavigationProp>();
  const {t}=useTranslation();

  const maxValue = Math.max(
    ...data.map((item) => Math.max(item.income, item.expenses)),
    1
  );

  const getBarHeight = (value: number) => {
    const maxHeight = 140;
    return (value / maxValue) * maxHeight;
  };

  const yAxisLabels = getDynamicYAxis(maxValue);

  const calculateBarWidth = (totalItems: number, period: string) => {
    const availableWidth = Dimensions.get("window").width * 0.88;

    if (period === "Weekly") {
      return (availableWidth / totalItems) * 0.85;
    } else if (period === "Monthly") {
      return (availableWidth / totalItems) * 1;
    } else if (period === "Yearly") {
      return (availableWidth / totalItems) * 0.8;
    }
    return availableWidth / totalItems;
  };

  const isRTL = i18next.language === 'ar' || I18nManager.isRTL;

  const barWidth = calculateBarWidth(data.length, period);
  const styles = StyleSheet.create({
  
    container: {
      width: "88%",
      marginLeft: isRTL ? 0 : "7%",
      marginRight: isRTL ? "6%" : 0,
      marginTop: "7%",
    },
  });
  return (
    <Container style={styles.container}>
      <Title>{t("analysis.incomeExpense")}</Title>

      <IconContainer>
        <IconButton onPress={() => navigation.navigate('SearchScreen')}>
          <Icon name="search" size={24} color={Theme.colors.textLight} />
        </IconButton>
      </IconContainer>

      <ChartWithYAxis>
        <YAxis>
          {yAxisLabels.map((label, index) => (
            <YAxisLabel key={index}>{label}</YAxisLabel>
          ))}
        </YAxis>

        {period === "Monthly" ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
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


