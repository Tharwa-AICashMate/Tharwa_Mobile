import React from "react";
import styled from "styled-components/native";
import { Dimensions, I18nManager, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import Theme from "@/theme";
import i18next, { t } from "i18next";

interface FinanceSummaryProps {
  income: number;
  expenses: number;
}

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  width:88%;
  marginLeft:7%
`;

const SummaryBox = styled.View`
  flex: 1;
  margin: 0 8px;
  align-items:center;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight:500;
  color: ${Theme.colors.textLight};
  margin-bottom: 4px;
`;

const Amount = styled.Text<{ isIncome?: boolean }>`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => (props.isIncome ? Theme.colors.textLight: Theme.colors.accentDark)};
`;

const formatCurrency = (amount: number) => {
  return `${amount.toLocaleString("en-US", {
    style: "decimal",    
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}`;
};

export const FinanceSummary: React.FC<FinanceSummaryProps> = ({
  income,
  expenses,
}) => {
  const isRTL = i18next.language === 'ar' || I18nManager.isRTL;

  const styles = StyleSheet.create({
    icon1:{
      borderWidth:2,
      borderColor:Theme.colors.highlight,
      borderRadius:10
    },
    icon2:{
      borderWidth:2,
      borderColor:Theme.colors.accentDark,
      borderRadius:10
    },
    container:{
      width:"88%",
      marginLeft:isRTL?0:"7%",
      marginRight:isRTL?"6%":0
    }
  })
  return (
    <Container style={styles.container}>
      <SummaryBox >
        <Icon style={styles.icon1} name="arrow-up-right" size={30} color={Theme.colors.highlight} />
        <Label>{t("analysis.income")}</Label>
        <Amount isIncome>{formatCurrency(income)} {!isRTL?'EGP':'ج.م'}</Amount>
      </SummaryBox>
      <SummaryBox >
        <Icon style={styles.icon2} name="arrow-down-right" size={30} color={Theme.colors.accentDark} />
        <Label>{t("analysis.expense")}</Label>
        <Amount>{formatCurrency(expenses)} {!isRTL?'EGP':'ج.م'}</Amount>
      </SummaryBox>
    </Container>
  );
};

