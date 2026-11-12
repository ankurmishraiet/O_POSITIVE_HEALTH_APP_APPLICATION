
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HealthProgram() {
  return (
    <View className="mx-4 mt-6 bg-sky-50 rounded-2xl p-4 overflow-hidden">
      <Text className="text-blue-900 font-bold text-base">
        Health & Weight Loss Program
      </Text>

      <View className="flex-row items-center mt-2">
        <View className="flex-1 pr-2">
          <Text className="text-slate-700 text-xs leading-5">
            Calculate your healthy weight score and get an expert
            recommended plan.
          </Text>

          <TouchableOpacity className="bg-orange-500 rounded-full px-3 py-3 mt-3 self-start">
            <Text className="text-white font-bold text-xs">
              Calculate Weight Score →
            </Text>
          </TouchableOpacity>
        </View>

        <MaterialCommunityIcons
          name="doctor"
          size={95}
          color="#0753B8"
        />
      </View>
    </View>
  );
}
