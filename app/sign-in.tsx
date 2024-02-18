import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { LoginFormData, loginValidationSchema } from "./auth.schema";

import { useSession } from "~/util/Session";

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "asd@a.com",
      password: "bla",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(loginValidationSchema),
  });

  const { signIn } = useSession();

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const onSubmit = handleSubmit(async ({ email, password }: LoginFormData) => {
    try {
      const success = await signIn({ email, password });
      if (success) {
        router.replace("/(secure)/home");
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-4">
        <Text className="mb-5 text-2xl font-bold">Sign In</Text>

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <View className="mb-2">
              <TextInput
                accessibilityHint="Enter your email"
                accessibilityLabel="Email"
                autoCapitalize="none"
                autoComplete="email"
                className="items-center justify-center rounded-lg border border-gray-300 bg-white p-4 outline-0"
                keyboardType="email-address"
                onChangeText={onChange}
                onSubmitEditing={() => passwordRef.current?.focus()}
                placeholder="Email"
                ref={emailRef}
                returnKeyType="next"
                onBlur={onBlur}
                underlineColorAndroid="transparent"
                value={value}
              />
              <View className="min-h-4">
                {fieldState.error && (
                  <Text className="text-xs text-red-500">
                    {fieldState.error.message}
                  </Text>
                )}
              </View>
            </View>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <View className="mb-2">
              <TextInput
                accessibilityHint="Enter your password"
                accessibilityLabel="Password"
                className="items-center justify-center rounded-lg border border-gray-300 bg-white p-4 outline-0"
                onBlur={onBlur}
                onChangeText={onChange}
                onSubmitEditing={onSubmit}
                placeholder="Password"
                ref={passwordRef}
                secureTextEntry
                underlineColorAndroid="transparent"
                value={value}
              />
              <View className="min-h-4">
                {fieldState.error && (
                  <Text className="text-xs text-red-500">
                    {fieldState.error.message}
                  </Text>
                )}
              </View>
            </View>
          )}
        />

        <TouchableOpacity
          className="rounded-md bg-slate-700 px-8 py-4"
          onPress={onSubmit}
        >
          {isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <Text className="text-center text-white">Sign In</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
