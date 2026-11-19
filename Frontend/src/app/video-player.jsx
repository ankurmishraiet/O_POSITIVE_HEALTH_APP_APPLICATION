import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
  const cardWidth = width - 32;

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
    >
      <Pressable
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        onPress={() => router.back()}
      />

      <View
        className="overflow-hidden rounded-2xl bg-white"
        style={{ width: cardWidth }}
      >
        <View className="flex-row items-center justify-between px-4 py-3">
          <Text
            className="mr-3 flex-1 text-[15px] font-extrabold text-[#1B2A6B]"
            numberOfLines={2}
          >
            {title || ''}
          </Text>

          <Pressable onPress={() => router.back()} hitSlop={10}>
            <Ionicons name="close" size={26} color="#1B2A6B" />
          </Pressable>
        </View>

        {videoId ? (
          <YoutubePlayer
            height={(cardWidth * 9) / 16}
            width={cardWidth}
            videoId={videoId}
            play={true}
          />
        ) : (
          <Text className="px-4 pb-6 pt-2 text-center text-[#666666]">
            Video ka link sahi nahi hai
          </Text>
        )}
      </View>
    </View>
  );
}