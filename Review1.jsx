import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const App = () => {
  const [habits, setHabits] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(1);
  

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await axios.get('process.env.mongo_ULI');
      setHabits(response.data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  const toggleHabitCompletion = async (menuIndex, habitIndex) => {
    const updatedHabits = [...habits];
    const habit = updatedHabits[menuIndex][habitIndex];
    habit.completed = !habit.completed;

    setHabits(updatedHabits);

    try {
      await axios.put(`process.env.mongo_ULI${habit._id}`, { completed: habit.completed });
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };
// goal: select the goal that you wish to see the data anlysis of the selected habit with a pie chart, streak and monthly review  
  return (
    <ScrollView style={styles.container}>
      <Picker
        selectedValue={selectedMenu}
        onValueChange={(value) => setSelectedMenu(value)}
        style={styles.picker}
      >
        {[...Array(7)].map((_, index) => (
          <Picker.Item key={index} label={`Menu ${index + 1}`} value={index + 1} />
        ))}
      </Picker>

      {habits[selectedMenu - 1]?.map((habit, index) => (
        <View key={index} style={styles.habitRow}>
          <Text style={styles.habitText}>{habit.name}</Text>
          <TouchableOpacity
            style={[styles.checkbox, habit.completed && styles.checkboxCompleted]}
            onPress={() => toggleHabitCompletion(selectedMenu - 1, index)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  picker: {
    marginBottom: 16,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  habitText: {
    fontSize: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  checkboxCompleted: {
    backgroundColor: 'green',
  },
});

export default App;
