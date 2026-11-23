import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchQuestions } from '../../service/communityService';

// Community ki categories (backend jaisi hi spelling)
const categories = [
  'All',
  'General Surgery',
  'Orthopedics',
  'Cardiology',
  'Ophthalmology',
  'Gynecology',
  'Urology',
  'Insurance',
  'Medical Loan',
  'Other',
];

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

  // Community se aaya hua sawal
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readMore, setReadMore] = useState(false);

  // Chip badalte hi us category ka sawal laao
  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setReadMore(false);
        const res = await fetchQuestions({ tab: 'feed', category: selected, page: 1 });
        const list = res.data || [];
        // Jis sawal par expert ka jawab hai wo pehle, warna pehla sawal
        const withExpert = list.find((q) => q.answers.some((a) => a.isExpert));
        setPost(withExpert || list[0] || null);
      } catch (err) {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [selected]);

  // Pehla jawab (expert ho to wahi pehle aata hai)
  const answer = post && post.answers.length > 0 ? post.answers[0] : null;
  const isLong = answer && answer.text.length > 140;

  return (
    <View className="bg-white pb-6">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 18 }}
        className="mt-2"
      >
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
      </ScrollView>

      <View
        className="mx-[17px] mt-[18px] rounded-[20px] bg-white p-[18px]"
        style={cardShadow}
      >
        {loading ? (
          <ActivityIndicator color="#1B7FD0" />
        ) : !post ? (
          <Text className="text-[14px] text-[#444444]">
            Is category mein abhi koi sawal nahi hai.
          </Text>
        ) : (
          <View>
            <Text className="text-[20px] font-extrabold leading-[27px] text-[#111111]">
              {post.question}
            </Text>

            {answer ? (
              <View>
                <View className="mt-[14px] flex-row items-center">
                  <View className="h-8 w-8 items-center justify-center rounded-full bg-[#E8A21B]">
                    <Text className="text-[10px] font-bold text-white">
                      {answer.authorName.slice(0, 2).toUpperCase()}
                    </Text>
                  </View>
                  <Text className="ml-[10px] text-[15px] font-extrabold text-[#2328B0]">
                    {answer.authorName}
                  </Text>
                </View>

                <Text
                  numberOfLines={readMore ? undefined : 3}
                  className="mt-3 text-[12px] leading-[21px] text-[#444444]"
                >
                  {answer.text}
                </Text>

                {isLong && (
                  <Pressable onPress={() => setReadMore(!readMore)}>
                    <Text className="text-[12px] text-[#1B7FD0] underline">
                      {readMore ? 'Show less' : 'Read more'}
                    </Text>
                  </Pressable>
                )}
              </View>
            ) : (
              <Text className="mt-3 text-[12px] leading-[21px] text-[#444444]">
                Abhi koi jawab nahi aaya hai. Community mein pehla jawab aap de sakte hain.
              </Text>
            )}

            <View className="mt-[14px] flex-row items-center justify-between">
              <Pressable onPress={() => router.push('/community')}>
                <Text className="text-[12.5px] font-bold text-[#1B8FD0] underline">
                  View All Answers
                </Text>
              </Pressable>
              <View className="flex-row items-center">
                <Text className="mr-[22px] text-[26px] text-[#1B8FD0]">♡</Text>
                <Text className="text-[24px] text-[#1B8FD0]">↗</Text>
              </View>
            </View>
          </View>
        )}
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