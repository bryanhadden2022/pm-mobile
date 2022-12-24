import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../../ProfileScreen';
import SettingsScreen from '../../SettingsScreen';
import HomeScreen from './view'

export default function Home() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{ activeTintColor: '#101010' }}>
            <Tab.Screen name="Feed" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}