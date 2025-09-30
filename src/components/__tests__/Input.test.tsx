import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Input from '../Input';

describe('Input', () => {
  const mockOnChangeText = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();

  beforeEach(() => {
    mockOnChangeText.mockClear();
    mockOnFocus.mockClear();
    mockOnBlur.mockClear();
  });

  it('should render with placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" onChangeText={mockOnChangeText} />
    );
    
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('should call onChangeText when text changes', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" onChangeText={mockOnChangeText} />
    );
    
    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'New text');
    
    expect(mockOnChangeText).toHaveBeenCalledWith('New text');
  });

  it('should call onFocus when focused', () => {
    const { getByPlaceholderText } = render(
      <Input 
        placeholder="Enter text" 
        onChangeText={mockOnChangeText}
        onFocus={mockOnFocus}
      />
    );
    
    const input = getByPlaceholderText('Enter text');
    fireEvent(input, 'focus');
    
    expect(mockOnFocus).toHaveBeenCalledTimes(1);
  });

  it('should call onBlur when blurred', () => {
    const { getByPlaceholderText } = render(
      <Input 
        placeholder="Enter text" 
        onChangeText={mockOnChangeText}
        onBlur={mockOnBlur}
      />
    );
    
    const input = getByPlaceholderText('Enter text');
    fireEvent(input, 'blur');
    
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it('should render with label', () => {
    const { getByText } = render(
      <Input 
        label="Test Label" 
        placeholder="Enter text" 
        onChangeText={mockOnChangeText} 
      />
    );
    
    expect(getByText('Test Label')).toBeTruthy();
  });

  it('should render with error message', () => {
    const { getByText } = render(
      <Input 
        placeholder="Enter text" 
        onChangeText={mockOnChangeText}
        error="This field is required"
      />
    );
    
    expect(getByText('This field is required')).toBeTruthy();
  });

  it('should render with helper text', () => {
    const { getByText } = render(
      <Input 
        placeholder="Enter text" 
        onChangeText={mockOnChangeText}
        helperText="This is helper text"
      />
    );
    
    expect(getByText('This is helper text')).toBeTruthy();
  });

  it('should render with left icon', () => {
    const { getByPlaceholderText } = render(
      <Input 
        placeholder="Enter text" 
        onChangeText={mockOnChangeText}
        leftIcon={<div>Left</div>}
      />
    );
    
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('should render with right icon', () => {
    const { getByPlaceholderText } = render(
      <Input 
        placeholder="Enter text" 
        onChangeText={mockOnChangeText}
        rightIcon={<div>Right</div>}
      />
    );
    
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('should render with different variants', () => {
    const { getByPlaceholderText: getDefault } = render(
      <Input placeholder="Default" onChangeText={mockOnChangeText} variant="default" />
    );
    
    const { getByPlaceholderText: getFilled } = render(
      <Input placeholder="Filled" onChangeText={mockOnChangeText} variant="filled" />
    );
    
    const { getByPlaceholderText: getOutlined } = render(
      <Input placeholder="Outlined" onChangeText={mockOnChangeText} variant="outlined" />
    );
    
    expect(getDefault('Default')).toBeTruthy();
    expect(getFilled('Filled')).toBeTruthy();
    expect(getOutlined('Outlined')).toBeTruthy();
  });

  it('should be disabled when editable is false', () => {
    const { getByPlaceholderText } = render(
      <Input 
        placeholder="Enter text" 
        onChangeText={mockOnChangeText}
        editable={false}
      />
    );
    
    const input = getByPlaceholderText('Enter text');
    expect(input.props.editable).toBe(false);
  });

  it('should support multiline input', () => {
    const { getByPlaceholderText } = render(
      <Input 
        placeholder="Enter text" 
        onChangeText={mockOnChangeText}
        multiline={true}
      />
    );
    
    const input = getByPlaceholderText('Enter text');
    expect(input.props.multiline).toBe(true);
  });

  it('should apply custom container style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <Input 
        placeholder="Enter text" 
        onChangeText={mockOnChangeText}
        containerStyle={customStyle}
        testID="input-container"
      />
    );
    
    const container = getByTestId('input-container');
    expect(container).toBeTruthy();
  });
});
