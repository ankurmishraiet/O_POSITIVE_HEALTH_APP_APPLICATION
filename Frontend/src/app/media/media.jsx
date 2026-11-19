import { useEffect, useState } from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BASE_URL, showImage } from '../../config/api';

function SectionHeader({ title, s, onViewAll }) {
  return (
    <View
      className="flex-row items-center justify-between"
      style={{ paddingHorizontal: 24 * s, marginTop: 10 * s, marginBottom: 10 * s }}
    >
      <Text
        className="font-extrabold text-[#111111]"
        style={{ fontSize: 23 * s }}
      >
        {title}
      </Text>
      <Pressable onPress={onViewAll}>
        <Text
          className="font-extrabold text-[#1B5FD8]"
          style={{ fontSize: 13 * s }}
        >
          View All
        </Text>
      </Pressable>
    </View>
  );
}

export default function Media() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [s, setS] = useState(1);
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setS(Math.min(width / 393, height / 852));
  }, [width, height]);

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

  const cardStyle = {
    marginHorizontal: 17 * s,
    marginBottom: 12 * s,
    borderRadius: 16 * s,
    backgroundColor: '#FFFFFF',
    shadowColor: '#2846A0',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  };

  return (
    <View className="flex-1 bg-white">
      <View style={{ alignItems: 'center', paddingTop: 36 * s }}>
        <Image
          source={require('../../../assets/images/logo-spaced.png')}
          style={{ width: 130 * s, height: 66 * s }}
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 110 * s }}>
        <SectionHeader
          title="Videos"
          s={s}
          onViewAll={() => router.push('/videos')}
        />

        {videos.map((item) => (
          <Pressable
            key={item._id}
            onPress={() =>
  router.push({
    pathname: '/video-player',
    params: { url: item.youtubeUrl, title: item.title },
  })
}
            style={{ ...cardStyle, paddingBottom: 12 * s }}
          >
            {item.thumbnail ? (
              <Image
                source={{ uri: showImage(item.thumbnail) }}
                style={{ width: '100%', height: 148 * s, borderRadius: 14 * s }}
                resizeMode="cover"
              />
            ) : (
              <View
                className="items-center justify-center bg-[#EEF0F6]"
                style={{ width: '100%', height: 148 * s, borderRadius: 14 * s }}
              >
                <Text className="text-[#1B5FD8]" style={{ fontSize: 32 * s }}>▶</Text>
              </View>
            )}
            <Text
              className="font-extrabold text-[#1B2A6B]"
              style={{ fontSize: 14 * s, marginTop: 10 * s, marginHorizontal: 14 * s }}
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <Text
              className="text-[#666666]"
              style={{ fontSize: 12 * s, marginTop: 4 * s, marginLeft: 14 * s }}
            >
              {item.createdAt.slice(0, 10)}
            </Text>
          </Pressable>
        ))}

        {videos.length === 0 && (
          <Text className="text-center text-[#666666]" style={{ marginBottom: 12 * s }}>
            Abhi koi video nahi hai
          </Text>
        )}

        <SectionHeader
          title="Articles"
          s={s}
          onViewAll={() => router.push('/articles')}
        />

        {articles.map((item) => (
          <Pressable
            key={item._id}
            onPress={() =>
              router.push({ pathname: '/article-details', params: { id: item._id } })
            }
            className="flex-row overflow-hidden"
            style={{ ...cardStyle, height: 116 * s }}
          >
            {item.image ? (
              <Image
                source={{ uri: showImage(item.image) }}
                style={{ width: 144 * s, height: 116 * s }}
                resizeMode="cover"
              />
            ) : (
              <View
                className="items-center justify-center bg-[#EEF0F6]"
                style={{ width: 144 * s, height: 116 * s }}
              >
                <Text className="font-bold text-[#1B5FD8]" style={{ fontSize: 28 * s }}>
                  {item.title.charAt(0)}
                </Text>
              </View>
            )}
            <View
              className="flex-1 justify-between"
              style={{
                paddingLeft: 14 * s,
                paddingRight: 14 * s,
                paddingVertical: 14 * s,
              }}
            >
              <Text
                className="font-extrabold text-[#1B2A6B]"
                style={{ fontSize: 14 * s, lineHeight: 22 * s }}
                numberOfLines={3}
              >
                {item.title}
              </Text>
              <Text className="text-[#666666]" style={{ fontSize: 12 * s }}>
                {item.createdAt.slice(0, 10)}
              </Text>
            </View>
          </Pressable>
        ))}

        {articles.length === 0 && (
          <Text className="text-center text-[#666666]">
            Abhi koi article nahi hai
          </Text>
        )}
      </ScrollView>
    </View>
  );
}