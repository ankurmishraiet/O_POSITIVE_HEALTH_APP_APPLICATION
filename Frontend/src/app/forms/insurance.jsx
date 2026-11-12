
import React from "react";
import {
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import CheckInsuranceForm from "../../components/forms/CheckInsuranceForm";

const InsuranceScreen = () => {
  const router = useRouter();

  const handleSubmit = (formData) => {
    console.log("Insurance Form Data:", formData);

    Alert.alert(
      "Success",
      "Your insurance details have been submitted successfully."
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      {/* Back Button */}
      <View className="px-4 pt-1">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 justify-center"
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#153B59"
          />
        </TouchableOpacity>
      </View>

      <CheckInsuranceForm onSubmit={handleSubmit} />

    </SafeAreaView>
  );
};

export default InsuranceScreen;
