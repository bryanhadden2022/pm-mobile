import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    profileHeaderContainer: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        borderBottom: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    profileHeaderMeta: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        padding: 10
    },
    profileHeaderImg: { width: 75, height: 75, marginRight: 10 },
    profileHeaderMetaContainer: { display: 'flex', justifyContent: 'space-between' },
    item: {
        border: 1,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        width: 250,
        color: 'black',
        borderRadius: 5,
    },
    profileHeaderTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    profileHeaderSubtitle: {
        fontSize: 16,
        fontWeight: '500'
    },
    profileHeaderFollowerContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    profileHeaderFollowers: {
        marginRight: 10
    },
});