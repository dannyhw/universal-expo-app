import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { SessionProvider } from "~/util/Session";

import "../global.css";

export default function Layout() {
  return (
    <SessionProvider>
      <GestureHandlerRootView className="flex-1">
        <Stack screenOptions={{ headerShown: false }} />
      </GestureHandlerRootView>
    </SessionProvider>
  );
}
