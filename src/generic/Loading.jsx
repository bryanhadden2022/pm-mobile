import React from 'react';
import {View, Text, Pressable, TextInput} from 'react-native';

function Loading() {
  return (
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
  );
}
