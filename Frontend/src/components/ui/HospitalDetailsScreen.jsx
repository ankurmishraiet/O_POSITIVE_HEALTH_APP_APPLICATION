
import React, { useState } from "react";
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

export default function HospitalDetailsScreen({ hospital }) {
  const [activeTab, setActiveTab] = useState("Overview");

  const hospitalName = hospital?.name || "Apex Hospital, Borivali West, Chandravarkar Road";
  const address =
    hospital?.address ||
    "Vaishali Heights, Chandavarkar Rd, Mumbai";

  const tabs = ["Overview", "Specialities", "Doctors", "Reviews"];

  const handleCall = () => {
    Linking.openURL("tel:8448534103");
  };

  const handleWhatsApp = () => {
    Linking.openURL("https://wa.me/918448534103");
  };

  const handleBooking = () => {
    // Connect your appointment booking screen here.
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* HEADER */}
      <View className="h-[50px] flex-row items-center px-3 border-b border-gray-100">
        <TouchableOpacity className="mr-3">
          <Ionicons name="arrow-back" size={23} color={COLORS.navy} />
        </TouchableOpacity>

        <Text
          className="flex-1 text-[13px] font-bold text-[#123D83]"
          numberOfLines={1}
        >
          {hospitalName}
        </Text>

        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={handleCall}>
            <Ionicons name="call" size={19} color={COLORS.blue} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleWhatsApp}>
            <Ionicons name="logo-whatsapp" size={20} color="#08B66A" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="search" size={20} color={COLORS.navy} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        {/* HOSPITAL INFORMATION */}
        <View className="px-3 pt-3">
          <View className="flex-row justify-between items-start">

            {/* LEFT DETAILS */}
            <View className="flex-1 pr-2">
              <Text className="text-[16px] font-extrabold leading-[22px] text-[#172033]">
                {hospitalName}
              </Text>

              <Text className="mt-2 text-[9px] leading-[14px] text-gray-500">
                {address}
              </Text>

              <Text className="mt-1 text-[9px] text-gray-500">
                Multi-Speciality Hospital
              </Text>

              <Text className="mt-1 text-[9px] text-gray-500">
                5 Doctors | 18 Specialities
              </Text>
            </View>

            {/* HOSPITAL LOGO */}
            <View className="h-[65px] w-[90px] items-center justify-center rounded-lg border border-gray-100">
              <View className="flex-row items-center">
                <Ionicons name="medical" size={18} color={COLORS.green} />
                <Text className="ml-1 text-[8px] font-extrabold text-[#087BC1]">
                  APEX
                </Text>
              </View>
              <Text className="text-[6px] font-semibold text-gray-500">
                HOSPITALS
              </Text>
            </View>
          </View>

          {/* RATING */}
          <View className="mt-3 flex-row items-center justify-between">
            <View>
              <View className="flex-row items-center">
                <Ionicons name="star" size={13} color="#F58B35" />
                <Text className="ml-1 text-[10px] font-bold text-green-600">
                  {hospital?.rating || "4.5/5"} Rating
                </Text>
              </View>

              <Text className="mt-1 text-[9px] text-gray-500">
                {hospital?.reviews || "88 Reviews"}
              </Text>
            </View>
          </View>

          {/* BOOK APPOINTMENT */}
          <TouchableOpacity
            onPress={handleBooking}
            activeOpacity={0.85}
            className="mt-3 h-[35px] flex-row items-center justify-center gap-2 rounded-full bg-[#087BC1]"
          >
            <Ionicons name="calendar-outline" size={15} color="white" />
            <Text className="text-[10px] font-bold text-white">
              Book Appointment
            </Text>
          </TouchableOpacity>

          {/* WHATSAPP BUTTON */}
          <TouchableOpacity
            onPress={handleWhatsApp}
            className="mt-2 h-[32px] flex-row items-center justify-center gap-2 rounded-full border border-[#16A66A]"
          >
            <Ionicons name="logo-whatsapp" size={15} color="#16A66A" />
            <Text className="text-[10px] font-bold text-[#16A66A]">
              WhatsApp Enquiry
            </Text>
          </TouchableOpacity>

          {/* ENQUIRY MESSAGE */}
          <View className="mt-3 flex-row items-center justify-center rounded-lg bg-[#EFF7FC] py-2">
            <Ionicons
              name="people-outline"
              size={13}
              color={COLORS.blue}
            />
            <Text className="ml-1 text-[8px] text-[#087BC1]">
              44 Patients enquired about the Doctor in last 1 hour
            </Text>
          </View>
        </View>

        {/* TABS */}
        <View className="mt-4 flex-row border-b border-gray-200">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className="flex-1 items-center justify-center py-3"
            >
              <Text
                className={`text-[10px] ${
                  activeTab === tab
                    ? "font-bold text-[#087BC1]"
                    : "font-medium text-gray-500"
                }`}
              >
                {tab}
              </Text>

              {activeTab === tab && (
                <View className="absolute bottom-0 h-[2px] w-[75%] rounded-full bg-[#087BC1]" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* TAB CONTENT */}
        <View className="px-3 pt-4">

          {activeTab === "Overview" && (
            <View>
              <Text className="text-[16px] font-bold text-[#172033]">
                Overview
              </Text>

              <Text className="mt-2 text-[11px] leading-[19px] text-gray-600">
                The Apex Group of Hospitals is the fruition of many
                people's goals and visions, but most importantly, the
                patients. Apex Hospitals is committed to providing
                quality healthcare services with advanced medical
                facilities and experienced healthcare professionals.
              </Text>

              <TouchableOpacity className="mt-2 self-end">
                <Text className="text-[10px] font-bold text-[#087BC1]">
                  Read more
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === "Specialities" && (
            <View>
              <Text className="text-[16px] font-bold text-[#172033]">
                Specialities
              </Text>

              {[
                "General Surgery",
                "Cardiology",
                "Orthopaedics",
                "Gastroenterology",
                "Neurology",
                "Urology",
                "Ophthalmology",
                "Internal Medicine",
              ].map((item, index) => (
                <View
                  key={index}
                  className="mt-3 flex-row items-center rounded-lg border border-gray-100 p-3"
                >
                  <Ionicons
                    name="medical-outline"
                    size={17}
                    color={COLORS.blue}
                  />
                  <Text className="ml-3 text-[11px] font-medium text-gray-700">
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {activeTab === "Doctors" && (
            <View>
              <Text className="text-[16px] font-bold text-[#172033]">
                Doctors
              </Text>

              <View className="mt-3 rounded-xl border border-gray-100 p-3">
                <View className="flex-row items-center">
                  <View className="h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                    <Ionicons
                      name="person"
                      size={25}
                      color={COLORS.blue}
                    />
                  </View>

                  <View className="ml-3 flex-1">
                    <Text className="text-[12px] font-bold text-gray-800">
                      Hospital Specialist
                    </Text>
                    <Text className="mt-1 text-[10px] text-gray-500">
                      Experienced Medical Professional
                    </Text>
                  </View>
                </View>

                <Text className="mt-3 text-[10px] text-gray-500">
                  Contact us to know about available doctors.
                </Text>
              </View>
            </View>
          )}

          {activeTab === "Reviews" && (
            <View>
              <Text className="text-[16px] font-bold text-[#172033]">
                Patient Reviews
              </Text>

              <View className="mt-3 rounded-xl border border-gray-100 p-4">
                <Text className="text-[24px] font-extrabold text-[#123D83]">
                  {hospital?.rating || "4.5/5"}
                </Text>

                <View className="mt-1 flex-row">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Ionicons
                      key={item}
                      name="star"
                      size={15}
                      color="#F58B35"
                    />
                  ))}
                </View>

                <Text className="mt-2 text-[10px] text-gray-500">
                  Based on {hospital?.reviews || "88 Reviews"}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
