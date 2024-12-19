import { Stack } from "expo-router";
import { Tabs } from "expo-router";

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
        </Stack>
)}