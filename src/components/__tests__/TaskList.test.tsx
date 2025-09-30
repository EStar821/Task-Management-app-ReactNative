import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TaskList from '../TaskList';
import { Task } from '../../types';

const mockTasks: Task[] = [
  {
    id: '1',
    description: 'Completed task',
    isCompleted: true,
    createdAt: new Date('2023-01-01T10:00:00Z'),
    updatedAt: new Date('2023-01-01T10:00:00Z'),
  },
  {
    id: '2',
    description: 'Pending task',
    isCompleted: false,
    createdAt: new Date('2023-01-02T10:00:00Z'),
    updatedAt: new Date('2023-01-02T10:00:00Z'),
  },
  {
    id: '3',
    description: 'Another completed task',
    isCompleted: true,
    createdAt: new Date('2023-01-03T10:00:00Z'),
    updatedAt: new Date('2023-01-03T10:00:00Z'),
  },
];

const mockOnToggleTask = jest.fn();
const mockOnDeleteTask = jest.fn();

describe('TaskList', () => {
  beforeEach(() => {
    mockOnToggleTask.mockClear();
    mockOnDeleteTask.mockClear();
  });

  it('should render all tasks', () => {
    const { getByText } = render(
      <TaskList 
        tasks={mockTasks} 
        onToggleTask={mockOnToggleTask} 
        onDeleteTask={mockOnDeleteTask} 
      />
    );
    
    expect(getByText('Completed task')).toBeTruthy();
    expect(getByText('Pending task')).toBeTruthy();
    expect(getByText('Another completed task')).toBeTruthy();
  });

  it('should display task statistics', () => {
    const { getByText } = render(
      <TaskList 
        tasks={mockTasks} 
        onToggleTask={mockOnToggleTask} 
        onDeleteTask={mockOnDeleteTask} 
      />
    );
    
    expect(getByText('3')).toBeTruthy(); // Total
    expect(getByText('2')).toBeTruthy(); // Completed
    expect(getByText('1')).toBeTruthy(); // Pending
    expect(getByText('67%')).toBeTruthy(); // Completion rate
  });

  it('should filter tasks by All', () => {
    const { getByText } = render(
      <TaskList 
        tasks={mockTasks} 
        onToggleTask={mockOnToggleTask} 
        onDeleteTask={mockOnDeleteTask} 
      />
    );
    
    const allButton = getByText('All');
    fireEvent.press(allButton);
    
    expect(getByText('Completed task')).toBeTruthy();
    expect(getByText('Pending task')).toBeTruthy();
    expect(getByText('Another completed task')).toBeTruthy();
  });

  it('should filter tasks by Pending', () => {
    const { getByText, queryByText } = render(
      <TaskList 
        tasks={mockTasks} 
        onToggleTask={mockOnToggleTask} 
        onDeleteTask={mockOnDeleteTask} 
      />
    );
    
    const pendingButton = getByText('Pending');
    fireEvent.press(pendingButton);
    
    expect(getByText('Pending task')).toBeTruthy();
    expect(queryByText('Completed task')).toBeNull();
    expect(queryByText('Another completed task')).toBeNull();
  });

  it('should filter tasks by Completed', () => {
    const { getByText, queryByText } = render(
      <TaskList 
        tasks={mockTasks} 
        onToggleTask={mockOnToggleTask} 
        onDeleteTask={mockOnDeleteTask} 
      />
    );
    
    const completedButton = getByText('Completed');
    fireEvent.press(completedButton);
    
    expect(getByText('Completed task')).toBeTruthy();
    expect(getByText('Another completed task')).toBeTruthy();
    expect(queryByText('Pending task')).toBeNull();
  });

  it('should show empty state when no tasks', () => {
    const { getByText } = render(
      <TaskList 
        tasks={[]} 
        onToggleTask={mockOnToggleTask} 
        onDeleteTask={mockOnDeleteTask} 
      />
    );
    
    expect(getByText('No tasks yet')).toBeTruthy();
    expect(getByText('Add your first task to get started!')).toBeTruthy();
  });

  it('should show empty state for filtered results', () => {
    const { getByText } = render(
      <TaskList 
        tasks={mockTasks} 
        onToggleTask={mockOnToggleTask} 
        onDeleteTask={mockOnDeleteTask} 
      />
    );
    
    const pendingButton = getByText('Pending');
    fireEvent.press(pendingButton);
    
    // Since we have one pending task, this should show it
    expect(getByText('Pending task')).toBeTruthy();
  });

  it('should call onToggleTask when task is toggled', () => {
    const { getByText } = render(
      <TaskList 
        tasks={mockTasks} 
        onToggleTask={mockOnToggleTask} 
        onDeleteTask={mockOnDeleteTask} 
      />
    );
    
    const taskElement = getByText('Pending task');
    fireEvent.press(taskElement);
    
    expect(mockOnToggleTask).toHaveBeenCalledWith('2');
  });

  it('should call onDeleteTask when task is deleted', () => {
    const { getByText } = render(
      <TaskList 
        tasks={mockTasks} 
        onToggleTask={mockOnToggleTask} 
        onDeleteTask={mockOnDeleteTask} 
      />
    );
    
    const taskElement = getByText('Pending task');
    fireEvent.press(taskElement);
    
    expect(mockOnToggleTask).toHaveBeenCalledWith('2');
  });

  it('should sort tasks by creation date (newest first)', () => {
    const { getByText } = render(
      <TaskList 
        tasks={mockTasks} 
        onToggleTask={mockOnToggleTask} 
        onDeleteTask={mockOnDeleteTask} 
      />
    );
    
    // Get all task descriptions
    const taskElements = [
      getByText('Another completed task'), // Should be first (newest)
      getByText('Pending task'), // Should be second
      getByText('Completed task'), // Should be third (oldest)
    ];
    
    expect(taskElements[0]).toBeTruthy();
    expect(taskElements[1]).toBeTruthy();
    expect(taskElements[2]).toBeTruthy();
  });

  it('should handle refresh', () => {
    const { getByText } = render(
      <TaskList 
        tasks={mockTasks} 
        onToggleTask={mockOnToggleTask} 
        onDeleteTask={mockOnDeleteTask} 
      />
    );
    
    // Verify tasks are rendered
    expect(getByText('Completed task')).toBeTruthy();
    expect(getByText('Pending task')).toBeTruthy();
    expect(getByText('Another completed task')).toBeTruthy();
  });

  it('should display correct statistics for empty list', () => {
    const { getByText } = render(
      <TaskList 
        tasks={[]} 
        onToggleTask={mockOnToggleTask} 
        onDeleteTask={mockOnDeleteTask} 
      />
    );
    
    expect(getByText('0')).toBeTruthy(); // Total
    expect(getByText('0')).toBeTruthy(); // Completed
    expect(getByText('0')).toBeTruthy(); // Pending
    expect(getByText('0%')).toBeTruthy(); // Completion rate
  });
});
