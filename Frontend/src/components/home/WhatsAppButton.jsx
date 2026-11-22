import React from "react";
import { TouchableOpacity, Linking, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WHATSAPP_NUMBER } from "../../constants/contact";

export default function WhatsAppButton({
  message = "Hello, I need help from O Positive Health.",
  bottom = 24,
}) {
  const open = async () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    try {
      await Linking.openURL(url);
    } catch (e) {
      Alert.alert("WhatsApp", "Unable to open WhatsApp.");
    }
  };

  return (
    <TouchableOpacity
      onPress={open}
      activeOpacity={0.85}
      style={{
        position: "absolute",
        right: 16,
        bottom,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#25D366",
        alignItems: "center",
        justifyContent: "center",
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      }}
    >
      <Ionicons name="logo-whatsapp" size={30} color="#FFFFFF" />
    </TouchableOpacity>
  );
}