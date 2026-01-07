import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AuthProvider from '../providers/AuthProvider';
import { store } from '../store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="splash" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" />
          </Stack>
        </SafeAreaProvider>
      </AuthProvider>
    </Provider>
  );
}
