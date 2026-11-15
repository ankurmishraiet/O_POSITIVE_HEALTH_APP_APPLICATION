import { Image, Text, View } from 'react-native';

const videos = [
  {
    id: 1,
    title: "Kiran's Story: How She Lost Weight...",
    date: '2024-06-09',
    image: require('../../../assets/images/media-video-1.png'),
  },
  {
    id: 2,
    title: 'Dr. Aman Priya Khanna Reviews...',
    date: '2024-06-23',
    image: require('../../../assets/images/media-video-2.png'),
  },
];

const articles = [
  {
    id: 1,
    title: 'Knee Replacement Surgery Cost at Narayana Health...',
    date: '2026-11-03',
    image: require('../../../assets/images/media-article-1.png'),
  },
];

const cardShadow = {
  shadowColor: '#2846A0',
  shadowOpacity: 0.12,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 3 },
  elevation: 5,
};

function SectionHeader({ title }) {
  return (
    <View className="mb-[10px] mt-[10px] flex-row items-center justify-between px-6">
      <Text className="text-[23px] font-extrabold text-[#111111]">{title}</Text>
      <Text className="text-[13px] font-extrabold text-[#1B5FD8]">View All</Text>
    </View>
  );
}

export default function HomeMedia() {
  return (
    <View className="bg-white pb-4">
      <SectionHeader title="Videos" />

      {videos.map((item) => (
        <View
          key={item.id}
          className="mx-[17px] mb-3 rounded-2xl bg-white pb-3"
          style={cardShadow}
        >
          <Image
            source={item.image}
            style={{ width: '100%', height: 148, borderRadius: 14 }}
            resizeMode="cover"
          />
          <Text className="ml-[14px] mt-[10px] text-[14px] font-extrabold text-[#1B2A6B]">
            {item.title}
          </Text>
          <Text className="ml-[14px] mt-1 text-[12px] text-[#666666]">
            {item.date}
          </Text>
        </View>
      ))}

      <SectionHeader title="Articles" />

      {articles.map((item) => (
        <View
          key={item.id}
          className="mx-[17px] mb-3 h-[116px] flex-row overflow-hidden rounded-2xl bg-white"
          style={cardShadow}
        >
          <Image
            source={item.image}
            style={{ width: 144, height: 116 }}
            resizeMode="cover"
          />
          <View className="flex-1 justify-between py-[14px] pl-[14px] pr-[30px]">
            <Text className="text-[14px] font-extrabold leading-[23px] text-[#1B2A6B]">
              {item.title}
            </Text>
            <Text className="text-[12px] text-[#666666]">{item.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}