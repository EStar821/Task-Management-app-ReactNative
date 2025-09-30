import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TaskManagerScreen from '../TaskManagerScreen';

// Mock the components to isolate the screen logic
jest.mock('../../components/AddTaskForm', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  return function MockAddTaskForm({ onAddTask }: { onAddTask: (description: string) => void }) {
    return (
      <View testID="add-task-form">
        <Text>Add Task Form</Text>
        <TouchableOpacity
          testID="add-task-button"
          onPress={() => onAddTask('Test task')}
        >
          <Text>Add Test Task</Text>
        </TouchableOpacity>
      </View>
    );
  };
});

jest.mock('../../components/TaskList', () => {
  const { View, Text, TouchableOpacity } = require('react-native');
  return function MockTaskList({ 
    tasks, 
    onToggleTask, 
    onDeleteTask 
  }: { 
    tasks: any[], 
    onToggleTask: (id: string) => void, 
    onDeleteTask: (id: string) => void 
  }) {
    return (
      <View testID="task-list">
        <Text>Task List ({tasks.length} tasks)</Text>
        {tasks.map((task) => (
          <View key={task.id} testID={`task-${task.id}`}>
            <Text>{task.description}</Text>
            <TouchableOpacity
              testID={`toggle-${task.id}`}
              onPress={() => onToggleTask(task.id)}
            >
              <Text>Toggle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID={`delete-${task.id}`}
              onPress={() => onDeleteTask(task.id)}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };
});

describe('TaskManagerScreen', () => {
  it('should render AddTaskForm and TaskList', () => {
    const { getByTestId } = render(<TaskManagerScreen />);
    
    expect(getByTestId('add-task-form')).toBeTruthy();
    expect(getByTestId('task-list')).toBeTruthy();
  });

  it('should start with empty task list', () => {
    const { getByText } = render(<TaskManagerScreen />);
    
    expect(getByText('Task List (0 tasks)')).toBeTruthy();
  });

  it('should add a task when AddTaskForm calls onAddTask', async () => {
    const { getByTestId, getByText } = render(<TaskManagerScreen />);
    
    const addButton = getByTestId('add-task-button');
    fireEvent.press(addButton);
    
    await waitFor(() => {
      expect(getByText('Task List (1 tasks)')).toBeTruthy();
    });
    
    expect(getByTestId('task-Test task')).toBeTruthy();
  });

  it('should toggle task completion', async () => {
    const { getByTestId, getByText } = render(<TaskManagerScreen />);
    
    // Add a task first
    const addButton = getByTestId('add-task-button');
    fireEvent.press(addButton);
    
    await waitFor(() => {
      expect(getByText('Task List (1 tasks)')).toBeTruthy();
    });
    
    // Toggle the task
    const toggleButton = getByTestId('toggle-Test task');
    fireEvent.press(toggleButton);
    
    // Task should still be in the list
    expect(getByText('Task List (1 tasks)')).toBeTruthy();
  });

  it('should delete a task', async () => {
    const { getByTestId, getByText } = render(<TaskManagerScreen />);
    
    // Add a task first
    const addButton = getByTestId('add-task-button');
    fireEvent.press(addButton);
    
    await waitFor(() => {
      expect(getByText('Task List (1 tasks)')).toBeTruthy();
    });
    
    // Delete the task
    const deleteButton = getByTestId('delete-Test task');
    fireEvent.press(deleteButton);
    
    await waitFor(() => {
      expect(getByText('Task List (0 tasks)')).toBeTruthy();
    });
  });

  it('should handle multiple tasks', async () => {
    const { getByTestId, getByText } = render(<TaskManagerScreen />);
    
    // Add multiple tasks
    const addButton = getByTestId('add-task-button');
    fireEvent.press(addButton);
    fireEvent.press(addButton);
    fireEvent.press(addButton);
    
    await waitFor(() => {
      expect(getByText('Task List (3 tasks)')).toBeTruthy();
    });
  });

  it('should maintain task state across operations', async () => {
    const { getByTestId, getByText } = render(<TaskManagerScreen />);
    
    // Add a task
    const addButton = getByTestId('add-task-button');
    fireEvent.press(addButton);
    
    await waitFor(() => {
      expect(getByText('Task List (1 tasks)')).toBeTruthy();
    });
    
    // Toggle it
    const toggleButton = getByTestId('toggle-Test task');
    fireEvent.press(toggleButton);
    
    // Task should still be there
    expect(getByText('Task List (1 tasks)')).toBeTruthy();
    
    // Add another task
    fireEvent.press(addButton);
    
    await waitFor(() => {
      expect(getByText('Task List (2 tasks)')).toBeTruthy();
    });
  });

  it('should handle rapid task operations', async () => {
    const { getByTestId, getByText } = render(<TaskManagerScreen />);
    
    const addButton = getByTestId('add-task-button');
    
    // Rapidly add multiple tasks
    for (let i = 0; i < 5; i++) {
      fireEvent.press(addButton);
    }
    
    await waitFor(() => {
      expect(getByText('Task List (5 tasks)')).toBeTruthy();
    });
  });
});
