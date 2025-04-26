// import React from 'react';
// import {
//   Modal,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import Theme from '@/theme';
// import { styles } from './style';

// // Common icons that might be useful for categories
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
//   onChangeName: (name: string) => void;
//   onSelectIcon: (icon: string) => void;
//   onSave: () => void;
//   onCancel: () => void;
// }

// const AddCategoryModal = ({
//   visible,
//   categoryName,
//   selectedIcon,
//   onChangeName,
//   onSelectIcon,
//   onSave,
//   onCancel,
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
//           <Text style={styles.modalTitle}>Add New Category</Text>

//           <Text style={styles.inputLabel}>Category Name</Text>
//           <TextInput
//             style={styles.input}
//             value={categoryName}
//             onChangeText={onChangeName}
//             placeholder="Enter category name"
//             placeholderTextColor="#A0A0A0"
//           />

//           <Text style={styles.inputLabel}>Select Icon</Text>
        

//           <ScrollView style={styles.iconsScrollView}>
//             <View style={styles.iconsGrid}>
//               {CATEGORY_ICONS.map((icon) => (
//                 <TouchableOpacity
//                   key={icon}
//                   style={[
//                     styles.iconOption,
//                     selectedIcon === icon && styles.selectedIconOption,
//                   ]}
//                   onPress={() => onSelectIcon(icon)}
//                 >
//                   <Ionicons
//                     name={icon as keyof typeof Ionicons.glyphMap}
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
//                 !categoryName.trim() && styles.disabledButton,
//               ]}
//               onPress={onSave}
//               disabled={!categoryName.trim()}
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
  StyleSheet,
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
            {showTargetInput ? 'Add Savings Goal' : 'Add New Category'}
          </Text>

          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            value={categoryName}
            onChangeText={onChangeName}
            placeholder={showTargetInput ? "Goal name" : "Category name"}
            placeholderTextColor="#A0A0A0"
          />

          {showTargetInput && (
            <>
              <Text style={styles.inputLabel}>Target Amount</Text>
              <TextInput
                style={styles.input}
                value={targetAmount}
                onChangeText={onChangeTargetAmount}
                placeholder="Enter target amount"
                placeholderTextColor="#A0A0A0"
                keyboardType="numeric"
              />
            </>
          )}

          <Text style={styles.inputLabel}>Select Icon</Text>
          <ScrollView style={styles.iconsScrollView}>
            <View style={styles.iconsGrid}>
              {CATEGORY_ICONS.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  style={[
                    styles.iconOption,
                    selectedIcon === icon && styles.selectedIconOption,
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
                (!categoryName.trim() || (showTargetInput && !targetAmount.trim())) && 
                styles.disabledButton,
              ]}
              onPress={onSave}
              disabled={!categoryName.trim() || (showTargetInput && !targetAmount.trim())}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddCategoryModal;