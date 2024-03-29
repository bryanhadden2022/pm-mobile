import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/LoginScreen';
import ProfileScreen from './src/ProfileScreen';
import PostScreen from './src/PostScreen';
import SettingsScreen from './src/SettingsScreen';
import { useSelector } from 'react-redux';
import Home from './src/Screens/Home'


// handle logged in/logged out screens
function Auth() {
  const isLoggedIn = useSelector(state => state.auth.user.loggedIn)
  const Stack = createNativeStackNavigator();

  return (<Stack.Navigator>
    {isLoggedIn ? (
      // Screens for logged in users
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
      </Stack.Group>
    ) : (
      // Auth screens
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Group>
    )}
  </Stack.Navigator>)
}

function App() {
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  );
}

export default App;
