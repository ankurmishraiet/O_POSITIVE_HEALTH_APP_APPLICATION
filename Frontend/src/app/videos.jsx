import { useEffect, useState } from 'react';
import { Image, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BASE_URL, showImage } from '../config/api';

const cardShadow = {
  shadowColor: '#2846A0',
  shadowOpacity: 0.12,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 3 },
  elevation: 5,
};

export default function AllVideos() {
  const router = useRouter();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const res = await fetch(BASE_URL + '/videos');
        const data = await res.json();
        if (Array.isArray(data)) setVideos(data);
      } catch (err) {
        console.log('Videos load nahi hue');
      }
    };
    loadVideos();
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
        Videos
      </Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
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
              numberOfLines={2}
            >
              {item.title}
            </Text>

            <View className="ml-[14px] mt-1 flex-row items-center">
              {item.category ? (
                <Text className="mr-3 rounded-full bg-[#EEF3FF] px-2 py-[2px] text-[11px] font-bold text-[#1B5FD8]">
                  {item.category}
                </Text>
              ) : null}
              <Text className="text-[12px] text-[#666666]">
                {item.createdAt.slice(0, 10)}
              </Text>
            </View>
          </Pressable>
        ))}

        {videos.length === 0 && (
          <Text className="mt-10 text-center text-[#666666]">
            Abhi koi video nahi hai
          </Text>
        )}
      </ScrollView>
    </View>
  );
}