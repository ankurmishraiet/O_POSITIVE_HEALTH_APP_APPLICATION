import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, PermissionsAndroid, Platform, ActivityIndicator, StyleSheet,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { API } from '../config/api';

const one = (v) => (Array.isArray(v) ? v[0] : v);

export default function VideoConsultation() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const joinUrl = one(params.joinUrl);
  const consultationId = one(params.consultationId);
  const room = one(params.room);
  const host = (joinUrl || '').split('/')[2];

  const [ready, setReady] = useState(Platform.OS !== 'android');
  const [denied, setDenied] = useState(false);

  // Android asks for camera + microphone at runtime
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]).then((result) => {
      const allGranted = Object.values(result).every((v) => v === PermissionsAndroid.RESULTS.GRANTED);
      allGranted ? setReady(true) : setDenied(true);
    });
  }, []);

  const endCall = () => {
    fetch(`${API}/consultations/${consultationId}/end`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room }),
    }).catch(() => {});
    router.back();
  };

  if (denied) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.message}>
          Camera and microphone access is required for video consultation. Please enable it in Settings.
        </Text>
        <TouchableOpacity style={styles.endInline} onPress={() => router.back()}>
          <Text style={styles.endText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!ready) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator style={{ marginTop: 60 }} />
      </>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <WebView
        source={{ uri: joinUrl }}
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        mediaCapturePermissionGrantType="grant"
        onShouldStartLoadWithRequest={(req) => req.url.split('/')[2] === host} // stay on the call site
        startInLoadingState
        renderLoading={() => <ActivityIndicator style={StyleSheet.absoluteFill} color="#fff" />}
      />
      <TouchableOpacity style={styles.end} onPress={endCall}>
        <Text style={styles.endText}>End Call</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  message: { textAlign: 'center', fontSize: 14, marginBottom: 16 },
  end: {
    position: 'absolute', bottom: 28, alignSelf: 'center', backgroundColor: '#EF4653',
    paddingVertical: 13, paddingHorizontal: 30, borderRadius: 30,
  },
  endInline: { backgroundColor: '#EF4653', paddingVertical: 13, paddingHorizontal: 30, borderRadius: 30 },
  endText: { color: '#fff', fontWeight: '700' },
});