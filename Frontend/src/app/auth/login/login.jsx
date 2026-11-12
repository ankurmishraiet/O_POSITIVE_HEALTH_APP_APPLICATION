import { useEffect, useState } from 'react';
import {
  Image, Pressable, Text, TextInput, View, useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [s, setS] = useState(1);
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(true);

  useEffect(() => {
    setS(Math.min(width / 393, height / 852));
  }, [width, height]);

  const canContinue = agreed && phone.length === 10;

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

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingTop: 68 * s,
          paddingBottom: 160 * s,
        }}
      >
        <Image
          source={require('../../../../assets/images/logo-spaced.png')}
          style={{ width: 180 * s, height: 91 * s }}
          resizeMode="contain"
        />

        <Image
          source={require('../../../../assets/images/doctor-nurse.jpeg')}
          style={{ width: 310 * s, height: 210 * s, marginTop: 28 * s }}
          resizeMode="contain"
        />

        <Text className="mt-8 text-center text-[22px] font-bold text-[#0F2A6B]">
          Login to your account
        </Text>

        <View className="mt-6 h-12 w-full flex-row items-center rounded-xl border border-[#D5DBE8] bg-white">
          <Text className="border-r border-[#D5DBE8] px-4 text-sm font-bold text-[#0F2A6B]">
            +91
          </Text>
          <TextInput
            className="h-full flex-1 px-3 text-sm text-[#0F2A6B]"
            placeholder="Enter your mobile number"
            placeholderTextColor="#9AA3B5"
            keyboardType="number-pad"
            maxLength={10}
            style={{ outlineStyle: 'none' }}
            value={phone}
            onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
          />
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
          disabled={!canContinue}
          className={`mt-6 h-12 w-full flex-row items-center justify-center rounded-full bg-[#1B4FD8] ${canContinue ? '' : 'opacity-50'
            }`}
          onPress={() =>
            router.push({ pathname: '/auth/verify-otp/Verifyotp', params: { phone } })
          }
        >
          <Text className="mr-2 text-sm font-bold tracking-wide text-white">CONTINUE</Text>
          <Text className="text-xl font-bold text-white">→</Text>
        </Pressable>

        <Text className="mt-3 text-[11px] text-gray-700">
          Have a Corporate Account? <Text className="text-[#F28C00] underline">Login here</Text>
        </Text>
      </View>
    </View>
  );
}