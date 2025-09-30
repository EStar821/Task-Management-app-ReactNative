import React, { useReducer, useCallback } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Colors } from '../constants/colors';
import { taskReducer } from '../utils/taskUtils';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';

const TaskManagerScreen: React.FC = () => {
  // Manage task state using reducer pattern
  const [tasks, dispatch] = useReducer(taskReducer, []);

  // Add a new task to the list
  const handleAddTask = useCallback((description: string) => {
    dispatch({
      type: 'ADD_TASK',
      payload: { description },
    });
  }, []);

  // Toggle task completion status
  const handleToggleTask = useCallback((id: string) => {
    dispatch({
      type: 'TOGGLE_TASK',
      payload: { id },
    });
  }, []);

  // Delete a task from the list
  const handleDeleteTask = useCallback((id: string) => {
    dispatch({
      type: 'DELETE_TASK',
      payload: { id },
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.background}
      />
      
      <View style={styles.content}>
        <AddTaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  content: {
    flex: 1,
  },
});

export default TaskManagerScreen;
