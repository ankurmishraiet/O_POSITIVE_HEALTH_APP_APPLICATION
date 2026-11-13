import { Image, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function About() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View className="mt-12 h-14 flex-row items-center border-b border-[#E5E9F0] px-5">
        <Pressable onPress={() => router.back()}>
          <Image source={require('../../../assets/images/arrow-back.png')} style={{ width: 28, height: 28 }} />
        </Pressable>
        <Text className="ml-4 text-xl font-extrabold text-[#0F1F4D]">About Us</Text>
      </View>

      <View className="h-14 flex-row items-center px-4">
        <Image
          source={require('../../../assets/images/logo-spaced.png')}
          style={{ width: 150, height: 44 }}
          resizeMode="contain"
        />
        <View className="flex-1" />
        <Image source={require('../../../assets/images/about-phone.png')} style={{ width: 22, height: 22 }} />
        <Image source={require('../../../assets/images/about-wa.png')} style={{ width: 24, height: 24, marginLeft: 16 }} />
        <Image source={require('../../../assets/images/about-support.png')} style={{ width: 24, height: 24, marginLeft: 16 }} />
        <Image source={require('../../../assets/images/about-menu.png')} style={{ width: 24, height: 24, marginLeft: 16 }} />
      </View>

      <View className="h-7 items-center justify-center bg-[#1B3FA0]">
        <Text className="text-xs font-extrabold text-white">Discover the O Positive Health App ››</Text>
      </View>

            <Image
        source={require('../../../assets/images/about-team.png')}
        style={{ width: '100%', height: 215, marginTop: 20 }}
        resizeMode="cover"
      />

      <View className="flex-1 bg-[#F0F6FD] px-5 pt-6">
        <Text className="text-2xl font-extrabold text-[#0F1F4D]">About O Positive Health</Text>
        <View className="mt-2 h-[3px] w-16 bg-[#F28C00]" />

        <Text className="mt-5 text-sm leading-6 text-gray-800">
          <Text className="font-extrabold">O Positive Health</Text>
          {' '}is a healthcare support platform focused on making quality medical care more accessible,
          transparent and affordable.
        </Text>

        <Text className="mt-5 text-sm leading-6 text-gray-800">
          We help patients navigate their healthcare journey — from finding the right doctors and hospitals
          to exploring treatment options, insurance assistance and medical financing.
        </Text>

        <Text className="mt-5 text-base font-extrabold text-[#123D83]">Our Vision</Text>
        <Text className="mt-1 text-sm leading-6 text-gray-800">
          To make dependable healthcare guidance accessible to every individual and family.
        </Text>
      </View>
    </View>
  );
}