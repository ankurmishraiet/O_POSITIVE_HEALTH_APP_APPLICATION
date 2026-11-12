
import React from "react";
import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="doctors/index" />
      <Stack.Screen name="insurance/index" />
      <Stack.Screen name="surgery/index" />
    </Stack>
  );
}
