import { Stack } from "expo-router";
import { Text, View } from "react-native";

import { useSession } from "~/util/Session";

export default function Home() {
  const { signOut } = useSession();
  return (
    <View>
      <Stack.Screen options={{ title: "Home", headerShown: true }} />
      <Text
        onPress={async () => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          await signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
