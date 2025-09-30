import { Task, TaskAction } from '../types';

/**
 * Generate a unique ID for tasks
 */
export const generateTaskId = (): string => {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Create a new task with default values
 */
export const createTask = (description: string): Task => {
  const now = new Date();
  return {
    id: generateTaskId(),
    description: description.trim(),
    isCompleted: false,
    createdAt: now,
    updatedAt: now,
  };
};

/**
 * Task reducer for managing task state
 * Handles all task-related actions: add, toggle, delete, clear completed
 */
export const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case 'ADD_TASK':
      // Only add task if description is not empty
      if (!action.payload.description.trim()) {
        return state;
      }
      return [...state, createTask(action.payload.description)];

    case 'TOGGLE_TASK':
      // Toggle completion status and update timestamp
      return state.map(task =>
        task.id === action.payload.id
          ? { ...task, isCompleted: !task.isCompleted, updatedAt: new Date() }
          : task
      );

    case 'DELETE_TASK':
      // Filter out the task with the specified ID
      return state.filter(task => task.id !== action.payload.id);

    case 'CLEAR_COMPLETED':
      // Remove all completed tasks
      return state.filter(task => !task.isCompleted);

    default:
      return state;
  }
};

/**
 * Get statistics about tasks
 */
export const getTaskStats = (tasks: Task[]) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.isCompleted).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    pending,
    completionRate,
  };
};

/**
 * Sort tasks by creation date (newest first)
 */
export const sortTasksByDate = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

/**
 * Filter tasks by completion status
 */
export const filterTasksByStatus = (tasks: Task[], showCompleted: boolean): Task[] => {
  return tasks.filter(task => showCompleted ? task.isCompleted : !task.isCompleted);
};

/**
 * Validate task description
 */
export const validateTaskDescription = (description: string): { isValid: boolean; error?: string } => {
  const trimmed = description.trim();
  
  if (!trimmed) {
    return { isValid: false, error: 'Task description cannot be empty' };
  }
  
  if (trimmed.length < 3) {
    return { isValid: false, error: 'Task description must be at least 3 characters long' };
  }
  
  if (trimmed.length > 200) {
    return { isValid: false, error: 'Task description must be less than 200 characters' };
  }
  
  return { isValid: true };
};
