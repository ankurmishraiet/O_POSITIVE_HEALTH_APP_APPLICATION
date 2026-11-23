import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL, showImage } from "../../config/api";
import AppointmentModal from "../forms/AppointmentModal";

const COLORS = {
  navy: "#123D83",
  blue: "#087BC1",
  green: "#A5C83C",
};

export default function HospitalsScreen() {
  const router = useRouter();
  const [hospitals, setHospitals] = useState([]);
  // Jis hospital ka button dabaya wo yahan save hota hai (null = pop-up band)
  const [bookingHospital, setBookingHospital] = useState(null);

  useEffect(() => {
    const loadHospitals = async () => {
      try {
        const res = await fetch(BASE_URL + "/hospitals");
        const data = await res.json();
        if (Array.isArray(data)) setHospitals(data);
      } catch (err) {
        console.log("Hospitals load nahi hue");
      }
    };
    loadHospitals();
  }, []);

  const openHospital = (hospital) => {
    router.push({ pathname: "/hospital-details", params: { id: hospital._id } });
  };

  // Button dabane par us hospital ko save karke pop-up kholo
  const handleBooking = (hospital) => {
    setBookingHospital(hospital);
  };

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
          numberOfLines={1}
        >
          Hospitals
        </Text>
      </View>

      <View className="h-12 flex-row border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.push("/consultant/doctors")}
          className="flex-1 items-center justify-center"
        >
          <Text className="text-[11px] text-gray-500">Doctors</Text>
        </TouchableOpacity>

        <View className="flex-1 items-center justify-center border-b-2 border-[#087BC1]">
          <Text className="text-[11px] font-bold text-[#087BC1]">
            Hospitals
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 bg-[#F7F9FC]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 15 }}
      >
        <View className="px-3 pt-5">
          <Text className="text-[17px] font-extrabold text-[#172033]">
            Hospitals & Clinics
          </Text>

          <View className="mt-1 h-[3px] w-10 rounded-full bg-[#087BC1]" />
        </View>

        {hospitals.map((hospital) => (
          <TouchableOpacity
            key={hospital._id}
            activeOpacity={0.85}
            onPress={() => openHospital(hospital)}
            className="mx-3 mt-3 rounded-xl bg-white p-3 border border-gray-100"
          >
            <View className="flex-row items-start gap-2.5">
              {hospital.image ? (
                <Image
                  source={{ uri: showImage(hospital.image) }}
                  style={{ width: 66, height: 58, borderRadius: 8 }}
                  resizeMode="cover"
                />
              ) : (
                <View className="h-[58px] w-[66px] items-center justify-center rounded-lg border border-gray-200">
                  <View
                    className="h-5 w-5 items-center justify-center rounded-full border"
                    style={{ borderColor: COLORS.blue }}
                  >
                    <Ionicons name="medical" size={12} color={COLORS.blue} />
                  </View>

                  <Text
                    className="mt-1 text-[8px] font-extrabold"
                    style={{ color: COLORS.blue }}
                    numberOfLines={1}
                  >
                    {hospital.name.split(" ")[0].toUpperCase()}
                  </Text>

                  <Text className="text-[5px] text-gray-400">
                    Medical Centre
                  </Text>
                </View>
              )}

              <View className="flex-1">
                <Text className="text-[11px] font-bold leading-4 text-[#172033]">
                  {hospital.name}
                </Text>

                {hospital.rating ? (
                  <View className="mt-1.5 flex-row items-center">
                    <Ionicons name="star" size={13} color="#FF873C" />

                    <Text className="ml-1 text-[10px] font-bold text-[#F27B30]">
                      {hospital.rating}
                    </Text>

                    {hospital.reviews ? (
                      <Text className="ml-1 text-[9px] text-gray-500">
                        ({hospital.reviews})
                      </Text>
                    ) : null}
                  </View>
                ) : null}

                {hospital.address || hospital.city ? (
                  <View className="mt-1 flex-row items-start">
                    <Ionicons
                      name="location-outline"
                      size={15}
                      color="#91A3B5"
                    />

                    <Text className="ml-1 flex-1 text-[9px] leading-[13px] text-gray-500">
                      {hospital.address || hospital.city}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleBooking(hospital)}
              className="mt-3 h-[32px] flex-row items-center justify-center gap-2 rounded-full border border-[#087BC1]"
            >
              <Ionicons name="calendar-outline" size={14} color={COLORS.blue} />

              <Text className="text-[10px] font-bold text-[#087BC1]">
                Book Appointment
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {hospitals.length === 0 && (
          <Text className="mt-10 text-center text-[12px] text-gray-500">
            Abhi koi hospital nahi hai
          </Text>
        )}
      </ScrollView>

      {/* Appointment pop-up, chune hue hospital ka naam saath jata hai */}
      <AppointmentModal
        visible={bookingHospital !== null}
        onClose={() => setBookingHospital(null)}
        context={{ hospitalName: bookingHospital ? bookingHospital.name : "" }}
      />
    </SafeAreaView>
  );
}