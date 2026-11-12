import { useEffect, useState } from 'react';
import { Image, Pressable, Text, View, useWindowDimensions } from 'react-native';

const hospitals = [
  { id: 1, image: require('../../../assets/images/hospital-apex.png') },
  { id: 2, image: require('../../../assets/images/hospital-apollo.png') },
  { id: 3, image: require('../../../assets/images/hospital-narayana.png') },
];

const doctors = [
  {
    id: 1,
    name: 'Dr. Aman Priya Khanna',
    speciality: 'General Surgery, Laparoscopic Surgery, Proctology, Bariatric Surgery',
    experience: '14+ years',
    image: require('../../../assets/images/doctor-1.png'),
  },
  {
    id: 2,
    name: 'Dr. Ankit Vivek Potdar',
    speciality: 'Bariatric Surgery, General Surgery, Laparoscopic Surgery',
    experience: '13+ years',
    image: require('../../../assets/images/doctor-2.png'),
  },
  {
    id: 3,
    name: 'Dr. Darshna Amol Wahane',
    speciality: 'Obstetrics and Gynaecology',
    experience: '19+ years',
    image: require('../../../assets/images/doctor-3.png'),
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

export default function Hospitals() {
  const { width, height } = useWindowDimensions();
  const [s, setS] = useState(1);

  useEffect(() => {
    setS(Math.min(width / 393, height / 852));
  }, [width, height]);

  const cardShadow = {
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

      <SectionHeader title="Our Hospitals" s={s} />

      <View className="flex-row" style={{ paddingHorizontal: 17 * s }}>
        {hospitals.map((item, index) => (
          <View
            key={item.id}
            className="flex-1 items-center justify-center overflow-hidden"
            style={{
              ...cardShadow,
              height: 108 * s,
              borderRadius: 16 * s,
              marginRight: index === hospitals.length - 1 ? 0 : 13 * s,
            }}
          >
            <Image
              source={item.image}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
        ))}
      </View>

      <SectionHeader title="Our Doctors" s={s} />

      {doctors.map((item) => (
        <View
          key={item.id}
          className="flex-row items-center"
          style={{
            ...cardShadow,
            marginHorizontal: 16 * s,
            marginBottom: 10 * s,
            paddingHorizontal: 16 * s,
            paddingVertical: 14 * s,
            borderRadius: 16 * s,
          }}
        >
          <Image
            source={item.image}
            style={{ width: 88 * s, height: 88 * s, borderRadius: 44 * s }}
            resizeMode="cover"
          />
          <View className="flex-1" style={{ marginLeft: 14 * s }}>
            <Text
              className="font-extrabold text-[#111111]"
              style={{ fontSize: 14.5 * s }}
            >
              {item.name}
            </Text>
            <Text
              className="text-[#666666]"
              style={{ fontSize: 11 * s, lineHeight: 15 * s, marginTop: 4 * s }}
            >
              {item.speciality}
            </Text>
            <Text
              className="text-[#555555]"
              style={{ fontSize: 12 * s, marginTop: 8 * s }}
            >
              Experience:{' '}
              <Text className="font-bold text-[#111111]">{item.experience}</Text>
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