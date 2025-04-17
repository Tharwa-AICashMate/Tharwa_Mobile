import { StyleSheet } from 'react-native';
import Theme from '@/theme';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.highlight,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 30,
    },
    text: {
        fontSize: 20,
        width: '60%',
        color: Theme.colors.secondery,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default styles