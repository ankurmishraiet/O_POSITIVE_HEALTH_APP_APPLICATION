import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

const sections = [
  {
    title: 'What We Collect',
    text: 'When you log in we collect your mobile number. If you add them, we also keep your name, email, family member details and the health records you upload, such as prescriptions and reports.',
  },
  {
    title: 'How We Use Your Information',
    text: 'We use your information to log you in, to show your profile and your family members, to keep your health records in one place and to improve the app. We do not sell your personal information.',
  },
  {
    title: 'Your Health Records',
    text: 'Records that you upload are private to your account. We do not show them to other users. Please upload records only for yourself or for family members who have given you permission.',
  },
  {
    title: 'Sharing of Information',
    text: 'We may share your information only when it is needed to give you a service you asked for, or when the law requires us to do so.',
  },
  {
    title: 'Keeping Your Data Safe',
    text: 'We take reasonable steps to protect your information. Your login stays active on your phone until you log out, so please log out if you share your phone with someone.',
  },
  {
    title: 'Your Choices',
    text: 'You can change your name and email at any time from the Edit option in the Account section. You can also log out whenever you want.',
  },
  {
    title: 'Changes to This Policy',
    text: 'We may update this privacy policy from time to time. The latest version will always be available inside the app.',
  },
  {
    title: 'Contact Us',
    text: 'If you have any question about your privacy, please use the Contact Us option in the Account section of the app.',
  },
];

export default function Privacy() {
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
        <Text className="ml-4 text-xl font-bold text-[#111111]">Privacy Policy</Text>
      </View>

      <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
        <Text className="mt-6 text-center text-2xl font-bold text-[#111111]">Privacy Policy</Text>
        <Text className="mt-1 text-center text-sm text-gray-500">O Positive Health</Text>

        <Text className="mt-6 text-sm leading-6 text-gray-700">
          We respect your privacy. This page explains what information we collect and how we use it.
        </Text>

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