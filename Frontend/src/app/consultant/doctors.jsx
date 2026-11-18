import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BASE_URL, showImage } from '../../config/api';

const cardShadow = {
  shadowColor: '#2846A0',
  shadowOpacity: 0.12,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 3 },
  elevation: 5,
};

export default function AllDoctors() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const res = await fetch(BASE_URL + '/doctors');
        const data = await res.json();
        if (Array.isArray(data)) setDoctors(data);
      } catch (err) {
        console.log('Doctors load nahi hue');
      }
    };
    loadDoctors();
  }, []);

  return (
    <View className="flex-1 bg-white pt-12">
      <Pressable className="px-6" onPress={() => router.back()}>
        <Image
          source={require('../../../assets/images/arrow-back.png')}
          style={{ width: 32, height: 32 }}
        />
      </Pressable>

      <Image
        source={require('../../../assets/images/logo-spaced.png')}
        style={{ width: 130, height: 66, alignSelf: 'center' }}
        resizeMode="contain"
      />

      <Text className="mb-3 mt-4 px-6 text-3xl font-extrabold text-[#111111]">
        Our Doctors
      </Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {doctors.map((item) => (
          <Pressable
            key={item._id}
            onPress={() => router.push('/consultant/consultant')}
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

              {item.hospital ? (
                <Text className="mt-1 text-[12px] text-[#555555]">
                  {item.hospital}
                </Text>
              ) : null}

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

        {doctors.length === 0 && (
          <Text className="mt-10 text-center text-[#666666]">
            Abhi koi doctor nahi hai
          </Text>
        )}
      </ScrollView>
    </View>
  );
}