import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaskItemProps } from '../types';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/colors';

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  // Handle task completion toggle
  const handleToggle = () => {
    onToggle(task.id);
  };

  // Handle delete button press
  const handleDelete = () => {
    onDelete(task.id);
  };

  const taskTextStyle = [
    styles.taskText,
    task.isCompleted && styles.completedTaskText,
  ];

  const containerStyle = [
    styles.container,
    task.isCompleted && styles.completedContainer,
  ];

  return (
    <View style={containerStyle}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.leftSection}
          onPress={handleToggle}
          activeOpacity={0.7}
        >
          <View style={[
            styles.checkbox,
            task.isCompleted && styles.checkedCheckbox,
          ]}>
            {task.isCompleted && (
              <Ionicons
                name="checkmark"
                size={16}
                color={Colors.white}
              />
            )}
          </View>
          
          <View style={styles.textContainer}>
            <Text style={taskTextStyle} numberOfLines={2}>
              {task.description}
            </Text>
            <Text style={styles.timestamp}>
              {new Date(task.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="trash-outline"
            size={20}
            color={Colors.error}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    ...Shadows.sm,
  },
  
  completedContainer: {
    backgroundColor: Colors.gray50,
    opacity: 0.8,
  },
  
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    borderColor: Colors.gray300,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  
  checkedCheckbox: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  
  textContainer: {
    flex: 1,
  },
  
  taskText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.base,
    marginBottom: Spacing.xs,
  },
  
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
  
  timestamp: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
  },
  
  deleteButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
});

export default TaskItem;
