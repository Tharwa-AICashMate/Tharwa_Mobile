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
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    listContainer: {
        width: '110%',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        backgroundColor: '#F1FFF3',
        borderRadius: 12,
        paddingHorizontal: 15,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    addIconContainer: {
        backgroundColor: '#4D9FEC',
    },
    fingerprintIconContainer: {
        backgroundColor: 'lightblue',
    },
    itemText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
})

export default styles