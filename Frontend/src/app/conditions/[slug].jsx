import React, { useEffect, useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, Image,
  ActivityIndicator, Linking, TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchCondition } from "../../service/conditionService";
import AppointmentModal from "../../components/forms/AppointmentModal";

const COLORS = {
  navy: "#123D83", blue: "#087BC1", green: "#25D366", orange: "#F58220",
  dark: "#17213B", muted: "#738194", border: "#D5E0EC", bg: "#F7FAFE",
};

// Apna asli number yahan daalo (country code ke saath, bina + ke)
const PHONE = "919999999999";

const call = () => Linking.openURL(`tel:+${PHONE}`);
const whatsapp = (msg = "Hello, I need help with an appointment.") =>
  Linking.openURL(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`);

const TABS = ["Overview", "Doctors", "Hospitals"];

const SectionTitle = ({ children }) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={{ fontSize: 17, fontWeight: "800", color: COLORS.dark }}>{children}</Text>
    <View style={{ width: 40, height: 3, borderRadius: 2, backgroundColor: COLORS.blue, marginTop: 4 }} />
  </View>
);

const BookButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={{
      height: 42, borderRadius: 21, borderWidth: 1.5, borderColor: COLORS.blue,
      flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 12,
    }}
  >
    <Ionicons name="calendar-outline" size={17} color={COLORS.blue} />
    <Text style={{ marginLeft: 8, color: COLORS.blue, fontWeight: "700", fontSize: 13 }}>
      Book Appointment
    </Text>
  </TouchableOpacity>
);

const Card = ({ children }) => (
  <View
    style={{
      backgroundColor: "#fff", borderRadius: 14, padding: 14, marginBottom: 14,
      borderWidth: 1, borderColor: "#EDF1F6", elevation: 1,
    }}
  >
    {children}
  </View>
);

const Logo = ({ uri, fallback = "business" }) =>
  uri ? (
    <Image source={{ uri }} style={{ width: 64, height: 64, borderRadius: 10 }} resizeMode="contain" />
  ) : (
    <View
      style={{
        width: 64, height: 64, borderRadius: 10, backgroundColor: "#EAF4FF",
        alignItems: "center", justifyContent: "center",
      }}
    >
      <Ionicons name={fallback} size={28} color={COLORS.blue} />
    </View>
  );

const Rating = ({ rating, count }) => (
  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}>
    <Ionicons name="star" size={14} color={COLORS.orange} />
    <Text style={{ color: COLORS.orange, fontWeight: "700", fontSize: 12, marginLeft: 4 }}>
      {Number(rating || 0).toFixed(2)}/5
    </Text>
    {count ? (
      <Text style={{ color: COLORS.muted, fontSize: 11, marginLeft: 6 }}>({count} Ratings)</Text>
    ) : null}
  </View>
);

export default function ConditionDetail() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("Overview");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Appointment popup
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingCtx, setBookingCtx] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCondition(slug);
        setData(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to load. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const q = query.trim().toLowerCase();
  const doctors = (data?.doctors || []).filter(
    (d) => !q || `${d.name} ${d.specialization} ${d.hospital}`.toLowerCase().includes(q)
  );
  const hospitals = (data?.hospitals || []).filter(
    (h) => !q || `${h.name} ${h.address}`.toLowerCase().includes(q)
  );

  // type: "doctor" | "hospital" | undefined (bottom bar ka general button)
  const book = (type, name) => {
    setBookingCtx({
      conditionId: data?._id,
      conditionName: data?.name,
      doctorName: type === "doctor" ? name : "",
      hospitalName: type === "hospital" ? name : "",
    });
    setBookingOpen(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["top"]}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row", alignItems: "center",
          paddingHorizontal: 16, paddingVertical: 12,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.navy} />
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          style={{ flex: 1, marginLeft: 12, fontSize: 17, fontWeight: "800", color: COLORS.navy }}
        >
          {data?.name || "Condition"}
        </Text>
        <TouchableOpacity onPress={call} style={{ marginHorizontal: 8 }}>
          <Ionicons name="call" size={22} color={COLORS.blue} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => whatsapp(`Hello, I need help regarding ${data?.name || "a condition"}.`)}
          style={{ marginHorizontal: 8 }}
        >
          <Ionicons name="logo-whatsapp" size={24} color={COLORS.green} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSearchOpen((s) => !s);
            setQuery("");
          }}
          style={{ marginLeft: 8 }}
        >
          <Ionicons name={searchOpen ? "close" : "search"} size={22} color={COLORS.blue} />
        </TouchableOpacity>
      </View>

      {searchOpen && (
        <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search doctors or hospitals..."
            placeholderTextColor="#929EAB"
            style={{
              height: 42, borderRadius: 21, borderWidth: 1, borderColor: COLORS.border,
              paddingHorizontal: 16, color: COLORS.dark,
            }}
          />
        </View>
      )}

      {/* Tabs */}
      <View style={{ flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#EDF1F6" }}>
        {TABS.map((t) => {
          const active = tab === t;
          return (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              style={{
                flex: 1, alignItems: "center", paddingVertical: 14,
                borderBottomWidth: 2, borderBottomColor: active ? COLORS.blue : "transparent",
              }}
            >
              <Text
                style={{
                  fontSize: 14, fontWeight: active ? "800" : "500",
                  color: active ? COLORS.navy : COLORS.muted,
                }}
              >
                {t}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Body */}
      {loading ? (
        <ActivityIndicator style={{ marginTop: 50 }} size="large" color={COLORS.blue} />
      ) : error ? (
        <Text style={{ textAlign: "center", marginTop: 50, color: COLORS.muted }}>{error}</Text>
      ) : (
        <ScrollView
          style={{ backgroundColor: COLORS.bg }}
          contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
          showsVerticalScrollIndicator={false}
        >
          {/* OVERVIEW */}
          {tab === "Overview" && (
            <View>
              <SectionTitle>About {data.name}</SectionTitle>
              <Text style={{ fontSize: 14, lineHeight: 22, color: "#153B59" }}>
                {data.overview || "Details coming soon."}
              </Text>

              {data.symptoms?.length > 0 && (
                <View style={{ marginTop: 22 }}>
                  <SectionTitle>Symptoms</SectionTitle>
                  {data.symptoms.map((s, i) => (
                    <View key={i} style={{ flexDirection: "row", marginBottom: 8 }}>
                      <Ionicons name="checkmark-circle" size={18} color={COLORS.blue} />
                      <Text style={{ marginLeft: 8, flex: 1, color: "#153B59", fontSize: 14 }}>{s}</Text>
                    </View>
                  ))}
                </View>
              )}

              {data.treatments?.length > 0 && (
                <View style={{ marginTop: 22 }}>
                  <SectionTitle>Treatments</SectionTitle>
                  {data.treatments.map((s, i) => (
                    <View key={i} style={{ flexDirection: "row", marginBottom: 8 }}>
                      <Ionicons name="medkit" size={17} color={COLORS.orange} />
                      <Text style={{ marginLeft: 8, flex: 1, color: "#153B59", fontSize: 14 }}>{s}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* DOCTORS */}
          {tab === "Doctors" && (
            <View>
              <SectionTitle>Doctors</SectionTitle>
              {doctors.length === 0 && (
                <Text style={{ color: COLORS.muted }}>No doctors found.</Text>
              )}
              {doctors.map((d) => (
                <Card key={d._id}>
                  <View style={{ flexDirection: "row" }}>
                    <Logo uri={d.image} fallback="person" />
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={{ fontSize: 15, fontWeight: "800", color: COLORS.dark }}>{d.name}</Text>
                      {!!d.specialization && (
                        <Text style={{ fontSize: 12.5, color: COLORS.blue, marginTop: 2 }}>
                          {d.specialization}
                        </Text>
                      )}
                      {!!d.qualification && (
                        <Text style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>
                          {d.qualification}
                        </Text>
                      )}
                      {d.experience > 0 && (
                        <Text style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>
                          {d.experience} yrs experience
                        </Text>
                      )}
                      {d.rating > 0 && <Rating rating={d.rating} />}
                      {!!d.hospital && (
                        <Text style={{ fontSize: 12, color: COLORS.muted, marginTop: 3 }}>{d.hospital}</Text>
                      )}
                    </View>
                  </View>
                  <BookButton onPress={() => book("doctor", d.name)} />
                </Card>
              ))}
            </View>
          )}

          {/* HOSPITALS */}
          {tab === "Hospitals" && (
            <View>
              <SectionTitle>Hospitals & Clinics</SectionTitle>
              {hospitals.length === 0 && (
                <Text style={{ color: COLORS.muted }}>No hospitals found.</Text>
              )}
              {hospitals.map((h) => (
                <Card key={h._id}>
                  <View style={{ flexDirection: "row" }}>
                    <Logo uri={h.logo} />
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={{ fontSize: 14.5, fontWeight: "800", color: COLORS.dark }}>
                        {h.name}
                      </Text>
                      {h.rating > 0 && <Rating rating={h.rating} count={h.ratingCount} />}
                      {!!h.address && (
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                          <Ionicons name="location-outline" size={14} color={COLORS.muted} />
                          <Text style={{ flex: 1, marginLeft: 4, fontSize: 11.5, color: COLORS.muted }}>
                            {h.address}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <BookButton onPress={() => book("hospital", h.name)} />
                </Card>
              ))}
            </View>
          )}
        </ScrollView>
      )}

      {/* Bottom bar */}
      <View
        style={{
          position: "absolute", left: 0, right: 0, bottom: 0,
          flexDirection: "row", padding: 12, paddingBottom: 20,
          backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#EDF1F6",
        }}
      >
        <TouchableOpacity
          onPress={() => whatsapp(`Hello, I need help regarding ${data?.name || "a condition"}.`)}
          style={{
            flex: 1, height: 48, borderRadius: 24, borderWidth: 1.5, borderColor: COLORS.green,
            flexDirection: "row", alignItems: "center", justifyContent: "center", marginRight: 10,
          }}
        >
          <Ionicons name="logo-whatsapp" size={20} color={COLORS.green} />
          <Text style={{ marginLeft: 8, color: COLORS.green, fontWeight: "700" }}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => book()}
          style={{
            flex: 1.4, height: 48, borderRadius: 24, backgroundColor: COLORS.blue,
            flexDirection: "row", alignItems: "center", justifyContent: "center",
          }}
        >
          <Ionicons name="calendar-outline" size={19} color="#fff" />
          <Text style={{ marginLeft: 8, color: "#fff", fontWeight: "800" }}>Book Appointment</Text>
        </TouchableOpacity>
      </View>

      {/* Appointment popup form */}
      <AppointmentModal
        visible={bookingOpen}
        onClose={() => setBookingOpen(false)}
        context={bookingCtx}
      />
    </SafeAreaView>
  );
}