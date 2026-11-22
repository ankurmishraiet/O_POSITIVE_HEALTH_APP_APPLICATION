import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { showImage } from "../../config/api";

const COLORS = {
  navy: "#123D83",
  blue: "#087BC1",
  green: "#A5C83C",
};

export default function HospitalDetailsScreen({ hospital }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");

  const doctors = hospital.doctors || [];
  const phone = hospital.phone ? String(hospital.phone).replace(/\s/g, "") : "";

  const callHospital = () => {
    Linking.openURL("tel:" + phone);
  };

  const whatsappHospital = () => {
    Linking.openURL("https://wa.me/" + phone.replace(/\D/g, ""));
  };

  const handleBooking = () => {
    alert("Appointment booking jaldi shuru hogi");
  };

  const openDoctor = (doctor) => {
    router.push({ pathname: "/doctor-details", params: { id: doctor._id } });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
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
          {hospital.name}
        </Text>
      </View>

      <ScrollView
        className="flex-1 bg-[#F7F9FC]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="bg-white px-4 pb-4 pt-4">
          {hospital.image ? (
            <Image
              source={{ uri: showImage(hospital.image) }}
              style={{ width: "100%", height: 170, borderRadius: 12 }}
              resizeMode="cover"
            />
          ) : (
            <View className="h-[120px] w-full items-center justify-center rounded-xl bg-[#EAF4FB]">
              <Ionicons name="medical" size={40} color={COLORS.blue} />
            </View>
          )}

          <Text className="mt-3 text-[18px] font-extrabold text-[#172033]">
            {hospital.name}
          </Text>

          {hospital.rating ? (
            <View className="mt-1.5 flex-row items-center">
              <Ionicons name="star" size={14} color="#FF873C" />

              <Text className="ml-1 text-[12px] font-bold text-[#F27B30]">
                {hospital.rating}
              </Text>

              {hospital.reviews ? (
                <Text className="ml-1 text-[11px] text-gray-500">
                  ({hospital.reviews} reviews)
                </Text>
              ) : null}
            </View>
          ) : null}

          {hospital.address || hospital.city ? (
            <View className="mt-2 flex-row items-start">
              <Ionicons name="location-outline" size={16} color="#91A3B5" />

              <Text className="ml-1 flex-1 text-[12px] leading-[17px] text-gray-500">
                {[hospital.address, hospital.city].filter(Boolean).join(", ")}
              </Text>
            </View>
          ) : null}

          {phone ? (
            <View className="mt-3 flex-row gap-3">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={callHospital}
                className="h-[38px] flex-1 flex-row items-center justify-center gap-2 rounded-full border border-[#087BC1]"
              >
                <Ionicons name="call-outline" size={16} color={COLORS.blue} />

                <Text className="text-[12px] font-bold text-[#087BC1]">
                  Call
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={whatsappHospital}
                className="h-[38px] flex-1 flex-row items-center justify-center gap-2 rounded-full border border-[#25D366]"
              >
                <Ionicons name="logo-whatsapp" size={16} color="#25D366" />

                <Text className="text-[12px] font-bold text-[#25D366]">
                  WhatsApp
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleBooking}
            className="mt-3 h-[44px] items-center justify-center rounded-full"
            style={{ backgroundColor: COLORS.blue }}
          >
            <Text className="text-[14px] font-bold text-white">
              Book Appointment
            </Text>
          </TouchableOpacity>
        </View>

        <View className="h-12 flex-row border-b border-gray-100 bg-white">
          {["Overview", "Doctors"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={
                activeTab === tab
                  ? "flex-1 items-center justify-center border-b-2 border-[#087BC1]"
                  : "flex-1 items-center justify-center"
              }
            >
              <Text
                className={
                  activeTab === tab
                    ? "text-[12px] font-bold text-[#087BC1]"
                    : "text-[12px] text-gray-500"
                }
              >
                {tab === "Doctors" ? "Doctors (" + doctors.length + ")" : tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === "Overview" ? (
          <View className="mx-3 mt-3 rounded-xl bg-white p-4">
            <Text className="text-[15px] font-extrabold text-[#172033]">
              Overview
            </Text>

            <Text className="mt-2 text-[12px] leading-[18px] text-gray-600">
              {hospital.about || "Is hospital ki zyada jaankari jaldi add hogi."}
            </Text>
          </View>
        ) : (
          <View>
            {doctors.map((doctor) => (
              <TouchableOpacity
                key={doctor._id}
                activeOpacity={0.85}
                onPress={() => openDoctor(doctor)}
                className="mx-3 mt-3 flex-row items-center rounded-xl bg-white p-3"
              >
                <Image
                  source={
                    doctor.photo
                      ? { uri: showImage(doctor.photo) }
                      : require("../../../assets/images/doctor-avatar.png")
                  }
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                  resizeMode="cover"
                />

                <View className="ml-3 flex-1">
                  <Text className="text-[13px] font-bold text-[#172033]">
                    {doctor.name}
                  </Text>

                  <Text className="mt-0.5 text-[11px] text-gray-500">
                    {doctor.specialty}
                  </Text>

                  {doctor.experience ? (
                    <Text className="mt-0.5 text-[11px] text-gray-500">
                      Experience: {doctor.experience} years
                    </Text>
                  ) : null}
                </View>

                <Ionicons name="chevron-forward" size={18} color="#91A3B5" />
              </TouchableOpacity>
            ))}

            {doctors.length === 0 && (
              <Text className="mt-10 text-center text-[12px] text-gray-500">
                Is hospital ke doctors abhi add nahi hue
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}