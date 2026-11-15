import { Image, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Liver() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      <View className="h-14 flex-row items-center">
        <Pressable onPress={() => router.back()}>
          <Image source={require('../../../assets/images/arrow-back.png')} style={{ width: 30, height: 30 }} />
        </Pressable>
        <Text className="ml-3 flex-1 text-xl font-bold">Acute Liver Failure</Text>
        <Image source={require('../../../assets/images/icon-phone.png')} style={{ width: 36, height: 36 }} />
        <Image source={require('../../../assets/images/icon-whatsapp.png')} style={{ width: 36, height: 36, marginLeft: 8 }} />
        <Image source={require('../../../assets/images/icon-search.png')} style={{ width: 28, height: 28, marginLeft: 8 }} />
      </View>

      <Text className="mt-6 text-3xl font-extrabold">Acute Liver Failure</Text>
      <View className="mt-2 h-1 w-16 bg-[#E8501B]" />

      <View className="mt-4 h-56 items-center rounded-2xl bg-[#CFE0E8]">
        <Text className="mt-3 font-extrabold text-[#1B2B6B]">Understanding Acute Liver Failure</Text>
        <Image source={require('../../../assets/images/liver-illustration.png')} style={{ width: 300, height: 165 }} />
      </View>

      <Pressable className="mt-5 h-[50px] flex-row items-center justify-center">
        <Image source={require('../../../assets/images/button-gradient.png')} style={{ position: 'absolute', width: '100%', height: 50, borderRadius: 25 }} />
        <Image source={require('../../../assets/images/icon-calendar.png')} style={{ width: 22, height: 22 }} />
        <Text className="ml-2 text-lg font-bold text-white">Book Appointment</Text>
      </Pressable>

      <Pressable className="mt-3 h-[50px] flex-row items-center justify-center rounded-full border border-[#2A8F7E]">
        <Image source={require('../../../assets/images/icon-whatsapp-expert.png')} style={{ width: 26, height: 26 }} />
        <Text className="ml-3 text-lg font-bold text-[#1B7F6B]">WhatsApp Expert</Text>
      </Pressable>

      <View className="mt-6 flex-row justify-around">
        <Text className="border-b-4 border-[#1F7BD8] pb-2 font-bold text-[#1F7BD8]">Overview</Text>
        <Text className="pb-2 font-bold text-gray-400">Doctors</Text>
        <Text className="pb-2 font-bold text-gray-400">Hospitals</Text>
      </View>

      <Text className="mt-4 leading-7 text-gray-500">
        Acute liver failure or Fulminant Hepatic Failure is a medical condition that develops
        when the liver loses its ability to function. It usually occurs rapidly, within days or
        weeks, in people with no pre-existing liver disease.
      </Text>
    </View>
  );
}