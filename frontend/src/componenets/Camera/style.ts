import Theme from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  flexGrow: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000",
  },
  permissionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
    aspectRatio: 3 / 4,
    borderRadius: 20,
    overflow: "hidden",
    margin: 10,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 1,
  },
  preview: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#444",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingVertical: 20,
  },
  iconButton: {
    backgroundColor: Theme.colors.primary,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 50,
    height: 50,
    borderRadius: 35,
  },
  captureButton: {
    backgroundColor: Theme.colors.primary,
    width: 50,
    height: 50,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 7,
    borderColor: "#fff",
    shadowColor: "#00bcd4",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  button: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 60,
    alignItems: "center",
    marginHorizontal: 10,
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  disabledButton: {
    opacity: 0.6,
  },
  


});
export default styles


export const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalView: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden"
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },
  closeIcon: {
    padding: 5
  },
  receiptCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  receiptHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },
  receiptVendor: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333"
  },
  receiptDate: {
    fontSize: 14,
    color: "#666"
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee"
  },
  amountLabel: {
    fontSize: 16,
    color: "#555"
  },
  amountValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32"
  },
  sectionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8
  },
  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
    color: "#555"
  },
  addCategoryButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  addCategoryText: {
    fontSize: 14,
    marginLeft: 4,
    color: Theme.colors?.primary || "#4CAF50",
    fontWeight: "500"
  },
  categoriesContainer: {
    flexGrow: 1,
    marginVertical: 10
  },
  categoriesContent: {
    paddingHorizontal: 10
  },
  categoryItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    marginHorizontal: 6,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    width: 100,
    height: 90,
    position: "relative"
  },
  selectedCategory: {
    backgroundColor: Theme.colors?.primary || "#4CAF50"
  },
  categoryText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    maxWidth: "90%"
  },
  selectedCategoryText: {
    color: "#fff",
    fontWeight: "500"
  },
  checkmarkIcon: {
    position: "absolute",
    top: 5,
    right: 5
  },
  buttonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee"
  },
  addButton: {
    backgroundColor: Theme.colors?.primary || "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12
  },
  disabledButton: {
    opacity: 0.5
  },
  buttonIcon: {
    marginRight: 8
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
  captureInner: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: Theme.colors.primary,
    borderColor: "#fff",
    borderWidth: 7,
    marginBottom: 10
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  loadingText: {
    marginTop: 8,
    color: "#666",
    fontSize: 14
  },
  emptyContainer: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16
  },
  createFirstCategoryButton: {
    padding: 10,
    backgroundColor: Theme.colors?.primary || "#4CAF50",
    borderRadius: 8
  },
  createFirstCategoryText: {
    color: "#fff",
    fontWeight: "500"
  },
  formContainer: {
    padding: 16
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
    marginBottom: 8
  },
  iconSectionLabel: {
    marginTop: 16
  },
  textInput: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  iconsContainer: {
    flexGrow: 0,
    marginVertical: 10
  },
  iconsContent: {
    paddingVertical: 8
  },
  iconItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    width: 56,
    height: 56
  },
  selectedIconItem: {
    backgroundColor: Theme.colors?.primary || "#4CAF50"
  },
  formButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    marginRight: 8
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555"
  },
  createButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: Theme.colors?.primary || "#4CAF50",
    alignItems: "center",
    marginLeft: 8
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff"
  },

  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%', 
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  modalScrollView: {
    maxHeight: '80%', 
  },
  modalScrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    padding: 8,
    marginRight: 8,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  fieldLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  fieldIcon: {
    marginRight: 6,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
  },
  fieldInput: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  descriptionInput: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlignVertical: 'top',
    minHeight: 80,
  },

  // Line items 
  lineItemsContainer: {
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
  },
  lineItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  lineItemDescription: {
    flex: 1,
    fontSize: 14,
    color: '#444',
  },
  lineItemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginLeft: 8,
  },



  lineItemInputContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  lineItemInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    backgroundColor: Theme.colors.secondery,
    fontSize: 14,
  },
  lineItemNameInput: {
    width:100,
    height:40,
    marginRight: 8,
  },
  lineItemQuantityInput: {
    width: 40,
    marginRight: 8,
    textAlign: 'center',
  },
  lineItemPriceInput: {
    width: 80,
    textAlign: 'left',
  },
  deleteItemButton: {
    padding: 10,
  },
  addItemButton: {
    marginLeft: 10,
    padding: 4,
  },

  /* Description Input */
  descriptionContainer: {
    marginTop: 15,
  },
  descriptionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  

  /* Edit Mode  */
  editModeIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    padding: 5,
    borderRadius: 4,
  },
  editModeText: {
    color: Theme.colors?.primary || '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
  },lineItemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineItemName: {
    flex: 0.6,
    fontSize: 14,
    color: '#333',
  },
  lineItemPriceContainer: {
    flex: 0.4,
    alignItems: 'flex-end',
  },
  lineItemUnitPrice: {
    fontSize: 12,
    color: '#666',
  },
  lineItemTotalPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  storeSelectorContainer: {
    borderWidth: 1,
    // height:30,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  storePicker: {
    width: '100%',
    height: 50,
    color: '#333',
  },
  storePickerItem: {
    fontSize: 16,
    color: '#333',
  },
  addStoreOption: {
    color: Theme.colors.primary,
    fontWeight: '600',
  },
  addStoreButton: {
    padding: 15,
    backgroundColor: Theme.colors.primary + '20',
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.primary + '50'
  },
  addStoreButtonText: {
    color: Theme.colors.primary,
    fontWeight: '600',
    fontSize: 14
  },


});