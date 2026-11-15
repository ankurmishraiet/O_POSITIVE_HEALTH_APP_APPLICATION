import { useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

const tabs = ['Patient', 'Doctor', 'Clinic/Hospital'];
const dropdowns = ['Select Speciality', 'Select City'];

export default function Contact() {
  const router = useRouter();
  const [selected, setSelected] = useState('Patient');

  return (
    <View className="flex-1 bg-white">
      <View className="mt-12 h-14 flex-row items-center border-b border-[#E5E9F0] px-5">
        <Pressable onPress={() => router.back()}>
          <Image source={require('../../../assets/images/arrow-back.png')} style={{ width: 28, height: 28 }} />
        </Pressable>
        <Text className="ml-4 text-xl font-extrabold text-[#0F1F4D]">Contact Us</Text>
      </View>

      <View className="bg-[#F4F7FD] px-5 pb-6 pt-5">
        <Text className="text-base font-extrabold text-[#123D83]">Let's Get In Touch</Text>
        <Text className="mt-3 text-sm leading-6 text-gray-800">
          We would love to hear from you. Let us know if you have any questions, business inquiries or just
          want to share feedback. We are always happy to engage!
        </Text>

        <View className="mt-4 flex-row items-center">
          <Image source={require('../../../assets/images/contact-phone.png')} style={{ width: 18, height: 18 }} />
          <Text className="ml-3 text-sm text-gray-800">Call us : </Text>
          <Text className="text-sm text-[#0E8FB8]">+91 00000 00000</Text>
        </View>

        <View className="mt-4 flex-row items-center">
          <Image source={require('../../../assets/images/contact-mail.png')} style={{ width: 18, height: 18 }} />
          <Text className="ml-3 text-sm text-gray-800">Mail us : </Text>
          <Text className="text-sm text-[#0E8FB8]">care@yourdomain.com</Text>
        </View>

        <View className="mt-4 flex-row">
          <Image source={require('../../../assets/images/contact-pin.png')} style={{ width: 18, height: 18 }} />
          <Text className="ml-3 flex-1 text-sm text-gray-800">
            O Positive Health, Address line 1, Address line 2, City, State - 000000
          </Text>
        </View>
      </View>

      <View className="mx-2 -mt-1 rounded-[20px] bg-[#EAF2FF] p-3">
        <View className="mb-4 flex-row">
          {tabs.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setSelected(tab)}
              className={
                selected === tab
                  ? 'mr-2 h-10 flex-1 items-center justify-center rounded-xl bg-white'
                  : 'mr-2 h-10 flex-1 items-center justify-center rounded-xl bg-[#E9ECF2]'
              }
            >
              <Text className={selected === tab ? 'text-xs font-extrabold text-[#123D83]' : 'text-xs font-semibold text-gray-500'}>
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="mx-2 mb-3 h-11 justify-center rounded-xl border-[1.5px] border-[#CFE0F5] bg-white px-3">
          <TextInput
            className="text-sm"
            style={{ outlineStyle: 'none' }}
            placeholder="Enter your name*"
            placeholderTextColor="#6B7280"
          />
        </View>

        <View className="mx-2 mb-3 h-11 flex-row items-center rounded-xl border-[1.5px] border-[#CFE0F5] bg-white px-3">
          <Text className="mr-3 rounded-lg bg-[#EEF3FB] px-2 py-1 text-xs font-extrabold text-[#123D83]">+91</Text>
          <TextInput
            className="flex-1 text-sm"
            style={{ outlineStyle: 'none' }}
            placeholder="Enter your mobile number*"
            placeholderTextColor="#6B7280"
            keyboardType="numeric"
          />
        </View>

        {dropdowns.map((item) => (
          <Pressable
            key={item}
            className="mx-2 mb-3 h-11 flex-row items-center justify-between rounded-xl border-[1.5px] border-[#CFE0F5] bg-white px-3"
          >
            <Text className="text-sm text-gray-900">{item}</Text>
            <Image source={require('../../../assets/images/contact-caret.png')} style={{ width: 10, height: 6 }} />
          </Pressable>
        ))}

        <Pressable className="mx-2 mt-1 h-11 items-center justify-center">
          <Image
            source={require('../../../assets/images/button-blue.png')}
            style={{ position: 'absolute', width: '100%', height: 44, borderRadius: 22 }}
          />
          <Text className="font-extrabold text-white">SUBMIT</Text>
        </Pressable>

        <Text className="mt-3 px-3 text-xs text-gray-700">
          *By proceeding, you agree to our <Text className="font-extrabold text-[#0F1F4D]">terms and conditions</Text>
        </Text>
      </View>
    </View>
  );
}