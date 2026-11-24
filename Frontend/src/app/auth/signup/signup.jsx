import { useEffect, useState } from 'react';
import {
  Image, Pressable, ScrollView, Text, TextInput, View, useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../config/api';

export default function Signup() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [s, setS] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(true);

  useEffect(() => {
    setS(Math.min(width / 393, height / 852));
  }, [width, height]);

  // Button tabhi chalega jab sab fields bhare ho aur checkbox tick ho
  const canSignup =
    agreed && name.trim() !== '' && email.trim() !== '' && password !== '' && confirm !== '';

  const signup = async () => {
    // Password kam se kam 8 akshar ka ho, letter aur number dono ho
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      alert('Password kam se kam 8 akshar ka ho, usme letter aur number dono hon');
      return;
    }
    if (password !== confirm) {
      alert('Dono password same nahi hain');
      return;
    }
    try {
      const res = await fetch(BASE_URL + '/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      router.replace('/home');
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
          source={require('../../../../assets/images/auth-signup.png')}
          style={{ width: 260 * s, height: 160 * s, marginTop: 4 * s }}
          resizeMode="contain"
        />

        <Text className="mt-1 text-center text-[26px] font-bold text-[#0F2A6B]">
          Create Your Account
        </Text>
        <Text className="mt-1 text-center text-sm text-gray-700">
          Sign up to get started with O Positive Health
        </Text>

        {/* Full name */}
        <View className="mt-5 h-12 w-full flex-row items-center rounded-xl border border-[#D5DBE8] bg-white px-3">
          <Ionicons name="person-outline" size={20} color="#6B7280" />
          <TextInput
            className="h-full flex-1 px-3 text-sm text-[#0F2A6B]"
            placeholder="Full name"
            placeholderTextColor="#9AA3B5"
            style={{ outlineStyle: 'none' }}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email */}
        <View className="mt-3 h-12 w-full flex-row items-center rounded-xl border border-[#D5DBE8] bg-white px-3">
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

        {/* Create password */}
        <View className="mt-3 h-12 w-full flex-row items-center rounded-xl border border-[#D5DBE8] bg-white px-3">
          <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
          <TextInput
            className="h-full flex-1 px-3 text-sm text-[#0F2A6B]"
            placeholder="Create password"
            placeholderTextColor="#9AA3B5"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            style={{ outlineStyle: 'none' }}
            value={password}
            onChangeText={setPassword}
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
            secureTextEntry={!showConfirm}
            autoCapitalize="none"
            style={{ outlineStyle: 'none' }}
            value={confirm}
            onChangeText={setConfirm}
          />
          <Pressable onPress={() => setShowConfirm(!showConfirm)}>
            <Ionicons
              name={showConfirm ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#6B7280"
            />
          </Pressable>
        </View>

        <Pressable
          className="mt-4 w-full flex-row items-start"
          onPress={() => setAgreed(!agreed)}
        >
          <View
            className={`mr-2 mt-0.5 h-4 w-4 items-center justify-center rounded ${agreed ? 'bg-[#1B4FD8]' : 'border border-[#9AA3B5] bg-white'
              }`}
          >
            {agreed && <Text className="text-[10px] font-bold text-white">✓</Text>}
          </View>
          <Text className="flex-1 text-[11px] leading-4 text-gray-700">
            I agree to the <Text className="text-[#F28C00] underline">T&Cs</Text> and{' '}
            <Text className="text-[#F28C00] underline">Privacy Policy</Text> of O Positive Health
          </Text>
        </Pressable>

        <Pressable
          disabled={!canSignup}
          className={`mt-5 h-12 w-full flex-row items-center justify-center rounded-full bg-[#1B4FD8] ${canSignup ? '' : 'opacity-50'
            }`}
          onPress={signup}
        >
          <Text className="mr-2 text-base font-bold text-white">Sign Up</Text>
          <Text className="text-xl font-bold text-white">→</Text>
        </Pressable>

        <View className="mt-4 flex-row">
          <Text className="text-sm text-gray-800">Already have an account? </Text>
          <Pressable onPress={() => router.replace('/auth/login/login')}>
            <Text className="text-sm font-semibold text-[#F28C00] underline">Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}