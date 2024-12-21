import { Stack } from "expo-router";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './LoginPage'; // Replace with your actual path
import HomePage from './(tabs)/index'; // Replace with your actual path

// const Stack = createStackNavigator();

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
            name="(tabs)"
            options={{
             headerShown: false,
                // statusBarBackgroundColor: '#585123',
            }}
            />
            <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="index" component={HomePage} />
            </Stack.Navigator>
            </NavigationContainer>
            {/* <Stack.Screen
            name="index"
            options={{
                headerTitle: "My Daily Habits",
                headerTintColor: '#585123',
                headerLeft: () =><></>,
            }}
            />
            <Stack.Screen
            name="Review"
            options={{
                headerTitle: "Habit Review",
                headerTintColor: '#585123',
            }}
            />
            <Stack.Screen
            name="EditHabits"
            options={{
                headerTitle: "Edit My Habits",
                headerTintColor: '#585123',
            }}
            /> */}
            <Stack.Screen
            name="+not-found"
            options={{
                headerShown: false,
                headerTitle: "Opps...",
                headerTintColor: '#585123',
            }}
            />
            <Stack.Screen
            name="LoginPage"
            options={{
                headerShown: false,
                headerTitle: "Welcome",
                headerTintColor: '#585123',
            }}
            />
            <Stack.Screen
            name="RegisterPage"
            options={{
                headerShown: false,
                headerTitle: "Welcome",
                headerTintColor: '#585123',
            }}
            />
        </Stack>
)}