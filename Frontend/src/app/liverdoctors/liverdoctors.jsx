import {  Image, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

const doctors = [
  {
    name: 'Dr. Atul N C Peters',
    speciality: 'Surgical Gastroenterology, Metabolic Surgery, Laparoscopic Surgery, Robotic',
    years: '31+ years',
    recommended: '98%',
    photo: require('../../../assets/images/doctor-4.png'),
  },
  {
    name: 'Dr. Brajendra Prasad Singh',
    speciality: 'Gastroenterology, Hepatology and Endoscopy',
    years: '23+ years',
    recommended: '96%',
    photo: require('../../../assets/images/doctor-5.png'),
  },
 
];

function Header() {
  const router = useRouter();

  return (
    <View>
      <View className="mt-12 h-14 flex-row items-center px-6">
        <Pressable onPress={() => router.back()}>
          <Image source={require('../../../assets/images/arrow-back.png')} style={{ width: 30, height: 30 }} />
        </Pressable>
        <Text className="ml-3 flex-1 text-xl font-bold">Acute Liver Failure</Text>
        <Image source={require('../../../assets/images/icon-phone.png')} style={{ width: 36, height: 36 }} />
        <Image source={require('../../../assets/images/icon-whatsapp.png')} style={{ width: 36, height: 36, marginLeft: 8 }} />
        <Image source={require('../../../assets/images/icon-search.png')} style={{ width: 28, height: 28, marginLeft: 8 }} />
      </View>

      <View className="mt-2 flex-row justify-around bg-gray-100 pt-4">
        <Pressable onPress={() => router.back()}>
          <Text className="pb-3 text-gray-500">Overview</Text>
        </Pressable>
        <Text className="border-b-4 border-[#1B2B6B] pb-3 font-bold">Doctors</Text>
        <Text className="pb-3 text-gray-500">Hospitals</Text>
      </View>

      <Text className="mt-6 px-6 text-3xl font-extrabold">Expert Doctors</Text>
      <View className="ml-6 mt-2 h-1 w-16 bg-[#E8401B]" />
    </View>
  );
}

function DoctorCard({ doctor }) {
  return (
    <View className="mt-6 px-6">
      <View className="flex-row">
        <Image source={doctor.photo} style={{ width: 80, height: 88, borderRadius: 12 }} />
        <View className="ml-3 flex-1">
          <View className="flex-row items-center">
            <Text className="flex-shrink text-base font-extrabold">{doctor.name}</Text>
            <View className="ml-2 h-5 w-5 items-center justify-center rounded-full bg-[#2AA3D8]">
              <Text className="text-xs font-bold text-white">✓</Text>
            </View>
          </View>
          <Text className="mt-1 text-xs text-gray-500">{doctor.speciality}</Text>
        </View>
      </View>

      <View className="mt-3 flex-row justify-around">
        <View className="items-center">
          <View className="flex-row items-center">
            <View className="mr-1 h-4 w-4 rounded bg-[#7C6CD8]" />
            <Text className="font-bold">{doctor.years}</Text>
          </View>
          <Text className="text-xs text-gray-400">Experience</Text>
        </View>
        <View className="items-center">
          <View className="flex-row items-center">
            <View className="mr-1 h-4 w-4 rounded bg-[#2A9D4B]" />
            <Text className="font-bold text-[#2A9D4B]">{doctor.recommended}</Text>
          </View>
          <Text className="text-xs text-gray-400">Recommended</Text>
        </View>
      </View>

      {doctor.both ? (
        <View className="mt-3 flex-row">
          <Pressable className="mr-3 h-11 w-[120px] flex-row items-center justify-center rounded-full border border-[#9CC9C0]">
            <Image source={require('../../../assets/images/icon-whatsapp-expert.png')} style={{ width: 22, height: 22 }} />
            <Text className="ml-1 font-bold text-[#4F9C8C]">WhatsApp</Text>
          </Pressable>
          <Pressable className="h-11 flex-1 flex-row items-center justify-center">
            <Image
              source={require('../../../assets/images/button-gradient.png')}
              style={{ position: 'absolute', width: '100%', height: 44, borderRadius: 22 }}
            />
            <Image source={require('../../../assets/images/icon-calendar.png')} style={{ width: 20, height: 20 }} />
            <Text className="ml-2 font-bold text-white">Book Appointment</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable className="mt-3 h-11 flex-row items-center justify-center rounded-full border border-[#2A8FA6]">
          <Image source={require('../../../assets/images/icon-calendar-blue.png')} style={{ width: 20, height: 20 }} />
          <Text className="ml-2 font-bold text-[#1B7FA0]">Book Appointment</Text>
        </Pressable>
      )}
    </View>
  );
}

export default function LiverDoctors() {
  return (
    <View className="flex-1 bg-white">
      <Header />
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.name} doctor={doctor} />
      ))}
            <View className="mt-6 flex-row px-6">
        <Pressable className="mr-3 h-11 w-[120px] flex-row items-center justify-center rounded-full border border-[#9CC9C0]">
          <Image source={require('../../../assets/images/icon-whatsapp-expert.png')} style={{ width: 22, height: 22 }} />
          <Text className="ml-1 font-bold text-[#4F9C8C]">WhatsApp</Text>
        </Pressable>
        <Pressable className="h-11 flex-1 flex-row items-center justify-center">
          <Image
            source={require('../../../assets/images/button-gradient.png')}
            style={{ position: 'absolute', width: '100%', height: 44, borderRadius: 22 }}
          />
          <Image source={require('../../../assets/images/icon-calendar.png')} style={{ width: 20, height: 20 }} />
          <Text className="ml-2 font-bold text-white">Book Appointment</Text>
        </Pressable>
      </View>
    </View>
  );
}