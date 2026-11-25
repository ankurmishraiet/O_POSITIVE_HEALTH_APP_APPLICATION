// import React, { useEffect, useState } from 'react';
// import {
//   View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Linking, Alert,
// } from 'react-native';
// import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
// import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
// import { API, ICON_MAP, showImage } from '../../config/api';
// import { parseContent } from '../../utils/parseContent';

// export default function ServicePage() {
//   const { slug } = useLocalSearchParams();
//   const router = useRouter();

//   const [service, setService] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     let cancelled = false;
//     setService(null);
//     setError('');

//     fetch(`${API}/services/${slug}`)
//       .then((r) => (r.ok ? r.json() : Promise.reject()))
//       .then((data) => {
//         if (cancelled) return;
//         data ? setService(data) : setError('This service was not found.');
//       })
//       .catch(() => {
//         if (!cancelled) setError('Unable to load this page. Please try again.');
//       });

//     return () => { cancelled = true; };
//   }, [slug]);

//   const openWhatsApp = async () => {
//     const phone = String(service?.phone || '').replace(/\D/g, '');
//     if (!phone) {
//       Alert.alert('Not available', 'WhatsApp number is not configured for this service.');
//       return;
//     }
//     const text = encodeURIComponent(
//       `Hello, I would like to consult a doctor regarding ${service?.title || 'a service'}.`
//     );
//     try {
//       await Linking.openURL(`https://wa.me/${phone}?text=${text}`);
//     } catch {
//       Alert.alert('Unable to open WhatsApp', 'Please make sure WhatsApp is installed on your phone.');
//     }
//   };

//   if (error) return <Text style={styles.fatal}>{error}</Text>;
//   if (!service) return <ActivityIndicator style={{ marginTop: 40 }} />;

//   const blocks = parseContent(service.pageContent);

//   return (
//     <View style={{ flex: 1 }}>
//       <Stack.Screen options={{ title: service.title }} />

//       <ScrollView style={styles.page} contentContainerStyle={{ paddingBottom: 40 }}>
//         {/* Header */}
//         <View style={styles.hero}>
//           <View style={styles.heroIcon}>
//             {service.iconUrl ? (
//               <Image source={{ uri: showImage(service.iconUrl) }} style={{ width: 40, height: 40 }} />
//             ) : (
//               <Icon name={ICON_MAP[service.iconKey] || 'apps'} size={38} color="#fff" />
//             )}
//           </View>
//           <Text style={styles.heroTitle}>{service.title}</Text>
//           {!!service.description && <Text style={styles.heroDesc}>{service.description}</Text>}
//         </View>

//         {/* Admin paragraph */}
//         {blocks.length > 0 && (
//           <View style={styles.card}>
//             {blocks.map((b, i) =>
//               b.type === 'h' ? (
//                 <Text key={i} style={styles.heading}>{b.text}</Text>
//               ) : b.type === 'ul' ? (
//                 <View key={i} style={{ marginVertical: 6 }}>
//                   {b.items.map((item, j) => (
//                     <View key={j} style={styles.bulletRow}>
//                       <Icon name="check-circle" size={18} color="#36AD69" />
//                       <Text style={styles.bulletText}>{item}</Text>
//                     </View>
//                   ))}
//                 </View>
//               ) : (
//                 <Text key={i} style={styles.paragraph}>{b.text}</Text>
//               )
//             )}
//           </View>
//         )}

//         {/* WhatsApp button (Doctor Consultation) */}
//         {service.actionType === 'whatsapp' && !!service.phone && (
//           <TouchableOpacity style={[styles.button, styles.whatsapp]} onPress={openWhatsApp}>
//             <Icon name="whatsapp" size={22} color="#fff" />
//             <Text style={styles.buttonText}>  {service.ctaLabel || 'Call on WhatsApp'}</Text>
//           </TouchableOpacity>
//         )}

//         {/* Optional website button (Medical Loan, Insurance, ...) */}
//         {!!service.url && (
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() =>
//               router.push({ pathname: '/web-page', params: { url: service.url, title: service.title } })
//             }
//           >
//             <Icon name="open-in-new" size={20} color="#fff" />
//             <Text style={styles.buttonText}>  {service.ctaLabel || 'Learn more'}</Text>
//           </TouchableOpacity>
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   page: { flex: 1, backgroundColor: '#F5F7FB' },
//   fatal: { textAlign: 'center', marginTop: 40, color: '#C83E49' },
//   hero: {
//     backgroundColor: '#123D83', padding: 24, paddingTop: 28, alignItems: 'center',
//     borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
//   },
//   heroIcon: {
//     width: 70, height: 70, borderRadius: 20, backgroundColor: '#ffffff26',
//     alignItems: 'center', justifyContent: 'center',
//   },
//   heroTitle: { color: '#fff', fontSize: 22, fontWeight: '700', marginTop: 12, textAlign: 'center' },
//   heroDesc: { color: '#D6E4FA', fontSize: 13, marginTop: 6, textAlign: 'center', lineHeight: 19 },
//   card: { backgroundColor: '#fff', margin: 16, marginBottom: 6, padding: 18, borderRadius: 16, elevation: 2 },
//   heading: { fontSize: 17, fontWeight: '700', color: '#172B4D', marginTop: 6, marginBottom: 6 },
//   paragraph: { fontSize: 14, color: '#4A5A74', lineHeight: 22, marginBottom: 10 },
//   bulletRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
//   bulletText: { marginLeft: 8, flex: 1, fontSize: 14, color: '#34445E' },
//   button: {
//     backgroundColor: '#087BC1', borderRadius: 12, padding: 15, marginTop: 14, marginHorizontal: 16,
//     flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
//   },
//   whatsapp: { backgroundColor: '#25D366' },
//   buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
// });











