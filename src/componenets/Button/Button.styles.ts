import { StyleSheet } from 'react-native';
import Theme from '@/theme';
const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        width: '45%',
        backgroundColor: Theme.colors.highlight,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignSelf: 'center',
    },
    buttonText: {
        color: Theme.colors.textLight,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default styles