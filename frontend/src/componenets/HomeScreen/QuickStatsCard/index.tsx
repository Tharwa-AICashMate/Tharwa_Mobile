// import React, { useEffect, useState } from "react";
// import { View, Text, ViewStyle } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Theme from "@/theme";
// import { styles } from "./styles";
// import { useAppSelector } from "@/redux/hook";
// import { Transaction } from "@/types/transactionTypes";
// import { supabase } from "@/utils/supabase";

// interface QuickStatsCardProps {
//   style?: ViewStyle;
// }


// async function getWeeklyHighs(userId: string) {
//   const { data, error } = await supabase
//     .rpc('get_weekly_highs', { uid: userId });

//   if (error) {
//     console.log('Error fetching weekly highs:', error);
//     return { success: false, error };
//   }

//   console.log('Weekly highs:', {data});
//   return  data[0] ;
// }

// const QuickStatsCard: React.FC<QuickStatsCardProps> = ({ style }) => {


//   const userId = useAppSelector(state => state.auth.user?.id) 
//   interface WeeklyHighs {
//     highest_income: { amount: number; title: string } | null;
//     highest_expense: { amount: number; category_name: string } | null;
//   }
  
//   const [totals, setTotals] = useState<WeeklyHighs>({
//     highest_income: null,
//     highest_expense: null,
//   });
//   useEffect(() => {
//     async function fetchData() {
//       if (userId) {
//         setTotals(await getWeeklyHighs(userId));
//       } else {
//         console.log("User ID is undefined");
//       }
//     }
//     fetchData()
//   }, [userId]);
//   console.log(totals);
//   const { highest_income:maxIncome, highest_expense:maxExpense } = totals || {};

//   return (
//     <View style={[styles.card, style]}>
//       <Text style={styles.title}>Weekly Highlights</Text>
//       <View style={styles.statsContainer}>
//         {/* Highest Income */}
//         <View style={styles.stat}>
//           <View style={styles.iconContainer}>
//             <MaterialCommunityIcons
//               name="trending-up"
//               size={18}
//               color={Theme.colors.accent}
//             />
//           </View>
//           <View style={styles.statContent}>
//             <Text style={styles.label}>Highest Income</Text>
//             <Text style={styles.amount}>
//               {maxIncome?.amount && maxIncome.amount > 0
//                 ? `$${maxIncome.amount.toFixed(2)}`
//                 : "$0.00"}
//             </Text>
//             <Text style={styles.description}>
//               {maxIncome?.title || "No weekly highlights yet"}
//             </Text>
//           </View>
//         </View>
//         {/* Divider */}
//         <View style={styles.divider} />

//         {/* Highest Expense */}
//         <View style={styles.stat}>
//           <View style={styles.iconContainer}>
//             <MaterialCommunityIcons
//               name="trending-down"
//               size={18}
//               color={Theme.colors.accentDark}
//             />
//           </View>
//           <View style={styles.statContent}>
//             <Text style={styles.label}>Highest Expense</Text>
//             <Text style={styles.amount}>
//               {maxExpense?.amount && maxExpense.amount > 0
//                 ? `-$${maxExpense?.amount.toFixed(2)}`
//                 : "$0.00"}
//             </Text>
//             <Text style={styles.description}>
//               {maxExpense?.category_name || "No weekly highlights yet"}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default QuickStatsCard;
import React, { useEffect, useState } from "react";
import { View, Text, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Theme from "@/theme";
import { styles } from "./styles";
import { useAppSelector } from "@/redux/hook";
import { useTranslation } from "react-i18next";
import { supabase } from "@/utils/supabase";

interface QuickStatsCardProps {
  style?: ViewStyle;
}

async function getWeeklyHighs(userId: string) {
  const { data, error } = await supabase
    .rpc('get_weekly_highs', { uid: userId });

  if (error) {
    console.log('Error fetching weekly highs:', error);
    return { success: false, error };
  }

  console.log('Weekly highs:', {data});
  return data[0];
}

const QuickStatsCard: React.FC<QuickStatsCardProps> = ({ style }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const userId = useAppSelector(state => state.auth.user?.id);
  
  interface WeeklyHighs {
    highest_income: { amount: number; title: string } | null;
    highest_expense: { amount: number; category_name: string } | null;
  }
  
  const [totals, setTotals] = useState<WeeklyHighs>({
    highest_income: null,
    highest_expense: null,
  });

  useEffect(() => {
    async function fetchData() {
      if (userId) {
        setTotals(await getWeeklyHighs(userId));
      } else {
        console.log("User ID is undefined");
      }
    }
    fetchData();
  }, [userId]);

  const { highest_income: maxIncome, highest_expense: maxExpense } = totals || {};

  return (
    <View style={[styles.card, style]}>
      <Text style={[styles.title, { textAlign: isRTL ? 'right' : 'left' }]}>
        {t('home.quickStats.weeklyHighlights')}
      </Text>
      <View style={styles.statsContainer}>
        {/* Highest Income */}
        <View style={[styles.stat, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="trending-up"
              size={18}
              color={Theme.colors.accent}
            />
          </View>
          <View style={[styles.statContent, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
            <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>
              {t('home.quickStats.highestIncome')}
            </Text>
            <Text style={[styles.amount, { textAlign: isRTL ? 'right' : 'left' }]}>
              {maxIncome?.amount && maxIncome.amount > 0
                ? `${t('home.currencySymbol')}${maxIncome.amount.toFixed(2)}`
                : `${t('home.currencySymbol')}0.00`}
            </Text>
            <Text style={[styles.description, { textAlign: isRTL ? 'right' : 'left' }]}>
              {maxIncome?.title || t('home.quickStats.noHighlights')}
            </Text>
          </View>
        </View>
        
        {/* Divider */}
        <View style={styles.divider} />

        {/* Highest Expense */}
        <View style={[styles.stat, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="trending-down"
              size={18}
              color={Theme.colors.accentDark}
            />
          </View>
          <View style={[styles.statContent, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
            <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>
              {t('home.quickStats.highestExpense')}
            </Text>
            <Text style={[styles.amount, { textAlign: isRTL ? 'right' : 'left' }]}>
              {maxExpense?.amount && maxExpense.amount > 0
                ? `-${t('home.currencySymbol')}${maxExpense?.amount.toFixed(2)}`
                : `${t('home.currencySymbol')}0.00`}
            </Text>
            <Text style={[styles.description, { textAlign: isRTL ? 'right' : 'left' }]}>
              {maxExpense?.category_name || t('home.quickStats.noHighlights')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default QuickStatsCard;