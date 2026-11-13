
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const conditions = [
  {
    title: "Acute Liver\nFailure",
    icon: "heart-pulse",
    route: "/hospitals",
  },
  {
    title: "Anal\nFistula",
    icon: "medical-bag",
  },
  {
    title: "Gallstones",
    icon: "stomach",
  },
  {
    title: "Gynaecological",
    icon: "human-female",
  },
  {
    title: "Piles",
    icon: "human",
  },
  {
    title: "Varicose\nVeins",
    icon: "blood-bag",
  },
  {
    title: "Hernia",
    icon: "human",
  },
  {
    title: "Kidney Stones",
    icon: "kidney",
  },
];

export default function Conditions() {
  const router = useRouter();

  return (
    <View className="px-4 mt-2 mb-5">

      {/* Heading */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-base font-bold text-slate-900">
          Conditions
        </Text>

        <TouchableOpacity activeOpacity={0.7}>
          <Text className="text-xs font-semibold text-blue-600">
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Condition Cards */}
      <View className="flex-row flex-wrap justify-between">
        {conditions.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => {
              if (item.route) {
                router.push(item.route);
              }
            }}
            className="w-[23.5%] h-[88px] bg-white rounded-xl border border-slate-100 shadow-sm items-center justify-center mb-3 px-1"
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={27}
              color="#0753B8"
            />

            <Text className="text-[10px] font-semibold text-slate-800 text-center mt-2">
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
