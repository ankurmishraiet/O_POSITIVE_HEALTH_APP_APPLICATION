
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  navy: "#123D83",
  blue: "#087BC1",
  green: "#A5C83C",
  orange: "#F58220",
  dark: "#17213B",
  text: "#153B59",
  border: "#D5E0EC",
  placeholder: "#929EAB",
  background: "#F7FAFE",
  white: "#FFFFFF",
};

const cities = [
  "Delhi",
  "Noida",
  "Gurugram",
  "Mohali",
  "Chandigarh",
  "Zirakpur",
  "Punjab",
  "Other",
];

const treatments = [
  "Cataract Surgery",
  "Coronary Angiography",
  "Liver Transplant",
  "Knee Replacement",
  "Piles Laser Treatment",
  "Liposuction",
  "Other",
];

// Reusable Dropdown
const Dropdown = ({
  label,
  placeholder,
  value,
  options,
  onSelect,
  required = false,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View className="mb-5">
      <Text className="text-[14px] font-bold mb-2"
        style={{ color: COLORS.text }}>
        {label}
        {required && (
          <Text style={{ color: COLORS.orange }}> *</Text>
        )}
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setVisible(true)}
        className="h-[54px] rounded-2xl px-4 flex-row items-center justify-between bg-white"
        style={{
          borderWidth: 1,
          borderColor: value ? COLORS.blue : COLORS.border,
          shadowColor: COLORS.navy,
          shadowOpacity: 0.04,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 2 },
          elevation: 1,
        }}
      >
        <Text
          className="text-[14px] font-medium"
          style={{
            color: value ? COLORS.dark : COLORS.placeholder,
          }}
        >
          {value || placeholder}
        </Text>

        <Ionicons
          name="chevron-down"
          size={21}
          color={COLORS.navy}
        />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(12,35,75,0.45)" }}
          onPress={() => setVisible(false)}
        >
          <Pressable
            className="bg-white rounded-t-[28px] px-5 pt-5 pb-8"
            style={{ maxHeight: "75%" }}
            onPress={(event) => event.stopPropagation()}
          >
            <View className="items-center mb-4">
              <View className="w-12 h-1 rounded-full bg-gray-300" />
            </View>

            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-[19px] font-extrabold"
                style={{ color: COLORS.navy }}>
                {label}
              </Text>

              <TouchableOpacity onPress={() => setVisible(false)}>
                <Ionicons name="close-circle" size={26} color="#8A98A8" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const selected = value === item;

                return (
                  <TouchableOpacity
                    onPress={() => {
                      onSelect(item);
                      setVisible(false);
                    }}
                    className="flex-row items-center justify-between p-4 rounded-xl mb-2"
                    style={{
                      backgroundColor: selected ? "#EAF4FF" : "#F8FAFC",
                      borderWidth: selected ? 1 : 0,
                      borderColor: COLORS.blue,
                    }}
                  >
                    <Text
                      className="text-[14px] font-semibold"
                      style={{
                        color: selected ? COLORS.navy : COLORS.dark,
                      }}
                    >
                      {item}
                    </Text>

                    <Ionicons
                      name={selected ? "radio-button-on" : "radio-button-off"}
                      size={21}
                      color={selected ? COLORS.blue : "#B5C0CC"}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

// Reusable Input
const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
}) => {
  return (
    <View className="mb-5">
      <Text className="text-[14px] font-bold mb-2"
        style={{ color: COLORS.text }}>
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
        keyboardType={keyboardType}
        className="h-[54px] rounded-2xl px-4 text-[14px] font-medium bg-white"
        style={{
          borderWidth: 1,
          borderColor: COLORS.border,
          color: COLORS.dark,
          shadowColor: COLORS.navy,
          shadowOpacity: 0.04,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 2 },
          elevation: 1,
        }}
      />
    </View>
  );
};

// Main Form
const MedicalLoanEligibilityForm = ({ onSubmit }) => {
  const [patientName, setPatientName] = useState("");
  const [city, setCity] = useState("");
  const [income, setIncome] = useState("");
  const [treatment, setTreatment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!patientName.trim()) {
      setError("Please enter patient name.");
      return;
    }

    if (!city) {
      setError("Please select a city.");
      return;
    }

    if (!income.trim() || Number(income) <= 0) {
      setError("Please enter a valid monthly income.");
      return;
    }

    if (!treatment) {
      setError("Please select treatment or condition.");
      return;
    }

    setError("");

    onSubmit?.({
      patientName: patientName.trim(),
      city,
      monthlyIncome: Number(income),
      treatment,
    });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 125,
        }}
      >

        {/* Logo */}
        <View className="items-center mt-2 mb-5">
          <Image
            source={require("../../../assets/images/logo_o_positive.png")}
            style={{ width: 200, height: 84 }}
            resizeMode="contain"
          />
        </View>

        {/* Heading */}
        <View className="mb-6">
          <Text className="text-[25px] font-extrabold leading-[32px]"
            style={{ color: COLORS.dark }}>
            Medical Loan Eligibility{"\n"}Checker
          </Text>

          <View className="w-14 h-1 rounded-full mt-3"
            style={{ backgroundColor: COLORS.orange }} />

          <Text className="text-[13px] mt-3 leading-5"
            style={{ color: "#738194" }}>
            Fill in your details to check your medical loan eligibility.
          </Text>
        </View>

        {/* Form Fields */}
        <View
          className="bg-white rounded-[22px] p-1"
        >
          <FormInput
            label="Patient Name"
            placeholder="Enter your name"
            value={patientName}
            onChangeText={setPatientName}
          />

          <Dropdown
            label="Select City"
            required
            placeholder="Select city"
            value={city}
            options={cities}
            onSelect={setCity}
          />

          <FormInput
            label="Net Monthly Income"
            placeholder="Enter your monthly income"
            value={income}
            onChangeText={(value) =>
              setIncome(value.replace(/[^0-9]/g, ""))
            }
            keyboardType="numeric"
          />

          <Dropdown
            label="Treatment or Condition"
            placeholder="Select your treatment or condition"
            value={treatment}
            options={treatments}
            onSelect={setTreatment}
          />
        </View>

        {/* Error */}
        {!!error && (
          <View className="flex-row items-center bg-red-50 p-3 rounded-xl mb-4">
            <Ionicons name="alert-circle" size={18} color="#DC2626" />
            <Text className="text-red-600 text-[12px] ml-2 flex-1">
              {error}
            </Text>
          </View>
        )}

        {/* Trust Note */}
        <View className="flex-row items-center bg-[#EAF4FF] p-3 rounded-xl mt-1">
          <Ionicons
            name="shield-checkmark"
            size={22}
            color={COLORS.blue}
          />
          <Text className="text-[12px] font-medium ml-2 flex-1"
            style={{ color: COLORS.navy }}>
            Your information is used to assess your medical loan enquiry.
          </Text>
        </View>

      </ScrollView>

      {/* Fixed Bottom CTA */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white px-5 pt-3 pb-5"
        style={{
          borderTopWidth: 1,
          borderTopColor: "#EDF1F6",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSubmit}
          className="h-[53px] rounded-full flex-row items-center justify-center"
          style={{
            backgroundColor: COLORS.blue,
            elevation: 5,
            shadowColor: COLORS.navy,
            shadowOpacity: 0.22,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
          }}
        >
          <Text className="text-white text-[16px] font-extrabold mr-2">
            Check Eligibility
          </Text>

          <Ionicons
            name="arrow-forward"
            size={19}
            color="white"
          />
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
};

export default MedicalLoanEligibilityForm;
