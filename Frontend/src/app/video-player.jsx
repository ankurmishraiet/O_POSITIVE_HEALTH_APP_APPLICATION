import { Image, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';

const getVideoId = (url) => {
  if (!url) return null;
  const patterns = [
    /[?&]v=([\w-]{11})/,
    /youtu\.be\/([\w-]{11})/,
    /embed\/([\w-]{11})/,
    /shorts\/([\w-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

export default function VideoPlayer() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { url, title } = useLocalSearchParams();
  const videoId = getVideoId(url);

  return (
    <View className="flex-1 bg-white pt-12">
      <Pressable className="px-6" onPress={() => router.back()}>
        <Image
          source={require('../../assets/images/arrow-back.png')}
          style={{ width: 32, height: 32 }}
        />
      </Pressable>

      <View style={{ marginTop: 20 }}>
        {videoId ? (
          <YoutubePlayer
            height={(width * 9) / 16}
            width={width}
            videoId={videoId}
            play={true}
          />
        ) : (
          <Text className="mt-10 text-center text-[#666666]">
            Video ka link sahi nahi hai
          </Text>
        )}
      </View>

      {title ? (
        <Text className="mt-4 px-6 text-[18px] font-extrabold text-[#1B2A6B]">
          {title}
        </Text>
      ) : null}
    </View>
  );
}