import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, showImage } from '../../config/api';

export default function Appointments() {
  const router = useRouter();
  const [tab, setTab] = useState('upcoming');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async (type) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(BASE_URL + '/appointments?type=' + type, {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await res.json();
      if (res.ok) {
        setItems(data);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Server se connect nahi ho paya');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments(tab);
  }, [tab]);

  const cancelAppointment = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(BASE_URL + '/appointments/' + id + '/cancel', {
        method: 'PUT',
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      alert('Server se connect nahi ho paya');
    }
  };

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
        <Text className="ml-4 text-xl font-bold text-[#111111]">My Appointments</Text>
      </View>

      <View className="flex-row px-4 pt-4">
        <Pressable
          onPress={() => setTab('upcoming')}
          className={`mr-3 rounded-full px-8 py-3 ${tab === 'upcoming' ? 'bg-[#0E99C9]' : 'bg-white'}`}
        >
          <Text className={`text-base ${tab === 'upcoming' ? 'text-white' : 'text-gray-500'}`}>Upcoming</Text>
        </Pressable>
        <Pressable
          onPress={() => setTab('past')}
          className={`rounded-full px-8 py-3 ${tab === 'past' ? 'bg-[#0E99C9]' : 'bg-white'}`}
        >
          <Text className={`text-base ${tab === 'past' ? 'text-white' : 'text-gray-500'}`}>Past</Text>
        </Pressable>
      </View>

      {loading ? (
        <ActivityIndicator className="mt-10" color="#0E99C9" />
      ) : items.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-2xl font-bold text-[#111111]">No Appointments</Text>
        </View>
      ) : (
        <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
          {items.map((item) => (
            <View key={item._id} className="mt-4 rounded-2xl bg-white p-4" style={{ elevation: 2 }}>
              <View className="flex-row items-center">
                {item.doctor?.photo ? (
                  <Image
                    source={{ uri: showImage(item.doctor.photo) }}
                    style={{ width: 56, height: 56, borderRadius: 28 }}
                  />
                ) : (
                  <View className="h-14 w-14 items-center justify-center rounded-full bg-[#0E99C9]">
                    <Text className="text-2xl font-bold text-white">D</Text>
                  </View>
                )}
                <View className="ml-4 flex-1">
                  <Text className="text-lg font-bold text-[#111111]">
                    {item.doctor?.name || 'Doctor'}
                  </Text>
                  <Text className="text-sm text-gray-500">{item.doctor?.specialty || ''}</Text>
                </View>
                <View className="rounded-full bg-[#E6F3FB] px-3 py-1">
                  <Text className="text-[11px] font-bold uppercase text-[#111111]">{item.status}</Text>
                </View>
              </View>

              <View className="mt-3 flex-row justify-between">
                <View>
                  <Text className="text-xs text-gray-500">Patient</Text>
                  <Text className="text-sm font-bold text-[#111111]">{item.patientName}</Text>
                </View>
                <View>
                  <Text className="text-xs text-gray-500">Date</Text>
                  <Text className="text-sm font-bold text-[#111111]">
                    {new Date(item.date).toDateString()}
                  </Text>
                </View>
                <View>
                  <Text className="text-xs text-gray-500">Time</Text>
                  <Text className="text-sm font-bold text-[#111111]">{item.timeSlot}</Text>
                </View>
              </View>

              {tab === 'upcoming' && (
                <Pressable
                  onPress={() => cancelAppointment(item._id)}
                  className="mt-4 h-11 items-center justify-center rounded-full border border-[#D93025]"
                >
                  <Text className="text-sm font-bold text-[#D93025]">Cancel Appointment</Text>
                </Pressable>
              )}
            </View>
          ))}
          <View className="h-10" />
        </ScrollView>
      )}
    </View>
  );
}