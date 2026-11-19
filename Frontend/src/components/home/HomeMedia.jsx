import { useEffect, useState } from 'react';
import { Image, Linking, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BASE_URL, showImage } from '../../config/api';

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
        if (Array.isArray(videoData)) setVideos(videoData.slice(0, 2));

        const articleRes = await fetch(BASE_URL + '/articles');
        const articleData = await articleRes.json();
        if (Array.isArray(articleData)) setArticles(articleData.slice(0, 2));
      } catch (err) {
        console.log('Videos aur articles load nahi hue');
      }
    };
    loadData();
  }, []);

  return (
    <View className="bg-white pb-4">
      <SectionHeader title="Videos" onViewAll={() => router.push('/videos')} />

      {videos.map((item) => (
        <Pressable
          key={item._id}
          onPress={() =>
  router.push({
    pathname: '/video-player',
    params: { url: item.youtubeUrl, title: item.title },
  })
}
          className="mx-[17px] mb-3 rounded-2xl bg-white pb-3"
          style={cardShadow}
        >
          {item.thumbnail ? (
            <Image
              source={{ uri: showImage(item.thumbnail) }}
              style={{ width: '100%', height: 148, borderRadius: 14 }}
              resizeMode="cover"
            />
          ) : (
            <View
              className="items-center justify-center bg-[#EEF0F6]"
              style={{ width: '100%', height: 148, borderRadius: 14 }}
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

      <SectionHeader title="Articles" onViewAll={() => router.push('/articles')} />

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
          <View className="flex-1 justify-between py-[14px] pl-[14px] pr-[30px]">
            <Text
              className="text-[14px] font-extrabold leading-[23px] text-[#1B2A6B]"
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
    </View>
  );
}