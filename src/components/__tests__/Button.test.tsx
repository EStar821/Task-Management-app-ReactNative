import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

describe('Button', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('should render with title', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress when disabled', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} disabled={true} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('should not call onPress when loading', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} loading={true} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('should show loading indicator when loading', () => {
    const { getByTestId } = render(
      <Button title="Test Button" onPress={mockOnPress} loading={true} />
    );
    
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('should render with different variants', () => {
    const { getByText: getPrimary } = render(
      <Button title="Primary" onPress={mockOnPress} variant="primary" />
    );
    
    const { getByText: getSecondary } = render(
      <Button title="Secondary" onPress={mockOnPress} variant="secondary" />
    );
    
    const { getByText: getOutline } = render(
      <Button title="Outline" onPress={mockOnPress} variant="outline" />
    );
    
    const { getByText: getDanger } = render(
      <Button title="Danger" onPress={mockOnPress} variant="danger" />
    );
    
    expect(getPrimary('Primary')).toBeTruthy();
    expect(getSecondary('Secondary')).toBeTruthy();
    expect(getOutline('Outline')).toBeTruthy();
    expect(getDanger('Danger')).toBeTruthy();
  });

  it('should render with different sizes', () => {
    const { getByText: getSmall } = render(
      <Button title="Small" onPress={mockOnPress} size="sm" />
    );
    
    const { getByText: getMedium } = render(
      <Button title="Medium" onPress={mockOnPress} size="md" />
    );
    
    const { getByText: getLarge } = render(
      <Button title="Large" onPress={mockOnPress} size="lg" />
    );
    
    expect(getSmall('Small')).toBeTruthy();
    expect(getMedium('Medium')).toBeTruthy();
    expect(getLarge('Large')).toBeTruthy();
  });

  it('should render with icon', () => {
    const { getByText } = render(
      <Button 
        title="With Icon" 
        onPress={mockOnPress} 
        icon={<div>Icon</div>}
      />
    );
    
    expect(getByText('With Icon')).toBeTruthy();
  });

  it('should apply custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByText } = render(
      <Button title="Custom" onPress={mockOnPress} style={customStyle} />
    );
    
    const button = getByText('Custom');
    expect(button).toBeTruthy();
  });
});
