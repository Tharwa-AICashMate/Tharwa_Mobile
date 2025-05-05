import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import Theme from "@/theme";
import styles from "./style";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  fetchUserGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "@/redux/slices/savingSlice";
import { Goal } from "@/types/goal";
import AddCategoryModal from "@/componenets/AddCategoryModal";
import { getCurrentUserId } from "@/utils/auth";
import ExpenseBrief from "@/componenets/expenceBrief";
import { useTranslation } from "react-i18next";

type SavingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Savings"
>;

const Savings = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<SavingsScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const { items: savingsGoals, loading: isLoading } = useAppSelector(
    (state) => state.goals
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [newGoalName, setNewGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("wallet-outline");
  const [isEditMode, setIsEditMode] = useState(false);

  // Add validation state
  const [nameError, setNameError] = useState("");
  const [targetError, setTargetError] = useState("");
  const [iconError, setIconError] = useState("");

  useEffect(() => {
    const loadUserIdAndGoals = async () => {
      try {
        const currentUserId = await getCurrentUserId();
        if (currentUserId) {
          setUserId(currentUserId);
          dispatch(fetchUserGoals(currentUserId));
        }
      } catch (err) {
        console.log("Error fetching user goals:", err);
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
    navigation.navigate("SavingDetails", {
      categoryName,
      goalID,
      Target,
      Icon,
    });
  };

  const checkForDuplicateName = (name: string) => {
    const normalizedName = name.trim().toLowerCase();
    return savingsGoals.some(
      (goal) =>
        goal.name.toLowerCase() === normalizedName &&
        (!isEditMode || (isEditMode && goal.id !== selectedGoal?.id))
    );
  };

  const validateForm = () => {
    let isValid = true;

    // Validate name
    if (!newGoalName.trim()) {
      setNameError(t("savingsScreen.savingsErrors.goalName"));
      isValid = false;
    } else if (newGoalName.trim().length < 3) {
      setNameError(t("savingsScreen.savingsErrors.goalNameLength"));
      isValid = false;
    } else if (checkForDuplicateName(newGoalName)) {
      setNameError(t("savingsScreen.savingsErrors.goalNameDuplicate"));
      isValid = false;
    } else {
      setNameError("");
    }

    // Validate target amount
    if (!targetAmount.trim()) {
      setTargetError(t("savingsScreen.savingsErrors.targetAmount"));
      isValid = false;
    } else {
      const amount = parseFloat(targetAmount);
      if (isNaN(amount) || amount <= 0) {
        setTargetError(t("savingsScreen.savingsErrors.targetAmountNegative"));
        isValid = false;
      } else if (amount > 1000000) {
        setTargetError(t("savingsScreen.savingsErrors.targetAmountExceeding"));
        isValid = false;
      } else {
        setTargetError("");
      }
    }

    // Validate icon
    if (!selectedIcon) {
      setIconError(t("savingsScreen.savingsErrors.iconError"));
      isValid = false;
    } else {
      setIconError("");
    }

    return isValid;
  };

  const handleAddGoal = () => {
    if (validateForm() && userId) {
      if (isEditMode && selectedGoal) {
        // Update existing goal
        dispatch(
          updateGoal({
            id: selectedGoal.id as number,
            data: {
              name: newGoalName.trim(),
              icon: selectedIcon,
              target_amount: parseFloat(targetAmount),
              // Keep other properties unchanged
            },
          })
        );
      } else {
        // Create new goal
        dispatch(
          createGoal({
            name: newGoalName.trim(),
            icon: selectedIcon,
            target_amount: parseFloat(targetAmount),
            user_id: userId,
            deadline: new Date(), // Add actual deadline if needed
          })
        );
      }
      resetForm();
      setModalVisible(false);
    }
  };

  const resetForm = () => {
    setNewGoalName("");
    setTargetAmount("");
    setSelectedIcon("wallet-outline");
    setNameError("");
    setTargetError("");
    setIconError("");
    setIsEditMode(false);
    setSelectedGoal(null);
  };

  const handleCancel = () => {
    resetForm();
    setModalVisible(false);
  };

  const handleChangeTargetAmount = (value: string) => {
    // Only allow numeric input with up to 2 decimal places
    const regex = /^\d*\.?\d{0,2}$/;
    if (value === "" || regex.test(value)) {
      setTargetAmount(value);

      // Clear error if there was one
      if (targetError) {
        setTargetError("");
      }
    }
  };

  const handleChangeName = (value: string) => {
    setNewGoalName(value);

    // Clear error if name is valid but check for duplicates
    if (value.trim().length >= 3) {
      if (checkForDuplicateName(value)) {
        setNameError("A savings goal with this name already exists");
      } else {
        setNameError("");
      }
    }
  };

  const handleSelectIcon = (icon: string) => {
    setSelectedIcon(icon);

    // Clear error if there was one
    if (iconError) {
      setIconError("");
    }
  };

  const handleGoalLongPress = (goal: Goal) => {
    setSelectedGoal(goal);
    setActionModalVisible(true);
  };

  const openEditModal = () => {
    if (!selectedGoal) return;

    setIsEditMode(true);
    setNewGoalName(selectedGoal.name);
    setTargetAmount(selectedGoal.target_amount.toString());
    setSelectedIcon(selectedGoal.icon || "wallet-outline");
    setNameError("");
    setTargetError("");
    setIconError("");
    setModalVisible(true);
    setActionModalVisible(false);
  };

  const handleDeleteGoal = () => {
    if (!selectedGoal) return;

    setActionModalVisible(false);

    Alert.alert(
      t("savingsScreen.savingsModal.deleteSavingsGoal"),
      `${t("savingsScreen.savingsModal.deleteSavingsGoalConfirmation")} ${selectedGoal.name} `,
      [
        {
          text: t("savingsScreen.savingsModal.cancel"),
          style: "cancel",
        },
        {
          text: t("savingsScreen.savingsModal.delete"),
          style: "destructive",
          onPress: () => {
            dispatch(deleteGoal(selectedGoal.id as number));
            setSelectedGoal(null);
          },
        },
      ]
    );
  };

  const renderGoalCard = ({
    item,
  }: {
    item: Goal | { name: string; isMoreButton?: boolean };
  }) => {
    // If this is the "More" button item
    if ("isMoreButton" in item && item.isMoreButton) {
      return (
        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => {
            setIsEditMode(false);
            resetForm();
            setModalVisible(true);
          }}
        >
          <View style={styles.categoryIconContainer}>
            <Ionicons name="add" size={45} color="white" />
          </View>
          <Text style={styles.categoryName}>{t("savingsScreen.more")}</Text>
        </TouchableOpacity>
      );
    }

    // Otherwise render normal goal card
    const goal = item as Goal;
    return (
      <TouchableOpacity
        style={styles.categoryCard}
        onPress={() =>
          navigateToCategory(
            goal.name,
            goal.id as number,
            goal.target_amount,
            goal.icon || "wallet-outline"
          )
        }
        onLongPress={() => handleGoalLongPress(goal)}
        delayLongPress={300}
      >
        <View style={styles.categoryIconContainer}>
          <Ionicons
            name={(goal.icon || "wallet-outline") as any}
            size={45}
            color="white"
          />
        </View>
        <Text style={styles.categoryName}>{goal.name}</Text>
        <TouchableOpacity
          style={styles.optionsButton}
          onPress={() => handleGoalLongPress(goal)}
        >
          <Ionicons name="ellipsis-vertical" size={18} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyStateContainer}>
          <ActivityIndicator size="large" color={Theme.colors.primary} />
          <Text style={styles.emptyStateText}>
            {t("savingsScreen.loading")}
          </Text>
        </View>
      );
    }

    if (savingsGoals.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <TouchableOpacity
            style={styles.emptyStateAddButton}
            onPress={() => {
              setIsEditMode(false);
              resetForm();
              setModalVisible(true);
            }}
          >
            <Ionicons
              name="add-circle"
              size={80}
              color={Theme.colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.emptyStateTitle}>
            {t("savingsScreen.noSavings.createYourFirstGoal")}
          </Text>
          <Text style={styles.emptyStateText}>
            {t("savingsScreen.noSavings.startSavingForSomethingSpecial")}
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={[
          ...savingsGoals,
          { name: t("savingsScreen.more"), isMoreButton: true },
        ]}
        keyExtractor={(item, index) =>
          "id" in item ? String((item as Goal).id) : `more-${index}`
        }
        numColumns={3}
        renderItem={renderGoalCard}
        contentContainerStyle={styles.categoriesGrid}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t("savingsScreen.savings")} />

      <ExpenseBrief />

      <View style={styles.categoriesContainer}>{renderContent()}</View>

      {/* Action Modal for Edit/Delete */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={actionModalVisible}
        onRequestClose={() => setActionModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.actionModalOverlay}
          activeOpacity={1}
          onPress={() => setActionModalVisible(false)}
        >
          <View style={styles.actionModalContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={openEditModal}
            >
              <Ionicons name="pencil" size={24} color={Theme.colors.primary} />
              <Text style={styles.actionButtonText}>
                {t("savingsScreen.savingsModal.edit")}
              </Text>
            </TouchableOpacity>

            <View style={styles.actionDivider} />

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleDeleteGoal}
            >
              <Ionicons name="trash" size={24} color={Theme.colors.primary} />
              <Text
                style={[styles.actionButtonText, { color: Theme.colors.text }]}
              >
                {t("savingsScreen.savingsModal.delete")}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <AddCategoryModal
        visible={modalVisible}
        categoryName={newGoalName}
        selectedIcon={selectedIcon}
        targetAmount={targetAmount}
        onChangeName={handleChangeName}
        onSelectIcon={handleSelectIcon}
        onChangeTargetAmount={handleChangeTargetAmount}
        onSave={handleAddGoal}
        onCancel={handleCancel}
        showTargetInput={true}
        nameError={nameError}
        iconError={iconError}
        targetError={targetError}
        isEditing={isEditMode}
      />
    </SafeAreaView>
  );
};

export default Savings;
