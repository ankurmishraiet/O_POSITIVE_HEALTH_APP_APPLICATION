import { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from '../../config/api';

export default function Chatbot() {
  const router = useRouter();
  const { question } = useLocalSearchParams();
  const listRef = useRef(null);
  const firstSent = useRef(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      from: 'bot',
      text: 'Hi! I am HealthGPT, your personal healthcare companion. Ask me any health question.',
    },
  ]);

  const addMessage = (from, msg) => {
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now() + Math.random()), from, text: msg },
    ]);
  };

  
      const sendMessage = async (msg) => {
    const clean = msg.trim();
    if (!clean) return;
    addMessage('user', clean);
    try {
      const res = await fetch(BASE_URL + '/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: clean }),
      });
      const data = await res.json();
      if (!res.ok) {
        addMessage('bot', data.message || 'Something went wrong. Please try again.');
        return;
      }
      addMessage('bot', data.reply);
    } catch (err) {
      addMessage('bot', 'Could not connect to the server. Please try again.');
    }
  };

  useEffect(() => {
    if (question && !firstSent.current) {
      firstSent.current = true;
      sendMessage(String(question));
    }
  }, [question]);

  const handleSend = () => {
    sendMessage(text);
    setText('');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-row items-center bg-[#1B4FD8] px-4 pb-4 pt-12">
        <Pressable onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white">
          <Text className="text-sm font-bold text-[#1B4FD8]">HG</Text>
        </View>
        <View>
          <Text className="text-lg font-bold text-white">HealthGPT</Text>
          <Text className="text-xs text-white">Your Personal HealthCare Companion</Text>
        </View>
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => (
          <View
            className={`mb-3 max-w-[80%] rounded-2xl px-4 py-3 ${
              item.from === 'user'
                ? 'self-end bg-[#1B4FD8]'
                : 'self-start bg-[#E6EEFB]'
            }`}
          >
            <Text
              className={`text-sm ${
                item.from === 'user' ? 'text-white' : 'text-[#0F2A6B]'
              }`}
            >
              {item.text}
            </Text>
          </View>
        )}
      />

      <View className="flex-row items-center border-t border-[#E5E9F2] bg-white px-4 py-3">
        <TextInput
          className="mr-3 h-12 flex-1 rounded-full border border-[#1B4FD8] px-4 text-sm text-[#0F2A6B]"
          placeholder="Ask me anything..."
          placeholderTextColor="#9AA3B5"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSend}
          returnKeyType="send"
          style={{ outlineStyle: 'none' }}
        />
        <Pressable
          onPress={handleSend}
          className="h-12 w-12 items-center justify-center rounded-full bg-[#1B4FD8]"
        >
          <Ionicons name="send" size={20} color="white" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}