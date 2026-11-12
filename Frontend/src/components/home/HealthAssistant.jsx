
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HealthAssistant() {
  return (
    <View className="mx-4 mt-1 bg-sky-600 rounded-2xl p-4 overflow-hidden">
      <View className="flex-row justify-between items-center">
        <View className="flex-1 pr-2">
          <Text className="text-white font-bold text-base">
            Your HealthCare Companion
          </Text>

          <Text className="text-white text-xs mt-2 leading-5">
            Get 24×7 personalized guidance
            from our health assistant.
          </Text>

          <TouchableOpacity className="bg-orange-500 rounded-full px-4 py-2 mt-3 self-start">
            <Text className="text-white font-bold text-xs">
              Chat Now →
            </Text>
          </TouchableOpacity>
        </View>

        <MaterialCommunityIcons
          name="robot-happy-outline"
          size={85}
          color="white"
        />
      </View>
    </View>
  );
}
