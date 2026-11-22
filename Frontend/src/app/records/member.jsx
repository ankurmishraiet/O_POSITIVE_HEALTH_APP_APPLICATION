import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { BASE_URL, showImage } from '../../config/api';

const tabs = [
  { key: 'prescription', label: 'Prescription' },
  { key: 'report', label: 'Reports' },
  { key: 'insurance', label: 'Insurance' },
];

export default function Member() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams();
  const [tab, setTab] = useState('prescription');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);

  const loadRecords = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(BASE_URL + '/records?member=' + id, {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await res.json();
      if (res.ok) {
        setRecords(data);
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
    loadRecords();
  }, []);

  const countOf = (key) => records.filter((item) => item.type === key).length;
  const visible = records.filter((item) => item.type === tab);
  const tabLabel = tabs.find((item) => item.key === tab).label;

  const openUpload = () => {
    setFile(null);
    setTitle('');
    setShowUpload(true);
  };

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    if (result.canceled) {
      return;
    }
    const asset = result.assets[0];
    setFile({
      uri: asset.uri,
      name: asset.fileName || 'photo.jpg',
      type: asset.mimeType || 'image/jpeg',
    });
  };

  const pickPdf = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });
    if (result.canceled) {
      return;
    }
    const asset = result.assets[0];
    setFile({
      uri: asset.uri,
      name: asset.name || 'document.pdf',
      type: asset.mimeType || 'application/pdf',
    });
  };

  const saveRecord = async () => {
    if (!file) {
      alert('Pehle photo ya PDF chuno');
      return;
    }
    if (!title.trim()) {
      alert('Title daalo');
      return;
    }
    try {
      setSaving(true);
      const token = await AsyncStorage.getItem('token');
      const body = new FormData();
      body.append('file', { uri: file.uri, name: file.name, type: file.type });
      body.append('member', id);
      body.append('type', tab);
      body.append('title', title);
      const res = await fetch(BASE_URL + '/records', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + token },
        body,
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      setRecords([data, ...records]);
      setShowUpload(false);
    } catch (err) {
      alert('Server se connect nahi ho paya');
    } finally {
      setSaving(false);
    }
  };

  const removeRecord = async (recordId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(BASE_URL + '/records/' + recordId, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      setRecords(records.filter((item) => item._id !== recordId));
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
        <Text className="ml-4 text-xl font-bold text-[#111111]">{name}</Text>
      </View>

      <View className="flex-row px-4 pt-4">
        {tabs.map((item) => (
          <Pressable
            key={item.key}
            onPress={() => setTab(item.key)}
            className={`mr-2 rounded-full px-4 py-3 ${tab === item.key ? 'bg-[#0E99C9]' : 'bg-white'}`}
          >
            <Text className={`text-sm ${tab === item.key ? 'text-white' : 'text-gray-500'}`}>
              {item.label}({countOf(item.key)})
            </Text>
          </Pressable>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator className="mt-10" color="#0E99C9" />
      ) : visible.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-2xl font-bold text-[#111111]">No Health Records</Text>
        </View>
      ) : (
        <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
          {visible.map((item) => (
            <View
              key={item._id}
              className="mt-4 flex-row items-center rounded-2xl bg-white p-4"
              style={{ elevation: 2 }}
            >
              <Pressable onPress={() => Linking.openURL(showImage(item.fileUrl))} className="flex-1">
                <Text className="text-base font-bold text-[#111111]">{item.title}</Text>
                <Text className="mt-1 text-xs text-gray-500">{item.fileName}</Text>
                <Text className="mt-1 text-xs text-gray-500">
                  {new Date(item.createdAt).toDateString()}
                </Text>
                <Text className="mt-2 text-xs font-bold text-[#0E99C9]">Tap to open</Text>
              </Pressable>
              <Pressable onPress={() => removeRecord(item._id)} className="p-2">
                <Text className="text-xs font-bold text-[#D93025]">Delete</Text>
              </Pressable>
            </View>
          ))}
          <View className="h-32" />
        </ScrollView>
      )}

      <View className="absolute bottom-0 left-0 right-0 bg-white px-4 pb-6 pt-3">
        <Pressable
          onPress={openUpload}
          className="h-14 items-center justify-center rounded-full bg-[#0E99C9]"
        >
          <Text className="text-lg font-bold text-white">Upload</Text>
        </Pressable>
      </View>

      <Modal visible={showUpload} transparent animationType="slide" onRequestClose={() => setShowUpload(false)}>
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View className="rounded-t-3xl bg-[#FAFAFA] px-6 pb-8 pt-6">
            <View className="flex-row items-center justify-between">
              <Text className="text-xl font-bold text-[#0F1F4D]">Upload {tabLabel}</Text>
              <Pressable
                onPress={() => setShowUpload(false)}
                className="h-9 w-9 items-center justify-center rounded-full bg-[#0E99C9]"
              >
                <Text className="text-base font-bold text-white">X</Text>
              </Pressable>
            </View>

            <View className="mt-5 flex-row">
              <Pressable
                onPress={pickPhoto}
                className="mr-3 flex-1 items-center rounded-2xl border border-[#0E99C9] bg-white py-4"
              >
                <Text className="text-sm font-bold text-[#0E99C9]">Choose Photo</Text>
              </Pressable>
              <Pressable
                onPress={pickPdf}
                className="flex-1 items-center rounded-2xl border border-[#0E99C9] bg-white py-4"
              >
                <Text className="text-sm font-bold text-[#0E99C9]">Choose PDF</Text>
              </Pressable>
            </View>

            <Text className="mt-3 text-sm text-gray-600">
              {file ? 'Selected: ' + file.name : 'No file selected'}
            </Text>

            <Text className="mt-5 text-lg font-bold text-[#0F1F4D]">Title*</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Example: Blood test report"
              className="mt-2 h-14 rounded-full border border-[#6B7280] bg-white px-5 text-base text-[#111111]"
            />

            <Pressable
              onPress={saveRecord}
              disabled={saving}
              className={`mt-6 h-14 items-center justify-center rounded-full bg-[#0E99C9] ${
                saving ? 'opacity-50' : ''
              }`}
            >
              <Text className="text-lg font-bold text-white">{saving ? 'Uploading...' : 'Save'}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}