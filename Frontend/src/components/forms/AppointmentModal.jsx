import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Modal, Pressable,
  ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { bookAppointment } from "../../service/appointmentService";

const COLORS = {
  navy: "#123D83", blue: "#087BC1", orange: "#F58220", dark: "#17213B",
  muted: "#738194", border: "#D5E0EC", placeholder: "#929EAB",
};

const DATES = ["Today", "Tomorrow", "Within a week", "Flexible"];
const TIMES = ["Morning", "Afternoon", "Evening", "Any time"];

const Label = ({ children, required }) => (
  <Text style={{ fontSize: 13, fontWeight: "700", color: "#153B59", marginTop: 14, marginBottom: 8 }}>
    {children}
    {required ? <Text style={{ color: COLORS.orange }}> *</Text> : null}
  </Text>
);

const Chip = ({ label, selected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={{
      paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginRight: 8, marginBottom: 8,
      backgroundColor: selected ? COLORS.blue : "#F8FAFC",
      borderWidth: 1, borderColor: selected ? COLORS.blue : COLORS.border,
    }}
  >
    <Text style={{ fontSize: 13, fontWeight: "600", color: selected ? "#fff" : "#153B59" }}>{label}</Text>
  </TouchableOpacity>
);

const Field = (props) => (
  <TextInput
    placeholderTextColor={COLORS.placeholder}
    {...props}
    style={[
      {
        borderWidth: 1, borderColor: props.value ? COLORS.blue : COLORS.border,
        borderRadius: 14, paddingHorizontal: 14, fontSize: 14, color: COLORS.dark, backgroundColor: "#fff",
      },
      props.style,
    ]}
  />
);

/**
 * Props:
 *  visible, onClose
 *  context = { conditionId, conditionName, doctorName, hospitalName }
 */
export default function AppointmentModal({ visible, onClose, context = {} }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDate, setPreferredDate] = useState("Flexible");
  const [preferredTime, setPreferredTime] = useState("Any time");
  const [message, setMessage] = useState("");

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const reset = () => {
    setName(""); setPhone(""); setAge(""); setEmail("");
    setPreferredDate("Flexible"); setPreferredTime("Any time");
    setMessage(""); setError(""); setDone(false);
  };

  const close = () => {
    onClose();
    // thoda ruk ke reset, taaki closing animation mein flicker na ho
    setTimeout(reset, 300);
  };

  const submit = async () => {
    if (busy) return;

    if (name.trim().length < 2) return setError("Please enter your name.");
    if (phone.replace(/\D/g, "").length < 10)
      return setError("Please enter a valid 10-digit phone number.");
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim()))
      return setError("Please enter a valid email or leave it empty.");

    setError("");
    setBusy(true);
    try {
      await bookAppointment({
        name: name.trim(),
        phone: phone.trim(),
        age: age.trim(),
        email: email.trim(),
        preferredDate,
        preferredTime,
        message: message.trim(),
        conditionId: context.conditionId,
        conditionName: context.conditionName,
        doctorName: context.doctorName,
        hospitalName: context.hospitalName,
      });
      setDone(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to send. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const bookingFor = [context.conditionName, context.doctorName, context.hospitalName]
    .filter(Boolean)
    .join(" • ");

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={close}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <Pressable
          style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(18,61,131,0.4)" }}
          onPress={close}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff", borderTopLeftRadius: 28, borderTopRightRadius: 28,
              paddingHorizontal: 20, paddingTop: 16, paddingBottom: 28, maxHeight: "90%",
            }}
          >
            <View style={{ alignItems: "center", marginBottom: 12 }}>
              <View style={{ width: 48, height: 4, borderRadius: 2, backgroundColor: "#D1D5DB" }} />
            </View>

            {done ? (
              /* ---------- SUCCESS ---------- */
              <View style={{ alignItems: "center", paddingVertical: 24 }}>
                <Ionicons name="checkmark-circle" size={72} color="#22C55E" />
                <Text style={{ fontSize: 20, fontWeight: "800", color: COLORS.navy, marginTop: 12 }}>
                  Request sent!
                </Text>
                <Text style={{ textAlign: "center", color: COLORS.muted, marginTop: 8, lineHeight: 21 }}>
                  Our team will call you shortly on {phone} to confirm your appointment.
                </Text>
                <TouchableOpacity
                  onPress={close}
                  style={{
                    marginTop: 24, height: 50, borderRadius: 25, backgroundColor: COLORS.blue,
                    alignItems: "center", justifyContent: "center", alignSelf: "stretch",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "800", fontSize: 15 }}>Done</Text>
                </TouchableOpacity>
              </View>
            ) : (
              /* ---------- FORM ---------- */
              <>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ fontSize: 19, fontWeight: "800", color: COLORS.navy }}>
                    Book Appointment
                  </Text>
                  <TouchableOpacity onPress={close}>
                    <Ionicons name="close-circle" size={26} color="#8A98A8" />
                  </TouchableOpacity>
                </View>

                {!!bookingFor && (
                  <View
                    style={{
                      backgroundColor: "#EAF4FF", borderRadius: 12, padding: 10, marginTop: 12,
                      flexDirection: "row", alignItems: "center",
                    }}
                  >
                    <Ionicons name="medkit" size={16} color={COLORS.blue} />
                    <Text style={{ flex: 1, marginLeft: 8, fontSize: 12.5, color: COLORS.navy, fontWeight: "600" }}>
                      {bookingFor}
                    </Text>
                  </View>
                )}

                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                  <Label required>Full name</Label>
                  <Field value={name} onChangeText={setName} placeholder="Your name" maxLength={80} style={{ height: 50 }} />

                  <Label required>Phone number</Label>
                  <Field
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="10-digit mobile number"
                    keyboardType="phone-pad"
                    maxLength={13}
                    style={{ height: 50 }}
                  />

                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: 100, marginRight: 12 }}>
                      <Label>Age</Label>
                      <Field
                        value={age}
                        onChangeText={(t) => setAge(t.replace(/\D/g, ""))}
                        placeholder="Age"
                        keyboardType="number-pad"
                        maxLength={3}
                        style={{ height: 50 }}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Label>Email (optional)</Label>
                      <Field
                        value={email}
                        onChangeText={setEmail}
                        placeholder="you@example.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={{ height: 50 }}
                      />
                    </View>
                  </View>

                  <Label>Preferred date</Label>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {DATES.map((d) => (
                      <Chip key={d} label={d} selected={preferredDate === d} onPress={() => setPreferredDate(d)} />
                    ))}
                  </View>

                  <Label>Preferred time</Label>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {TIMES.map((t) => (
                      <Chip key={t} label={t} selected={preferredTime === t} onPress={() => setPreferredTime(t)} />
                    ))}
                  </View>

                  <Label>Message (optional)</Label>
                  <Field
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Tell us briefly about your problem..."
                    multiline
                    maxLength={500}
                    textAlignVertical="top"
                    style={{ minHeight: 90, paddingTop: 12 }}
                  />

                  <Text style={{ fontSize: 11.5, color: COLORS.muted, marginTop: 10 }}>
                    Please do not share sensitive medical records here. Our team will contact you to confirm.
                  </Text>

                  {!!error && (
                    <View
                      style={{
                        flexDirection: "row", alignItems: "center", backgroundColor: "#FEF2F2",
                        padding: 12, borderRadius: 12, marginTop: 12,
                      }}
                    >
                      <Ionicons name="alert-circle" size={18} color="#DC2626" />
                      <Text style={{ flex: 1, marginLeft: 8, color: "#DC2626", fontSize: 12 }}>{error}</Text>
                    </View>
                  )}

                  <TouchableOpacity
                    onPress={submit}
                    disabled={busy}
                    activeOpacity={0.85}
                    style={{
                      height: 50, borderRadius: 25, backgroundColor: COLORS.blue, marginTop: 16,
                      alignItems: "center", justifyContent: "center", opacity: busy ? 0.7 : 1,
                    }}
                  >
                    {busy ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={{ color: "#fff", fontWeight: "800", fontSize: 15 }}>Send request</Text>
                    )}
                  </TouchableOpacity>
                </ScrollView>
              </>
            )}
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}