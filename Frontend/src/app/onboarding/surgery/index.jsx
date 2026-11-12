
import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Surgery() {
  const router = useRouter();

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top", "bottom"]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <View className="flex-1 gap-1 overflow-hidden bg-white">

        {/* Decorative Background Vectors */}
        <Image
          source={require("../../../../assets/images/Vector.png")}
          resizeMode="stretch"
          className="absolute right-0 top-0 h-[125px] w-[105px]"
        />

        <Image
          source={require("../../../../assets/images/Vector-1.png")}
          resizeMode="stretch"
          className="absolute right-0 top-0 h-[190px] w-[105px]"
        />

        <Image
          source={require("../../../../assets/images/Vector-2.png")}
          resizeMode="stretch"
          className="absolute bottom-0 left-0 h-[55px] w-full"
        />

        <Image
          source={require("../../../../assets/images/Vector-3.png")}
          resizeMode="stretch"
          className="absolute bottom-0 right-0 h-[90px] w-[125px]"
        />

        <Image
          source={require("../../../../assets/images/Vector4.png")}
          resizeMode="stretch"
          className="absolute bottom-0 right-0 h-[150px] w-[240px]"
        />

        {/* Main Content */}
        <View
          className="flex-1 justify-center gap-4"
          style={{ paddingBottom: 24 }}
        >

          {/* Brand Logo */}
          <View className="items-center">
            <Image
              source={require("../../../../assets/images/logo_o_positive.png")}
              resizeMode="contain"
              style={{ width: 200, height: 64 }}
            />

            <Text
              className="mt-1 text-center font-extrabold text-blue-800"
              style={{
                fontSize: 18,
                letterSpacing: 0.5,
              }}
            >
              O POSITIVE HEALTH
            </Text>

            {/* Tagline */}
            <View className="mt-1 flex-row items-center">
              <View
                style={{
                  width: 16,
                  height: 1.5,
                  backgroundColor: "#F97316",
                }}
              />

              <Text
                className="mx-2 font-bold text-orange-500"
                style={{
                  fontSize: 11,
                  letterSpacing: 0.5,
                }}
              >
                HOPE STARTS HERE
              </Text>

              <View
                style={{
                  width: 16,
                  height: 1.5,
                  backgroundColor: "#F97316",
                }}
              />
            </View>
          </View>

          {/* Surgery Illustration */}
          <View className="mx-6 mt-6 h-[220px] items-center justify-center">
            <Image
              source={require("../../../../assets/images/surgery.png")}
              resizeMode="contain"
              style={{ width: 200, height: 300 }}
            />
          </View>

          {/* Heading and Description */}
          <View className="mt-6 items-center px-5">
            <Text className="text-center text-[20px] font-extrabold leading-7 text-blue-950">
              Book Surgeries &{"\n"}
              Treatments Easily
            </Text>

            <Text className="mt-3 text-center text-[13px] leading-5 text-gray-600">
              Find the right hospital, compare{"\n"}
              treatment options and book with{"\n"}
              complete assistance.
            </Text>
          </View>

          {/* Pagination Dots */}
          <View className="mt-6 flex-row items-center justify-center">
            <View className="mx-1 h-2 w-2 rounded-full bg-blue-200" />
            <View className="mx-1 h-2 w-2 rounded-full bg-blue-200" />
            <View className="mx-1 h-2.5 w-5 rounded-full bg-blue-700" />
          </View>

          {/* Next Button */}
          <View className="mt-6 px-6">
            <Pressable
              onPress={() => router.push("/onboarding/insurance")}
              className="h-12 flex-row items-center justify-center rounded-full bg-blue-700 active:bg-blue-800"
            >
              <Text className="mr-3 text-[15px] font-bold text-white">
                Next
              </Text>

              <Text className="text-xl font-bold text-white">
                ➜
              </Text>
            </Pressable>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}
