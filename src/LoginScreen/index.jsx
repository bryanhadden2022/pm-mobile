import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Pressable, TextInput } from 'react-native';
import { styles } from './style'
import Loading from '../Generic/Loading'
import Errors from '../Generic/Errors'

// helpers & slices
import fetchUserData from './fetchUserData'
import { login } from '../redux/slices/authorize'

export default function LoginScreen(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const state = useSelector(state => state);
  const loggedIn = useSelector(state => state.auth.user.loggedIn)

  const dispatch = useDispatch();
  async function handleLogin() {
    // figure out why the res object weird? 
    const user = await fetchUserData(username, password)

    dispatch(login(user))
    props.navigation.navigate('Home')
  }

  useEffect(() => {
  }, [loggedIn])

  return (
    <View
      style={styles.container}>
      <Loading />
      <Errors />
      <TextInput
        style={styles.input}
        placeholder="username"
        keyboardType="numeric"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        keyboardType="numeric"
        onChangeText={setPassword}
        value={password}
      />
      <Pressable
        onPress={handleLogin}
        style={styles.submit}>
        <Text style={styles.submitText}>Login</Text>
      </Pressable>
    </View>
  );
}
