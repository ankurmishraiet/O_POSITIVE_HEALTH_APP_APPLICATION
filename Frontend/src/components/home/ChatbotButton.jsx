import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';

function Ring({ delay }) {
  const value = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(value, {
          toValue: 1,
          duration: 1800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(value, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    );
    const animation = Animated.sequence([Animated.delay(delay), loop]);
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#1F3FB0',
        opacity: value.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0] }),
        transform: [
          { scale: value.interpolate({ inputRange: [0, 1], outputRange: [1, 2.2] }) },
        ],
      }}
    />
  );
}

export default function ChatbotButton() {
  const router = useRouter();

  return (
    <View
      style={{
        position: 'absolute',
        right: 14,
        bottom: 100,
        width: 58,
        height: 58,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Ring delay={0} />
      <Ring delay={900} />
      <Pressable
        onPress={() => router.push('/chatbot/chatbot')}
        style={{
          width: 58,
          height: 58,
          borderRadius: 29,
          backgroundColor: '#1F3FB0',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 6,
        }}
      >
        <Image
          source={require('../../../assets/images/robot.png')}
          style={{ width: 34, height: 34 }}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
}