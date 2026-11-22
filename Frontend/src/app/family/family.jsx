import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config/api';

const relations = ['Husband', 'Wife', 'Father', 'Mother', 'Son', 'Daughter', 'Brother', 'Sister', 'Other'];
const genders = [
  { label: 'Male', value: 'M' },
  { label: 'Female', value: 'F' },
  { label: 'Other', value: 'O' },
];

export default function Family() {
  const router = useRouter();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [saving, setSaving] = useState(false);

  const loadMembers = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(BASE_URL + '/family', {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await res.json();
      if (res.ok) {
        setMembers(data);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Server se connect nahi ho paya');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const openAdd = () => {
    setName('');
    setRelation('');
    setAge('');
    setGender('');
    setShowAdd(true);
  };

  const addMember = async () => {
    if (!name.trim()) {
      alert('Naam daalo');
      return;
    }
    if (!relation) {
      alert('Relation chuno');
      return;
    }
    if (!age) {
      alert('Age daalo');
      return;
    }
    if (!gender) {
      alert('Gender chuno');
      return;
    }
    try {
      setSaving(true);
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(BASE_URL + '/family', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ name, relation, age, gender }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      setMembers([data, ...members]);
      setShowAdd(false);
    } catch (err) {
      alert('Server se connect nahi ho paya');
    } finally {
      setSaving(false);
    }
  };

  const removeMember = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(BASE_URL + '/family/' + id, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      setMembers(members.filter((item) => item._id !== id));
    } catch (err) {
      alert('Server se connect nahi ho paya');
    }
  };

  return (
    <View className="flex-1 bg-[#F7F8FA]">
      <View className="flex-row items-center bg-white px-4 pb-4 pt-12" style={{ elevation: 3 }}>
        <Pressable onPress={() => router.back()} className="p-2">
          <Image
            source={require('../../../assets/images/arrow-back.png')}
            style={{ width: 22, height: 22 }}
            resizeMode="contain"
          />
        </Pressable>
        <Text className="ml-4 text-xl font-bold text-[#111111]">My Family</Text>
      </View>

      {loading ? (
        <ActivityIndicator className="mt-10" color="#0E99C9" />
      ) : (
        <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
          <Text className="mt-6 text-2xl font-bold text-[#111111]">Members ({members.length})</Text>

          {members.length === 0 && (
            <Text className="mt-10 text-center text-base text-gray-500">
              Abhi koi member nahi hai. Neeche se add karo.
            </Text>
          )}

          {members.map((item) => (
            <View
              key={item._id}
              className="mt-4 flex-row items-center rounded-2xl bg-white p-4"
              style={{ elevation: 2 }}
            >
              <View className="items-center">
                <View className="h-14 w-14 items-center justify-center rounded-full bg-[#0E99C9]">
                  <Text className="text-2xl font-bold text-white">
                    {item.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View className="mt-2 rounded-full bg-[#E6F3FB] px-3 py-1">
                  <Text className="text-[11px] font-bold uppercase text-[#111111]">{item.relation}</Text>
                </View>
              </View>

              <View className="ml-4 flex-1">
                <Text className="text-lg font-bold text-[#111111]">{item.name}</Text>
                <View className="mt-1 flex-row">
                  <Text className="text-sm text-gray-500">Age: </Text>
                  <Text className="text-sm font-bold text-[#111111]">{item.age}</Text>
                  <Text className="ml-6 text-sm text-gray-500">Gender: </Text>
                  <Text className="text-sm font-bold text-[#111111]">{item.gender}</Text>
                </View>
              </View>

              <Pressable onPress={() => removeMember(item._id)} className="p-2">
                <Text className="text-xs font-bold text-[#D93025]">Remove</Text>
              </Pressable>
            </View>
          ))}

          <View className="h-32" />
        </ScrollView>
      )}

      <View className="absolute bottom-0 left-0 right-0 bg-white px-4 pb-6 pt-3">
        <Pressable
          onPress={openAdd}
          className="h-14 items-center justify-center rounded-full bg-[#0E99C9]"
        >
          <Text className="text-lg font-bold text-white">+ Add New Member</Text>
        </Pressable>
      </View>

      <Modal visible={showAdd} transparent animationType="slide" onRequestClose={() => setShowAdd(false)}>
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View className="rounded-t-3xl bg-[#FAFAFA] px-6 pb-8 pt-6" style={{ maxHeight: '90%' }}>
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
              <View className="items-end">
                <Pressable
                  onPress={() => setShowAdd(false)}
                  className="h-9 w-9 items-center justify-center rounded-full bg-[#0E99C9]"
                >
                  <Text className="text-base font-bold text-white">X</Text>
                </Pressable>
              </View>

              <Text className="mt-2 text-xl font-bold text-[#0F1F4D]">Name*</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
                className="mt-2 h-14 rounded-full border border-[#6B7280] bg-white px-5 text-base text-[#111111]"
              />

              <Text className="mt-5 text-xl font-bold text-[#0F1F4D]">Relation*</Text>
              <View className="mt-2 flex-row flex-wrap">
                {relations.map((item) => (
                  <Pressable
                    key={item}
                    onPress={() => setRelation(item)}
                    className={`mb-2 mr-2 rounded-full px-4 py-2 ${
                      relation === item ? 'bg-[#0E99C9]' : 'border border-[#6B7280] bg-white'
                    }`}
                  >
                    <Text className={relation === item ? 'text-white' : 'text-[#111111]'}>{item}</Text>
                  </Pressable>
                ))}
              </View>

              <Text className="mt-3 text-xl font-bold text-[#0F1F4D]">Age*</Text>
              <TextInput
                value={age}
                onChangeText={(text) => setAge(text.replace(/[^0-9]/g, ''))}
                placeholder="Enter age"
                keyboardType="number-pad"
                maxLength={3}
                className="mt-2 h-14 rounded-full border border-[#6B7280] bg-white px-5 text-base text-[#111111]"
              />

              <Text className="mt-5 text-xl font-bold text-[#0F1F4D]">Gender*</Text>
              <View className="mt-2 flex-row">
                {genders.map((item) => (
                  <Pressable
                    key={item.value}
                    onPress={() => setGender(item.value)}
                    className={`mr-2 rounded-full px-5 py-2 ${
                      gender === item.value ? 'bg-[#0E99C9]' : 'border border-[#6B7280] bg-white'
                    }`}
                  >
                    <Text className={gender === item.value ? 'text-white' : 'text-[#111111]'}>
                      {item.label}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Pressable
                onPress={addMember}
                disabled={saving}
                className={`mt-8 h-14 items-center justify-center rounded-full bg-[#0E99C9] ${
                  saving ? 'opacity-50' : ''
                }`}
              >
                <Text className="text-lg font-bold text-white">{saving ? 'Saving...' : 'Add Member'}</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}