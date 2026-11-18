import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BASE_URL, showImage } from '../config/api';

const cardShadow = {
  shadowColor: '#2846A0',
  shadowOpacity: 0.12,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 3 },
  elevation: 5,
};

export default function AllArticles() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const res = await fetch(BASE_URL + '/articles');
        const data = await res.json();
        if (Array.isArray(data)) setArticles(data);
      } catch (err) {
        console.log('Articles load nahi hue');
      }
    };
    loadArticles();
  }, []);

  return (
    <View className="flex-1 bg-white pt-12">
      <Pressable className="px-6" onPress={() => router.back()}>
        <Image
          source={require('../../assets/images/arrow-back.png')}
          style={{ width: 32, height: 32 }}
        />
      </Pressable>

      <Text className="mb-3 mt-4 px-6 text-3xl font-extrabold text-[#111111]">
        Articles
      </Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {articles.map((item) => (
          <Pressable
            key={item._id}
            onPress={() =>
              router.push({ pathname: '/article-details', params: { id: item._id } })
            }
            className="mx-[17px] mb-3 h-[116px] flex-row overflow-hidden rounded-2xl bg-white"
            style={cardShadow}
          >
            {item.image ? (
              <Image
                source={{ uri: showImage(item.image) }}
                style={{ width: 144, height: 116 }}
                resizeMode="cover"
              />
            ) : (
              <View
                className="items-center justify-center bg-[#EEF0F6]"
                style={{ width: 144, height: 116 }}
              >
                <Text className="text-[28px] font-bold text-[#1B5FD8]">
                  {item.title.charAt(0)}
                </Text>
              </View>
            )}

            <View className="flex-1 justify-between py-[14px] pl-[14px] pr-[14px]">
              <Text
                className="text-[14px] font-extrabold leading-[22px] text-[#1B2A6B]"
                numberOfLines={3}
              >
                {item.title}
              </Text>
              <Text className="text-[12px] text-[#666666]">
                {item.createdAt.slice(0, 10)}
              </Text>
            </View>
          </Pressable>
        ))}

        {articles.length === 0 && (
          <Text className="mt-10 text-center text-[#666666]">
            Abhi koi article nahi hai
          </Text>
        )}
      </ScrollView>
    </View>
  );
}