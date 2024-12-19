// import { Tabs } from "@mui/material";
import { Stack } from "expo-router";
import { Tabs } from "expo-router";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';



export default function TabsLayout() {
    const colorScheme = useColorScheme();
    return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Tabs>
            <Tabs.Screen
            name="tabs"
            options={{
                headerTitle: "My Daily Habits",
            }}
            />
            <Tabs.Screen
            name="index"
            options={{
                headerTitle: "My Daily Habits",
                headerTintColor: '#f2a65a',
            }}
            />
            <Tabs.Screen
            name="Review"
            options={{
                headerTitle: "Habit Review",
                headerTintColor: '#f2a65a',
            }}
            />
            <Tabs.Screen
            name="EditHabits"
            options={{
                headerTitle: "Edit My Habits",
                headerTintColor: '#f2a65a',
            }}
            />
        </Tabs>
        </ThemeProvider>
)}