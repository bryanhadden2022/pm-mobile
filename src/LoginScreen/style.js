import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '75%',
        color: 'gray',
        border: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
        marginBottom: 15,
    },
    submit: {
        backgroundColor: '#f4c430',
        width: '75%',
        border: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
        marginBottom: 15,
        display: 'flex',
        alignItems: 'center',
    },
    submitText: {
        color: 'white', fontWeight: '500'
    }

});