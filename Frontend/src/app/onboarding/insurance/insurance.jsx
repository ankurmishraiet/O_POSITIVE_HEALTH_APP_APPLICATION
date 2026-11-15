import { useEffect, useState } from 'react';
import { Image, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';

export default function Insurance() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [s, setS] = useState(1);

  useEffect(() => {
    setS(Math.min(width / 393, height / 852));
  }, [width, height]);

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
        className="flex-1 items-center px-5"
        style={{ paddingTop: 72 * s, paddingBottom: 160 * s }}
      >
        <Image
          source={require('../../../../assets/images/logo-spaced.png')}
          style={{ width: 200 * s, height: 101 * s }}
          resizeMode="contain"
        />

        <View className="flex-1 items-center justify-center">
          <Image
            source={require('../../../../assets/images/shield.jpeg')}
            style={{ width: 220 * s, height: 190 * s, marginBottom: 12 * s }}
            resizeMode="contain"
          />
          <Text className="text-center text-[22px] font-bold leading-8 text-[#0F2A6B]">
            {'Insurance &\nMedical Loan Support'}
          </Text>
          <Text className="mt-3 px-6 text-center text-xs leading-5 text-gray-600">
            Get cashless treatment, insurance assistance and easy medical loans at 0% interest.
          </Text>
          <View className="mt-6 flex-row">
            <View className="mx-1 h-2 w-6 rounded-full bg-[#1B4FD8]" />
            <View className="mx-1 h-2 w-2 rounded-full bg-[#C9D6F5]" />
            <View className="mx-1 h-2 w-2 rounded-full bg-[#C9D6F5]" />
          </View>
        </View>

        <Pressable
          className="h-12 w-full flex-row items-center justify-center rounded-full bg-[#1B4FD8]"
          onPress={() => router.push('/auth/login/login')}
        >
          <Text className="mr-2 text-base font-bold text-white">Next</Text>
          <Text className="text-xl font-bold text-white">→</Text>
        </Pressable>
      </View>
    </View>
  );
}