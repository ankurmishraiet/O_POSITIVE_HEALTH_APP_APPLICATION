import { useEffect, useState } from 'react';
import {
  Image, Pressable, ScrollView, Text, TextInput, View, useWindowDimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from '../../../config/api';

export default function Verifyotp() {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const { width, height } = useWindowDimensions();
  const [s, setS] = useState(1);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setS(Math.min(width / 393, height / 852));
  }, [width, height]);

  const canReset = otp.length === 6 && newPassword !== '' && confirm !== '';

  // OTP check karke naya password set karo
  const resetPassword = async () => {
    // Password kam se kam 8 akshar ka ho, letter aur number dono ho
    if (newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      alert('Password kam se kam 8 akshar ka ho, usme letter aur number dono hon');
      return;
    }
    if (newPassword !== confirm) {
      alert('Dono password same nahi hain');
      return;
    }
    try {
      const res = await fetch(BASE_URL + '/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      alert(data.message);
      router.replace('/auth/login/login');
    } catch (err) {
      alert('Server se connect nahi ho paya');
    }
  };

  // OTP dobara bhejo
  const resendOtp = async () => {
    try {
      const res = await fetch(BASE_URL + '/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      alert(data.message);
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
          style={{ width: 230 * s, height: 140 * s, marginTop: 8 * s }}
          resizeMode="contain"
        />

        <Text className="mt-2 text-center text-[26px] font-bold text-[#0F2A6B]">
          Check your email
        </Text>
        <Text className="mt-2 px-4 text-center text-sm leading-5 text-gray-800">
          We sent a 6-digit OTP to {email}
        </Text>

        {/* OTP */}
        <View className="mt-5 h-12 w-full flex-row items-center rounded-xl border border-[#D5DBE8] bg-white px-3">
          <Ionicons name="key-outline" size={20} color="#6B7280" />
          <TextInput
            className="h-full flex-1 px-3 text-sm text-[#0F2A6B]"
            placeholder="Enter 6-digit OTP"
            placeholderTextColor="#9AA3B5"
            keyboardType="number-pad"
            maxLength={6}
            style={{ outlineStyle: 'none' }}
            value={otp}
            onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, ''))}
          />
        </View>

        {/* New password */}
        <View className="mt-3 h-12 w-full flex-row items-center rounded-xl border border-[#D5DBE8] bg-white px-3">
          <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
          <TextInput
            className="h-full flex-1 px-3 text-sm text-[#0F2A6B]"
            placeholder="New password"
            placeholderTextColor="#9AA3B5"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            style={{ outlineStyle: 'none' }}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#6B7280"
            />
          </Pressable>
        </View>
        <Text className="mt-1 w-full px-1 text-[11px] text-gray-500">
          Kam se kam 8 akshar, letter aur number dono
        </Text>

        {/* Confirm password */}
        <View className="mt-3 h-12 w-full flex-row items-center rounded-xl border border-[#D5DBE8] bg-white px-3">
          <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
          <TextInput
            className="h-full flex-1 px-3 text-sm text-[#0F2A6B]"
            placeholder="Confirm password"
            placeholderTextColor="#9AA3B5"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            style={{ outlineStyle: 'none' }}
            value={confirm}
            onChangeText={setConfirm}
          />
        </View>

        <Pressable
          disabled={!canReset}
          className={`mt-6 h-12 w-full flex-row items-center justify-center rounded-full bg-[#1B4FD8] ${canReset ? '' : 'opacity-50'
            }`}
          onPress={resetPassword}
        >
          <Text className="mr-2 text-base font-bold text-white">Reset Password</Text>
          <Text className="text-xl font-bold text-white">→</Text>
        </Pressable>

        <View className="mt-5 flex-row">
          <Text className="text-sm text-gray-800">Didn't get it? </Text>
          <Pressable onPress={resendOtp}>
            <Text className="text-sm font-semibold text-[#F28C00] underline">Resend OTP</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}