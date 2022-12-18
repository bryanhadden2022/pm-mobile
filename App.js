import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as StoreProvider} from 'react-redux';
import store from './src/redux/store';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}

export default App;
