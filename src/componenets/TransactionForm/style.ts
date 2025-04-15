import Theme from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
  },

  formContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    marginTop: 42,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    
  },
  inputGroup: {
    marginBottom: 20,
    
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.colors.secondery,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  messageInput: {
    backgroundColor: Theme.colors.secondery,
    borderRadius: 8,
    padding: 16,
    height: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: Theme.colors.primary,
    borderRadius: 30,
    padding: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.text,
  },
  categoryPicker: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: Theme.colors.background,
    borderRadius: 8,
    zIndex: 10000,
    padding: 10,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.background,
  },
  categoryIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  webSelect: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: Theme.colors.secondery,
    borderRadius: 8,
    backgroundColor: Theme.colors.secondery,
    fontSize: 16,
    marginTop: 5,
    color: Theme.colors.text,
  
  
  },
  dateSelect:{
    width: '90%',
    padding: 12,
    borderWidth: 1,
    borderColor: Theme.colors.secondery,
    borderRadius: 8,
    backgroundColor: Theme.colors.secondery,
    fontSize: 16,
    margin: 5,
    color: Theme.colors.text,

  }
});

export default styles;