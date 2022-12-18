import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, Pressable, TextInput} from 'react-native';
import {authorize as authorizeAction, setUser} from '../redux/slices/authorize';
import {fetchData} from './helpers';

export default function LoginScreen(props) {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const dispatch = useDispatch();
  async function login(userObj) {
    dispatch(setUser(userObj));
  }

  const [name, onChangeName] = useState('ericholthaus');
  const [text, onChangeText] = useState('109343485026098492');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userObj, setUserObj] = useState(null);

  async function handleLogin() {
    try {
      setLoading(true);
      await fetchData(text, setUserObj, setLoading);
      setLoading(false);

      await login(userObj);

      if (loggedIn && userObj) {
        setError(false);
        dispatch(authorizeAction());
        props.navigation.navigate('Home');
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      throw error;
    }
  }

  useEffect(() => {
    return () => {
      setError(false);
      setLoading(false);
      onChangeName('');
      onChangeText('');
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {loading && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '500',
            position: 'absolute',
            top: '37%',
          }}>
          <Text style={{fontSize: 15, fontWeight: '500'}}>LOADING...</Text>
        </View>
      )}
      {!loading && error && (
        <Text
          style={{
            color: 'red',
            fontWeight: '500',
            marginBottom: 15,
            fontSize: 15,
            position: 'absolute',
            top: '37%',
          }}>
          Incorrect Login. Please Try Again.
        </Text>
      )}
      <TextInput
        style={{
          width: '75%',
          color: 'gray',
          border: 1,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 5,
          padding: 5,
          marginBottom: 15,
        }}
        placeholder="username"
        keyboardType="numeric"
        onChangeText={onChangeName}
        value={name}
      />
      <TextInput
        style={{
          width: '75%',
          color: 'gray',
          border: 1,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 5,
          padding: 5,
          marginBottom: 15,
        }}
        placeholder="password"
        keyboardType="numeric"
        onChangeText={onChangeText}
        value={text}
      />
      <Pressable
        onPress={handleLogin}
        style={{
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
        }}>
        <Text style={{color: 'white', fontWeight: '500'}}>Login</Text>
      </Pressable>
    </View>
  );
}
