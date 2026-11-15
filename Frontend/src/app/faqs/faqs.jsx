import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

const questions = [
  'What is the difference between Piles, Fissures & Fistula',
  'What is a laparoscopic hysterectomy?',
  'Why is a laparoscopic hysterectomy performed?',
  'How is a laparoscopic hysterectomy different from traditional surgery?',
  'How much does a uterus removal surgery cost?',
  'How is a laparoscopic hysterectomy done?',
  'What is the recovery time after a laparoscopic hysterectomy?',
];

export default function Faqs() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View className="mt-12 h-14 flex-row items-center px-5">
        <Pressable onPress={() => router.back()}>
          <Image source={require('../../../assets/images/arrow-back.png')} style={{ width: 28, height: 28 }} />
        </Pressable>
        <Text className="ml-4 text-xl font-extrabold text-[#0F1F4D]">FAQs</Text>
      </View>

      <View className="bg-[#F0F6FC] px-4 pb-6 pt-4">
        <Text className="text-center text-xl font-extrabold text-[#123D83]">Frequently Asked Questions</Text>
        <View className="mt-1 h-[3px] w-14 self-center bg-[#F28C00]" />

        <View className="mt-5 h-11 flex-row items-center rounded-full border-[1.5px] border-[#CFD8EA] bg-white px-3">
          <Image source={require('../../../assets/images/faq-search.png')} style={{ width: 20, height: 20 }} />
          <TextInput
            className="ml-2 flex-1 text-sm"
            style={{ outlineStyle: 'none' }}
            placeholder="Search for Condition, Procedure, Symptom etc"
            placeholderTextColor="#6B7280"
          />
        </View>

        <Pressable className="mt-3 h-10 items-center justify-center">
          <Image
            source={require('../../../assets/images/button-blue.png')}
            style={{ position: 'absolute', width: '100%', height: 40, borderRadius: 20 }}
          />
          <Text className="font-extrabold text-white">Search</Text>
        </Pressable>

        <View className="mt-4 h-[3px] w-14 self-center bg-[#F28C00]" />
      </View>

      {questions.map((question) => (
        <View key={question} className="min-h-[76px] flex-row items-center px-5">
          <Text className="flex-1 pr-6 text-sm leading-5 text-gray-900">{question}</Text>
          <Image source={require('../../../assets/images/faq-chevron.png')} style={{ width: 18, height: 11 }} />
        </View>
      ))}
    </View>
  );
}