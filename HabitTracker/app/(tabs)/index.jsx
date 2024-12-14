import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
// import url ('https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@300..900&display=swap');

const App = () => {
  const [habits, setHabits] = useState([]);
  const [collapsed, setCollapsed] = useState(Array(7).fill(true));

  // Static menu titles
  const titles = [
    'Morning Routine',
    'Afternoon Habits',
    'Healthy & Fitness',
    'Skills & Learning',
    'Goal Specific Habits',
    'Daily Cleaning',
    'Evening Routine',
  ];

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

  const handleTextChange = (menuIndex, habitIndex, text) => {
    const updatedHabits = [...habits];
    updatedHabits[menuIndex][habitIndex].name = text;
    setHabits(updatedHabits);
  };

  const toggleCollapse = (index) => {
    const updatedCollapsed = [...collapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setCollapsed(updatedCollapsed);
  };

  return (
    <ScrollView style={styles.container}>
      {titles.map((title, menuIndex) => (
        <View key={menuIndex} style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.header}
            onPress={() => toggleCollapse(menuIndex)}
          >
            <Text style={styles.headerText}>{title}</Text>
            <Icon
              name={collapsed[menuIndex] ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Collapsible collapsed={collapsed[menuIndex]}>
            {Array(3)
              .fill()
              .map((_, habitIndex) => (
                <View key={habitIndex} style={styles.habitRow}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={`Habit ${habitIndex + 1}`}
                    value={habits[menuIndex]?.[habitIndex]?.name || ''}
                    onChangeText={(text) => handleTextChange(menuIndex, habitIndex, text)}
                  />
                  <TouchableOpacity
                    style={[
                      styles.checkbox,
                      habits[menuIndex]?.[habitIndex]?.completed && styles.checkboxCompleted,
                    ]}
                    onPress={() => toggleHabitCompletion(menuIndex, habitIndex)}
                  />
                </View>
              ))}
          </Collapsible>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eec170',
  },
  menuContainer: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#585123',
    borderRadius: 5,
  },
  headerText: {
    color: '#f2a65a',
    fontSize: 18,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f2a65a',
    borderRadius: 5,
    shadowColor: '#585123',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#772f1a',
    marginRight: 10,
    fontSize: 16,
    // fontFamily: Helvetica-Light
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#772f1a',
    borderRadius: 4,
  },
  checkboxCompleted: {
    backgroundColor: 'f2a65a',
  },

  // text: {
  //   .darker-grotesque-<uniquifier> {
  //     font-family: "Darker Grotesque", sans-serif;
  //     font-optical-sizing: auto;
  //     font-weight: <weight>;
  //     font-style: normal;
  // }
});

export default App;

