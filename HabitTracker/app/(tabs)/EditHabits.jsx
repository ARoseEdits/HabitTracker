import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet, Alert } from 'react-native';

// const { MongoClient } = require("mongodb");

const HabitTrackerPage = () => {
  const [selectedParent, setSelectedParent] = useState('');
  const [habitText, setHabitText] = useState('');

  const saveHabit = async () => {
    console.log (1)
    if (!selectedParent || !habitText) {
      Alert.alert('Error', 'Please select a parent and fill in the habit text.');
      return;
    }

    try {
      console.log (2)
      const response = await fetch('mongodb+srv://ambokrose:jrlZgMKtiDLNbMvh@cluster0.gdpni.mongodb.net/' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ parent: selectedParent, habit: habitText }),
      });
      console.log (3)
      const result = response.json();
      console.log(4)
      if (response.ok) {
        console.log(5)
        Alert.alert('Success', 'Habit saved successfully!');
        setHabitText('');
        setSelectedParent('');
      } else {
        console.log(6)
        Alert.alert('Error', result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.log(7)
      console.log(error)
      Alert.alert('Error', 'Failed to save the habit.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Parent:</Text>
      <Picker
        selectedValue={selectedParent}
        onValueChange={(itemValue) => setSelectedParent(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a parent" value="" />
        <Picker.Item label="Morning Routine" value="Parent1" />
        <Picker.Item label="Afternoon Habits" value="Parent2" />
        <Picker.Item label="Healthy & Fitness" value="Parent3" />
        <Picker.Item label="Skills & Learning" value="Parent4" />
        <Picker.Item label="Goal Specific Habits" value="Parent5" />
        <Picker.Item label="Daily Cleaning" value="Parent6" />
        <Picker.Item label="Evening Routine" value="Parent7" />
      </Picker>

      <Text style={styles.label}>New Habit:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter habit"
        value={habitText}
        onChangeText={setHabitText}
      />

      <Button title="Save Habit" onPress={saveHabit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eec170',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    marginBottom: 16,
    backgroundColor: '#585123',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  Text: {
    fontSize: 16,
    color: '#f2a65a',

  },
  Button: {
    height: 50,
    marginBottom: 16,
    backgroundColor: '#585123',

  },
  label: {
    fontSize: 16,
    color: '#585123',
  },

});

export default HabitTrackerPage;
