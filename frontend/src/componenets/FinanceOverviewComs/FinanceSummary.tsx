import React from "react";
import styled from "styled-components/native";
import { Dimensions, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import Theme from "@/theme";

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
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}`;
};

export const FinanceSummary: React.FC<FinanceSummaryProps> = ({
  income,
  expenses,
}) => {
  return (
    <Container>
      <SummaryBox >
        <Icon style={styles.icon1} name="arrow-up-right" size={30} color={Theme.colors.highlight} />
        <Label>Income</Label>
        <Amount isIncome>{formatCurrency(income)}</Amount>
      </SummaryBox>
      <SummaryBox >
        <Icon style={styles.icon2} name="arrow-down-right" size={30} color={Theme.colors.accentDark} />
        <Label>Expenses</Label>
        <Amount>{formatCurrency(expenses)}</Amount>
      </SummaryBox>
    </Container>
  );
};


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
  }
})