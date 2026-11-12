import React from "react";
import { View, Text, Image, Pressable, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function OnboardingIndex() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View className="flex-1 overflow-hidden bg-white">
        {/* Decorative background shapes */}
        <Image
          source={require("../../../assets/images/Vector.png")}
          resizeMode="stretch"
          className="absolute right-0 top-0 h-[125px] w-[105px]"
        />
        <Image
          source={require("../../../assets/images/Vector-1.png")}
          resizeMode="stretch"
          className="absolute right-0 top-0 h-[190px] w-[105px]"
        />
        <Image
          source={require("../../../assets/images/Vector-2.png")}
          resizeMode="stretch"
          className="absolute bottom-0 left-0 h-[55px] w-full"
        />
        <Image
          source={require("../../../assets/images/Vector-3.png")}
          resizeMode="stretch"
          className="absolute bottom-0 right-0 h-[90px] w-[125px]"
        />
        <Image
          source={require("../../../assets/images/Vector4.png")}
          resizeMode="stretch"
          className="absolute bottom-0 right-0 h-[150px] w-[240px]"
        />

        {/* All content: vertically centered */}
        <View className="flex-1 gap-4 justify-center" style={{ paddingBottom: 24 }}>
          {/* Brand */}
          <View className="items-center">
            <Image
              source={require("../../../assets/images/logo_o_positive.png")}
              resizeMode="contain"
              style={{ width: 200, height: 64 }}
            />
            <Text
              className="mt-1 text-center font-extrabold text-blue-800"
              style={{ fontSize: 18, letterSpacing: 0.5 }}
            >
              O POSITIVE HEALTH
            </Text>

            {/* Tagline with lines on both sides */}
            <View className="mt-1 flex-row items-center">
              <View style={{ width: 16, height: 1.5, backgroundColor: "#F97316" }} />
              <Text
                className="mx-2 font-bold text-orange-500"
                style={{ fontSize: 11, letterSpacing: 0.5 }}
              >
                HOPE STARTS HERE
              </Text>
              <View style={{ width: 16, height: 1.5, backgroundColor: "#F97316" }} />
            </View>
          </View>

          {/* Hero image */}
          <View className="mx-6 mt-6 h-[220px] overflow-hidden rounded-[28px]">
            <Image
              source={require("../../../assets/images/o_positive_health.png")}
              resizeMode="cover"
              className="h-full w-full"
            />
          </View>

          {/* Intro text */}
          <View className="mt-6 items-center px-5">
            <Text className="text-center text-[20px] font-extrabold leading-7 text-blue-950">
              Your Complete{"\n"}Healthcare Partner
            </Text>
          </View>

          {/* Pagination dots */}
          <View className="mt-6 flex-row items-center justify-center">
            <View className="mx-1 h-2.5 w-2.5 rounded-full bg-blue-700" />
            <View className="mx-1 h-2.5 w-2.5 rounded-full bg-blue-200" />
            <View className="mx-1 h-2.5 w-2.5 rounded-full bg-blue-200" />
          </View>

          {/* Get started button */}
          <View className="mt-6 px-6">
            <Pressable
             onPress={() => router.push("/onboarding/doctors")}
              className="h-12 flex-row items-center justify-center rounded-full bg-blue-700 active:bg-blue-800"
            >
              <Text className="mr-3 text-[15px] font-bold text-white">
                Get Started
              </Text>
              <Text className="text-xl font-bold text-white">➜</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}