import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

const sections = [
  {
    title: '1. About the App',
    text: 'O Positive Health is a healthcare app that helps you find hospitals and doctors, read health articles, watch health videos and keep your health information in one place. By using the app you agree to these terms.',
  },
  {
    title: '2. Your Account',
    text: 'You log in with your mobile number and a one time password. You are responsible for keeping your phone and your OTP safe. Please give correct information about yourself and your family members.',
  },
  {
    title: '3. Not Medical Advice',
    text: 'The articles, videos and chatbot replies in the app are only for general information. They are not a replacement for a doctor. In an emergency, please call your local emergency number or go to the nearest hospital.',
  },
  {
    title: '4. Doctors and Hospitals',
    text: 'Doctors and hospitals shown in the app are listed for your help. We try to keep their details correct, but timings, fees and availability can change. Please confirm with the hospital before you visit.',
  },
  {
    title: '5. Your Responsibilities',
    text: 'You agree not to misuse the app, not to upload anything harmful or illegal, and not to try to break into the app or its servers.',
  },
  {
    title: '6. Health Records',
    text: 'Prescriptions, reports and other records that you upload belong to you. You are responsible for what you upload and for the permission of the family member whose records you add.',
  },
  {
    title: '7. Changes to the App',
    text: 'We may update, add or remove features at any time to improve the app. We may also update these terms, and the latest version will always be available inside the app.',
  },
  {
    title: '8. Contact Us',
    text: 'If you have any question about these terms, please use the Contact Us option in the Account section of the app.',
  },
];

export default function Terms() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View
        className="flex-row items-center bg-white px-4 pb-4 pt-12"
        style={{ elevation: 3 }}
      >
        <Pressable onPress={() => router.back()} className="p-2">
          <Image
            source={require('../../../assets/images/arrow-back.png')}
            style={{ width: 22, height: 22 }}
            resizeMode="contain"
          />
        </Pressable>
        <Text className="ml-4 text-xl font-bold text-[#111111]">Terms and Conditions</Text>
      </View>

      <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
        <Text className="mt-6 text-center text-2xl font-bold text-[#111111]">
          Terms and Conditions
        </Text>
        <Text className="mt-1 text-center text-sm text-gray-500">O Positive Health</Text>

        {sections.map((item) => (
          <View key={item.title} className="mt-6">
            <Text className="text-base font-bold text-[#0F1F4D]">{item.title}</Text>
            <Text className="mt-2 text-sm leading-6 text-gray-700">{item.text}</Text>
          </View>
        ))}

        <View className="h-10" />
      </ScrollView>
    </View>
  );
}