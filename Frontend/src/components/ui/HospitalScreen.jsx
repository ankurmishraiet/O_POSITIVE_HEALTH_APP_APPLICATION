
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  navy: "#123D83",
  blue: "#087BC1",
  green: "#A5C83C",
};

const hospitals = [
  {
    id: "1",
    name: "CDAS Super Speciality Hospital",
    rating: "4.55/5",
    reviews: "78 Ratings",
    address: "Malibu Town, Sector 47, Gurgaon",
    logo: "CDAS",
    color: "#087BC1",
  },
  {
    id: "2",
    name: "Lifeaid Medical Centre Sector 40",
    rating: "4.62/5",
    reviews: "81 Ratings",
    address:
      "Cyber Park, 1097 Shaheed Major Vikas Yadav Marg, near Unitech, Sector 40, Gurgaon",
    logo: "LIFEAID",
    color: "#A5C83C",
  },
  {
    id: "3",
    name: "BenSups Hospital, Delhi",
    rating: "4.5/5",
    reviews: "65 Ratings",
    address: "Delhi, India",
    logo: "BENSUPS",
    color: "#087BC1",
  },
];

export default function HospitalsScreen({
  onBack,
  onOverview,
  onDoctors,
  onBookAppointment,
  onSearch,
}) {
  const openWhatsApp = () =>
    Linking.openURL("https://wa.me/918448534103");

  const openPhone = () =>
    Linking.openURL("tel:8448534103");

  const handleBooking = (hospital) => {
    onBookAppointment?.(hospital);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />

      {/* HEADER */}
      <View className="h-[52px] flex-row items-center px-3 border-b border-gray-100">
        <TouchableOpacity onPress={onBack} className="mr-3">
          <Ionicons name="arrow-back" size={23} color={COLORS.navy} />
        </TouchableOpacity>

        <Text
          className="flex-1 text-[14px] font-bold"
          style={{ color: COLORS.navy }}
          numberOfLines={1}
        >
          Acute Liver Failure
        </Text>

        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={openPhone}>
            <Ionicons name="call" size={21} color={COLORS.blue} />
          </TouchableOpacity>

          <TouchableOpacity onPress={openWhatsApp}>
            <Ionicons name="logo-whatsapp" size={22} color="#08B66A" />
          </TouchableOpacity>

          <TouchableOpacity onPress={onSearch}>
            <Ionicons name="search" size={21} color={COLORS.navy} />
          </TouchableOpacity>
        </View>
      </View>

      {/* TABS */}
      <View className="h-12 flex-row border-b border-gray-100">
        <TouchableOpacity
          onPress={onOverview}
          className="flex-1 items-center justify-center"
        >
          <Text className="text-[11px] text-gray-500">Overview</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onDoctors}
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

      {/* HOSPITAL LIST */}
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
          <View
            key={hospital.id}
            className="mx-3 mt-3 rounded-xl bg-white p-3 border border-gray-100"
          >
            {/* HOSPITAL DETAILS */}
            <View className="flex-row items-start gap-2.5">
              
              {/* LOGO */}
              <View className="h-[58px] w-[66px] items-center justify-center rounded-lg border border-gray-200">
                <View
                  className="h-5 w-5 items-center justify-center rounded-full border"
                  style={{ borderColor: hospital.color }}
                >
                  <Ionicons
                    name="medical"
                    size={12}
                    color={hospital.color}
                  />
                </View>

                <Text
                  className="mt-1 text-[8px] font-extrabold"
                  style={{ color: hospital.color }}
                >
                  {hospital.logo}
                </Text>

                <Text className="text-[5px] text-gray-400">
                  Medical Centre
                </Text>
              </View>

              {/* INFORMATION */}
              <View className="flex-1">
                <Text className="text-[11px] font-bold leading-4 text-[#172033]">
                  {hospital.name}
                </Text>

                {/* RATING */}
                <View className="mt-1.5 flex-row items-center">
                  <Ionicons name="star" size={13} color="#FF873C" />

                  <Text className="ml-1 text-[10px] font-bold text-[#F27B30]">
                    {hospital.rating}
                  </Text>

                  <Text className="ml-1 text-[9px] text-gray-500">
                    ({hospital.reviews})
                  </Text>
                </View>

                {/* ADDRESS */}
                <View className="mt-1 flex-row items-start">
                  <Ionicons
                    name="location-outline"
                    size={15}
                    color="#91A3B5"
                  />

                  <Text className="ml-1 flex-1 text-[9px] leading-[13px] text-gray-500">
                    {hospital.address}
                  </Text>
                </View>
              </View>
            </View>

            {/* BOOK APPOINTMENT */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleBooking(hospital)}
              className="mt-3 h-[32px] flex-row items-center justify-center gap-2 rounded-full border border-[#087BC1]"
            >
              <Ionicons
                name="calendar-outline"
                size={14}
                color={COLORS.blue}
              />

              <Text className="text-[10px] font-bold text-[#087BC1]">
                Book Appointment
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* BOTTOM FIXED BUTTONS */}
      <View className="flex-row items-center gap-2.5 border-t border-gray-100 bg-white px-3 py-2">
        <TouchableOpacity
          onPress={openWhatsApp}
          activeOpacity={0.8}
          className="h-[40px] flex-[0.85] flex-row items-center justify-center gap-1.5 rounded-full border border-[#16A66A]"
        >
          <Ionicons
            name="logo-whatsapp"
            size={17}
            color="#08A95F"
          />

          <Text className="text-[11px] font-bold text-[#08A95F]">
            WhatsApp
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleBooking(hospitals[0])}
          activeOpacity={0.85}
          className="h-[40px] flex-[1.5] flex-row items-center justify-center gap-2 rounded-full bg-[#087BC1]"
        >
          <Ionicons
            name="calendar-outline"
            size={16}
            color="white"
          />

          <Text className="text-[11px] font-bold text-white">
            Book Appointment
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
