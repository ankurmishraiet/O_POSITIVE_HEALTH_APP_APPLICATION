import { Image, Pressable, Share, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

const APP_LINK = '';

const points = [
  'Find trusted doctors and hospitals',
  'Keep health records of the whole family in one place',
  'Read health articles and watch health videos',
];

export default function Refer() {
  const router = useRouter();

  const invite = async () => {
    let message =
      'I am using the O Positive Health app to find doctors and hospitals and to keep my family health records in one place. You should try it too!';
    if (APP_LINK) {
      message = message + '\n\nDownload the app: ' + APP_LINK;
    }
    try {
      await Share.share({ message });
    } catch (err) {
      alert('Share nahi ho paya');
    }
  };

  return (
    <View className="flex-1 bg-[#F7F8FA]">
      <View className="flex-row items-center bg-white px-4 pb-4 pt-12" style={{ elevation: 3 }}>
        <Pressable onPress={() => router.back()} className="p-2">
          <Image
            source={require('../../../assets/images/arrow-back.png')}
            style={{ width: 22, height: 22 }}
            resizeMode="contain"
          />
        </Pressable>
        <Text className="ml-4 text-xl font-bold text-[#111111]">Refer Family / Friends</Text>
      </View>

      <View className="flex-1 px-5">
        <Image
          source={require('../../../assets/images/acc-refer.png')}
          style={{ width: 90, height: 90, alignSelf: 'center', marginTop: 40 }}
          resizeMode="contain"
        />

        <Text className="mt-6 text-center text-2xl font-bold text-[#0F1F4D]">
          Share good health with the people you love
        </Text>
        <Text className="mt-3 text-center text-sm leading-6 text-gray-600">
          Invite your family and friends to O Positive Health.
        </Text>

        <View className="mt-8 rounded-2xl bg-white p-5" style={{ elevation: 2 }}>
          {points.map((item) => (
            <View key={item} className="mb-3 flex-row">
              <Text className="mr-3 text-base font-bold text-[#0E99C9]">✓</Text>
              <Text className="flex-1 text-sm leading-6 text-gray-700">{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="bg-white px-4 pb-6 pt-3">
        <Pressable
          onPress={invite}
          className="h-14 items-center justify-center rounded-full bg-[#0E99C9]"
        >
          <Text className="text-lg font-bold text-white">Invite Now</Text>
        </Pressable>
      </View>
    </View>
  );
}