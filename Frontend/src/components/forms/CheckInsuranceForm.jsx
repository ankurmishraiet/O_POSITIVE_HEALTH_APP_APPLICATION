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
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

// Adjust this path to where you saved insuranceService.js
import { submitInsuranceApplication } from "../../service/insurance";

const COLORS = {
  navy: "#123D83",
  blue: "#087BC1",
  green: "#A5C83C",
  orange: "#F58220",
  dark: "#17213B",
  text: "#153B59",
  border: "#A3B0BE",
  placeholder: "#929AA3",
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

const insuranceTypes = [
  "Government Insurance",
  "Private Health Insurance",
  "Corporate Insurance",
  "Individual Health Insurance",
  "Family Floater Insurance",
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
      <Text
        className="text-[14px] font-bold mb-2"
        style={{ color: COLORS.text }}
      >
        {label}
        {required && <Text style={{ color: COLORS.orange }}> *</Text>}
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setVisible(true)}
        className="h-[52px] rounded-full px-4 flex-row items-center justify-between bg-white"
        style={{
          borderWidth: 1,
          borderColor: value ? COLORS.blue : COLORS.border,
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

        <Ionicons name="chevron-down" size={23} color={COLORS.dark} />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(18,61,131,0.4)" }}
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
              <Text
                className="text-[19px] font-extrabold"
                style={{ color: COLORS.navy }}
              >
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

// Reusable Text Input
const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  required = false,
}) => {
  return (
    <View className="mb-5">
      <Text
        className="text-[14px] font-bold mb-2"
        style={{ color: COLORS.text }}
      >
        {label}
        {required && <Text style={{ color: COLORS.orange }}> *</Text>}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
        className="h-[52px] rounded-full px-4 text-[14px] font-medium bg-white"
        style={{
          borderWidth: 1,
          borderColor: value ? COLORS.blue : COLORS.border,
          color: COLORS.dark,
        }}
      />
    </View>
  );
};

// Main Insurance Form
const CheckInsuranceForm = ({ onSubmit }) => {
  const [policyHolder, setPolicyHolder] = useState("");
  const [city, setCity] = useState("");
  const [treatment, setTreatment] = useState("");
  const [insuranceType, setInsuranceType] = useState("");
  const [document, setDocument] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Pick Insurance Document
  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setDocument(result.assets[0]);
        setError("");
        setSuccess(false);
      }
    } catch (err) {
      setError("Unable to select document. Please try again.");
    }
  };

  // Remove Selected Document
  const removeDocument = () => {
    setDocument(null);
  };

  // Submit Form
  const handleSubmit = async () => {
    if (loading) return;

    if (!policyHolder.trim()) {
      setError("Please enter policy holder name.");
      return;
    }

    if (!city) {
      setError("Please select a city.");
      return;
    }

    if (!treatment.trim()) {
      setError("Please enter treatment or condition.");
      return;
    }

    if (!insuranceType) {
      setError("Please select insurance type.");
      return;
    }

    if (!document) {
      setError("Please upload your insurance card or policy document.");
      return;
    }

    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const formData = {
        policyHolder: policyHolder.trim(),
        city,
        treatment: treatment.trim(),
        insuranceType,
        document,
      };

      // Sends data to backend -> saved in DB -> visible in admin dashboard
      const result = await submitInsuranceApplication(formData);

      setSuccess(true);

      // Reset form
      setPolicyHolder("");
      setCity("");
      setTreatment("");
      setInsuranceType("");
      setDocument(null);

      onSubmit?.(result);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: 17,
          paddingBottom: 125,
        }}
      >
        {/* O Positive Health Logo */}
        <View className="items-center mt-2 mb-5">
          <Image
            source={require("../../../assets/images/logo_o_positive.png")}
            style={{
              width: 200,
              height: 84,
            }}
            resizeMode="contain"
          />
        </View>

        {/* Heading */}
        <View className="mb-7">
          <Text
            className="text-[25px] font-extrabold"
            style={{ color: COLORS.dark }}
          >
            Check Insurance
          </Text>

          <View
            className="w-14 h-1 rounded-full mt-2"
            style={{ backgroundColor: COLORS.orange }}
          />
        </View>

        {/* Policy Holder Name */}
        <FormInput
          label="Policy Holder Name"
          required
          placeholder="Enter your name"
          value={policyHolder}
          onChangeText={(v) => {
            setPolicyHolder(v);
            setSuccess(false);
          }}
        />

        {/* City */}
        <Dropdown
          label="Select City"
          required
          placeholder="Select city"
          value={city}
          options={cities}
          onSelect={(v) => {
            setCity(v);
            setSuccess(false);
          }}
        />

        {/* Treatment */}
        <FormInput
          label="Treatment or Condition"
          required
          placeholder="Enter Treatment or Condition"
          value={treatment}
          onChangeText={(v) => {
            setTreatment(v);
            setSuccess(false);
          }}
        />

        {/* Insurance Type */}
        <Dropdown
          label="Insurance Type"
          required
          placeholder="Select your insurance type"
          value={insuranceType}
          options={insuranceTypes}
          onSelect={(v) => {
            setInsuranceType(v);
            setSuccess(false);
          }}
        />

        {/* Document Upload */}
        <View className="mb-5">
          <Text
            className="text-[14px] font-bold mb-3"
            style={{ color: COLORS.text }}
          >
            Add Insurance Card / Policy Document
            <Text style={{ color: COLORS.orange }}> *</Text>
          </Text>

          <View className="flex-row items-center">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleDocumentPick}
              className="w-[52px] h-[52px] rounded-xl items-center justify-center bg-white"
              style={{
                borderWidth: 1,
                borderColor: COLORS.border,
                borderStyle: "dashed",
              }}
            >
              <Ionicons name="add" size={30} color={COLORS.blue} />
            </TouchableOpacity>

            <Text className="text-[11px] text-gray-400 ml-3 flex-1">
              Upload insurance card or policy document
              {"\n"}PDF, JPG or PNG
            </Text>
          </View>

          {/* Selected Document */}
          {document && (
            <View
              className="flex-row items-center rounded-xl p-3 mt-3"
              style={{
                backgroundColor: "#EAF4FF",
                borderWidth: 1,
                borderColor: "#C9E1F7",
              }}
            >
              <Ionicons
                name={
                  document.mimeType === "application/pdf"
                    ? "document-text"
                    : "image"
                }
                size={24}
                color={COLORS.blue}
              />

              <Text
                className="flex-1 text-[12px] font-semibold ml-2"
                numberOfLines={1}
                style={{ color: COLORS.navy }}
              >
                {document.name}
              </Text>

              <TouchableOpacity onPress={removeDocument}>
                <Ionicons name="close-circle" size={22} color="#DC2626" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Success Message */}
        {success && (
          <View className="flex-row items-center bg-green-50 p-3 rounded-xl mb-4">
            <Ionicons name="checkmark-circle" size={18} color="#16A34A" />

            <Text className="text-green-700 text-[12px] ml-2 flex-1">
              Your request has been submitted. Our team will contact you
              shortly.
            </Text>
          </View>
        )}

        {/* Error Message */}
        {!!error && (
          <View className="flex-row items-center bg-red-50 p-3 rounded-xl mb-4">
            <Ionicons name="alert-circle" size={18} color="#DC2626" />

            <Text className="text-red-600 text-[12px] ml-2 flex-1">
              {error}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white px-4 pt-3 pb-5"
        style={{
          borderTopWidth: 1,
          borderTopColor: "#EDF1F6",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSubmit}
          disabled={loading}
          className="h-[49px] rounded-full flex-row items-center justify-center"
          style={{
            backgroundColor: COLORS.blue,
            opacity: loading ? 0.7 : 1,
            elevation: 4,
            shadowColor: COLORS.navy,
            shadowOpacity: 0.2,
            shadowRadius: 6,
            shadowOffset: {
              width: 0,
              height: 3,
            },
          }}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text className="text-white text-[16px] font-extrabold mr-2">
                Check Coverage
              </Text>

              <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckInsuranceForm;