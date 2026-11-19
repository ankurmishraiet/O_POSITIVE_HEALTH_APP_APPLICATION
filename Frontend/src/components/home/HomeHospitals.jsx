import { useEffect, useState } from 'react';
import { Image, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { BASE_URL, showImage } from '../../config/api';

const cardShadow = {
  shadowColor: '#2846A0',
  shadowOpacity: 0.12,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 3 },
  elevation: 5,
};

function SectionHeader({ title, onViewAll }) {
  return (
    <View className="mb-[10px] mt-[10px] flex-row items-center justify-between px-6">
      <Text className="text-[23px] font-extrabold text-[#111111]">
        {title}
      </Text>

      <Pressable onPress={onViewAll}>
        <Text className="text-[13px] font-extrabold text-[#1B5FD8]">
          View All
        </Text>
      </Pressable>
    </View>
  );
}

export default function HomeHospitals() {
  const router = useRouter();
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const hospitalRes = await fetch(BASE_URL + '/hospitals');
        const hospitalData = await hospitalRes.json();
        if (Array.isArray(hospitalData)) setHospitals(hospitalData.slice(0, 3));

        const doctorRes = await fetch(BASE_URL + '/doctors');
        const doctorData = await doctorRes.json();
        if (Array.isArray(doctorData)) setDoctors(doctorData.slice(0, 3));
      } catch (err) {
        console.log('Data load nahi hua');
      }
    };
    loadData();
  }, []);

  return (
    <View className="bg-white pb-6">

      {/* Hospitals Section */}
      <SectionHeader
        title="Our Hospitals"
        onViewAll={() => router.push('/hospitals')}
      />

      <View className="flex-row px-[17px]">
        {hospitals.map((item, index) => (
          <Pressable
            key={item._id}
            onPress={() =>
              router.push({ pathname: '/hospital-details', params: { id: item._id } })
            }
            className={
              index === hospitals.length - 1
                ? 'h-[108px] flex-1 items-center justify-center overflow-hidden rounded-2xl bg-white'
                : 'mr-[13px] h-[108px] flex-1 items-center justify-center overflow-hidden rounded-2xl bg-white'
            }
            style={cardShadow}
          >
            {item.image ? (
              <Image
                source={{ uri: showImage(item.image) }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            ) : (
              <Text className="px-2 text-center text-[13px] font-bold text-[#0F2A6B]">
                {item.name}
              </Text>
            )}
          </Pressable>
        ))}
      </View>

      {/* Doctors Section */}
      <SectionHeader
        title="Our Doctors"
       onViewAll={() => router.push('/consultant/doctors')}
      />

      {doctors.map((item) => (
        <Pressable
          key={item._id}
          onPress={() =>
            router.push({ pathname: '/doctor-details', params: { id: item._id } })
          }
          className="mx-4 mb-[10px] flex-row items-center rounded-2xl bg-white px-4 py-[14px]"
          style={cardShadow}
        >
          <Image
            source={
              item.photo
                ? { uri: showImage(item.photo) }
                : require('../../../assets/images/doctor-1.png')
            }
            style={{ width: 88, height: 88, borderRadius: 44 }}
            resizeMode="cover"
          />

          <View className="ml-[14px] flex-1">
            <Text className="text-[14.5px] font-extrabold text-[#111111]">
              {item.name}
            </Text>

            <Text className="mt-1 text-[11px] leading-[15px] text-[#666666]">
              {item.specialty}
            </Text>

            {item.experience ? (
              <Text className="mt-2 text-[12px] text-[#555555]">
                Experience:{' '}
                <Text className="font-bold text-[#111111]">
                  {item.experience} years
                </Text>
              </Text>
            ) : null}
          </View>
        </Pressable>
      ))}

    </View>
  );
}