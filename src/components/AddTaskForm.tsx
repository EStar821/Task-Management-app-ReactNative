import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AddTaskFormProps } from '../types';
import { Colors, Spacing } from '../constants/colors';
import Input from './Input';
import Button from './Button';
import { validateTaskDescription } from '../utils/taskUtils';

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [taskDescription, setTaskDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const validation = validateTaskDescription(taskDescription);
    
    if (!validation.isValid) {
      setError(validation.error || 'Invalid task description');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onAddTask(taskDescription);
      setTaskDescription('');
    } catch (err) {
      Alert.alert('Error', 'Failed to add task. Please try again.');
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Enter key press for multiline input
  const handleKeyPress = (event: any) => {
    if (event.nativeEvent.key === 'Enter' && !event.nativeEvent.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  // Alternative approach: handle text input changes to detect Enter
  const handleTextChangeWithEnter = (text: string) => {
    // Check if the last character is a newline (Enter key)
    if (text.endsWith('\n')) {
      // Remove the newline and submit
      const cleanText = text.slice(0, -1);
      setTaskDescription(cleanText);
      handleSubmit();
    } else {
      setTaskDescription(text);
    }
    
    if (error) {
      setError('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder="What needs to be done?"
          value={taskDescription}
          onChangeText={handleTextChangeWithEnter}
          onKeyPress={handleKeyPress}
          error={error}
          leftIcon={
            <Ionicons
              name="add-circle-outline"
              size={20}
              color={Colors.gray400}
            />
          }
          containerStyle={styles.input}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
          maxLength={200}
        />
        
        <Button
          title="Add Task"
          onPress={handleSubmit}
          loading={isSubmitting}
          disabled={!taskDescription.trim() || isSubmitting}
          icon={
            <Ionicons
              name="add"
              size={16}
              color={Colors.white}
            />
          }
          style={styles.addButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
  },
  
  input: {
    flex: 1,
    marginBottom: 0,
  },
  
  addButton: {
    minWidth: 100,
  },
});

export default AddTaskForm;
