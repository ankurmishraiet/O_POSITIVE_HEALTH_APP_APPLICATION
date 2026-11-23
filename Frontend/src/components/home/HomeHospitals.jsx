import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BASE_URL, showImage } from '../../config/api';

// Home par kitne items dikhane hain (baaki View All par)
const HOME_LIMIT = 10;

// side me swipe hone wale card ki chaudai
const CARD_WIDTH = 220;

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

// chhoti star rating (sirf jab rating 0 se badi ho)
function StarRating({ rating, count }) {
  if (!(rating > 0)) return null;
  return (
    <View className="mt-1 flex-row items-center">
      <Ionicons name="star" size={13} color="#F5A623" />
      <Text className="ml-1 text-[12px] font-bold text-[#111111]">
        {Number(rating).toFixed(1)}
      </Text>
      {count > 0 ? (
        <Text className="ml-1 text-[11px] text-[#666666]">({count})</Text>
      ) : null}
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
        if (Array.isArray(hospitalData)) setHospitals(hospitalData.slice(0, HOME_LIMIT));

        const doctorRes = await fetch(BASE_URL + '/doctors');
        const doctorData = await doctorRes.json();
        if (Array.isArray(doctorData)) setDoctors(doctorData.slice(0, HOME_LIMIT));
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

      {/* Hospitals: side me swipe */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 17, paddingBottom: 12 }}
      >
        {hospitals.map((item) => (
          <Pressable
            key={item._id}
            onPress={() =>
              router.push({ pathname: '/hospital-details', params: { id: item._id } })
            }
            className="mr-3 rounded-2xl bg-white pb-3"
            style={[cardShadow, { width: CARD_WIDTH }]}
          >
            {item.image ? (
              <Image
                source={{ uri: showImage(item.image) }}
                style={{ width: '100%', height: 105, borderRadius: 14 }}
                resizeMode="cover"
              />
            ) : (
              <View
                className="items-center justify-center bg-[#EEF0F6]"
                style={{ width: '100%', height: 105, borderRadius: 14 }}
              >
                <Text className="px-2 text-center text-[13px] font-bold text-[#0F2A6B]">
                  {item.name}
                </Text>
              </View>
            )}

            <Text
              className="ml-[14px] mr-[14px] mt-[10px] text-[14px] font-extrabold text-[#1B2A6B]"
              numberOfLines={1}
            >
              {item.name}
            </Text>

            {item.address || item.city ? (
              <Text
                className="ml-[14px] mr-[14px] mt-1 text-[12px] text-[#666666]"
                numberOfLines={1}
              >
                {[item.address, item.city].filter(Boolean).join(', ')}
              </Text>
            ) : null}

            {/* rating */}
            <View className="ml-[14px]">
              <StarRating rating={item.rating} count={item.ratingCount} />
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Doctors Section */}
      <SectionHeader
        title="Our Doctors"
        onViewAll={() => router.push('/consultant/doctors')}
      />

      {/* Doctors: side me swipe */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 17, paddingBottom: 12 }}
      >
        {doctors.map((item) => (
          <Pressable
            key={item._id}
            onPress={() =>
              router.push({ pathname: '/doctor-details', params: { id: item._id } })
            }
            className="mr-3 flex-row items-center rounded-2xl bg-white px-4 py-[14px]"
            style={[cardShadow, { width: CARD_WIDTH }]}
          >
            <Image
              source={
                item.photo
                  ? { uri: showImage(item.photo) }
                  : require('../../../assets/images/doctor-1.png')
              }
              style={{ width: 80, height: 80, borderRadius: 40 }}
              resizeMode="cover"
            />

            <View className="ml-[12px] flex-1">
              <Text
                className="text-[14.5px] font-extrabold text-[#111111]"
                numberOfLines={1}
              >
                {item.name}
              </Text>

              <Text
                className="mt-1 text-[11px] leading-[15px] text-[#666666]"
                numberOfLines={1}
              >
                {item.specialty}
              </Text>

              {/* qualification (jo bhari ho) */}
              {item.qualification ? (
                <Text
                  className="mt-0.5 text-[11px] text-[#666666]"
                  numberOfLines={1}
                >
                  {item.qualification}
                </Text>
              ) : null}

              {item.experience ? (
                <Text className="mt-1 text-[12px] text-[#555555]">
                  Experience:{' '}
                  <Text className="font-bold text-[#111111]">
                    {item.experience} years
                  </Text>
                </Text>
              ) : null}

              {/* rating */}
              <StarRating rating={item.rating} />
            </View>
          </Pressable>
        ))}
      </ScrollView>

    </View>
  );
}