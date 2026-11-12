
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const services = [
  {
    title: "Doctor\nConsultation",
    icon: "doctor",
  },
  {
    title: "Health\nRecords",
    icon: "file-document-multiple-outline",
  },
  {
    title: "Second\nOpinion",
    icon: "account-check-outline",
  },
  {
    title: "Medical\nLoan",
    icon: "cash-multiple",
  },
  {
    title: "Insurance\nAssistance",
    icon: "shield-check-outline",
  },
  {
    title: "Community",
    icon: "account-group-outline",
  },
];

export default function OurServices() {
  return (
    <View className="px-4 mt-4">
      <Text className="text-base font-bold text-slate-900 mb-3">
        Our Services
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {services.map((service, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            className="w-[31.5%] h-[85px] bg-white rounded-xl border border-slate-100 shadow-sm items-center justify-center mb-3"
          >
            <MaterialCommunityIcons
              name={service.icon}
              size={29}
              color="#0753B8"
            />

            <Text className="text-[11px] font-semibold text-slate-800 text-center mt-1">
              {service.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
