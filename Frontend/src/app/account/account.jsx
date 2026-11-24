import { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config/api';

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
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);

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
  const openEdit = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setShowEdit(true);
  };

  const updateProfile = async () => {
    if (!name.trim()) {
      alert('Naam daalo');
      return;
    }
    if (!email.includes('@')) {
      alert('Sahi email daalo');
      return;
    }
    try {
      setSaving(true);
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(BASE_URL + '/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setShowEdit(false);
    } catch (err) {
      alert('Server se connect nahi ho paya');
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setUser(null);
    router.replace('/auth/login/login');
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-6 pb-2 pt-12">
        <Text className="text-2xl font-extrabold text-[#0F1F4D]">{title}</Text>
        <Pressable onPress={openEdit}>
          <Text className="font-extrabold text-[#0E8FB8]">Edit</Text>
        </Pressable>
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

      <Modal visible={showEdit} transparent animationType="slide" onRequestClose={() => setShowEdit(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View className="rounded-t-3xl bg-[#FAFAFA] px-6 pb-8 pt-6">
            <View className="items-end">
              <Pressable
                onPress={() => setShowEdit(false)}
                className="h-9 w-9 items-center justify-center rounded-full bg-[#0E99C9]"
              >
                <Text className="text-base font-bold text-white">X</Text>
              </Pressable>
            </View>

            <Text className="mt-4 text-xl font-bold text-[#0F1F4D]">Name*</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter name"
              className="mt-2 h-14 rounded-full border border-[#6B7280] bg-white px-5 text-base text-[#111111]"
            />

            <Text className="mt-6 text-xl font-bold text-[#0F1F4D]">Email Id*</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
              className="mt-2 h-14 rounded-full border border-[#6B7280] bg-white px-5 text-base text-[#111111]"
            />

            <Pressable
              onPress={updateProfile}
              disabled={saving}
              className={`mt-8 h-14 items-center justify-center rounded-full bg-[#0E99C9] ${saving ? 'opacity-50' : ''}`}
            >
              <Text className="text-lg font-bold text-white">{saving ? 'Saving...' : 'Update Profile'}</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}