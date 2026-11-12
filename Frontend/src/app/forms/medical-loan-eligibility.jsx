
import React from "react";
import {
  View,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import MedicalLoanEligibilityForm from "../../components/forms/MedicalLoanEligibilityForm";

const MedicalLoanEligibilityScreen = () => {
  const router = useRouter();

  const handleSubmit = (formData) => {
    console.log("Medical Loan Form:", formData);

    Alert.alert(
      "Form Submitted",
      "Your eligibility details have been submitted successfully.",
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      {/* Back Button */}
      <View className="px-4 pt-2">
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

      <MedicalLoanEligibilityForm
        onSubmit={handleSubmit}
      />

    </SafeAreaView>
  );
};

export default MedicalLoanEligibilityScreen;
