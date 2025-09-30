/**
 * Integration tests for Task Manager App
 * These tests verify the core business logic without React Native components
 */

import {
  generateTaskId,
  createTask,
  taskReducer,
  getTaskStats,
  sortTasksByDate,
  filterTasksByStatus,
  validateTaskDescription,
} from '../utils/taskUtils';
import { Task, TaskAction } from '../types';

describe('Task Manager Integration Tests', () => {
  describe('Complete Task Management Workflow', () => {
    it('should handle full task lifecycle', () => {
      // Start with empty state
      let tasks: Task[] = [];
      
      // Add multiple tasks
      const addTask1: TaskAction = {
        type: 'ADD_TASK',
        payload: { description: 'Learn React Native' },
      };
      tasks = taskReducer(tasks, addTask1);
      
      const addTask2: TaskAction = {
        type: 'ADD_TASK',
        payload: { description: 'Build task manager app' },
      };
      tasks = taskReducer(tasks, addTask2);
      
      const addTask3: TaskAction = {
        type: 'ADD_TASK',
        payload: { description: 'Write unit tests' },
      };
      tasks = taskReducer(tasks, addTask3);
      
      // Verify tasks were added
      expect(tasks).toHaveLength(3);
      expect(tasks[0].description).toBe('Learn React Native');
      expect(tasks[1].description).toBe('Build task manager app');
      expect(tasks[2].description).toBe('Write unit tests');
      
      // Complete first task
      const toggleTask1: TaskAction = {
        type: 'TOGGLE_TASK',
        payload: { id: tasks[0].id },
      };
      tasks = taskReducer(tasks, toggleTask1);
      
      // Verify task was completed
      expect(tasks[0].isCompleted).toBe(true);
      expect(tasks[1].isCompleted).toBe(false);
      expect(tasks[2].isCompleted).toBe(false);
      
      // Complete second task
      const toggleTask2: TaskAction = {
        type: 'TOGGLE_TASK',
        payload: { id: tasks[1].id },
      };
      tasks = taskReducer(tasks, toggleTask2);
      
      // Verify both tasks are completed
      expect(tasks[0].isCompleted).toBe(true);
      expect(tasks[1].isCompleted).toBe(true);
      expect(tasks[2].isCompleted).toBe(false);
      
      // Check statistics
      const stats = getTaskStats(tasks);
      expect(stats.total).toBe(3);
      expect(stats.completed).toBe(2);
      expect(stats.pending).toBe(1);
      expect(stats.completionRate).toBe(67);
      
      // Clear completed tasks
      const clearCompleted: TaskAction = {
        type: 'CLEAR_COMPLETED',
      };
      tasks = taskReducer(tasks, clearCompleted);
      
      // Verify only pending task remains
      expect(tasks).toHaveLength(1);
      expect(tasks[0].description).toBe('Write unit tests');
      expect(tasks[0].isCompleted).toBe(false);
      
      // Delete remaining task
      const deleteTask: TaskAction = {
        type: 'DELETE_TASK',
        payload: { id: tasks[0].id },
      };
      tasks = taskReducer(tasks, deleteTask);
      
      // Verify no tasks remain
      expect(tasks).toHaveLength(0);
    });
  });

  describe('Task Validation and Edge Cases', () => {
    it('should handle various input validation scenarios', () => {
      // Valid inputs
      expect(validateTaskDescription('Valid task')).toEqual({
        isValid: true,
        error: undefined,
      });
      
      expect(validateTaskDescription('A'.repeat(50))).toEqual({
        isValid: true,
        error: undefined,
      });
      
      // Invalid inputs
      expect(validateTaskDescription('')).toEqual({
        isValid: false,
        error: 'Task description cannot be empty',
      });
      
      expect(validateTaskDescription('   ')).toEqual({
        isValid: false,
        error: 'Task description cannot be empty',
      });
      
      expect(validateTaskDescription('ab')).toEqual({
        isValid: false,
        error: 'Task description must be at least 3 characters long',
      });
      
      expect(validateTaskDescription('A'.repeat(201))).toEqual({
        isValid: false,
        error: 'Task description must be less than 200 characters',
      });
    });

    it('should handle task filtering and sorting', () => {
      const tasks: Task[] = [
        {
          id: '1',
          description: 'Old task',
          isCompleted: true,
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-01-01'),
        },
        {
          id: '2',
          description: 'New task',
          isCompleted: false,
          createdAt: new Date('2023-01-03'),
          updatedAt: new Date('2023-01-03'),
        },
        {
          id: '3',
          description: 'Middle task',
          isCompleted: true,
          createdAt: new Date('2023-01-02'),
          updatedAt: new Date('2023-01-02'),
        },
      ];
      
      // Test sorting (newest first)
      const sortedTasks = sortTasksByDate(tasks);
      expect(sortedTasks[0].id).toBe('2'); // Newest
      expect(sortedTasks[1].id).toBe('3'); // Middle
      expect(sortedTasks[2].id).toBe('1'); // Oldest
      
      // Test filtering
      const completedTasks = filterTasksByStatus(tasks, true);
      expect(completedTasks).toHaveLength(2);
      expect(completedTasks.every(task => task.isCompleted)).toBe(true);
      
      const pendingTasks = filterTasksByStatus(tasks, false);
      expect(pendingTasks).toHaveLength(1);
      expect(pendingTasks[0].isCompleted).toBe(false);
    });
  });

  describe('Task ID Generation and Uniqueness', () => {
    it('should generate unique task IDs', () => {
      const ids = new Set();
      const iterations = 1000;
      
      for (let i = 0; i < iterations; i++) {
        const id = generateTaskId();
        expect(ids.has(id)).toBe(false);
        ids.add(id);
      }
      
      expect(ids.size).toBe(iterations);
    });

    it('should create tasks with proper structure', () => {
      const task = createTask('Test task');
      
      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('description', 'Test task');
      expect(task).toHaveProperty('isCompleted', false);
      expect(task).toHaveProperty('createdAt');
      expect(task).toHaveProperty('updatedAt');
      
      expect(task.id).toMatch(/^task_\d+_[a-z0-9]+$/);
      expect(task.createdAt).toBeInstanceOf(Date);
      expect(task.updatedAt).toBeInstanceOf(Date);
      expect(task.createdAt.getTime()).toBe(task.updatedAt.getTime());
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle empty task lists gracefully', () => {
      const stats = getTaskStats([]);
      expect(stats).toEqual({
        total: 0,
        completed: 0,
        pending: 0,
        completionRate: 0,
      });
      
      const sorted = sortTasksByDate([]);
      expect(sorted).toEqual([]);
      
      const completed = filterTasksByStatus([], true);
      expect(completed).toEqual([]);
      
      const pending = filterTasksByStatus([], false);
      expect(pending).toEqual([]);
    });

    it('should handle invalid task actions gracefully', () => {
      const tasks: Task[] = [createTask('Test task')];
      
      // Unknown action type
      const unknownAction = { type: 'UNKNOWN_ACTION' as any };
      const result = taskReducer(tasks, unknownAction);
      expect(result).toEqual(tasks);
      
      // Toggle non-existent task
      const toggleNonExistent: TaskAction = {
        type: 'TOGGLE_TASK',
        payload: { id: 'non-existent-id' },
      };
      const result2 = taskReducer(tasks, toggleNonExistent);
      expect(result2).toEqual(tasks);
      
      // Delete non-existent task
      const deleteNonExistent: TaskAction = {
        type: 'DELETE_TASK',
        payload: { id: 'non-existent-id' },
      };
      const result3 = taskReducer(tasks, deleteNonExistent);
      expect(result3).toEqual(tasks);
    });
  });
});
