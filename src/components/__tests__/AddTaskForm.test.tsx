import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddTaskForm from '../AddTaskForm';

const mockOnAddTask = jest.fn();

describe('AddTaskForm', () => {
  beforeEach(() => {
    mockOnAddTask.mockClear();
  });

  it('should render input field and button', () => {
    const { getByPlaceholderText, getByText } = render(
      <AddTaskForm onAddTask={mockOnAddTask} />
    );
    
    expect(getByPlaceholderText('What needs to be done?')).toBeTruthy();
    expect(getByText('Add Task')).toBeTruthy();
  });

  it('should call onAddTask when form is submitted', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AddTaskForm onAddTask={mockOnAddTask} />
    );
    
    const input = getByPlaceholderText('What needs to be done?');
    const button = getByText('Add Task');
    
    fireEvent.changeText(input, 'New task');
    fireEvent.press(button);
    
    await waitFor(() => {
      expect(mockOnAddTask).toHaveBeenCalledWith('New task');
    });
  });

  it('should call onAddTask when Enter key is pressed', async () => {
    const { getByPlaceholderText } = render(
      <AddTaskForm onAddTask={mockOnAddTask} />
    );
    
    const input = getByPlaceholderText('What needs to be done?');
    
    fireEvent.changeText(input, 'New task\n');
    
    await waitFor(() => {
      expect(mockOnAddTask).toHaveBeenCalledWith('New task');
    });
  });

  it('should clear input after successful submission', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AddTaskForm onAddTask={mockOnAddTask} />
    );
    
    const input = getByPlaceholderText('What needs to be done?');
    const button = getByText('Add Task');
    
    fireEvent.changeText(input, 'New task');
    fireEvent.press(button);
    
    await waitFor(() => {
      expect(mockOnAddTask).toHaveBeenCalledWith('New task');
    });
    
    expect(input.props.value).toBe('');
  });

  it('should not submit empty task', () => {
    const { getByText } = render(
      <AddTaskForm onAddTask={mockOnAddTask} />
    );
    
    const button = getByText('Add Task');
    fireEvent.press(button);
    
    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it('should not submit whitespace-only task', () => {
    const { getByPlaceholderText, getByText } = render(
      <AddTaskForm onAddTask={mockOnAddTask} />
    );
    
    const input = getByPlaceholderText('What needs to be done?');
    const button = getByText('Add Task');
    
    fireEvent.changeText(input, '   ');
    fireEvent.press(button);
    
    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it('should disable button when input is empty', () => {
    const { getByText } = render(
      <AddTaskForm onAddTask={mockOnAddTask} />
    );
    
    const button = getByText('Add Task');
    expect(button.props.disabled).toBe(true);
  });

  it('should enable button when input has text', () => {
    const { getByPlaceholderText, getByText } = render(
      <AddTaskForm onAddTask={mockOnAddTask} />
    );
    
    const input = getByPlaceholderText('What needs to be done?');
    const button = getByText('Add Task');
    
    fireEvent.changeText(input, 'New task');
    
    expect(button.props.disabled).toBe(false);
  });

  it('should show error for invalid input', () => {
    const { getByPlaceholderText, getByText } = render(
      <AddTaskForm onAddTask={mockOnAddTask} />
    );
    
    const input = getByPlaceholderText('What needs to be done?');
    const button = getByText('Add Task');
    
    fireEvent.changeText(input, 'ab'); // Too short
    fireEvent.press(button);
    
    expect(getByText('Task description must be at least 3 characters long')).toBeTruthy();
  });

  it('should clear error when input changes', () => {
    const { getByPlaceholderText, getByText } = render(
      <AddTaskForm onAddTask={mockOnAddTask} />
    );
    
    const input = getByPlaceholderText('What needs to be done?');
    const button = getByText('Add Task');
    
    // Trigger error
    fireEvent.changeText(input, 'ab');
    fireEvent.press(button);
    
    // Clear error
    fireEvent.changeText(input, 'Valid task');
    
    expect(() => getByText('Task description must be at least 3 characters long')).toThrow();
  });

  it('should handle long descriptions', async () => {
    const longDescription = 'This is a very long task description that should be handled properly by the component and should not cause any issues with the form submission';
    
    const { getByPlaceholderText, getByText } = render(
      <AddTaskForm onAddTask={mockOnAddTask} />
    );
    
    const input = getByPlaceholderText('What needs to be done?');
    const button = getByText('Add Task');
    
    fireEvent.changeText(input, longDescription);
    fireEvent.press(button);
    
    await waitFor(() => {
      expect(mockOnAddTask).toHaveBeenCalledWith(longDescription);
    });
  });

  it('should show loading state during submission', async () => {
    // Mock a slow async operation
    const slowOnAddTask = jest.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    );
    
    const { getByPlaceholderText, getByText } = render(
      <AddTaskForm onAddTask={slowOnAddTask} />
    );
    
    const input = getByPlaceholderText('What needs to be done?');
    const button = getByText('Add Task');
    
    fireEvent.changeText(input, 'New task');
    fireEvent.press(button);
    
    // Button should be disabled during loading
    expect(button.props.disabled).toBe(true);
    
    await waitFor(() => {
      expect(slowOnAddTask).toHaveBeenCalledWith('New task');
    });
  });
});
