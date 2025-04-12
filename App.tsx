

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <AppNavigator />
      </ReduxProvider>
    </SafeAreaProvider>
  );
}