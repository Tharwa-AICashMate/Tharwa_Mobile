import { StyleSheet } from 'react-native';
import Theme from '@/theme';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.highlight,
    },
    contentBox: {
        flex: 1,
        backgroundColor: Theme.colors.background,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    fingerprintContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        padding: 20,
    },
    instructionText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginTop: 20,
        marginBottom: 30,
        textAlign: 'center',
    },
    instructionParaghraph: {
        textAlign: 'center',
        fontSize: 15,
    },
    retryButton: {
        backgroundColor: Theme.colors.secondery,
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 30,
        marginTop: 80,
        width: 280,
    },
    retryButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
});

export default styles;