import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import TaskManagerScreen from './src/screens/TaskManagerScreen';

export default function App() {
  useEffect(() => {
    // Inject CSS for web to remove yellow border
    if (Platform.OS === 'web') {
      const style = document.createElement('style');
      style.textContent = `
        input:focus,
        textarea:focus,
        input:focus-visible,
        textarea:focus-visible,
        input:focus-within,
        textarea:focus-within {
          outline: none !important;
          outline-style: none !important;
          outline-width: 0 !important;
          outline-offset: 0 !important;
          box-shadow: none !important;
        }
        *:focus {
          outline: none !important;
          outline-style: none !important;
          outline-width: 0 !important;
          outline-offset: 0 !important;
          box-shadow: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <>
      <TaskManagerScreen />
      <StatusBar style="auto" />
    </>
  );
}
