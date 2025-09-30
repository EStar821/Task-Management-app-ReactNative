import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/colors';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  containerStyle,
  inputStyle,
  labelStyle,
  leftIcon,
  rightIcon,
  variant = 'outlined',
  ...props
}) => {
  // Track focus state for styling
  const [isFocused, setIsFocused] = useState(false);

  const containerStyles = [
    styles.container,
    containerStyle,
  ];

  const inputContainerStyles = [
    styles.inputContainer,
    styles[variant],
    isFocused && styles.focused,
    error && styles.error,
    props.editable === false && styles.disabled,
  ];

  const inputStyles: TextStyle[] = [
    styles.input,
    leftIcon && styles.inputWithLeftIcon,
    rightIcon && styles.inputWithRightIcon,
    inputStyle,
  ].filter(Boolean) as TextStyle[];

  const labelStyles = [
    styles.label,
    error && styles.errorLabel,
    labelStyle,
  ];

  return (
    <View style={containerStyles}>
      {label && <Text style={labelStyles}>{label}</Text>}
      
      <View style={inputContainerStyles}>
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={Colors.gray400}
          // Enable multiline input for long descriptions
          multiline={true}
          numberOfLines={1}
          style={inputStyles}
          {...props}
        />
        
        {rightIcon && (
          <View style={styles.rightIcon}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {(error || helperText) && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.sm,
  },
  
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  
  errorLabel: {
    color: Colors.error,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align to top for multiline
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    minHeight: 44,
    ...Shadows.sm,
  },
  
  // Variants
  default: {
    backgroundColor: Colors.white,
  },
  filled: {
    backgroundColor: Colors.gray100,
    borderWidth: 0,
  },
  outlined: {
    backgroundColor: Colors.white,
  },
  
  // States
  focused: {
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: Colors.white,
    ...Shadows.md,
  },
  error: {
    borderColor: Colors.error,
    borderWidth: 1,
  },
  disabled: {
    backgroundColor: Colors.gray100,
    opacity: 0.6,
  },
  
  input: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 44,
    maxHeight: 120, // Allow multiline input with max height
    textAlignVertical: 'top', // Align text to top for multiline
    // Handle text wrapping
    flexWrap: 'wrap',
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.base,
  },
  
  inputWithLeftIcon: {
    paddingLeft: Spacing.xs,
  },
  
  inputWithRightIcon: {
    paddingRight: Spacing.xs,
  },
  
  leftIcon: {
    paddingLeft: Spacing.md,
    paddingRight: Spacing.xs,
    paddingTop: Spacing.sm, // Align with text
    alignSelf: 'flex-start',
  },
  
  rightIcon: {
    paddingRight: Spacing.md,
    paddingLeft: Spacing.xs,
    paddingTop: Spacing.sm, // Align with text
    alignSelf: 'flex-start',
  },
  
  helperText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  
  errorText: {
    color: Colors.error,
  },
});

export default Input;
