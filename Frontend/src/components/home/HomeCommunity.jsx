import { useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
const categories = ['All', 'Cancer', 'Orthopaedics', 'Cardiology'];

const cardShadow = {
  shadowColor: '#2846A0',
  shadowOpacity: 0.13,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 4 },
  elevation: 6,
};

export default function HomeCommunity() {
  const [selected, setSelected] = useState('All');
  const [question, setQuestion] = useState('');
    const router = useRouter();

  return (
    <View className="bg-white pb-6">
      <View className="mt-2 flex-row px-[18px]">
        {categories.map((item) => {
          const active = selected === item;
          return (
            <Pressable
              key={item}
              onPress={() => setSelected(item)}
              className={
                active
                  ? 'mr-2 h-[37px] items-center justify-center rounded-full border-[1.5px] border-[#7FD0E8] bg-[#BFEAF5] px-[14px]'
                  : 'mr-2 h-[37px] items-center justify-center rounded-full border-[1.5px] border-[#CFD6EE] bg-white px-[14px]'
              }
            >
              <Text className="text-[12px] font-bold text-[#0F2A6B]">{item}</Text>
            </Pressable>
          );
        })}
      </View>

      <View
        className="mx-[17px] mt-[18px] rounded-[20px] bg-white p-[18px]"
        style={cardShadow}
      >
        <Text className="text-[20px] font-extrabold leading-[27px] text-[#111111]">
          Is a Referral Required for Treatment Under the Ayushman CAPF Scheme?
        </Text>

        <View className="mt-[14px] flex-row items-center">
          <View className="h-8 w-8 items-center justify-center rounded-full bg-[#E8A21B]">
            <Text className="text-[10px] font-bold text-white">OP</Text>
          </View>
          <Text className="ml-[10px] text-[15px] font-extrabold text-[#2328B0]">
            O Positive Health Team
          </Text>
        </View>

        <Text className="mt-3 text-[12px] leading-[21px] text-[#444444]">
          Hello, a referral is not required for every treatment under the CAPF
          Ayushman scheme. It depends on the patient...{' '}
          <Text className="text-[#1B7FD0] underline">Read more</Text>
        </Text>

        <View className="mt-[14px] flex-row items-center justify-between">
          <Text className="text-[12.5px] font-bold text-[#1B8FD0] underline">
            View All Answers
          </Text>
          <View className="flex-row items-center">
            <Text className="mr-[22px] text-[26px] text-[#1B8FD0]">♡</Text>
            <Text className="text-[24px] text-[#1B8FD0]">↗</Text>
          </View>
        </View>
      </View>

      <View className="mx-[17px] mt-[18px] rounded-[20px] bg-[#DCEAFB] px-[18px] pb-[18px] pt-5">
        <View className="flex-row">
          <View className="flex-1 pr-[6px]">
            <Text className="text-[22px] font-extrabold leading-[27px] text-[#111111]">
              <Text className="text-[#1B7FD0]">HealthGPT:</Text> Your Personal
              HealthCare Companion
            </Text>
            <Text className="mt-[14px] w-[200px] text-[13px] leading-[21px] text-[#333333]">
              Ask any health query to your personal assistant offering
              tailor-made guidance 24x7.
            </Text>
          </View>
          <Image
            source={require('../../../assets/images/robot.png')}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />
        </View>

        <View className="mt-4 h-[57px] flex-row items-center rounded-[29px] border-2 border-[#2B7FD8] bg-white pl-[18px] pr-2">
          <TextInput
            className="flex-1 text-[14px] text-[#111111]"
            placeholder="Ask me anything..."
            placeholderTextColor="#777777"
            value={question}
            onChangeText={setQuestion}
          />
                    <Pressable
            onPress={() => {
              if (question.trim()) {
                router.push({ pathname: '/chatbot/chatbot', params: { question } });
                setQuestion('');
              }
            }}
            className="h-[42px] w-[42px] items-center justify-center rounded-full bg-[#1B7FD8]"
          >
            <Text className="text-[18px] text-white">➤</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}