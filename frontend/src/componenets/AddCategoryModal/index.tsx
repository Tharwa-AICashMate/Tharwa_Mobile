import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Theme from '@/theme';
import { styles } from './style';
import { useTranslation } from "react-i18next";
const CATEGORY_ICONS = [
  'wallet-outline',
  'cart-outline',
  'car-outline',
  'fast-food-outline',
  'home-outline',
  'medkit-outline', 
  'gift-outline',
  'airplane-outline',
  'cafe-outline',
  'card-outline',
  'business-outline',
  'basketball-outline',
  'book-outline',
  'fitness-outline',
  'film-outline',
  'musical-notes-outline',
  'paw-outline',
  'happy-outline',
  'game-controller-outline',
  'barbell-outline',
  'school-outline',
  'bus-outline',
  'train-outline',
  'pricetag-outline'
];

interface AddCategoryModalProps {
  visible: boolean;
  categoryName: string;
  selectedIcon: string;
  targetAmount: string;
  onChangeName: (name: string) => void;
  onSelectIcon: (icon: string) => void;
  onChangeTargetAmount?: (amount: string) => void;
  onSave: () => void;
  onCancel: () => void;
  showTargetInput?: boolean;
  nameError?: string;
  iconError?: string;
  targetError?: string;
  isEditing?: boolean;
}

const AddCategoryModal = ({
  visible,
  categoryName,
  selectedIcon,
  targetAmount,
  onChangeName,
  onSelectIcon,
  onChangeTargetAmount = () => {},
  onSave,
  onCancel,
  showTargetInput = false,
  nameError = '',
  iconError = '',
  targetError = '',
  isEditing = false,
}: AddCategoryModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>
            {showTargetInput
              ? isEditing
                ? t("savingsScreen.savingsModal.editSavingsGoal")
                : t("savingsScreen.savingsModal.addSavingsGoal")
              : isEditing
                ? t("savingsScreen.savingsModal.edit")
                : t("savingsScreen.savingsModal.addSavingsGoal")}
          </Text>

          <Text style={styles.inputLabel}>{t("savingsScreen.savingsModal.name")}</Text>
          <TextInput
            style={[styles.input, nameError ? styles.inputError : null]}
            value={categoryName}
            onChangeText={onChangeName}
            placeholder={t("savingsScreen.savingsModal.goalNamePlaceholder")}
            placeholderTextColor="#A0A0A0"
            maxLength={20}
          />
          {nameError ? (
            <Text style={styles.errorText}>{nameError}</Text>
          ) : (
            <Text style={styles.charCounter}>
              {t("savingsScreen.savingsModal.charactersLimit", { 0: categoryName.length })}
            </Text>
          )}

          {showTargetInput && (
            <>
              <Text style={styles.inputLabel}>{t("savingsScreen.savingsModal.targetAmount")}</Text>
              <TextInput
                style={[styles.input, targetError ? styles.inputError : null]}
                value={targetAmount}
                onChangeText={onChangeTargetAmount}
                placeholder={t("savingsScreen.savingsModal.enterTargetAmount")}
                placeholderTextColor="#A0A0A0"
                keyboardType="numeric"
              />
              {targetError ? (
                <Text style={styles.errorText}>{targetError}</Text>
              ) : null}
            </>
          )}

          <Text style={styles.inputLabel}>{t("savingsScreen.savingsModal.selectIcon")}</Text>
          {iconError ? (
            <Text style={styles.errorText}>{iconError}</Text>
          ) : null}
          <ScrollView style={styles.iconsScrollView}>
            <View style={styles.iconsGrid}>
              {CATEGORY_ICONS.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  style={[
                    styles.iconOption,
                    selectedIcon === icon && styles.selectedIconOption,
                    iconError ? styles.iconOptionError : null,
                  ]}
                  onPress={() => onSelectIcon(icon)}
                >
                  <Ionicons
                    name={icon as any}
                    size={30}
                    color={selectedIcon === icon ? 'white' : Theme.colors.primary}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>{t("savingsScreen.savingsModal.cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.saveButton,
                (!categoryName.trim() || !selectedIcon || (showTargetInput && !targetAmount.trim())) &&
                  styles.disabledButton,
              ]}
              onPress={onSave}
              disabled={!categoryName.trim() || !selectedIcon || (showTargetInput && !targetAmount.trim())}
            >
              <Text style={styles.saveButtonText}>
                {isEditing ? t("savingsScreen.savingsModal.update") : t("savingsScreen.savingsModal.save")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddCategoryModal;