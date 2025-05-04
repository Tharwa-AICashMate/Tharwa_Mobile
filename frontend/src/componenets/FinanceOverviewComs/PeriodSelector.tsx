import React from "react";
import styled from "styled-components/native";
import { I18nManager, StyleSheet } from "react-native";
import Theme from "@/theme";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
const isRTL =i18next.language === "ar"|| I18nManager.isRTL;
type Period =  "Weekly" | "Monthly" | "Yearly";

interface PeriodSelectorProps {
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
}

const Container = styled.View`
  flex-direction: row;
  background-color:${Theme.colors.secondery};
  border-radius: 20px;
  padding: 4px;
`;

const PeriodButton = styled.TouchableOpacity<{ isSelected: boolean }>`
  padding: 13px 18px;
  border-radius: 16px;
  background-color: ${(props) =>
    props.isSelected ? Theme.colors.highlight : "transparent"};
`;

const PeriodText = styled.Text<{ isSelected: boolean }>`
  color: ${(props) => (props.isSelected ? "#000000" : "#666666")};
  font-size: 15px;
  font-weight: ${(props) => (props.isSelected ? "600" : "400")};
`;

const periods: Period[] = [ "Weekly", "Monthly", "Yearly"];


export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  selectedPeriod,
  onPeriodChange,
}) => {
  const isRTL = i18next.language === 'ar' || I18nManager.isRTL;

  const styles = StyleSheet.create({
    container: {
      width: "88%",
      marginLeft: isRTL ? 0 : "7%",
      marginRight: isRTL ? "6%" : 0,
    },
    button: {
      margin: -2,
      marginBlock: 2,
      marginLeft: 3,
      marginRight:"8%",
    },
  });
  const {t}=useTranslation();
  return (
    <Container style={styles.container}>
      {periods.map((period) => (
        <PeriodButton
          style={styles.button}
          key={period}
          isSelected={selectedPeriod === period}
          onPress={() => onPeriodChange(period)}
        >
          <PeriodText isSelected={selectedPeriod === period}>
            {t(`analysis.${period}`)}
          </PeriodText>
        </PeriodButton>
      ))}
    </Container>
  );
};


