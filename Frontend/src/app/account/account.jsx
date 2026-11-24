import { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rows = [
  { label: 'My Family', icon: require('../../../assets/images/acc-family.png'), route: '/family/family' },
  { label: 'My Health Records', icon: require('../../../assets/images/acc-records.png'), route: '/records/records' },
  { label: 'My Appointments', icon: require('../../../assets/images/acc-appointments.png'), route: '/appointments/appointments' },
  { label: 'Help', icon: require('../../../assets/images/acc-help.png'), route: '/help/help' },
  { label: 'Rate Us', icon: require('../../../assets/images/acc-rate.png'), route: '/rate/rate' },
  { label: 'Refer Family / Friends', icon: require('../../../assets/images/acc-refer.png'), route: '/refer/refer' },
   { label: 'FAQs', icon: require('../../../assets/images/acc-faqs.png'), space: true, route: '/faqs/faqs' },
  { label: 'About Us', icon: require('../../../assets/images/acc-about.png'), route: '/about/about' },
  { label: 'Contact Us', icon: require('../../../assets/images/acc-contact.png'), route: '/contact/contact' },
  { label: 'Terms and Conditions', icon: require('../../../assets/images/acc-terms.png'), route: '/terms/terms' },
  { label: 'Privacy Policy', icon: require('../../../assets/images/acc-privacy.png'), route: '/privacy/privacy' },
];

export default function Account() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const saved = await AsyncStorage.getItem('user');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    };
    loadUser();
  }, []);

  const title = user ? user.name || user.email : 'Guest';

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setUser(null);
    router.replace('/auth/login/login');
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-6 pb-2 pt-12">
        <Text className="text-2xl font-extrabold text-[#0F1F4D]">{title}</Text>
        {user && user.name ? (
          <Text className="mt-1 text-sm text-gray-500">{user.email}</Text>
        ) : null}
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

      {user && (
        <Pressable
          onPress={logout}
          className="h-12 flex-row items-center border-b border-[#E6EAEE] px-6"
        >
          <Text className="flex-1 text-sm font-extrabold text-[#D93025]">Logout</Text>
        </Pressable>
      )}

      <View className="mt-4 h-12 items-center justify-center bg-[#F1F5F9]">
        <Text className="text-xs text-gray-500">© O Positive Health, All rights reserved</Text>
      </View>
    </View>
  );
}