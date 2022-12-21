import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './style'

export default function Loading() {
  const loading = useSelector(state => state.app.loading);

  if (!loading) return <></>

  return (
    <View style={styles.loading}>
      <Text style={{ fontSize: 15, fontWeight: '500' }}>Loading</Text>
    </View>
  )
}

