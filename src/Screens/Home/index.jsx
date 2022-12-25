import React from 'react';
import { Text, Button } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../../ProfileScreen';
import SettingsScreen from '../../SettingsScreen';
import HomeScreen from './view'


export default function Home(props) {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{ activeTintColor: '#101010' }}>
            <Tab.Screen
                name="Feed"
                component={HomeScreen}
                options={{
                    tabBarIcon: () => <></>
                    // headerTitle: () => <Text>Ok</Text>,
                    // headerRight: () => (
                    //     <Button
                    //         onPress={() => alert('This is a button!')}
                    //         title="Post"
                    //         color="#fff"
                    //     />
                    // ),
                }}
            />
            <Tab.Screen
                name="Explore"
                component={HomeScreen}
                options={{
                    title: 'Explore',
                    tabBarIcon: () => <></>
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: () => <></>
                }}
            />
        </Tab.Navigator>
    );
}