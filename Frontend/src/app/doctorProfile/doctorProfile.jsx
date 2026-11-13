import { Image, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function DoctorProfile() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View className="mt-12 h-14 flex-row items-center px-5">
        <Pressable onPress={() => router.back()}>
          <Image source={require('../../../assets/images/arrow-back.png')} style={{ width: 28, height: 28 }} />
        </Pressable>
        <Text className="ml-3 flex-1 text-xl font-extrabold text-[#0F1F4D]">Dr. Aman Priya K...</Text>
        <Image source={require('../../../assets/images/icon-hospital.png')} style={{ width: 34, height: 34 }} />
        <Image source={require('../../../assets/images/icon-whatsapp-green.png')} style={{ width: 34, height: 34, marginLeft: 8 }} />
        <Image source={require('../../../assets/images/icon-search.png')} style={{ width: 26, height: 26, marginLeft: 12 }} />
      </View>

      <View className="px-5">
        <Text className="mt-3 text-2xl font-extrabold text-[#0F1F4D]">Dr. Aman Priya Khanna</Text>

        <View className="mt-4 flex-row">
          <Image source={require('../../../assets/images/doctor-avatar.png')} style={{ width: 110, height: 110 }} />
          <View className="ml-4 flex-1">
            <Text className="text-sm leading-5 text-gray-500">
              General Surgery, Laparoscopic Surgery, Proctology, Bariatric Surgery
            </Text>
            <View className="mt-2 flex-row items-center">
              <Image source={require('../../../assets/images/icon-experience.png')} style={{ width: 14, height: 14 }} />
              <Text className="ml-1 text-sm font-bold text-[#0F1F4D]">Experience: 14 Years</Text>
            </View>
            <View className="mt-1 flex-row items-center">
              <Image source={require('../../../assets/images/icon-thumb.png')} style={{ width: 14, height: 14 }} />
              <Text className="ml-1 text-sm text-gray-700">98 | 90 Reviews</Text>
            </View>
          </View>
        </View>

        <View className="mt-4 self-start rounded-lg bg-[#E8F0FB] px-3 py-2">
          <Text className="text-xs font-bold text-[#123D83]">O Positive Health Partner</Text>
        </View>

        <Pressable className="mt-4 h-12 items-center justify-center">
          <Image
            source={require('../../../assets/images/button-blue.png')}
            style={{ position: 'absolute', width: '100%', height: 48, borderRadius: 24 }}
          />
          <Text className="text-base font-extrabold text-white">Book Appointment</Text>
        </Pressable>

        <Pressable className="mt-3 h-12 items-center justify-center rounded-full border border-[#2A9D6B]">
          <Text className="text-base font-extrabold text-[#1E8E55]">WhatsApp Expert</Text>
        </Pressable>

        <View className="mt-5 self-center rounded bg-[#EEF4FB] px-8 py-2">
          <Text className="text-xs text-gray-500">Contact our team for appointment assistance</Text>
        </View>
      </View>

      <View className="mt-5 flex-row justify-around bg-[#F4F6FA] pt-4">
        <Text className="border-b-4 border-[#F58220] pb-3 font-extrabold text-[#0F1F4D]">Overview</Text>
        <Text className="pb-3 text-gray-600">Services</Text>
        <Text className="pb-3 text-gray-600">Hospitals</Text>
        <Text className="pb-3 text-gray-600">Reviews</Text>
      </View>

      <View className="px-5">
        <Text className="mt-5 text-3xl font-extrabold text-[#0F1F4D]">Overview</Text>
        <Text className="mt-3 text-base leading-6 text-gray-700">
          Dr. Aman Priya Khanna is a specialist in general and laparoscopic surgery, proctology, and
          bariatric procedures. Explore qualifications, availability and treatment options with our team.
        </Text>

        <Text className="mt-5 text-3xl font-extrabold text-[#0F1F4D]">Specializations</Text>
        <View className="mt-3 flex-row">
          <Text className="rounded-full bg-[#E6EFFB] px-4 py-2 text-xs font-bold text-[#123D83]">General Surgery</Text>
          <Text className="ml-3 rounded-full bg-[#FDEBDD] px-4 py-2 text-xs font-bold text-[#E26A10]">Laparoscopy</Text>
        </View>
      </View>
    </View>
  );
}