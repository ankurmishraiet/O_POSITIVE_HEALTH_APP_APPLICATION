
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeHeader() {
  return (
    <View className="px-4 pt-3 pb-2">
      <View className="flex-row items-center justify-between">
        
        <Image
              source={require("../../../assets/images/logo_o_positive.png")}
              resizeMode="contain"
              style={{ width: 200, height: 64 }}
            />

        <View className="flex-row items-center gap-4">
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="bell-outline"
              size={25}
              color="#172554"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name="help-circle-outline"
              size={25}
              color="#172554"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity className="flex-row items-center mt-2">
        <MaterialCommunityIcons
          name="map-marker"
          size={20}
          color="#0796D2"
        />
        <Text className="text-sm font-bold text-slate-800 ml-1">
          New Delhi
        </Text>
        <MaterialCommunityIcons
          name="chevron-down"
          size={18}
          color="#172554"
        />
      </TouchableOpacity>
    </View>
  );
}
