
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const services = [
  { title: "Consultation", icon: "doctor" },
  { title: "Surgery Care", icon: "hospital-box" },
  { title: "Insurance", icon: "shield-check" },
  { title: "Medical Loan", icon: "cash-multiple" },
];

export default function QuickService() {
  return (
    <View className="flex-row justify-between mx-4 mt-4">
      {services.map((item, index) => (
        <TouchableOpacity
          key={index}
          className="items-center flex-1"
        >
          <View className="bg-white w-14 h-14 rounded-2xl items-center justify-center shadow-sm border border-slate-100">
            <MaterialCommunityIcons
              name={item.icon}
              size={29}
              color="#0753B8"
            />
          </View>

          <Text className="text-slate-800 text-xs font-semibold text-center mt-2">
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
