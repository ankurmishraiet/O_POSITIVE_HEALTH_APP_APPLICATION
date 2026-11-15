import { Image, Pressable, Text, View } from 'react-native';

const rows = [
  { label: 'My Family', icon: require('../../../assets/images/acc-family.png') },
  { label: 'My Health Records', icon: require('../../../assets/images/acc-records.png') },
  { label: 'My Appointments', icon: require('../../../assets/images/acc-appointments.png') },
  { label: 'Help', icon: require('../../../assets/images/acc-help.png') },
  { label: 'Rate Us', icon: require('../../../assets/images/acc-rate.png') },
  { label: 'Refer Family / Friends', icon: require('../../../assets/images/acc-refer.png') },
  { label: 'FAQs', icon: require('../../../assets/images/acc-faqs.png'), space: true },
  { label: 'About Us', icon: require('../../../assets/images/acc-about.png') },
  { label: 'Contact Us', icon: require('../../../assets/images/acc-contact.png') },
  { label: 'Terms and Conditions', icon: require('../../../assets/images/acc-terms.png') },
  { label: 'Privacy Policy', icon: require('../../../assets/images/acc-privacy.png') },
];

export default function Account() {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-6 pb-2 pt-12">
        <Text className="text-2xl font-extrabold text-[#0F1F4D]">Guest</Text>
        <Text className="font-extrabold text-[#0E8FB8]">Edit</Text>
      </View>

      {rows.map((row) => (
        <Pressable
          key={row.label}
          className="h-12 flex-row items-center border-b border-[#E6EAEE] px-6"
          style={{ marginTop: row.space ? 12 : 0 }}
        >
          <Image source={row.icon} style={{ width: 28, height: 28 }} />
          <Text className="ml-4 flex-1 text-sm font-extrabold text-[#111111]">{row.label}</Text>
          <Image source={require('../../../assets/images/acc-chevron.png')} style={{ width: 10, height: 14 }} />
        </Pressable>
      ))}

      <View className="mt-4 h-12 items-center justify-center bg-[#F1F5F9]">
        <Text className="text-xs text-gray-500">© O Positive Health, All rights reserved</Text>
      </View>

      <View className="absolute bottom-0 left-0 right-0 h-[72px] flex-row items-center justify-around border-t border-[#EEF0F6] bg-white">
        <Pressable className="w-[70px] items-center">
          <Image source={require('../../../assets/images/acc-nav-home.png')} style={{ width: 28, height: 28 }} resizeMode="contain" />
          <Text className="mt-1 text-[10px] font-bold text-[#222222]">Home</Text>
        </Pressable>

        <Pressable className="w-[70px] items-center">
          <Image source={require('../../../assets/images/nav-media.png')} style={{ width: 28, height: 28 }} resizeMode="contain" />
          <Text className="mt-1 text-[10px] font-bold text-[#222222]">Media</Text>
        </Pressable>

        <Pressable
          className="h-[58px] w-[58px] items-center justify-center rounded-full bg-[#1F3FB0]"
          style={{ marginTop: -30 }}
        >
          <Image source={require('../../../assets/images/nav-search.png')} style={{ width: 26, height: 26 }} resizeMode="contain" />
        </Pressable>

        <Pressable className="w-[70px] items-center">
          <Image source={require('../../../assets/images/nav-community.png')} style={{ width: 28, height: 28 }} resizeMode="contain" />
          <Text className="mt-1 text-[10px] font-bold text-[#222222]">Community</Text>
        </Pressable>

        <Pressable className="w-[70px] items-center">
          <Image source={require('../../../assets/images/acc-nav-account.png')} style={{ width: 28, height: 28 }} resizeMode="contain" />
          <Text className="mt-1 text-[10px] font-bold text-[#0E8FB8]">Account</Text>
        </Pressable>
      </View>
    </View>
  );
}