import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
// status bar ke neeche se shuru ho isliye ye SafeAreaView
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BASE_URL, showImage } from '../config/api';
import { WHATSAPP_NUMBER } from '../constants/contact';
import AppointmentModal from '../components/forms/AppointmentModal';

// doctor ki services (abhi fixed list)
const SERVICES = [
  { label: 'Appointment help', icon: 'calendar-outline', bg: '#DCEBF7', color: '#087BC1' },
  { label: 'Doctor consultation', icon: 'person-outline', bg: '#E4F3F4', color: '#0F6E7A' },
  { label: 'Insurance support', icon: 'shield-checkmark-outline', bg: '#E8F4DC', color: '#2E5E0F' },
  { label: 'Medical loan help', icon: 'cash-outline', bg: '#FDEBDD', color: '#B35309' },
];

export default function DoctorDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const res = await fetch(BASE_URL + '/doctors/' + id);
        const data = await res.json();
        if (res.ok) {
          setDoctor(data);
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert('Server se connect nahi ho paya');
      } finally {
        setLoading(false);
      }
    };
    loadDoctor();
  }, [id]);

  // O Positive team ko WhatsApp
  const whatsappTeam = () => {
    const name = doctor ? doctor.name : 'doctor';
    const text = 'Hello, mujhe ' + name + ' ke saath appointment ke baare me jaankari chahiye.';
    Linking.openURL('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Header */}
      <View className="h-[56px] flex-row items-center border-b border-gray-100 px-3">
        <Pressable onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#123D83" />
        </Pressable>
        <Text className="flex-1 text-[16px] font-bold text-[#123D83]" numberOfLines={1}>
          Doctor
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator className="mt-10" color="#087BC1" />
      ) : !doctor ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-gray-500">Doctor nahi mila</Text>
        </View>
      ) : (
        <>
          <ScrollView
            className="flex-1 bg-[#F4F7FB]"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            {/* Photo + naam */}
            <View className="items-center bg-white px-4 pb-5 pt-6">
              <Image
                source={
                  doctor.photo
                    ? { uri: showImage(doctor.photo) }
                    : require('../../assets/images/doctor-avatar.png')
                }
                style={{ width: 112, height: 112, borderRadius: 56 }}
                resizeMode="cover"
              />

              <Text className="mt-3.5 text-[22px] font-extrabold text-[#172033]">
                {doctor.name}
              </Text>
              <Text className="mt-1 text-[15px] font-semibold text-[#087BC1]">
                {doctor.specialty}
              </Text>

              <View className="mt-3 flex-row flex-wrap justify-center">
                {doctor.experience ? (
                  <View className="m-1 rounded-full bg-[#EEF3F9] px-3 py-1.5">
                    <Text className="text-[12px] font-semibold text-[#3C4C63]">
                      {doctor.experience} years experience
                    </Text>
                  </View>
                ) : null}

                <View className="m-1 rounded-full bg-[#E8F4DC] px-3 py-1.5">
                  <Text className="text-[12px] font-semibold text-[#2E5E0F]">
                    O Positive partner
                  </Text>
                </View>

                {doctor.fees ? (
                  <View className="m-1 rounded-full bg-[#FDEBDD] px-3 py-1.5">
                    <Text className="text-[12px] font-semibold text-[#B35309]">
                      Fee: Rs. {doctor.fees}
                    </Text>
                  </View>
                ) : null}
              </View>

              {/* Hospital card */}
              {doctor.hospital ? (
                <View className="mt-4 w-full flex-row items-center rounded-xl bg-[#F4F7FB] p-3">
                  <View className="h-10 w-10 items-center justify-center rounded-[10px] bg-[#DCEBF7]">
                    <Ionicons name="medical" size={22} color="#087BC1" />
                  </View>
                  <View className="ml-2.5 flex-1">
                    <Text className="text-[12px] text-[#5B6B7F]">Practices at</Text>
                    <Text className="text-[14px] font-bold text-[#172033]">
                      {doctor.hospital}
                      {doctor.city ? ', ' + doctor.city : ''}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>

            <View className="px-4 pt-4">
              {/* About */}
              <View className="rounded-2xl border border-[#E3E9F1] bg-white p-4">
                <Text className="text-[16px] font-bold text-[#172033]">About the doctor</Text>
                <Text className="mt-2 text-[14px] leading-[22px] text-[#44546A]">
                  {doctor.about || 'More details about this doctor will be added soon.'}
                </Text>
                <Text className="mt-2 text-[12px] text-gray-500">
                  Contact our team for appointment assistance
                </Text>
              </View>

              {/* Specialization */}
              <View className="mt-3 rounded-2xl border border-[#E3E9F1] bg-white p-4">
                <Text className="text-[16px] font-bold text-[#172033]">Specialization</Text>
                <View className="mt-2.5 flex-row">
                  <Text className="rounded-full bg-[#DCEBF7] px-3 py-1.5 text-[13px] font-semibold text-[#0B4F7A]">
                    {doctor.specialty}
                  </Text>
                </View>
              </View>

              {/* Our services */}
              <Text className="mb-2.5 ml-1 mt-5 text-[16px] font-bold text-[#172033]">
                Our services
              </Text>
              <View className="flex-row flex-wrap justify-between">
                {SERVICES.map((s) => (
                  <View
                    key={s.label}
                    className="mb-3 w-[48%] flex-row items-center rounded-[14px] border border-[#E3E9F1] bg-white p-3"
                  >
                    <View
                      className="h-9 w-9 items-center justify-center rounded-[10px]"
                      style={{ backgroundColor: s.bg }}
                    >
                      <Ionicons name={s.icon} size={20} color={s.color} />
                    </View>
                    <Text className="ml-2.5 flex-1 text-[13px] font-semibold leading-[18px] text-[#172033]">
                      {s.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Neeche fixed bar: WhatsApp Us + Book Appointment */}
          <View className="h-[80px] flex-row items-center gap-3 border-t border-gray-100 bg-white px-4">
            <Pressable
              onPress={whatsappTeam}
              className="h-[50px] flex-1 items-center justify-center rounded-full border border-[#25D366]"
            >
              <Text className="text-[14px] font-bold text-[#167A47]">WhatsApp Us</Text>
            </Pressable>

            <Pressable
              onPress={() => setBookingOpen(true)}
              className="h-[50px] items-center justify-center rounded-full bg-[#087BC1]"
              style={{ flex: 1.3 }}
            >
              <Text className="text-[14px] font-bold text-white">Book Appointment</Text>
            </Pressable>
          </View>
        </>
      )}

      <AppointmentModal
        visible={bookingOpen}
        onClose={() => setBookingOpen(false)}
        context={{
          doctorName: doctor ? doctor.name : '',
          hospitalName: doctor && doctor.hospital ? doctor.hospital : '',
        }}
      />
    </SafeAreaView>
  );
}