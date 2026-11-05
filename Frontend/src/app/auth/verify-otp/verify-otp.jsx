import { useEffect, useRef, useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function VerifyOtp() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [seconds, setSeconds] = useState(30);
  const inputs = useRef([]);

  useEffect(() => {
    if (seconds === 0) return;
    const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (key, index) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View className="flex-1 items-center bg-white px-6 pb-8 pt-12">
      <Image
        source={require('../../../../assets/images/positive.jpeg')}
        className="h-24 w-52"
        resizeMode="contain"
      />

      <View className="w-full flex-1 items-center pt-10">
        <Text className="text-lg font-bold text-[#0F2A6B]">Verify OTP</Text>
        <Text className="mt-2 text-center text-xs text-gray-600">
          Enter the 6-digit OTP sent to +91 XXXXXXXXXX
        </Text>

        <View className="mt-6 flex-row">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              className="mx-1 h-12 w-11 rounded-lg border border-gray-300 text-center text-lg"
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleChange(value, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
            />
          ))}
        </View>

        <Text className="mt-5 text-xs text-gray-600">
          {seconds > 0 ? `Resend OTP in 00:${seconds < 10 ? '0' + seconds : seconds}` : 'Resend OTP'}
        </Text>
      </View>

      <Pressable
        className="h-12 w-full items-center justify-center rounded-full bg-[#1B4FD8]"
        onPress={() => router.push('/')}
      >
        <Text className="text-base font-bold text-white">VERIFY & LOGIN</Text>
      </Pressable>
    </View>
  );
}