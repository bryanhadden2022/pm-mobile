import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './style'

function Errors() {
    const loading = useSelector(state => state.app.loading);
    const errors = useSelector(state => state.app.errors);

    if (!loading && !errors.length) return <></>
 
    return (
        <Text
            style={styles.error}>
            Incorrect Login. Please Try Again.
        </Text>
    )
}

export default Errors