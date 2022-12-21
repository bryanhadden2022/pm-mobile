import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as StoreProvider } from 'react-redux';
import store from './src/redux/store';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import ProfileScreen from './src/ProfileScreen';
import PostScreen from './src/PostScreen';
import SettingsScreen from './src/SettingsScreen';

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Home'
  switch (routeName) {
    case 'Home':
      return 'Home'
    case 'Profile':
      return 'Profile'
  }
}

function App() {
  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

  function MainTabNavigator() {
    return (
      <Tab.Navigator screenOptions={{ activeTintColor: '#101010' }}>
        <Tab.Screen name='Public ' component={HomeScreen} />
        <Tab.Screen name='Local' component={ProfileScreen} />
        <Tab.Screen name='Settings' component={SettingsScreen} />
      </Tab.Navigator>
    )
  }

  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name='Home'
            component={MainTabNavigator}
          />
          <Stack.Screen name='Public' component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Post" component={PostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}

export default App;
