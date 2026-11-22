import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { fetchConditions } from "../../service/conditionService";

const ICON_COLOR = "#0753B8";

// Card dono jagah use hota hai: home grid aur View All page
export const ConditionCard = ({ item, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    className="w-[23.5%] h-[88px] bg-white rounded-xl border border-slate-100 shadow-sm items-center justify-center mb-3 px-1"
  >
    {item.iconUrl ? (
      <Image
        source={{ uri: item.iconUrl }}
        style={{ width: 27, height: 27 }}
        resizeMode="contain"
      />
    ) : (
      <MaterialCommunityIcons
        name={item.icon || "medical-bag"}
        size={27}
        color={ICON_COLOR}
      />
    )}

    <Text
      numberOfLines={2}
      className="text-[10px] font-semibold text-slate-800 text-center mt-2"
    >
      {item.name}
    </Text>
  </TouchableOpacity>
);

export default function Conditions() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchConditions(8);
        setItems(res.data);
      } catch (e) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View className="px-4 mt-2 mb-5">
      {/* Heading */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-base font-bold text-slate-900">Conditions</Text>

        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/conditions")}>
          <Text className="text-xs font-semibold text-blue-600">View All</Text>
        </TouchableOpacity>
      </View>

      {/* Condition Cards */}
      {loading ? (
        <ActivityIndicator color={ICON_COLOR} />
      ) : items.length === 0 ? (
        <Text className="text-xs text-slate-500">No conditions available.</Text>
      ) : (
        <View className="flex-row flex-wrap justify-between">
          {items.map((item) => (
            <ConditionCard
              key={item._id}
              item={item}
              onPress={() => router.push(`/conditions/${item.slug}`)}
            />
          ))}
        </View>
      )}
    </View>
  );
}