// import { Tabs } from "@mui/material";
import { Stack } from "expo-router";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
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
                headerTintColor: '#eec170',
            }}
            />
            <Tabs.Screen
            name="Review"
            options={{
                headerTitle: "Habit Review",
                headerTintColor: '#eec170',
            }}
            />
            <Tabs.Screen
            name="EditHabits"
            options={{
                headerTitle: "Edit My Habits",
                headerTintColor: '#eec170',
            }}
            />
        </Tabs>
)}