
import { Image, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

const rows = [
  { label: 'My Family', icon: require('../../../assets/images/acc-family.png') },
  { label: 'My Health Records', icon: require('../../../assets/images/acc-records.png') },
  { label: 'My Appointments', icon: require('../../../assets/images/acc-appointments.png') },
  { label: 'Help', icon: require('../../../assets/images/acc-help.png') },
  { label: 'Rate Us', icon: require('../../../assets/images/acc-rate.png') },
  { label: 'Refer Family / Friends', icon: require('../../../assets/images/acc-refer.png') },
   { label: 'FAQs', icon: require('../../../assets/images/acc-faqs.png'), space: true, route: '/faqs/faqs' },
  { label: 'About Us', icon: require('../../../assets/images/acc-about.png'), route: '/about/about' },
  { label: 'Contact Us', icon: require('../../../assets/images/acc-contact.png'), route: '/contact/contact' },
  { label: 'Terms and Conditions', icon: require('../../../assets/images/acc-terms.png') },
  { label: 'Privacy Policy', icon: require('../../../assets/images/acc-privacy.png') },
];

export default function Account() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-6 pb-2 pt-12">
        <Text className="text-2xl font-extrabold text-[#0F1F4D]">Guest</Text>
        <Text className="font-extrabold text-[#0E8FB8]">Edit</Text>
      </View>

      {rows.map((row) => (
        <Pressable
          key={row.label}
          onPress={() => { if (row.route) { router.push(row.route); } }}
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

    </View>
  );
}