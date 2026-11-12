import { useEffect, useState } from 'react';
import { Image, Pressable, Text, TextInput, View, useWindowDimensions } from 'react-native';

const categories = ['All', 'Cancer', 'Orthopaedics', 'Cardiology'];
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

export default function Home() {
  const { width, height } = useWindowDimensions();
  const [s, setS] = useState(1);
  const [selected, setSelected] = useState('All');
    const [question, setQuestion] = useState('');

  useEffect(() => {
    setS(Math.min(width / 393, height / 852));
  }, [width, height]);

  return (
    <View className="flex-1 bg-white">
      <View style={{ alignItems: 'center', paddingTop: 36 * s }}>
        <Image
          source={require('../../../assets/images/logo-spaced.png')}
          style={{ width: 130 * s, height: 66 * s }}
          resizeMode="contain"
        />
      </View>

      <View
        className="flex-row"
        style={{ paddingHorizontal: 18 * s, marginTop: 8 * s }}
      >
        {categories.map((item) => {
          const active = selected === item;
          return (
            <Pressable
              key={item}
              onPress={() => setSelected(item)}
              className="items-center justify-center rounded-full border-[1.5px]"
              style={{
                height: 37 * s,
                paddingHorizontal: 14 * s,
                marginRight: 8 * s,
                backgroundColor: active ? '#BFEAF5' : '#FFFFFF',
                borderColor: active ? '#7FD0E8' : '#CFD6EE',
              }}
            >
              <Text
                className="font-bold text-[#0F2A6B]"
                style={{ fontSize: 12 * s }}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View
        className="rounded-[20px] bg-white"
        style={{
          marginTop: 18 * s,
          marginHorizontal: 17 * s,
          padding: 18 * s,
          shadowColor: '#2846A0',
          shadowOpacity: 0.13,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 4 },
          elevation: 6,
        }}
      >
        <Text
          className="font-extrabold text-[#111111]"
          style={{ fontSize: 20 * s, lineHeight: 27 * s }}
        >
          Is a Referral Required for Treatment Under the Ayushman CAPF Scheme?
        </Text>

        <View
          className="flex-row items-center"
          style={{ marginTop: 14 * s }}
        >
          <View
            className="items-center justify-center bg-[#E8A21B]"
            style={{ width: 32 * s, height: 32 * s, borderRadius: 16 * s }}
          >
            <Text
              className="font-bold text-white"
              style={{ fontSize: 10 * s }}
            >
              OP
            </Text>
          </View>
          <Text
            className="font-extrabold text-[#2328B0]"
            style={{ fontSize: 15 * s, marginLeft: 10 * s }}
          >
            O Positive Health Team
          </Text>
        </View>

        <Text
          className="text-[#444444]"
          style={{ fontSize: 12 * s, lineHeight: 21 * s, marginTop: 12 * s }}
        >
          Hello, a referral is not required for every treatment under the CAPF
          Ayushman scheme. It depends on the patient...{' '}
          <Text className="text-[#1B7FD0] underline">Read more</Text>
        </Text>

        <View
          className="flex-row items-center justify-between"
          style={{ marginTop: 14 * s }}
        >
          <Text
            className="font-bold text-[#1B8FD0] underline"
            style={{ fontSize: 12.5 * s }}
          >
            View All Answers
          </Text>
          <View className="flex-row items-center">
            <Text
              className="text-[#1B8FD0]"
              style={{ fontSize: 26 * s, marginRight: 22 * s }}
            >
              ♡
            </Text>
            <Text className="text-[#1B8FD0]" style={{ fontSize: 24 * s }}>
              ↗
            </Text>
          </View>
        </View>
      </View>
            <View
        style={{
          marginTop: 18 * s,
          marginHorizontal: 17 * s,
          paddingHorizontal: 18 * s,
          paddingTop: 20 * s,
          paddingBottom: 18 * s,
          borderRadius: 20 * s,
          backgroundColor: '#DCEAFB',
        }}
      >
        <View className="flex-row">
          <View className="flex-1" style={{ paddingRight: 6 * s }}>
            <Text
              className="font-extrabold text-[#111111]"
              style={{ fontSize: 22 * s, lineHeight: 27 * s }}
            >
              <Text className="text-[#1B7FD0]">HealthGPT:</Text> Your Personal
              HealthCare Companion
            </Text>
            <Text
              className="text-[#333333]"
              style={{
                fontSize: 13 * s,
                lineHeight: 21 * s,
                marginTop: 14 * s,
                width: 200 * s,
              }}
            >
              Ask any health query to your personal assistant offering
              tailor-made guidance 24x7.
            </Text>
          </View>
          <Image
            source={require('../../../assets/images/robot.png')}
            style={{ width: 100 * s, height: 100 * s }}
            resizeMode="contain"
          />
        </View>

        <View
          className="flex-row items-center border-2 border-[#2B7FD8] bg-white"
          style={{
            height: 57 * s,
            borderRadius: 29 * s,
            marginTop: 16 * s,
            paddingLeft: 18 * s,
            paddingRight: 8 * s,
          }}
        >
          <TextInput
            className="flex-1 text-[#111111]"
            style={{ fontSize: 14 * s, outlineStyle: 'none' }}
            placeholder="Ask me anything..."
            placeholderTextColor="#777777"
            value={question}
            onChangeText={setQuestion}
          />
          <View
            className="items-center justify-center bg-[#1B7FD8]"
            style={{ width: 42 * s, height: 42 * s, borderRadius: 21 * s }}
          >
            <Text className="text-white" style={{ fontSize: 18 * s }}>
              ➤
            </Text>
          </View>
        </View>
      </View>      <View
        style={{
          marginTop: 24 * s,
          marginHorizontal: 17 * s,
          paddingHorizontal: 18 * s,
          paddingTop: 20 * s,
          paddingBottom: 18 * s,
          borderRadius: 20 * s,
          backgroundColor: '#DCEAFB',
        }}
      >
        <View className="flex-row">
          <View className="flex-1" style={{ paddingRight: 6 * s }}>
            <Text
              className="font-extrabold text-[#111111]"
              style={{ fontSize: 22 * s, lineHeight: 27 * s }}
            >
              <Text className="text-[#1B7FD0]">HealthGPT:</Text> Your Personal
              HealthCare Companion
            </Text>
            <Text
              className="text-[#333333]"
              style={{
                fontSize: 13 * s,
                lineHeight: 21 * s,
                marginTop: 14 * s,
                width: 200 * s,
              }}
            >
              Ask any health query to your personal assistant offering
              tailor-made guidance 24x7.
            </Text>
          </View>
          <Image
            source={require('../../../assets/images/robot.png')}
            style={{ width: 100 * s, height: 100 * s }}
            resizeMode="contain"
          />
        </View>

        <View
          className="flex-row items-center border-2 border-[#2B7FD8] bg-white"
          style={{
            height: 57 * s,
            borderRadius: 29 * s,
            marginTop: 16 * s,
            paddingLeft: 18 * s,
            paddingRight: 8 * s,
          }}
        >
          <TextInput
            className="flex-1 text-[#111111]"
            style={{ fontSize: 14 * s, outlineStyle: 'none' }}
            placeholder="Ask me anything..."
            placeholderTextColor="#777777"
            value={question}
            onChangeText={setQuestion}
          />
          <View
            className="items-center justify-center bg-[#1B7FD8]"
            style={{ width: 42 * s, height: 42 * s, borderRadius: 21 * s }}
          >
            <Text className="text-white" style={{ fontSize: 18 * s }}>
              ➤
            </Text>
          </View>
        </View>
      </View>
      
      
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