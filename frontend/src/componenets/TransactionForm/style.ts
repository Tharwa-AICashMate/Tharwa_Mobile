// import Theme from "@/theme";
// import { StyleSheet } from "react-native";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Theme.colors.primary,
//   },

//   formContainer: {
//     flex: 1,
//     backgroundColor: Theme.colors.background,
//     marginTop: 42,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: 20,
    
//   },
//   inputGroup: {
//     marginBottom: 20,
    
//   },
//   disabledButton: {
//     opacity: 0.5,
//     backgroundColor: Theme.colors.primary,
//   },
//   label: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 8,
//   },
//   input: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: Theme.colors.secondery,
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     fontSize: 16,
//   },
//   messageInput: {
//     backgroundColor: Theme.colors.secondery,
//     borderRadius: 8,
//     padding: 16,
//     height: 120,
//     textAlignVertical: 'top',
//   },
//   saveButton: {
//     backgroundColor: Theme.colors.primary,
//     borderRadius: 30,
//     padding: 14,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   saveButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: Theme.colors.text,
//   },
//   categoryPicker: {
//     position: 'absolute',
//     top: 80,
//     left: 0,
//     right: 0,
//     backgroundColor: Theme.colors.background,
//     borderRadius: 8,
//     zIndex: 10000,
//     padding: 10,
//   },
//   categoryOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: Theme.colors.background,
//   },
//   categoryIcon: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 10,
//   },

//   webSelect: {
//     width: '100%',
//     padding: 12,
//     borderWidth: 1,
//     borderColor: Theme.colors.secondery,
//     borderRadius: 8,
//     backgroundColor: Theme.colors.secondery,
//     fontSize: 16,
//     marginTop: 5,
//     color: Theme.colors.text,
  
  
//   },
//   dateSelect:{
//     width: '90%',
//     padding: 12,
//     borderWidth: 1,
//     borderColor: Theme.colors.secondery,
//     borderRadius: 8,
//     backgroundColor: Theme.colors.secondery,
//     fontSize: 16,
//     margin: 5,
//     color: Theme.colors.text,

//   },
//   typeButton: {
//     flex: 1,
//     padding: 10,
//     margin: 5,
//     alignItems: "center",
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: Theme.colors.text,
//   },
//   descriptionItemContainer: {
//     marginBottom: 10,
//   },
//   descriptionItemRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   descriptionInput: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     padding: 10,
//     fontSize: 14,
//   },
//   removeItemButton: {
//     padding: 8,
//   },
//   addItemButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 10,
//     borderWidth: 1,
//     borderColor: Theme.colors.primary,
//     borderRadius: 8,
//     marginTop: 5,
//   },
// });

// export default styles;


import { StyleSheet } from "react-native";
import Theme from "@/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
  },
  formContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  
    padding: 20,
  
  },
  inputGroup: {
    marginBottom: 24,
    
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Theme.colors.textDark || "#444",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.colors.secondery,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputFocused: {
    borderColor: Theme.colors.primary,
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputError: {
    borderColor: '#ff4d4f',
    backgroundColor: 'rgba(255, 77, 79, 0.05)',
  },
  errorText: {
    color: '#ff4d4f',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  messageInput: {
    backgroundColor: Theme.colors.secondery,
    borderRadius: 12,
    padding: 16,
    height: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  saveButton: {
    backgroundColor: Theme.colors.primary,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.colors.text,
    letterSpacing: 0.5,
  },

  categoryPicker: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: Theme.colors.background,
    borderRadius: 12,
    zIndex: 10000,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  categoryOptionActive: {
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  webSelect: {
    width: '100%',
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 12,
    backgroundColor: Theme.colors.secondery,
    fontSize: 16,
    color: Theme.colors.text,
    
  },
  dateSelect: {
    width: '100%',
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 12,
    backgroundColor: Theme.colors.secondery,
    fontSize: 16,
    color: Theme.colors.text,
    
  },
  descriptionItemContainer: {
    marginBottom: 12,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  descriptionItemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: Theme.colors.background,
  },
  removeItemButton: {
    padding: 8,
    backgroundColor: 'rgba(255,0,0,0.05)',
    borderRadius: 8,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addItemButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 12,
    marginTop: 8,
  },
  addItemText: {
    color: Theme.colors.primary,
    marginLeft: 6,
    fontWeight: '600',
  },
  validationErrorContainer: {
    backgroundColor: 'rgba(255, 77, 79, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ff4d4f',
  },
  itemCalculation: {
    fontSize: 12,
    color: Theme.colors.textLight,
    marginTop: 4,
    textAlign: 'right',
  },
  totalCalculationContainer: {
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  totalCalculationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  totalText: {
    fontWeight: '700',
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.colors.textDark || '#333',
    marginBottom: 16,
    marginTop: 8,
  },
  errorContainer: {
    backgroundColor: '#ffeeee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },

  fieldError: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 5,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  categoryPickerContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: Theme.colors.background,
    borderRadius: 8,
    padding: 12,
    zIndex: 100,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxHeight: 300, 
  },
  categoryPickerScrollContainer: {
    flex: 1,
  },
  categoryPickerScrollView: {
    flex: 1,
  },
  categoryPickerScroll: {
    maxHeight: 200, 
    borderWidth: 1,
    borderColor: Theme.colors.background,
    borderRadius: 8,
    backgroundColor: Theme.colors.background,
    zIndex: 2000, 
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
    disabledButton: {
      opacity: 0.6,
      backgroundColor: Theme.colors.primary + '99', // Adding transparency
    },

});

export default styles;