import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

const topics = [
  {
    question: 'How do I log in?',
    answer: 'Enter your mobile number on the login page. You will get a 6 digit OTP. Enter it and tap Verify and Login.',
  },
  {
    question: 'How do I change my name or email?',
    answer: 'Go to the Account tab and tap Edit at the top. Change your name or email and tap Update Profile.',
  },
  {
    question: 'How do I add a family member?',
    answer: 'Go to Account, then My Family, and tap Add New Member. Enter the name, relation, age and gender.',
  },
  {
    question: 'Where can I see my appointments?',
    answer: 'Go to Account, then My Appointments. Upcoming and past appointments are shown in separate tabs.',
  },
  {
    question: 'How do I upload a health record?',
    answer: 'Go to Account, then My Health Records, choose a family member and tap Upload. Pick a photo or a PDF, add a title and save.',
  },
  {
    question: 'How do I find a doctor or hospital?',
    answer: 'Open the Home tab and scroll to Our Hospitals and Doctors. Tap View All to see the full list.',
  },
  {
    question: 'I did not get my OTP. What should I do?',
    answer: 'Wait for 30 seconds and tap Resend OTP. Also check that you entered the correct mobile number.',
  },
];

export default function Help() {
  const router = useRouter();
  const [open, setOpen] = useState(null);

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
        <Text className="ml-4 text-xl font-bold text-[#111111]">Help</Text>
      </View>

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        <Text className="mt-6 text-2xl font-bold text-[#111111]">How can we help you?</Text>

        {topics.map((item, index) => (
          <Pressable
            key={item.question}
            onPress={() => setOpen(open === index ? null : index)}
            className="mt-4 rounded-2xl bg-white p-4"
            style={{ elevation: 2 }}
          >
            <View className="flex-row items-center">
              <Text className="flex-1 text-base font-bold text-[#0F1F4D]">{item.question}</Text>
              <Text className="text-xl font-bold text-[#0E99C9]">{open === index ? '-' : '+'}</Text>
            </View>
            {open === index && (
              <Text className="mt-3 text-sm leading-6 text-gray-700">{item.answer}</Text>
            )}
          </Pressable>
        ))}

        <Text className="mt-8 text-center text-sm text-gray-500">Still need help?</Text>
        <Pressable
          onPress={() => router.push('/contact/contact')}
          className="mt-3 h-14 items-center justify-center rounded-full bg-[#0E99C9]"
        >
          <Text className="text-lg font-bold text-white">Contact Us</Text>
        </Pressable>

        <View className="h-10" />
      </ScrollView>
    </View>
  );
}