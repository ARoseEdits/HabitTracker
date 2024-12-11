// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
// import Collapsible from 'react-native-collapsible';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import axios from 'axios';

// const App = () => {
//   const [habits, setHabits] = useState([]);
//   const [collapsed, setCollapsed] = useState(Array(7).fill(true));

//   useEffect(() => {
//     fetchHabits();
//   }, []);

//   const fetchHabits = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/habits');
//       setHabits(response.data);
//     } catch (error) {
//       console.error('Error fetching habits:', error);
//     }
//   };

//   const toggleHabitCompletion = async (menuIndex, habitIndex) => {
//     const updatedHabits = [...habits];
//     const habit = updatedHabits[menuIndex][habitIndex];
//     habit.completed = !habit.completed;

//     setHabits(updatedHabits);

//     try {
//       await axios.put(`http://localhost:5000/api/habits/${habit._id}`, { completed: habit.completed });
//     } catch (error) {
//       console.error('Error updating habit:', error);
//     }
//   };

//   const handleTextChange = (menuIndex, habitIndex, text) => {
//     const updatedHabits = [...habits];
//     updatedHabits[menuIndex][habitIndex].name = text;
//     setHabits(updatedHabits);
//   };

//   const toggleCollapse = (index) => {
//     const updatedCollapsed = [...collapsed];
//     updatedCollapsed[index] = !updatedCollapsed[index];
//     setCollapsed(updatedCollapsed);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {Array(7)
//         .fill()
//         .map((_, menuIndex) => (
//           <View key={menuIndex} style={styles.menuContainer}>
//             <TouchableOpacity
//               style={styles.header}
//               onPress={() => toggleCollapse(menuIndex)}
//             >
//               <Text style={styles.headerText}>Menu {menuIndex + 1}</Text>
//               <Icon
//                 name={collapsed[menuIndex] ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
//                 size={24}
//                 color="#fff"
//               />
//             </TouchableOpacity>

//             <Collapsible collapsed={collapsed[menuIndex]}>
//               {Array(3)
//                 .fill()
//                 .map((_, habitIndex) => (
//                   <View key={habitIndex} style={styles.habitRow}>
//                     <TextInput
//                       style={styles.textInput}
//                       placeholder={`Habit ${habitIndex + 1}`}
//                       value={habits[menuIndex]?.[habitIndex]?.name || ''}
//                       onChangeText={(text) => handleTextChange(menuIndex, habitIndex, text)}
//                     />
//                     <TouchableOpacity
//                       style={[
//                         styles.checkbox,
//                         habits[menuIndex]?.[habitIndex]?.completed && styles.checkboxCompleted,
//                       ]}
//                       onPress={() => toggleHabitCompletion(menuIndex, habitIndex)}
//                     />
//                   </View>
//                 ))}
//             </Collapsible>
//           </View>
//         ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   menuContainer: {
//     marginBottom: 12,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 10,
//     backgroundColor: '#007BFF',
//     borderRadius: 5,
//   },
//   headerText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   habitRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   textInput: {
//     flex: 1,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginRight: 10,
//     fontSize: 16,
//   },
//   checkbox: {
//     width: 24,
//     height: 24,
//     borderWidth: 2,
//     borderColor: '#ccc',
//     borderRadius: 4,
//   },
//   checkboxCompleted: {
//     backgroundColor: 'green',
//   },
// });

// export default App;
