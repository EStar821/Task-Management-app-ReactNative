// import '@testing-library/react-native/extend-expect';

// Mock Expo modules
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Mock React Native modules
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  
  return {
    ...RN,
    Platform: {
      OS: 'ios',
      select: jest.fn((obj) => obj.ios || obj.default),
    },
    Alert: {
      alert: jest.fn(),
    },
  };
});

// Mock window.confirm for web
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'confirm', {
    value: jest.fn(() => true),
    writable: true,
  });

  // Mock document for web
  Object.defineProperty(document, 'createElement', {
    value: jest.fn(() => ({
      textContent: '',
      appendChild: jest.fn(),
    })),
    writable: true,
  });

  Object.defineProperty(document, 'head', {
    value: {
      appendChild: jest.fn(),
    },
    writable: true,
  });
}
