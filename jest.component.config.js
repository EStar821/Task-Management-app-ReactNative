module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: [
    '**/components/__tests__/**/*.(js|jsx|ts|tsx)',
    '**/screens/__tests__/**/*.(js|jsx|ts|tsx)'
  ],
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx,ts,tsx}',
    'src/screens/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@expo|expo|@unimodules|unimodules|sentry-expo|native-base|react-navigation|@react-navigation|@react-native-community|@react-native-picker|react-native-vector-icons|react-native-screens|react-native-reanimated|react-native-gesture-handler|react-native-safe-area-context|@react-native-async-storage|react-native-svg)/)'
  ]
};
