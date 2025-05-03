import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { modalStyles } from './style';
import Theme from '@/theme';
import { useTranslation } from 'react-i18next';

interface LineItem {
  name: string;
  unitPrice: number;
  quantity?: number;
}

interface LineItemsEditorProps {
  lineItems: LineItem[];
  onLineItemsChange: (items: LineItem[]) => void;
  editMode: boolean;
}

const LineItemsEditor: React.FC<LineItemsEditorProps> = ({
  lineItems,
  onLineItemsChange,
  editMode
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat(i18n.language === 'ar' ? 'ar-EG' : 'en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleItemChange = (index: number, field: keyof LineItem, value: string) => {
    const newItems = [...lineItems];
    if (field === 'unitPrice' || field === 'quantity') {
      newItems[index][field] = parseFloat(value) || 0;
    } else {
      newItems[index][field] = value;
    }
    onLineItemsChange(newItems);
  };

  const addNewItem = () => {
    onLineItemsChange([...lineItems, { name: '', unitPrice: 0, quantity: 1 }]);
  };

  const removeItem = (index: number) => {
    const newItems = [...lineItems];
    newItems.splice(index, 1);
    onLineItemsChange(newItems);
  };

  if (!lineItems || lineItems.length === 0) {
    return null;
  }

  return (
    <View style={modalStyles.lineItemsContainer}>
      <View style={modalStyles.sectionTitleRow}>
        <Ionicons name="list" size={18} color={Theme.colors.primary} style={modalStyles.fieldIcon} />
        <Text style={modalStyles.sectionTitleText}>{t("camera.lineItems.title")}</Text>
        {editMode && (
          <TouchableOpacity style={modalStyles.addItemButton} onPress={addNewItem}>
            <Ionicons name="add-circle" size={20} color="#4CAF50" />
          </TouchableOpacity>
        )}
      </View>

      {lineItems.map((item, index) => (
        <View key={index} style={modalStyles.lineItemRow}>
          {editMode ? (
            <>
              <View style={modalStyles.lineItemInputContainer}>
                <TextInput
                  style={[modalStyles.lineItemInput, modalStyles.lineItemNameInput]}
                  value={item.name}
                  onChangeText={(text) => handleItemChange(index, 'name', text)}
                  placeholder={t("camera.lineItems.item")}
                />
                <TextInput
                  style={[modalStyles.lineItemInput, modalStyles.lineItemQuantityInput]}
                  value={item.quantity?.toString() || '1'}
                  onChangeText={(text) => handleItemChange(index, 'quantity', text)}
                  keyboardType="numeric"
                  placeholder={t("camera.lineItems.quantity")}
                />
                <TextInput
                  style={[modalStyles.lineItemInput, modalStyles.lineItemPriceInput]}
                  value={item.unitPrice.toString()}
                  onChangeText={(text) => handleItemChange(index, 'unitPrice', text)}
                  keyboardType="numeric"
                  placeholder={t("camera.lineItems.price")}
                />
              </View>
              <TouchableOpacity
                style={modalStyles.deleteItemButton}
                onPress={() => removeItem(index)}
              >
                <Ionicons name="trash-outline" size={20} color="#ff4444" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={modalStyles.lineItemContent}>
                <Text style={modalStyles.lineItemName} numberOfLines={1}>
                  {item.quantity ? `${item.quantity}x ` : ''}{item.name}
                </Text>
                <View style={modalStyles.lineItemPriceContainer}>
                  <Text style={modalStyles.lineItemUnitPrice}>
                    {formatCurrency(item.unitPrice)}
                  </Text>
                  {/* <Text style={modalStyles.lineItemTotalPrice}>
                    {formatCurrency(item.unitPrice * (item.quantity || 1))}
                  </Text> */}
                </View>
              </View>
            </>
          )}
        </View>
      ))}
    </View>
  );
};

export default LineItemsEditor;
