import { useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [agreed, setAgreed] = useState(true);

  return (
    <View className="flex-1 items-center bg-white px-6 pb-8 pt-12">
      <Image
        source={require('../../../../assets/images/positive.jpeg')}
        className="h-24 w-52"
        resizeMode="contain"
      />

      <Image
        source={require('../../../../assets/images/doctor-nurse.jpeg')}
        className="mt-4 h-44 w-64"
        resizeMode="contain"
      />

      <View className="w-full flex-1 justify-center">
        <Text className="mb-5 text-center text-xl font-bold text-[#0F2A6B]">
          Login to your account
        </Text>

        <View className="h-12 flex-row items-center rounded-lg border border-gray-300 px-3">
          <Text className="mr-3 text-sm font-bold text-[#0F2A6B]">+91</Text>
          <TextInput
            className="flex-1 text-sm"
            placeholder="Enter your mobile number"
            keyboardType="number-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        <Pressable className="mt-4 flex-row items-center" onPress={() => setAgreed(!agreed)}>
          <View
            className={
              agreed
                ? 'mr-2 h-5 w-5 items-center justify-center rounded bg-[#1B4FD8]'
                : 'mr-2 h-5 w-5 rounded border border-gray-400'
            }
          >
            {agreed && <Text className="text-xs font-bold text-white">✓</Text>}
          </View>
          <Text className="flex-1 text-xs text-gray-600">
            I agree to the T&Cs and Privacy Policy of O Positive Health
          </Text>
        </Pressable>

        <Pressable
          className="mt-6 h-12 items-center justify-center rounded-full bg-[#1B4FD8]"
          onPress={() => router.push('/auth/verify-otp/verify-otp')}
        >
          <Text className="text-base font-bold text-white">CONTINUE  →</Text>
        </Pressable>

        <Text className="mt-4 text-center text-xs text-gray-600">
          Have a Corporate Account? <Text className="text-[#F28C00]">Login here</Text>
        </Text>
      </View>
    </View>
  );
}