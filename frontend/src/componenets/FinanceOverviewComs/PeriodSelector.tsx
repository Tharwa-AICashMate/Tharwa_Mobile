import React from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import Theme from "@/theme";

type Period =  "Weekly" | "Monthly" | "Year";

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

const periods: Period[] = [ "Weekly", "Monthly", "Year"];

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  selectedPeriod,
  onPeriodChange,
}) => {
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
            {period}
          </PeriodText>
        </PeriodButton>
      ))}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "88%",
    marginLeft: "7%",
  },
  button: {
    margin: -2,
    marginBlock: 2,
    marginLeft: 3,
    marginRight:"10%",

  },
});
