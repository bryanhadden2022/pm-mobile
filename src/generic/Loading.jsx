import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './style'

export default function Loading({ localLoading }) {
  const loading = useSelector(state => state.app.loading);

  if (!loading && !localLoading) return <></>

  return (
    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
      <Text style={{ fontSize: 25, fontWeight: '500' }}>Loading</Text>
    </View>
  )
}

