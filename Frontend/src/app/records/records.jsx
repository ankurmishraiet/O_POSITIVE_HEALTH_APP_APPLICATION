import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config/api';

export default function Records() {
  const router = useRouter();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(BASE_URL + '/family', {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await res.json();
        if (res.ok) {
          setMembers(data);
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert('Server se connect nahi ho paya');
      } finally {
        setLoading(false);
      }
    };
    loadMembers();
  }, []);

  return (
    <View className="flex-1 bg-[#F7F8FA]">
      <View className="flex-row items-center bg-white px-4 pb-4 pt-12" style={{ elevation: 3 }}>
        <Pressable onPress={() => router.back()} className="p-2">
          <Image
            source={require('../../../assets/images/arrow-back.png')}
            style={{ width: 22, height: 22 }}
            resizeMode="contain"
          />
        </Pressable>
        <Text className="ml-4 text-xl font-bold text-[#111111]">My Health Records</Text>
      </View>

      {loading ? (
        <ActivityIndicator className="mt-10" color="#0E99C9" />
      ) : members.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-center text-xl font-bold text-[#111111]">No family members yet</Text>
          <Text className="mt-2 text-center text-sm text-gray-500">
            Records are saved for each family member. Please add a member first.
          </Text>
          <Pressable
            onPress={() => router.push('/family/family')}
            className="mt-6 h-14 w-full items-center justify-center rounded-full bg-[#0E99C9]"
          >
            <Text className="text-lg font-bold text-white">Go to My Family</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
          <Text className="mt-6 text-lg font-bold text-[#111111]">Whose records do you want to see?</Text>

          {members.map((item) => (
            <Pressable
              key={item._id}
              onPress={() =>
                router.push({
                  pathname: '/records/member',
                  params: { id: item._id, name: item.name },
                })
              }
              className="mt-4 flex-row items-center rounded-2xl bg-white p-4"
              style={{ elevation: 2 }}
            >
              <View className="h-14 w-14 items-center justify-center rounded-full bg-[#0E99C9]">
                <Text className="text-2xl font-bold text-white">
                  {item.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-lg font-bold text-[#111111]">{item.name}</Text>
                <Text className="text-sm uppercase text-gray-500">{item.relation}</Text>
              </View>
              <Image
                source={require('../../../assets/images/acc-chevron.png')}
                style={{ width: 10, height: 14 }}
              />
            </Pressable>
          ))}

          <View className="h-10" />
        </ScrollView>
      )}
    </View>
  );
}