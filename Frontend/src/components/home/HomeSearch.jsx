
import React from "react";
import { View, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeSearch() {
  return (
    <View className="mx-4 mt-2 mb-3 bg-slate-100 rounded-full px-3 h-11 flex-row items-center">
      <MaterialCommunityIcons
        name="magnify"
        size={21}
        color="#64748b"
      />

      <TextInput
        placeholder="Search doctors, hospitals, conditions..."
        placeholderTextColor="#64748b"
        className="flex-1 ml-2 text-sm text-slate-800"
      />

      <MaterialCommunityIcons
        name="microphone-outline"
        size={21}
        color="#334155"
      />
    </View>
  );
}
