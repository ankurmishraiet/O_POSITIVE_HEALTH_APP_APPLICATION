import { useEffect, useState } from 'react';
import {
  Image, Pressable, ScrollView, Text, TextInput, View, useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from '../../../config/api';

export default function ForgotPassword() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [s, setS] = useState(1);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setS(Math.min(width / 393, height / 852));
  }, [width, height]);

  const canSend = email.trim() !== '';

  // Email par OTP bhejo, phir OTP wali screen kholo
  const sendOtp = async () => {
    try {
      const res = await fetch(BASE_URL + '/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      router.push({
        pathname: '/auth/verify-otp/Verifyotp',
        params: { email: email.trim() },
      });
    } catch (err) {
      alert('Server se connect nahi ho paya');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Image
        source={require('../../../../assets/images/top-orange.png')}
        style={{ position: 'absolute', top: 0, right: 0, width: 158 * s, height: 189 * s }}
      />
      <Image
        source={require('../../../../assets/images/top-blue.png')}
        style={{ position: 'absolute', top: 0, right: 0, width: 120 * s, height: 184 * s }}
      />

      <Image
        source={require('../../../../assets/images/bottom-light.png')}
        style={{ position: 'absolute', bottom: 0, left: 0, width: 214 * s, height: 59 * s }}
      />
      <Image
        source={require('../../../../assets/images/bottom-orange.png')}
        style={{ position: 'absolute', bottom: 0, right: 0, width: 282 * s, height: 149 * s }}
      />
      <Image
        source={require('../../../../assets/images/bottom-blue.png')}
        style={{ position: 'absolute', bottom: 0, right: 0, width: 239 * s, height: 149 * s }}
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingTop: 50 * s,
          paddingBottom: 130 * s,
        }}
      >
        <Image
          source={require('../../../../assets/images/logo-spaced.png')}
          style={{ width: 180 * s, height: 91 * s }}
          resizeMode="contain"
        />

        <Image
          source={require('../../../../assets/images/auth-lock.png')}
          style={{ width: 270 * s, height: 165 * s, marginTop: 12 * s }}
          resizeMode="contain"
        />

        <Text className="mt-3 text-center text-[28px] font-bold text-[#0F2A6B]">
          Forgot Password?
        </Text>
        <Text className="mt-2 px-4 text-center text-sm leading-5 text-gray-800">
          No worries! Enter your email and we'll send you an OTP to reset your password.
        </Text>

        {/* Email */}
        <View className="mt-6 h-12 w-full flex-row items-center rounded-xl border border-[#D5DBE8] bg-white px-3">
          <Ionicons name="mail-outline" size={20} color="#6B7280" />
          <TextInput
            className="h-full flex-1 px-3 text-sm text-[#0F2A6B]"
            placeholder="Enter email address"
            placeholderTextColor="#9AA3B5"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ outlineStyle: 'none' }}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Pressable
          disabled={!canSend}
          className={`mt-6 h-12 w-full flex-row items-center justify-center rounded-full bg-[#1B4FD8] ${canSend ? '' : 'opacity-50'
            }`}
          onPress={sendOtp}
        >
          <Text className="mr-2 text-base font-bold text-white">Send OTP</Text>
          <Text className="text-xl font-bold text-white">→</Text>
        </Pressable>

        <View className="mt-5 flex-row">
          <Text className="text-sm text-gray-800">Remember your password? </Text>
          <Pressable onPress={() => router.replace('/auth/login/login')}>
            <Text className="text-sm font-semibold text-[#F28C00] underline">Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}