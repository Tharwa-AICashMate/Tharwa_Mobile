// components/AddCategoryModal.tsx

import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { modalStyles } from "./style";


interface AddCategoryModalProps {
  visible: boolean;
  categoryName: string;
  onChangeName: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  visible,
  categoryName,
  onChangeName,
  onSave,
  onCancel,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text style={modalStyles.modalTitle}>New Category</Text>

          <View style={modalStyles.inputContainer}>
            <TextInput
              style={modalStyles.input}
              placeholder="Name"
              value={categoryName}
              onChangeText={onChangeName}
            />
          </View>

          <TouchableOpacity style={modalStyles.saveButton} onPress={onSave}>
            <Text style={modalStyles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={modalStyles.cancelButton} onPress={onCancel}>
            <Text style={modalStyles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddCategoryModal;
