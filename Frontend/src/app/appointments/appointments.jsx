import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { fetchMyAppointments } from "../../service/appointmentService";

const COLORS = {
  navy: "#123D83",
  blue: "#087BC1",
};

// Status ka naam aur rang
const STATUS = {
  pending: { label: "Request received", color: "#F58220" },
  contacted: { label: "Team ne call kiya", color: "#087BC1" },
  confirmed: { label: "Confirmed", color: "#2E9E4F" },
  cancelled: { label: "Cancelled", color: "#D93025" },
};

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function AppointmentsScreen() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadAppointments = async () => {
    try {
      setError("");
      const res = await fetchMyAppointments();
      setItems(res.data || []);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Apni appointments dekhne ke liye pehle login karo.");
      } else {
        setError("Appointments load nahi hui. Dobara try karo.");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View className="h-[52px] flex-row items-center px-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={23} color={COLORS.navy} />
        </TouchableOpacity>

        <Text
          className="flex-1 text-[14px] font-bold"
          style={{ color: COLORS.navy }}
        >
          My Appointments
        </Text>
      </View>

      <ScrollView
        className="flex-1 bg-[#F7F9FC]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadAppointments();
            }}
          />
        }
      >
        {loading ? (
          <View className="mt-16 items-center">
            <ActivityIndicator size="large" color={COLORS.blue} />
          </View>
        ) : error ? (
          <Text className="mt-16 px-6 text-center text-[13px] text-gray-500">
            {error}
          </Text>
        ) : items.length === 0 ? (
          <Text className="mt-16 px-6 text-center text-[13px] text-gray-500">
            Abhi koi appointment request nahi hai. Doctor ya hospital se Book Appointment dabao.
          </Text>
        ) : (
          items.map((item) => {
            const status = STATUS[item.status] || STATUS.pending;
            const title =
              item.doctorName ||
              item.hospitalName ||
              item.conditionName ||
              "Appointment request";

            return (
              <View
                key={item._id}
                className="mx-3 mt-3 rounded-xl bg-white p-4 border border-gray-100"
              >
                <View className="flex-row items-start justify-between">
                  <Text className="flex-1 pr-2 text-[14px] font-bold text-[#172033]">
                    {title}
                  </Text>

                  <View
                    className="rounded-full px-3 py-1"
                    style={{ backgroundColor: status.color + "22" }}
                  >
                    <Text
                      className="text-[10px] font-bold"
                      style={{ color: status.color }}
                    >
                      {status.label}
                    </Text>
                  </View>
                </View>

                {item.hospitalName && item.doctorName ? (
                  <Text className="mt-1 text-[12px] text-gray-500">
                    {item.hospitalName}
                  </Text>
                ) : null}

                {item.conditionName ? (
                  <Text className="mt-1 text-[12px] text-gray-500">
                    Condition: {item.conditionName}
                  </Text>
                ) : null}

                <Text className="mt-2 text-[12px] text-gray-600">
                  Preferred: {item.preferredDate}, {item.preferredTime}
                </Text>

                <Text className="mt-1 text-[11px] text-gray-400">
                  Request bheji: {formatDate(item.createdAt)}
                </Text>

                {item.adminNote ? (
                  <Text className="mt-2 text-[12px] text-[#123D83]">
                    Team ka note: {item.adminNote}
                  </Text>
                ) : null}
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}