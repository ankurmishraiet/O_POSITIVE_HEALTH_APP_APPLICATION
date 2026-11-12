import { useEffect, useRef, useState } from 'react';
import { Image, Pressable, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function VerifyOtp() {
  const router = useRouter();
  const { phone } = useLocalSearchParams();
  const { width, height } = useWindowDimensions();
  const [s, setS] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [seconds, setSeconds] = useState(30);
  const inputs = useRef([]);

  useEffect(() => {
    setS(Math.min(width / 393, height / 852));
  }, [width, height]);

  useEffect(() => {
    if (seconds === 0) return;
    const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const handleChange = (text, index) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setSeconds(30);
    inputs.current[0].focus();
  };

  const canVerify = otp.every((digit) => digit !== '');
  const timeText = `00:${String(seconds).padStart(2, '0')}`;

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
          paddingTop: 132 * s,
          paddingBottom: 160 * s,
        }}
      >
        <Image
          source={require('../../../../assets/images/logo-spaced.png')}
          style={{ width: 200 * s, height: 101 * s }}
          resizeMode="contain"
        />

        <Text className="mt-12 text-[22px] font-bold text-[#1B3FB0]">Verify OTP</Text>
        <Text className="mt-1.5 text-xs text-gray-700">Enter the 6-digit OTP sent to</Text>
        <Text className="mt-1 text-xs font-bold text-[#0F2A6B]">+91 {phone || 'XXXXXXXXXX'}</Text>

        <View className="mt-9 flex-row">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(input) => (inputs.current[index] = input)}
              className="rounded-lg border border-[#D5DBE8] bg-white text-center text-base font-bold text-[#0F2A6B]"
              style={{
                width: 46 * s,
                height: 52 * s,
                marginHorizontal: 5 * s,
                outlineStyle: 'none',
              }}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(event) => handleKeyPress(event, index)}
            />
          ))}
        </View>

        {seconds > 0 ? (
          <Text className="mt-6 text-[13px] text-[#1B3FB0]">
            Resend OTP in <Text className="font-bold">{timeText}</Text>
          </Text>
        ) : (
          <Pressable className="mt-6" onPress={handleResend}>
            <Text className="text-[13px] font-bold text-[#F28C00] underline">Resend OTP</Text>
          </Pressable>
        )}

        <Pressable
          disabled={!canVerify}
          className={`mt-[72px] h-12 w-4/5 items-center justify-center rounded-full bg-[#1B4FD8] ${
            canVerify ? '' : 'opacity-50'
          }`}
          onPress={() => router.push('/')}
        >
          <Text className="text-sm font-bold text-white">VERIFY & LOGIN</Text>
        </Pressable>
      </View>
    </View>
  );
}