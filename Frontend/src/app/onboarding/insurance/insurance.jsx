import { Image, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Insurance() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center bg-white px-6 pb-8 pt-12">
      <Image
        source={require('../../../../assets/images/positive.jpeg')}
        className="h-24 w-52"
        resizeMode="contain"
      />

      <View className="flex-1 items-center justify-center">
        <Image
          source={require('../../../../assets/images/shield.jpeg')}
          className="mb-5 h-48 w-56"
          resizeMode="contain"
        />
        <Text className="text-center text-xl font-bold text-[#0F2A6B]">
          {'Insurance &\nMedical Loan Support'}
        </Text>
        <Text className="mt-3 px-2 text-center text-sm text-gray-600">
          Get cashless treatment, insurance assistance and easy medical loans at 0% interest.
        </Text>

        <View className="mt-6 flex-row">
          <View className="mx-1 h-2 w-6 rounded-full bg-[#1B4FD8]" />
          <View className="mx-1 h-2 w-2 rounded-full bg-[#C9D6F5]" />
          <View className="mx-1 h-2 w-2 rounded-full bg-[#C9D6F5]" />
        </View>
      </View>

      <Pressable
        className="h-12 w-full items-center justify-center rounded-full bg-[#1B4FD8]"
        onPress={() => router.push('/auth/login/login')}
      >
        <Text className="text-base font-bold text-white">Next  →</Text>
      </Pressable>
    </View>
  );
}