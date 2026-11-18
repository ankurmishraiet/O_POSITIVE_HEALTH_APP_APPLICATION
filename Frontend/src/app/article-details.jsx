import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BASE_URL, showImage } from '../config/api';

export default function ArticleDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const res = await fetch(BASE_URL + '/articles/' + id);
        const data = await res.json();
        if (res.ok) setArticle(data);
      } catch (err) {
        console.log('Article load nahi hua');
      }
    };
    loadArticle();
  }, [id]);

  return (
    <View className="flex-1 bg-white pt-12">
      <Pressable className="px-6" onPress={() => router.back()}>
        <Image
          source={require('../../assets/images/arrow-back.png')}
          style={{ width: 32, height: 32 }}
        />
      </Pressable>

      {article ? (
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {article.image ? (
            <Image
              source={{ uri: showImage(article.image) }}
              style={{ width: '100%', height: 200, marginTop: 14 }}
              resizeMode="cover"
            />
          ) : null}

          <Text className="mt-4 px-6 text-[22px] font-extrabold text-[#1B2A6B]">
            {article.title}
          </Text>

          <Text className="mt-2 px-6 text-[12px] text-[#666666]">
            {article.author ? article.author + '  |  ' : ''}
            {article.createdAt.slice(0, 10)}
          </Text>

          <Text className="mt-4 px-6 text-[15px] leading-6 text-[#222222]">
            {article.content}
          </Text>
        </ScrollView>
      ) : (
        <Text className="mt-10 text-center text-[#666666]">Loading...</Text>
      )}
    </View>
  );
}