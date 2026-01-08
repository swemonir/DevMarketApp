import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import AuthProvider from "../providers/AuthProvider";
import { store } from "../store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#020617" />
      <AuthProvider>
        <SafeAreaProvider>
          <View style={{ flex: 1, backgroundColor: "#020617" }}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "#020617" }
              }}
            >
              <Stack.Screen name="splash" />
              <Stack.Screen name="login" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="index" />
            </Stack>
          </View>
        </SafeAreaProvider>
      </AuthProvider>
    </Provider>
  );
}
