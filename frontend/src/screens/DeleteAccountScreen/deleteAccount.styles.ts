// useDeleteAccountStyles.ts
import { StyleSheet, I18nManager, Dimensions } from 'react-native';
import i18next from 'i18next';

const { height, width } = Dimensions.get('window');
const isRTL = i18next.language === 'ar' || I18nManager.isRTL;

const useDeleteAccountStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FECD3E',
    },
    content: {
      flex: 1,
      padding: 40,
      borderTopLeftRadius: 80,
      borderTopRightRadius: 80,
      height,
      width,
      backgroundColor: 'white',
    },
    warningTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: isRTL ? 'right' : 'left',
      writingDirection: isRTL ? 'rtl' : 'ltr',
      marginBottom: 16,
    },
    warningText: {
      fontSize: 16,
      marginBottom: 12,
      textAlign: isRTL ? 'right' : 'left',
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    bulletPoints: {
      marginBottom: 24,
      textAlign: isRTL ? 'right' : 'left',
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    bulletPoint: {
      fontSize: 14,
      color: '#666',
      marginBottom: 8,
      textAlign: isRTL ? 'right' : 'left',
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    passwordLabel: {
        width: "100%",
        fontSize: 16,
        color: '#333',
        marginBottom: 12,
        textAlign: isRTL ? 'right' : 'left',
        writingDirection: isRTL ? 'rtl' : 'ltr',
        alignSelf: isRTL ? 'flex-end' : 'flex-start',
      },
    deleteButton: {
      backgroundColor: '#FECD3E',
      borderRadius: 25,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 16,
    },
    deleteButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
    },
    mainCancelButton: {
      backgroundColor: '#f0f0f0',
      borderRadius: 25,
      paddingVertical: 14,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#e0e0e0',
    },
    mainCancelButtonText: {
      color: '#666',
      fontSize: 16,
      fontWeight: '600',
    },
    rowContainer: {
        flexDirection: isRTL ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // أو كما يناسب التصميم
      },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContainer: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 24,
      width: '100%',
      maxWidth: 320,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8,
      textAlign: 'center',
    },
    modalSubTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 16,
      textAlign: 'center',
    },
    modalText: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 20,
    },
    confirmDeleteButton: {
      backgroundColor: '#FECD3E',
      borderRadius: 25,
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
      width: '100%',
      marginBottom: 12,
    },
    confirmDeleteButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
    },
    cancelButton: {
      backgroundColor: '#f5f5f5',
      borderRadius: 25,
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
      width: '100%',
      borderWidth: 1,
      borderColor: '#e0e0e0',
    },
    cancelButtonText: { 
      color: '#666',
      fontSize: 14,
      fontWeight: '600',    
    },
    
  });
};

export default useDeleteAccountStyles;
