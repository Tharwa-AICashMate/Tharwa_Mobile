// // import React from 'react';
// // import {
// //   Modal,
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   ScrollView,
// // } from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';
// // import Theme from '@/theme';
// // import { styles } from './style';

// // const CATEGORY_ICONS = [
// //   'wallet-outline',
// //   'cart-outline',
// //   'car-outline',
// //   'fast-food-outline',
// //   'home-outline',
// //   'medkit-outline', 
// //   'gift-outline',
// //   'airplane-outline',
// //   'cafe-outline',
// //   'card-outline',
// //   'business-outline',
// //   'basketball-outline',
// //   'book-outline',
// //   'fitness-outline',
// //   'film-outline',
// //   'musical-notes-outline',
// //   'paw-outline',
// //   'happy-outline',
// //   'game-controller-outline',
// //   'barbell-outline',
// //   'school-outline',
// //   'bus-outline',
// //   'train-outline',
// // ];

// // interface AddCategoryModalProps {
// //   visible: boolean;
// //   categoryName: string;
// //   selectedIcon: string;
// //   targetAmount: string;
// //   onChangeName: (name: string) => void;
// //   onSelectIcon: (icon: string) => void;
// //   onChangeTargetAmount?: (amount: string) => void;
// //   onSave: () => void;
// //   onCancel: () => void;
// //   showTargetInput?: boolean;
// //   nameError?: string;
// //   iconError?: string;
// // }

// // const AddCategoryModal = ({
// //   visible,
// //   categoryName,
// //   selectedIcon,
// //   targetAmount,
// //   onChangeName,
// //   onSelectIcon,
// //   onChangeTargetAmount = () => {},
// //   onSave,
// //   onCancel,
// //   showTargetInput = false,
// //   nameError = '',
// //   iconError = '',
// // }: AddCategoryModalProps) => {
// //   return (
// //     <Modal
// //       animationType="slide"
// //       transparent={true}
// //       visible={visible}
// //       onRequestClose={onCancel}
// //     >
// //       <View style={styles.centeredView}>
// //         <View style={styles.modalView}>
// //           <Text style={styles.modalTitle}>
// //             {showTargetInput ? 'Add Savings Goal' : 'Add New Category'}
// //           </Text>

// //           <Text style={styles.inputLabel}>Name</Text>
// //           <TextInput
// //             style={[styles.input, nameError ? styles.inputError : null]}
// //             value={categoryName}
// //             onChangeText={onChangeName}
// //             placeholder={showTargetInput ? "Goal name" : "Category name"}
// //             placeholderTextColor="#A0A0A0"
// //             maxLength={20}
// //           />
// //           {nameError ? (
// //             <Text style={styles.errorText}>{nameError}</Text>
// //           ) : (
// //             <Text style={styles.charCounter}>
// //               {categoryName.length}/20 characters
// //             </Text>
// //           )}

// //           {showTargetInput && (
// //             <>
// //               <Text style={styles.inputLabel}>Target Amount</Text>
// //               <TextInput
// //                 style={styles.input}
// //                 value={targetAmount}
// //                 onChangeText={onChangeTargetAmount}
// //                 placeholder="Enter target amount"
// //                 placeholderTextColor="#A0A0A0"
// //                 keyboardType="numeric"
// //               />
// //             </>
// //           )}

// //           <Text style={styles.inputLabel}>Select Icon</Text>
// //           {iconError ? (
// //             <Text style={styles.errorText}>{iconError}</Text>
// //           ) : null}
// //           <ScrollView style={styles.iconsScrollView}>
// //             <View style={styles.iconsGrid}>
// //               {CATEGORY_ICONS.map((icon) => (
// //                 <TouchableOpacity
// //                   key={icon}
// //                   style={[
// //                     styles.iconOption,
// //                     selectedIcon === icon && styles.selectedIconOption,
// //                     iconError ? styles.iconOptionError : null,
// //                   ]}
// //                   onPress={() => onSelectIcon(icon)}
// //                 >
// //                   <Ionicons
// //                     name={icon as any}
// //                     size={30}
// //                     color={selectedIcon === icon ? 'white' : Theme.colors.primary}
// //                   />
// //                 </TouchableOpacity>
// //               ))}
// //             </View>
// //           </ScrollView>

// //           <View style={styles.buttonContainer}>
// //             <TouchableOpacity
// //               style={[styles.button, styles.cancelButton]}
// //               onPress={onCancel}
// //             >
// //               <Text style={styles.cancelButtonText}>Cancel</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //               style={[
// //                 styles.button,
// //                 styles.saveButton,
// //                 (!categoryName.trim() || !selectedIcon || (showTargetInput && !targetAmount.trim())) && 
// //                 styles.disabledButton,
// //               ]}
// //               onPress={onSave}
// //               disabled={!categoryName.trim() || !selectedIcon || (showTargetInput && !targetAmount.trim())}
// //             >
// //               <Text style={styles.saveButtonText}>Save</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </View>
// //     </Modal>
// //   );
// // };

// // export default AddCategoryModal;



// import React from 'react';
// import {
//   Modal,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import Theme from '@/theme';
// import { styles } from './style';

