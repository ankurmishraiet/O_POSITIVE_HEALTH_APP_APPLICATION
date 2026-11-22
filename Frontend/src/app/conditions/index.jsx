import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { fetchConditions } from "../../service/conditionService";
import { ConditionCard } from "../../components/home/Conditions";

export default function AllConditions() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchConditions();
        setItems(res.data);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7FAFE" }} edges={["top"]}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 16, backgroundColor: "#fff" }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#123D83" />
        </TouchableOpacity>
        <Text style={{ marginLeft: 12, fontSize: 18, fontWeight: "800", color: "#17213B" }}>
          All Conditions
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color="#087BC1" />
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {items.map((c) => (
              <ConditionCard key={c._id} item={c} onPress={() => router.push(`/conditions/${c.slug}`)} />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}