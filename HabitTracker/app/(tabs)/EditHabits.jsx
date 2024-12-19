import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet, Alert } from 'react-native';

const HabitTrackerPage = () => {
  const [selectedParent, setSelectedParent] = useState('');
  const [habitText, setHabitText] = useState('');

  const saveHabit = async () => {
    if (!selectedParent || !habitText) {
      Alert.alert('Error', 'Please select a parent and fill in the habit text.');
      return;
    }

    try {
      const response = await fetch('http://<your-server-url>/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ parent: selectedParent, habit: habitText }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Habit saved successfully!');
        setHabitText('');
        setSelectedParent('');
      } else {
        Alert.alert('Error', result.message || 'Something went wrong.');
      }
    } catch (error) {
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
        <Picker.Item label="Parent 1" value="Parent1" />
        <Picker.Item label="Parent 2" value="Parent2" />
        <Picker.Item label="Parent 3" value="Parent3" />
        <Picker.Item label="Parent 4" value="Parent4" />
        <Picker.Item label="Parent 5" value="Parent5" />
        <Picker.Item label="Parent 6" value="Parent6" />
        <Picker.Item label="Parent 7" value="Parent7" />
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
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default HabitTrackerPage;
