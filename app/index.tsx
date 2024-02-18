import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Welcome() {
  return (
    <View>
      <Stack.Screen options={{ title: "Welcome", headerShown: true }} />
      <Text>Hello world</Text>

      <Link href="/sign-in">go to sign in</Link>
    </View>
  );
}