import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Linking, Alert,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { API, ICON_MAP, showImage } from '../../config/api';
import { parseContent } from '../../utils/parseContent';

const one = (v) => (Array.isArray(v) ? v[0] : v);

export default function ServicePage() {
  const params = useLocalSearchParams();
  const slug = one(params.slug);
  const router = useRouter();

  const [service, setService] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setService(null);
    setError('');

    fetch(`${API}/services/${slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (cancelled) return;
        data ? setService(data) : setError('This service was not found.');
      })
      .catch(() => {
        if (!cancelled) setError('Unable to load this page. Please try again.');
      });

    return () => { cancelled = true; };
  }, [slug]);

  const openWhatsApp = async () => {
    const phone = String(service?.phone || '').replace(/\D/g, '');
    if (!phone) {
      Alert.alert('Not available', 'WhatsApp number is not configured for this service.');
      return;
    }
    const text = encodeURIComponent(
      `Hello, I would like to consult a doctor regarding ${service?.title || 'a service'}.`
    );
    try {
      await Linking.openURL(`https://wa.me/${phone}?text=${text}`);
    } catch {
      Alert.alert('Unable to open WhatsApp', 'Please make sure WhatsApp is installed on your phone.');
    }
  };

  if (error) return <Text style={styles.fatal}>{error}</Text>;
  if (!service) return <ActivityIndicator style={{ marginTop: 40 }} />;

  const blocks = parseContent(service.pageContent);
  const isWhatsApp = service.actionType === 'whatsapp' || service.actionType === 'video_call';
  const hasPhone = !!String(service.phone || '').replace(/\D/g, '');
  const hasUrl = !!service.url;
  const nothingToShow = blocks.length === 0 && !(isWhatsApp && hasPhone) && !hasUrl;

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: service.title }} />

      <ScrollView style={styles.page} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            {service.iconUrl ? (
              <Image source={{ uri: showImage(service.iconUrl) }} style={{ width: 40, height: 40 }} />
            ) : (
              <Icon name={ICON_MAP[service.iconKey] || 'apps'} size={38} color="#fff" />
            )}
          </View>
          <Text style={styles.heroTitle}>{service.title}</Text>
          {!!service.description && <Text style={styles.heroDesc}>{service.description}</Text>}
        </View>

        {/* Admin paragraph */}
        {blocks.length > 0 && (
          <View style={styles.card}>
            {blocks.map((b, i) =>
              b.type === 'h' ? (
                <Text key={i} style={styles.heading}>{b.text}</Text>
              ) : b.type === 'ul' ? (
                <View key={i} style={{ marginVertical: 6 }}>
                  {b.items.map((item, j) => (
                    <View key={j} style={styles.bulletRow}>
                      <Icon name="check-circle" size={18} color="#36AD69" />
                      <Text style={styles.bulletText}>{item}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text key={i} style={styles.paragraph}>{b.text}</Text>
              )
            )}
          </View>
        )}

        {/* WhatsApp button */}
        {isWhatsApp && hasPhone && (
          <TouchableOpacity style={[styles.button, styles.whatsapp]} onPress={openWhatsApp}>
            <Icon name="whatsapp" size={22} color="#fff" />
            <Text style={styles.buttonText}>  {service.ctaLabel || 'Call on WhatsApp'}</Text>
          </TouchableOpacity>
        )}

        {/* Optional website button */}
        {hasUrl && (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push({ pathname: '/web-page', params: { url: service.url, title: service.title } })
            }
          >
            <Icon name="open-in-new" size={20} color="#fff" />
            <Text style={styles.buttonText}>  {service.ctaLabel || 'Learn more'}</Text>
          </TouchableOpacity>
        )}

        {/* Helpful message when admin has not filled anything yet */}
        {nothingToShow && (
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              Details for this service are not available yet. Please check back soon.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F5F7FB' },
  fatal: { textAlign: 'center', marginTop: 40, color: '#C83E49' },
  hero: {
    backgroundColor: '#123D83', padding: 24, paddingTop: 28, alignItems: 'center',
    borderBottomLeftRadius: 24, borderBottomRightRadius: 24,
  },
  heroIcon: {
    width: 70, height: 70, borderRadius: 20, backgroundColor: '#ffffff26',
    alignItems: 'center', justifyContent: 'center',
  },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '700', marginTop: 12, textAlign: 'center' },
  heroDesc: { color: '#D6E4FA', fontSize: 13, marginTop: 6, textAlign: 'center', lineHeight: 19 },
  card: { backgroundColor: '#fff', margin: 16, marginBottom: 6, padding: 18, borderRadius: 16, elevation: 2 },
  heading: { fontSize: 17, fontWeight: '700', color: '#172B4D', marginTop: 6, marginBottom: 6 },
  paragraph: { fontSize: 14, color: '#4A5A74', lineHeight: 22, marginBottom: 10 },
  bulletRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  bulletText: { marginLeft: 8, flex: 1, fontSize: 14, color: '#34445E' },
  button: {
    backgroundColor: '#087BC1', borderRadius: 12, padding: 15, marginTop: 14, marginHorizontal: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  whatsapp: { backgroundColor: '#25D366' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});