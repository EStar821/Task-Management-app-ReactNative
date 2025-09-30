/**
 * Task interface defining the structure of a task item
 */
export interface Task {
  id: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Task action types for reducer pattern
 */
export type TaskAction = 
  | { type: 'ADD_TASK'; payload: { description: string } }
  | { type: 'TOGGLE_TASK'; payload: { id: string } }
  | { type: 'DELETE_TASK'; payload: { id: string } }
  | { type: 'CLEAR_COMPLETED' };

/**
 * App state interface
 */
export interface AppState {
  tasks: Task[];
  isLoading: boolean;
}

/**
 * Component props interfaces
 */
export interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface AddTaskFormProps {
  onAddTask: (description: string) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}