// const CATEGORY_ICONS = [
//   'wallet-outline',
//   'cart-outline',
//   'car-outline',
//   'fast-food-outline',
//   'home-outline',
//   'medkit-outline', 
//   'gift-outline',
//   'airplane-outline',
//   'cafe-outline',
//   'card-outline',
//   'business-outline',
//   'basketball-outline',
//   'book-outline',
//   'fitness-outline',
//   'film-outline',
//   'musical-notes-outline',
//   'paw-outline',
//   'happy-outline',
//   'game-controller-outline',
//   'barbell-outline',
//   'school-outline',
//   'bus-outline',
//   'train-outline',
// ];

// interface AddCategoryModalProps {
//   visible: boolean;
//   categoryName: string;
//   selectedIcon: string;
//   targetAmount: string;
//   onChangeName: (name: string) => void;
//   onSelectIcon: (icon: string) => void;
//   onChangeTargetAmount?: (amount: string) => void;
//   onSave: () => void;
//   onCancel: () => void;
//   showTargetInput?: boolean;
//   nameError?: string;
//   iconError?: string;
//   targetError?: string;
// }

// const AddCategoryModal = ({
//   visible,
//   categoryName,
//   selectedIcon,
//   targetAmount,
//   onChangeName,
//   onSelectIcon,
//   onChangeTargetAmount = () => {},
//   onSave,
//   onCancel,
//   showTargetInput = false,
//   nameError = '',
//   iconError = '',
//   targetError = '',
// }: AddCategoryModalProps) => {
//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onCancel}
//     >
//       <View style={styles.centeredView}>
//         <View style={styles.modalView}>
//           <Text style={styles.modalTitle}>
//             {showTargetInput ? 'Add Savings Goal' : 'Add New Category'}
//           </Text>

//           <Text style={styles.inputLabel}>Name</Text>
//           <TextInput
//             style={[styles.input, nameError ? styles.inputError : null]}
//             value={categoryName}
//             onChangeText={onChangeName}
//             placeholder={showTargetInput ? "Goal name" : "Category name"}
//             placeholderTextColor="#A0A0A0"
//             maxLength={20}
//           />
//           {nameError ? (
//             <Text style={styles.errorText}>{nameError}</Text>
//           ) : (
//             <Text style={styles.charCounter}>
//               {categoryName.length}/20 characters
//             </Text>
//           )}

//           {showTargetInput && (
//             <>
//               <Text style={styles.inputLabel}>Target Amount</Text>
//               <TextInput
//                 style={[styles.input, targetError ? styles.inputError : null]}
//                 value={targetAmount}
//                 onChangeText={onChangeTargetAmount}
//                 placeholder="Enter target amount"
//                 placeholderTextColor="#A0A0A0"
//                 keyboardType="numeric"
//               />
//               {targetError ? (
//                 <Text style={styles.errorText}>{targetError}</Text>
//               ) : null}
//             </>
//           )}

//           <Text style={styles.inputLabel}>Select Icon</Text>
//           {iconError ? (
//             <Text style={styles.errorText}>{iconError}</Text>
//           ) : null}
//           <ScrollView style={styles.iconsScrollView}>
//             <View style={styles.iconsGrid}>
//               {CATEGORY_ICONS.map((icon) => (
//                 <TouchableOpacity
//                   key={icon}
//                   style={[
//                     styles.iconOption,
//                     selectedIcon === icon && styles.selectedIconOption,
//                     iconError ? styles.iconOptionError : null,
//                   ]}
//                   onPress={() => onSelectIcon(icon)}
//                 >
//                   <Ionicons
//                     name={icon as any}
//                     size={30}
//                     color={selectedIcon === icon ? 'white' : Theme.colors.primary}
//                   />
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </ScrollView>

//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={[styles.button, styles.cancelButton]}
//               onPress={onCancel}
//             >
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.button,
//                 styles.saveButton,
//                 (!categoryName.trim() || !selectedIcon || (showTargetInput && !targetAmount.trim())) && 
//                 styles.disabledButton,
//               ]}
//               onPress={onSave}
//               disabled={!categoryName.trim() || !selectedIcon || (showTargetInput && !targetAmount.trim())}
//             >
//               <Text style={styles.saveButtonText}>Save</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default AddCategoryModal;


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
              ? isEditing ? 'Edit Savings Goal' : 'Add Savings Goal' 
              : isEditing ? 'Edit Category' : 'Add New Category'}
          </Text>

          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={[styles.input, nameError ? styles.inputError : null]}
            value={categoryName}
            onChangeText={onChangeName}
            placeholder={showTargetInput ? "Goal name" : "Category name"}
            placeholderTextColor="#A0A0A0"
            maxLength={20}
          />
          {nameError ? (
            <Text style={styles.errorText}>{nameError}</Text>
          ) : (
            <Text style={styles.charCounter}>
              {categoryName.length}/20 characters
            </Text>
          )}

          {showTargetInput && (
            <>
              <Text style={styles.inputLabel}>Target Amount</Text>
              <TextInput
                style={[styles.input, targetError ? styles.inputError : null]}
                value={targetAmount}
                onChangeText={onChangeTargetAmount}
                placeholder="Enter target amount"
                placeholderTextColor="#A0A0A0"
                keyboardType="numeric"
              />
              {targetError ? (
                <Text style={styles.errorText}>{targetError}</Text>
              ) : null}
            </>
          )}

          <Text style={styles.inputLabel}>Select Icon</Text>
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
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
              <Text style={styles.saveButtonText}>{isEditing ? 'Update' : 'Save'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddCategoryModal;