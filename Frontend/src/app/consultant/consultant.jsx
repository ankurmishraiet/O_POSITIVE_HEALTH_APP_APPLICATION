import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const fields = [
  { label: 'Select City', placeholder: 'Select city', required: true },
  { label: 'Relation', placeholder: 'Select your relation' },
  { label: 'Treatment or Condition', placeholder: 'Enter your treatment or condition' },
  { label: 'Gender', placeholder: 'Select your gender' },
];

export default function Consultant() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      <Pressable onPress={() => router.back()}>
        <Image
          source={require('../../../assets/images/arrow-back.png')}
          style={{ width: 32, height: 32 }}
        />
      </Pressable>

      <Image
        source={require('../../../assets/images/logo-spaced.png')}
        style={{ width: 130, height: 66, alignSelf: 'center' }}
      />

      <Text className="mt-6 text-3xl font-extrabold">Doctor Consultant</Text>

      <Text className="mb-2 mt-6 font-bold">
        Name<Text className="text-red-500">*</Text>
      </Text>
      <TextInput
        className="h-12 rounded-full border border-[#B9B6D3] px-4"
        placeholder="Enter your name"
        placeholderTextColor="#A9A6C3"
        value={name}
        onChangeText={setName}
        style={{ outlineStyle: 'none' }}
      />

      {fields.map((item) => (
        <View key={item.label}>
          <Text className="mb-2 mt-4 font-bold">
            {item.label}
            {item.required && <Text className="text-red-500">*</Text>}
          </Text>
          <View className="h-12 flex-row items-center justify-between rounded-full border border-[#B9B6D3] px-4">
            <Text className="text-[#A9A6C3]">{item.placeholder}</Text>
            <Image
              source={require('../../../assets/images/chevron-down.png')}
              style={{ width: 22, height: 22 }}
            />
          </View>
        </View>
      ))}

     <Pressable className="mt-8 h-12 items-center justify-center">
  <Image
    source={require('../../../assets/images/button-gradient.png')}
    style={{ position: 'absolute', width: '100%', height: 48, borderRadius: 24 }}
  />
  <Text className="font-bold text-white">Check Coverage</Text>
</Pressable>
    </View>
  );
}