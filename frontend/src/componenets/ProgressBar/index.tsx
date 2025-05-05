import React from "react";
import { View, Text, Dimensions } from "react-native";
import styles from "./style";
import Theme from "@/theme";
import { useTranslation } from "react-i18next";

interface ProgressBarProps {
  percentage: number;
  amount: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  amount,
  color,
}) => {
  const containerWidth = Dimensions.get("window").width - 32;
  const progressWidth = (percentage / 100) * containerWidth;
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
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
        <Text style={styles.percentageText}>
          {percentage >= 20 ? `${percentage}%` : ""}
        </Text>
      </View>

      <View
        style={[
          styles.empty,
          { backgroundColor: color || Theme.colors.background },
        ]}
      >
        <Text style={styles.amountText}>
          {amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} {!isRTL ?'EGP' :'ج.م'} 
        </Text>
      </View>
    </View>
  );
};

export default ProgressBar;
