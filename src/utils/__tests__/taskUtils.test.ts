import {
  generateTaskId,
  createTask,
  taskReducer,
  getTaskStats,
  sortTasksByDate,
  filterTasksByStatus,
  validateTaskDescription,
} from '../taskUtils';
import { Task, TaskAction } from '../../types';

describe('taskUtils', () => {
  describe('generateTaskId', () => {
    it('should generate a unique ID', () => {
      const id1 = generateTaskId();
      const id2 = generateTaskId();
      
      expect(id1).toMatch(/^task_\d+_[a-z0-9]+$/);
      expect(id2).toMatch(/^task_\d+_[a-z0-9]+$/);
      expect(id1).not.toBe(id2);
    });
  });

  describe('createTask', () => {
    it('should create a task with correct properties', () => {
      const description = 'Test task';
      const task = createTask(description);
      
      expect(task).toMatchObject({
        description: 'Test task',
        isCompleted: false,
      });
      expect(task.id).toMatch(/^task_\d+_[a-z0-9]+$/);
      expect(task.createdAt).toBeInstanceOf(Date);
      expect(task.updatedAt).toBeInstanceOf(Date);
    });

    it('should trim whitespace from description', () => {
      const task = createTask('  Test task  ');
      expect(task.description).toBe('Test task');
    });
  });

  describe('taskReducer', () => {
    const mockTask: Task = {
      id: 'test-id',
      description: 'Test task',
      isCompleted: false,
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    };

    it('should add a new task', () => {
      const action: TaskAction = {
        type: 'ADD_TASK',
        payload: { description: 'New task' },
      };
      
      const result = taskReducer([mockTask], action);
      
      expect(result).toHaveLength(2);
      expect(result[1].description).toBe('New task');
      expect(result[1].isCompleted).toBe(false);
    });

    it('should not add empty task', () => {
      const action: TaskAction = {
        type: 'ADD_TASK',
        payload: { description: '   ' },
      };
      
      const result = taskReducer([mockTask], action);
      expect(result).toHaveLength(1);
    });

    it('should toggle task completion', () => {
      const action: TaskAction = {
        type: 'TOGGLE_TASK',
        payload: { id: 'test-id' },
      };
      
      const result = taskReducer([mockTask], action);
      
      expect(result[0].isCompleted).toBe(true);
      expect(result[0].updatedAt).not.toEqual(mockTask.updatedAt);
    });

    it('should delete a task', () => {
      const action: TaskAction = {
        type: 'DELETE_TASK',
        payload: { id: 'test-id' },
      };
      
      const result = taskReducer([mockTask], action);
      expect(result).toHaveLength(0);
    });

    it('should clear completed tasks', () => {
      const completedTask = { ...mockTask, isCompleted: true };
      const action: TaskAction = {
        type: 'CLEAR_COMPLETED',
      };
      
      const result = taskReducer([mockTask, completedTask], action);
      expect(result).toHaveLength(1);
      expect(result[0].isCompleted).toBe(false);
    });

    it('should return same state for unknown action', () => {
      const action = { type: 'UNKNOWN' as any };
      const result = taskReducer([mockTask], action);
      expect(result).toEqual([mockTask]);
    });
  });

  describe('getTaskStats', () => {
    it('should calculate correct statistics', () => {
      const tasks: Task[] = [
        { id: '1', description: 'Task 1', isCompleted: true, createdAt: new Date(), updatedAt: new Date() },
        { id: '2', description: 'Task 2', isCompleted: false, createdAt: new Date(), updatedAt: new Date() },
        { id: '3', description: 'Task 3', isCompleted: true, createdAt: new Date(), updatedAt: new Date() },
      ];
      
      const stats = getTaskStats(tasks);
      
      expect(stats).toEqual({
        total: 3,
        completed: 2,
        pending: 1,
        completionRate: 67,
      });
    });

    it('should handle empty task list', () => {
      const stats = getTaskStats([]);
      
      expect(stats).toEqual({
        total: 0,
        completed: 0,
        pending: 0,
        completionRate: 0,
      });
    });
  });

  describe('sortTasksByDate', () => {
    it('should sort tasks by creation date (newest first)', () => {
      const tasks: Task[] = [
        { id: '1', description: 'Old task', isCompleted: false, createdAt: new Date('2023-01-01'), updatedAt: new Date() },
        { id: '2', description: 'New task', isCompleted: false, createdAt: new Date('2023-01-03'), updatedAt: new Date() },
        { id: '3', description: 'Middle task', isCompleted: false, createdAt: new Date('2023-01-02'), updatedAt: new Date() },
      ];
      
      const sorted = sortTasksByDate(tasks);
      
      expect(sorted[0].id).toBe('2');
      expect(sorted[1].id).toBe('3');
      expect(sorted[2].id).toBe('1');
    });
  });

  describe('filterTasksByStatus', () => {
    const tasks: Task[] = [
      { id: '1', description: 'Completed task', isCompleted: true, createdAt: new Date(), updatedAt: new Date() },
      { id: '2', description: 'Pending task', isCompleted: false, createdAt: new Date(), updatedAt: new Date() },
    ];

    it('should filter completed tasks', () => {
      const result = filterTasksByStatus(tasks, true);
      expect(result).toHaveLength(1);
      expect(result[0].isCompleted).toBe(true);
    });

    it('should filter pending tasks', () => {
      const result = filterTasksByStatus(tasks, false);
      expect(result).toHaveLength(1);
      expect(result[0].isCompleted).toBe(false);
    });
  });

  describe('validateTaskDescription', () => {
    it('should validate correct description', () => {
      const result = validateTaskDescription('Valid task description');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject empty description', () => {
      const result = validateTaskDescription('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Task description cannot be empty');
    });

    it('should reject whitespace-only description', () => {
      const result = validateTaskDescription('   ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Task description cannot be empty');
    });

    it('should reject short description', () => {
      const result = validateTaskDescription('ab');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Task description must be at least 3 characters long');
    });

    it('should reject long description', () => {
      const longDescription = 'a'.repeat(201);
      const result = validateTaskDescription(longDescription);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Task description must be less than 200 characters');
    });
  });
});
