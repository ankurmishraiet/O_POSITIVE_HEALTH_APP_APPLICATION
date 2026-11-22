import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BASE_URL, showImage } from '../config/api';

export default function DoctorDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <View className="flex-1 bg-white">
      <View className="mt-12 h-14 flex-row items-center px-5">
        <Pressable onPress={() => router.back()}>
          <Image source={require('../../assets/images/arrow-back.png')} style={{ width: 28, height: 28 }} />
        </Pressable>
        <Text className="ml-3 flex-1 text-xl font-extrabold text-[#0F1F4D]" numberOfLines={1}>
          {doctor ? doctor.name : 'Doctor'}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator className="mt-10" color="#087BC1" />
      ) : !doctor ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-gray-500">Doctor nahi mila</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-5">
            <Text className="mt-3 text-2xl font-extrabold text-[#0F1F4D]">{doctor.name}</Text>

            <View className="mt-4 flex-row">
              <Image
                source={
                  doctor.photo
                    ? { uri: showImage(doctor.photo) }
                    : require('../../assets/images/doctor-avatar.png')
                }
                style={{ width: 110, height: 110, borderRadius: 55 }}
                resizeMode="cover"
              />
              <View className="ml-4 flex-1">
                <Text className="text-sm leading-5 text-gray-500">{doctor.specialty}</Text>

                {doctor.experience ? (
                  <View className="mt-2 flex-row items-center">
                    <Image
                      source={require('../../assets/images/icon-experience.png')}
                      style={{ width: 14, height: 14 }}
                    />
                    <Text className="ml-1 text-sm font-bold text-[#0F1F4D]">
                      Experience: {doctor.experience} Years
                    </Text>
                  </View>
                ) : null}

                {doctor.fees ? (
                  <Text className="mt-2 text-sm text-gray-700">
                    Consultation Fee:{' '}
                    <Text className="font-bold text-[#0F1F4D]">Rs. {doctor.fees}</Text>
                  </Text>
                ) : null}
              </View>
            </View>

            <View className="mt-4 self-start rounded-lg bg-[#E8F0FB] px-3 py-2">
              <Text className="text-xs font-bold text-[#123D83]">O Positive Health Partner</Text>
            </View>

            <Pressable
              onPress={() => alert('Appointment booking jaldi shuru hogi')}
              className="mt-4 h-12 items-center justify-center"
            >
              <Image
                source={require('../../assets/images/button-blue.png')}
                style={{ position: 'absolute', width: '100%', height: 48, borderRadius: 24 }}
              />
              <Text className="text-base font-extrabold text-white">Book Appointment</Text>
            </Pressable>

            <View className="mt-5 self-center rounded bg-[#EEF4FB] px-8 py-2">
              <Text className="text-xs text-gray-500">Contact our team for appointment assistance</Text>
            </View>
          </View>

          <View className="mt-5 bg-[#F4F6FA] pt-4">
            <Text className="self-start border-b-4 border-[#F58220] px-5 pb-3 font-extrabold text-[#0F1F4D]">
              Overview
            </Text>
          </View>

          <View className="px-5 pb-10">
            <Text className="mt-5 text-3xl font-extrabold text-[#0F1F4D]">Overview</Text>
            <Text className="mt-3 text-base leading-6 text-gray-700">
              {doctor.about || 'More details about this doctor will be added soon.'}
            </Text>

            {doctor.hospital ? (
              <View>
                <Text className="mt-5 text-3xl font-extrabold text-[#0F1F4D]">Hospital</Text>
                <Text className="mt-3 text-base text-gray-700">
                  {doctor.hospital}
                  {doctor.city ? ', ' + doctor.city : ''}
                </Text>
              </View>
            ) : null}

            <Text className="mt-5 text-3xl font-extrabold text-[#0F1F4D]">Specialization</Text>
            <View className="mt-3 flex-row">
              <Text className="rounded-full bg-[#E6EFFB] px-4 py-2 text-xs font-bold text-[#123D83]">
                {doctor.specialty}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}