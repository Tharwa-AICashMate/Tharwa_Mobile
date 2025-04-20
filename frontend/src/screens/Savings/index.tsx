import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from 'App';
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import BalanceDisplay from '@/componenets/BalanceDisplay';
import ProgressBar from '@/componenets/ProgressBar';
import Theme from '@/theme';
import styles from './style';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchUserGoals } from '@/redux/slices/savingSlice';
import { Goal } from '@/types/goal';

type SavingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Savings'
>;

const Savings = () => {
  const navigation = useNavigation<SavingsScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const userId = '99a72ab5-85b7-484d-8102-adbcf68f6cde';
  const { items: savingsGoals } = useAppSelector((state) => state.goals);

  useEffect(() => {
    dispatch(fetchUserGoals(userId));
  }, [dispatch, userId]);

  const navigateToCategory = (categoryName: string ,goalID:string,Target:number,Icon:string) => {
    navigation.navigate('SavingDetails', { categoryName,goalID,Target,Icon });
  };

  const renderGoalCard = ({ item }: { item: Goal }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigateToCategory(item.name,item.id?? 'no-id',item.target_amount,item.icon??'wallet-outline') }
    >
      <View style={styles.categoryIconContainer}>
      <Ionicons name={(item.icon || 'wallet-outline') as any}  size={45} color="white" />

      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header title="Savings" />

      {/* Budget Summary */}
      <View style={styles.balanceContainer}>
        <BalanceDisplay balance={200000} expense={1000} />
      </View>

      <View style={styles.budgetContainer}>
        <View style={styles.progressContainer}>
          <ProgressBar percentage={30} amount={122223} />
        </View>

        {/* Budget Status */}
        <View style={styles.budgetStatus}>
          <Ionicons name="checkbox-outline" size={16} color={Theme.colors.text} />
          <Text style={styles.budgetStatusText}>
            30% Of Your Expenses, Looks Good.
          </Text>
        </View>
      </View>

      {/* Goals List */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={savingsGoals}
          keyExtractor={(item,index) => item.id?? index.toString()}
          numColumns={3}
          renderItem={renderGoalCard}
          contentContainerStyle={styles.categoriesGrid}
        />
      </View>
    </SafeAreaView>
  );
};

export default Savings;
