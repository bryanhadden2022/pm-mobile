import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    name: {
        fontSize: 20,
    },
    username: {
        fontSize: 15,
        color: 'gray'
    },
    settingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 15
    },
    submit: {
        backgroundColor: '#f4c430',
        width: 100,
        border: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
        display: 'flex',
        alignItems: 'center',
    },
    submitText: {
        color: 'white', fontWeight: '600'
    }
});