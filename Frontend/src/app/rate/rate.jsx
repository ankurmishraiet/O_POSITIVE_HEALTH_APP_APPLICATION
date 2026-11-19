import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config/api';

export default function Rate() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (rating === 0) {
      alert('Pehle rating chuno');
      return;
    }
    try {
      setSaving(true);
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(BASE_URL + '/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ rating, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      setDone(true);
    } catch (err) {
      alert('Server se connect nahi ho paya');
    } finally {
      setSaving(false);
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
        <Text className="ml-4 text-xl font-bold text-[#111111]">Rate Us</Text>
      </View>

      {done ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-5xl text-[#F5B301]">★</Text>
          <Text className="mt-4 text-center text-2xl font-bold text-[#111111]">
            Thank you for your feedback
          </Text>
          <Text className="mt-2 text-center text-sm text-gray-500">
            Your rating helps us make the app better.
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="mt-8 h-14 w-full items-center justify-center rounded-full bg-[#0E99C9]"
          >
            <Text className="text-lg font-bold text-white">Done</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView className="px-5" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Text className="mt-10 text-center text-2xl font-bold text-[#0F1F4D]">
            How was your experience?
          </Text>

          <View className="mt-6 flex-row justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable key={star} onPress={() => setRating(star)} className="px-2">
                <Text style={{ fontSize: 44, color: star <= rating ? '#F5B301' : '#C8CDD4' }}>★</Text>
              </Pressable>
            ))}
          </View>

          <Text className="mt-8 text-base font-bold text-[#0F1F4D]">Tell us more (optional)</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Write your feedback here"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            className="mt-2 h-36 rounded-2xl border border-[#6B7280] bg-white p-4 text-base text-[#111111]"
          />

          <Pressable
            onPress={submit}
            disabled={saving}
            className={`mt-8 h-14 items-center justify-center rounded-full bg-[#0E99C9] ${
              saving ? 'opacity-50' : ''
            }`}
          >
            <Text className="text-lg font-bold text-white">{saving ? 'Submitting...' : 'Submit'}</Text>
          </Pressable>

          <View className="h-10" />
        </ScrollView>
      )}
    </View>
  );
}