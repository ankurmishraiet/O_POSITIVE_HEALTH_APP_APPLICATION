
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const treatments = [
  {
    id: "1",
    title: "Cataract\nSurgery",
    icon: "eye-outline",
  },
  {
    id: "2",
    title: "Coronary\nAngiography",
    icon: "heart-outline",
  },
  {
    id: "3",
    title: "Liposuction",
    icon: "body-outline",
  },
  {
    id: "4",
    title: "Liver\nTransplant",
    icon: "fitness-outline",
  },
  {
    id: "5",
    title: "Piles Laser\nTreatment",
    icon: "medkit-outline",
  },
  {
    id: "6",
    title: "Total Knee\nReplacement",
    icon: "accessibility-outline",
  },
];

const Treatments = ({
  onTreatmentPress,
  onViewAllPress,
}) => {
  return (
    <View className="px-4 mt-5">

      {/* Section Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-[21px] font-extrabold text-[#17213B]">
          Treatments
        </Text>

        <TouchableOpacity onPress={onViewAllPress}>
          <Text className="text-[#087BC1] text-sm font-bold">
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Treatment Grid */}
      <FlatList
        data={treatments}
        numColumns={3}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 12,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              onTreatmentPress?.(
                item.title.replace("\n", " ")
              )
            }
            className="w-[31.5%] h-[112px] bg-white rounded-2xl items-center justify-center px-2"
            style={{
              elevation: 3,
              shadowColor: "#123D83",
              shadowOpacity: 0.08,
              shadowRadius: 6,
              shadowOffset: {
                width: 0,
                height: 2,
              },
            }}
          >
            <Ionicons
              name={item.icon}
              size={34}
              color="#123D83"
            />

            <Text className="text-center text-[12px] font-bold text-[#17213B] mt-3 leading-[17px]">
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
};

export default Treatments;
