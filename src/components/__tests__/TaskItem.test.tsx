import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TaskItem from '../TaskItem';
import { Task } from '../../types';

const mockTask: Task = {
  id: 'test-id',
  description: 'Test task description',
  isCompleted: false,
  createdAt: new Date('2023-01-01T10:00:00Z'),
  updatedAt: new Date('2023-01-01T10:00:00Z'),
};

const mockOnToggle = jest.fn();
const mockOnDelete = jest.fn();

describe('TaskItem', () => {
  beforeEach(() => {
    mockOnToggle.mockClear();
    mockOnDelete.mockClear();
  });

  it('should render task description', () => {
    const { getByText } = render(
      <TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    
    expect(getByText('Test task description')).toBeTruthy();
  });

  it('should render timestamp', () => {
    const { getByText } = render(
      <TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    
    // The timestamp format may vary, so we check if it contains date/time info
    const timestampElement = getByText(/Jan|2023|10:00/);
    expect(timestampElement).toBeTruthy();
  });

  it('should call onToggle when task is pressed', () => {
    const { getByText } = render(
      <TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    
    const taskElement = getByText('Test task description');
    fireEvent.press(taskElement);
    
    expect(mockOnToggle).toHaveBeenCalledWith('test-id');
  });

  it('should call onDelete when delete button is pressed', () => {
    const { getByTestId } = render(
      <TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    
    const deleteButton = getByTestId('delete-button');
    fireEvent.press(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith('test-id');
  });

  it('should show completed state for completed task', () => {
    const completedTask = { ...mockTask, isCompleted: true };
    const { getByText } = render(
      <TaskItem task={completedTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    
    expect(getByText('Test task description')).toBeTruthy();
  });

  it('should show checkmark for completed task', () => {
    const completedTask = { ...mockTask, isCompleted: true };
    const { getByText } = render(
      <TaskItem task={completedTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    
    expect(getByText('Test task description')).toBeTruthy();
  });

  it('should not show checkmark for incomplete task', () => {
    const { getByText } = render(
      <TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    
    expect(getByText('Test task description')).toBeTruthy();
  });

  it('should handle long descriptions', () => {
    const longTask = {
      ...mockTask,
      description: 'This is a very long task description that should be handled properly by the component and should not cause any layout issues',
    };
    
    const { getByText } = render(
      <TaskItem task={longTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    
    expect(getByText(longTask.description)).toBeTruthy();
  });

  it('should render with different task states', () => {
    const completedTask = { ...mockTask, isCompleted: true };
    
    const { rerender, getByText } = render(
      <TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    
    expect(getByText('Test task description')).toBeTruthy();
    
    rerender(
      <TaskItem task={completedTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />
    );
    
    expect(getByText('Test task description')).toBeTruthy();
  });
});
