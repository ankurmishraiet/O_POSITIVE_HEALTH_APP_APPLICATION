import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BASE_URL, showImage } from '../../config/api';

// Home par kitne items dikhane hain (baaki View All par)
const HOME_LIMIT = 10;

// side me swipe hone wale card ki chaudai
const CARD_WIDTH = 220;

const cardShadow = {
  shadowColor: '#2846A0',
  shadowOpacity: 0.12,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 3 },
  elevation: 5,
};

function SectionHeader({ title, onViewAll }) {
  return (
    <View className="mb-[10px] mt-[10px] flex-row items-center justify-between px-6">
      <Text className="text-[23px] font-extrabold text-[#111111]">{title}</Text>
      <Pressable onPress={onViewAll}>
        <Text className="text-[13px] font-extrabold text-[#1B5FD8]">View All</Text>
      </Pressable>
    </View>
  );
}

export default function HomeMedia() {
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const videoRes = await fetch(BASE_URL + '/videos');
        const videoData = await videoRes.json();
        if (Array.isArray(videoData)) setVideos(videoData.slice(0, HOME_LIMIT));

        const articleRes = await fetch(BASE_URL + '/articles');
        const articleData = await articleRes.json();
        if (Array.isArray(articleData)) setArticles(articleData.slice(0, HOME_LIMIT));
      } catch (err) {
        console.log('Videos aur articles load nahi hue');
      }
    };
    loadData();
  }, []);

  return (
    <View className="bg-white pb-4">
      <SectionHeader title="Videos" onViewAll={() => router.push('/videos')} />

      {/* Videos: side me swipe */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 17, paddingBottom: 12 }}
      >
        {videos.map((item) => (
          <Pressable
            key={item._id}
            onPress={() =>
              router.push({
                pathname: '/video-player',
                params: { url: item.youtubeUrl, title: item.title },
              })
            }
            className="mr-3 rounded-2xl bg-white pb-3"
            style={[cardShadow, { width: CARD_WIDTH }]}
          >
            {item.thumbnail ? (
              <Image
                source={{ uri: showImage(item.thumbnail) }}
                style={{ width: '100%', height: 105, borderRadius: 14 }}
                resizeMode="cover"
              />
            ) : (
              <View
                className="items-center justify-center bg-[#EEF0F6]"
                style={{ width: '100%', height: 105, borderRadius: 14 }}
              >
                <Text className="text-[32px] text-[#1B5FD8]">▶</Text>
              </View>
            )}
            <Text
              className="ml-[14px] mr-[14px] mt-[10px] text-[14px] font-extrabold text-[#1B2A6B]"
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text className="ml-[14px] mt-1 text-[12px] text-[#666666]">
              {item.createdAt.slice(0, 10)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <SectionHeader title="Articles" onViewAll={() => router.push('/articles')} />

      {/* Articles: side me swipe */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 17, paddingBottom: 12 }}
      >
        {articles.map((item) => (
          <Pressable
            key={item._id}
            onPress={() =>
              router.push({ pathname: '/article-details', params: { id: item._id } })
            }
            className="mr-3 rounded-2xl bg-white pb-3"
            style={[cardShadow, { width: CARD_WIDTH }]}
          >
            {item.image ? (
              <Image
                source={{ uri: showImage(item.image) }}
                style={{ width: '100%', height: 105, borderRadius: 14 }}
                resizeMode="cover"
              />
            ) : (
              <View
                className="items-center justify-center bg-[#EEF0F6]"
                style={{ width: '100%', height: 105, borderRadius: 14 }}
              >
                <Text className="text-[32px] font-bold text-[#1B5FD8]">
                  {item.title.charAt(0)}
                </Text>
              </View>
            )}
            <Text
              className="ml-[14px] mr-[14px] mt-[10px] text-[14px] font-extrabold text-[#1B2A6B]"
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <Text className="ml-[14px] mt-1 text-[12px] text-[#666666]">
              {item.createdAt.slice(0, 10)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}