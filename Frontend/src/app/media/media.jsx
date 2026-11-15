import { useEffect, useState } from 'react';
import { Image, Pressable, Text, View, useWindowDimensions } from 'react-native';

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

const tabs = [
  { label: 'Home', icon: require('../../../assets/images/nav-home.png'), active: true },
  { label: 'Community', icon: require('../../../assets/images/nav-community.png'), active: false },
  { label: 'Media', icon: require('../../../assets/images/nav-media.png'), active: false },
  { label: 'Account', icon: require('../../../assets/images/nav-account.png'), active: false },
];

function NavItem({ item, s }) {
  return (
    <Pressable className="items-center" style={{ width: 70 * s }}>
      <Image
        source={item.icon}
        style={{ width: 28 * s, height: 28 * s }}
        resizeMode="contain"
      />
      <Text
        className="font-bold"
        style={{
          fontSize: 10 * s,
          marginTop: 3 * s,
          color: item.active ? '#F28C00' : '#222222',
        }}
      >
        {item.label}
      </Text>
    </Pressable>
  );
}

function SectionHeader({ title, s }) {
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
      <Text
        className="font-extrabold text-[#1B5FD8]"
        style={{ fontSize: 13 * s }}
      >
        View All
      </Text>
    </View>
  );
}

export default function Media() {
  const { width, height } = useWindowDimensions();
  const [s, setS] = useState(1);

  useEffect(() => {
    setS(Math.min(width / 393, height / 852));
  }, [width, height]);

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

      <SectionHeader title="Videos" s={s} />

      {videos.map((item) => (
        <View key={item.id} style={{ ...cardStyle, paddingBottom: 12 * s }}>
          <Image
            source={item.image}
            style={{ width: '100%', height: 148 * s, borderRadius: 14 * s }}
            resizeMode="cover"
          />
          <Text
            className="font-extrabold text-[#1B2A6B]"
            style={{ fontSize: 14 * s, marginTop: 10 * s, marginLeft: 14 * s }}
          >
            {item.title}
          </Text>
          <Text
            className="text-[#666666]"
            style={{ fontSize: 12 * s, marginTop: 4 * s, marginLeft: 14 * s }}
          >
            {item.date}
          </Text>
        </View>
      ))}

      <SectionHeader title="Articles" s={s} />

      {articles.map((item) => (
        <View
          key={item.id}
          className="flex-row overflow-hidden"
          style={{ ...cardStyle, height: 116 * s }}
        >
          <Image
            source={item.image}
            style={{ width: 144 * s, height: 116 * s }}
            resizeMode="cover"
          />
          <View
            className="flex-1 justify-between"
            style={{
              paddingLeft: 14 * s,
              paddingRight: 30 * s,
              paddingVertical: 14 * s,
            }}
          >
            <Text
              className="font-extrabold text-[#1B2A6B]"
              style={{ fontSize: 14 * s, lineHeight: 23 * s }}
            >
              {item.title}
            </Text>
            <Text className="text-[#666666]" style={{ fontSize: 12 * s }}>
              {item.date}
            </Text>
          </View>
        </View>
      ))}

      <View
        className="absolute bottom-0 left-0 right-0 flex-row items-center justify-around border-t border-[#EEF0F6] bg-white"
        style={{ height: 72 * s }}
      >
        {tabs.slice(0, 2).map((item) => (
          <NavItem key={item.label} item={item} s={s} />
        ))}

        <Pressable
          className="items-center justify-center bg-[#1F3FB0]"
          style={{
            width: 58 * s,
            height: 58 * s,
            borderRadius: 29 * s,
            marginTop: -30 * s,
            shadowColor: '#1B3FB0',
            shadowOpacity: 0.4,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 8,
          }}
        >
          <Image
            source={require('../../../assets/images/nav-search.png')}
            style={{ width: 26 * s, height: 26 * s }}
            resizeMode="contain"
          />
        </Pressable>

        {tabs.slice(2).map((item) => (
          <NavItem key={item.label} item={item} s={s} />
        ))}
      </View>
    </View>
  );
}