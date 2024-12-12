// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '@mui/material';
import { Picker } from '@react-native-picker/picker';
import { VictoryPie, VictoryChart, VictoryBar, VictoryAxis } from 'victory-native';
import axios from 'axios';

const HabitReview = () => {
  const [habitData, setHabitData] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [habitsList, setHabitsList] = useState([]);

  useEffect(() => {
    // Fetch the list of habits from the MongoDB database
    axios.get('https://your-api-url/habits')
      .then((response) => {
        setHabitsList(response.data);
        if (response.data.length > 0) {
          setSelectedHabit(response.data[0]._id); // Set the first habit as the default
        }
      })
      .catch((error) => {
        console.error('Error fetching habits list:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedHabit) {
      // Fetch the habit data for the selected habit from the MongoDB database
      axios.get(`https://your-api-url/habits/${selectedHabit}/data`)
        .then((response) => {
          setHabitData([response.data]); // Ensure habitData is an array
        })
        .catch((error) => {
          console.error('Error fetching habit data:', error);
        });
    }
  }, [selectedHabit]);

  const calculateStreak = (habitData) => {
    let streak = 0;
    for (let i = habitData.length - 1; i >= 0; i--) {
      if (habitData[i].completed) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const totalCompletionData = habitData.map((habit) => {
    const completed = habit.data.filter((day) => day.completed).length;
    const uncompleted = habit.data.length - completed;
    return { name: habit.name, completed, uncompleted };
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="h4" style={styles.title}>Habit Review</Text>

      {/* Picker for Selecting Habit */}
      <Text variant="h6" style={styles.subtitle}>Select a Habit</Text>
      <Picker
        selectedValue={selectedHabit}
        onValueChange={(itemValue) => setSelectedHabit(itemValue)}
        style={styles.picker}
      >
        {habitsList.map((habit) => (
          <Picker.Item key={habit._id} label={habit.name} value={habit._id} />
        ))}
      </Picker>
      
   {/* Pie Chart Section */}
   <Text variant="h6" style={styles.subtitle}>Overall Consistency</Text>
      <VictoryPie
        data={totalCompletionData.map((item) => ({
          x: item.name,
          y: item.completed,
        }))}
        colorScale={["#4caf50", "#ff5722", "#2196f3"]}
        animate={{ duration: 1000 }}
      />

      {/* 30-Day Review Chart */}
      <Text variant="h6" style={styles.subtitle}>30-Day Completion</Text>
      <VictoryChart domainPadding={{ x: 20 }}>
        <VictoryAxis tickValues={Array.from({ length: 30 }, (_, i) => i + 1)} tickFormat={(t) => t % 5 === 0 ? t : ""} />
        <VictoryAxis dependentAxis tickFormat={(x) => (x === 1 ? "Yes" : "No")} />
        {habitData.map((habit, index) => (
          <VictoryBar
            key={index}
            data={habit.data.map((day) => ({
              x: day.day,
              y: day.completed ? 1 : 0,
            }))}
            barWidth={6}
            style={{ data: { fill: `rgba(33, 150, 243, ${0.5 + index * 0.2})` } }}
          />
        ))}
      </VictoryChart>

      {/* Streak Section */}
      <Text variant="h6" style={styles.subtitle}>Current Streak</Text>
      {habitData.map((habit, index) => (
        <View key={index} style={styles.streakContainer}>
          <Text>{habit.name}:</Text>
          <Text>{calculateStreak(habit.data)} days</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    textAlign: 'center',
    marginVertical: 16,
  },
  subtitle: {
    marginVertical: 12,
    textAlign: 'center',
  },
  picker: {
    backgroundColor: '#ffffff',
    marginVertical: 10,
    borderRadius: 4,
    padding: 8,
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    elevation: 2,
  },
});

export default HabitReview;
