import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import BalanceDisplay from '@/componenets/BalanceDisplay';
import ProgressBar from '@/componenets/ProgressBar';
import Theme from '@/theme';
import styles from './style';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchUserGoals, createGoal } from '@/redux/slices/savingSlice';
import { Goal } from '@/types/goal';
import AddCategoryModal from '@/componenets/AddCategoryModal';
import { getCurrentUserId } from '@/utils/auth';
import { apiBase } from '@/utils/axiosInstance';
import ExpenseBrief from '@/componenets/expenceBrief';

type SavingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Savings'
>;

const Savings = () => {
  const navigation = useNavigation<SavingsScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const { items: savingsGoals } = useAppSelector((state) => state.goals);
  const [userId, setUserId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("wallet-outline");

  useEffect(() => {
    const loadUserIdAndGoals = async () => {
      try {
        const currentUserId = await getCurrentUserId();
        if (currentUserId) {
          setUserId(currentUserId);
          dispatch(fetchUserGoals(currentUserId));
        }
      } catch (err) {
        console.error("Error fetching user goals:", err);
      }
    };

    loadUserIdAndGoals();
  }, [dispatch]);

  const navigateToCategory = (
    categoryName: string,
    goalID: number,
    Target: number,
    Icon: string
  ) => {
    navigation.navigate('SavingDetails', {
      categoryName,
      goalID,
      Target,
      Icon,
    });
  };

  const handleAddGoal = () => {
    if (newGoalName.trim() && targetAmount.trim() && userId) {
      dispatch(
        createGoal({
          name: newGoalName.trim(),
          icon: selectedIcon,
          target_amount: parseFloat(targetAmount),
          user_id: userId,
          deadline: new Date(), // Add actual deadline if needed
        })
      );
      setNewGoalName('');
      setTargetAmount('');
      setModalVisible(false);
    }
  };


  const handleCancel = () => {
    setNewGoalName('');
    setTargetAmount('');
    setModalVisible(false);
  };

  const renderGoalCard = ({ item }: { item: Goal | { name: string } }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() =>
        item.name.toLowerCase() === "more"
          ? setModalVisible(true)
          : navigateToCategory(
              item.name,
              (item as Goal).id ?? 1,
              (item as Goal).target_amount ?? 0,
              (item as Goal).icon ?? 'wallet-outline'
            )
      }
    >
      <View style={styles.categoryIconContainer}>
        <Ionicons
          name={
            item.name.toLowerCase() === 'more'
              ? 'add' as any
              : (item as Goal).icon ?? 'wallet-outline'
          }
          size={45}
          color="white"
        />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
  
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Savings" />

      <ExpenseBrief/>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={[...savingsGoals, { name: 'More' }]}
          keyExtractor={(item, index) =>
            'id' in item ? String((item as Goal).id) : `more-${index}`
          }
          numColumns={3}
          renderItem={renderGoalCard}
          contentContainerStyle={styles.categoriesGrid}
        />
      </View>

      <AddCategoryModal
        visible={modalVisible}
        categoryName={newGoalName}
        selectedIcon={selectedIcon}
        targetAmount={targetAmount}
        onChangeName={setNewGoalName}
        onSelectIcon={setSelectedIcon}
        onChangeTargetAmount={setTargetAmount}
        onSave={handleAddGoal}
        onCancel={handleCancel}
        showTargetInput={true}
      />
    </SafeAreaView>
  );
};

export default Savings;