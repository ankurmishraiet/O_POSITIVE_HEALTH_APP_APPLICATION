import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';

const one = (v) => (Array.isArray(v) ? v[0] : v);

export default function WebPage() {
  const params = useLocalSearchParams();
  const url = one(params.url);
  const title = one(params.title) || 'Website';

  return (
    <>
      <Stack.Screen options={{ title }} />
      <WebView
        source={{ uri: url }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator style={StyleSheet.absoluteFill} />}
      />
    </>
  );
}