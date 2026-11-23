import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
} from "react-native";
// status bar ke neeche se shuru ho isliye ye SafeAreaView
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { showImage } from "../../config/api";
import { WHATSAPP_NUMBER } from "../../constants/contact";
import AppointmentModal from "../forms/AppointmentModal";

const COLORS = {
  navy: "#123D83",
  blue: "#087BC1",
  green: "#25D366",
};

// hospital ki services (abhi fixed list)
const SERVICES = [
  { label: "Appointment help", icon: "calendar-outline", bg: "#DCEBF7", color: "#087BC1" },
  { label: "Doctor consultation", icon: "person-outline", bg: "#E4F3F4", color: "#0F6E7A" },
  { label: "Insurance support", icon: "shield-checkmark-outline", bg: "#E8F4DC", color: "#2E5E0F" },
  { label: "Medical loan help", icon: "cash-outline", bg: "#FDEBDD", color: "#B35309" },
];

export default function HospitalDetailsScreen({ hospital }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const [bookingOpen, setBookingOpen] = useState(false);

  const doctors = hospital.doctors || [];
  const phone = hospital.phone ? String(hospital.phone).replace(/\s/g, "") : "";

  const callHospital = () => {
    Linking.openURL("tel:" + phone);
  };

  const whatsappHospital = () => {
    Linking.openURL("https://wa.me/" + phone.replace(/\D/g, ""));
  };

  // O Positive team ko WhatsApp
  const whatsappTeam = () => {
    const text = "Hello, mujhe " + hospital.name + " ke baare me jaankari chahiye.";
    Linking.openURL(
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text)
    );
  };

  const openDoctor = (doctor) => {
    router.push({ pathname: "/doctor-details", params: { id: doctor._id } });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View className="h-[56px] flex-row items-center px-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color={COLORS.navy} />
        </TouchableOpacity>

        <Text
          className="flex-1 text-[16px] font-bold"
          style={{ color: COLORS.navy }}
          numberOfLines={1}
        >
          Hospital
        </Text>
      </View>

      <ScrollView
        className="flex-1 bg-[#F4F7FB]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Photo + naam */}
        <View className="bg-white px-4 pb-5 pt-4">
          {hospital.image ? (
            <Image
              source={{ uri: showImage(hospital.image) }}
              style={{ width: "100%", height: 170, borderRadius: 16 }}
              resizeMode="cover"
            />
          ) : (
            <View className="h-[160px] w-full items-center justify-center rounded-2xl bg-[#DCEBF7]">
              <Ionicons name="medical" size={44} color={COLORS.blue} />
            </View>
          )}

          <View className="mt-4 flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-[22px] font-extrabold text-[#172033]">
                {hospital.name}
              </Text>

              {hospital.address || hospital.city ? (
                <View className="mt-1.5 flex-row items-start">
                  <Ionicons name="location-outline" size={16} color="#5B6B7F" />
                  <Text className="ml-1 flex-1 text-[13px] leading-[18px] text-[#5B6B7F]">
                    {[hospital.address, hospital.city].filter(Boolean).join(", ")}
                  </Text>
                </View>
              ) : null}

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
            </View>

            <View className="rounded-full bg-[#E8F4DC] px-3 py-1.5">
              <Text className="text-[11px] font-semibold text-[#2E5E0F]">
                O Positive partner
              </Text>
            </View>
          </View>

          {/* Call / WhatsApp (sirf jab phone ho) */}
          {phone ? (
            <View className="mt-4 flex-row gap-3">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={callHospital}
                className="h-[46px] flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-[#087BC1]"
              >
                <Ionicons name="call-outline" size={18} color={COLORS.blue} />
                <Text className="text-[14px] font-bold text-[#087BC1]">Call</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={whatsappHospital}
                className="h-[46px] flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-[#25D366]"
              >
                <Ionicons name="logo-whatsapp" size={18} color="#167A47" />
                <Text className="text-[14px] font-bold text-[#167A47]">
                  WhatsApp
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        {/* Tabs */}
        <View className="h-12 flex-row border-b border-t border-gray-100 bg-white">
          {["Overview", "Doctors"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={
                activeTab === tab
                  ? "flex-1 items-center justify-center border-b-[3px] border-[#087BC1]"
                  : "flex-1 items-center justify-center"
              }
            >
              <Text
                className={
                  activeTab === tab
                    ? "text-[14px] font-bold text-[#087BC1]"
                    : "text-[14px] text-gray-500"
                }
              >
                {tab === "Doctors" ? "Doctors (" + doctors.length + ")" : tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === "Overview" ? (
          <View className="px-4 pt-4">
            {/* About */}
            <View className="rounded-2xl border border-[#E3E9F1] bg-white p-4">
              <Text className="text-[16px] font-bold text-[#172033]">
                About this hospital
              </Text>
              <Text className="mt-2 text-[14px] leading-[22px] text-[#44546A]">
                {hospital.about || "Is hospital ki zyada jaankari jaldi add hogi."}
              </Text>
            </View>

            {/* Our services */}
            <Text className="mb-2.5 ml-1 mt-5 text-[16px] font-bold text-[#172033]">
              Our services
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {SERVICES.map((s) => (
                <View
                  key={s.label}
                  className="mb-3 w-[48%] flex-row items-center rounded-[14px] border border-[#E3E9F1] bg-white p-3"
                >
                  <View
                    className="h-9 w-9 items-center justify-center rounded-[10px]"
                    style={{ backgroundColor: s.bg }}
                  >
                    <Ionicons name={s.icon} size={20} color={s.color} />
                  </View>
                  <Text className="ml-2.5 flex-1 text-[13px] font-semibold leading-[18px] text-[#172033]">
                    {s.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View className="px-4 pt-3">
            {doctors.map((doctor) => (
              <TouchableOpacity
                key={doctor._id}
                activeOpacity={0.85}
                onPress={() => openDoctor(doctor)}
                className="mb-3 flex-row items-center rounded-2xl border border-[#E3E9F1] bg-white p-3"
              >
                <Image
                  source={
                    doctor.photo
                      ? { uri: showImage(doctor.photo) }
                      : require("../../../assets/images/doctor-avatar.png")
                  }
                  style={{ width: 56, height: 56, borderRadius: 28 }}
                  resizeMode="cover"
                />

                <View className="ml-3 flex-1">
                  <Text className="text-[15px] font-bold text-[#172033]">
                    {doctor.name}
                  </Text>
                  <Text className="mt-0.5 text-[13px] text-[#5B6B7F]">
                    {doctor.specialty}
                    {doctor.experience
                      ? " · " + doctor.experience + " years experience"
                      : ""}
                  </Text>
                </View>

                <Ionicons name="chevron-forward" size={20} color="#5B6B7F" />
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

      {/* Neeche fixed bar: WhatsApp Us + Book Appointment */}
      <View className="h-[80px] flex-row items-center gap-3 border-t border-gray-100 bg-white px-4">
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={whatsappTeam}
          className="h-[50px] flex-1 items-center justify-center rounded-full border border-[#25D366]"
        >
          <Text className="text-[14px] font-bold text-[#167A47]">WhatsApp Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setBookingOpen(true)}
          className="h-[50px] items-center justify-center rounded-full"
          style={{ flex: 1.3, backgroundColor: COLORS.blue }}
        >
          <Text className="text-[14px] font-bold text-white">Book Appointment</Text>
        </TouchableOpacity>
      </View>

      <AppointmentModal
        visible={bookingOpen}
        onClose={() => setBookingOpen(false)}
        context={{ hospitalName: hospital.name }}
      />
    </SafeAreaView>
  );
}