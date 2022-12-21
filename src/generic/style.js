import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '500',
        position: 'absolute',
        top: '37%',
    },
    error: {
        color: 'red',
        fontWeight: '500',
        marginBottom: 15,
        fontSize: 15,
        position: 'absolute',
        top: '37%',
    }
});