// import React, { useCallback, useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
// import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { API, ICON_MAP } from '../../config/api';

// export default function OurServices() {
//   const router = useRouter();
//   const [services, setServices] = useState(null);
//   const [error, setError] = useState(false);

//   const load = useCallback(() => {
//     setError(false);
//     fetch(`${API}/services`)
//       .then((r) => (r.ok ? r.json() : Promise.reject()))
//       .then(setServices)
//       .catch(() => setError(true));
//   }, []);

//   useEffect(() => {
//     load();
//   }, [load]);

//   const open = (s) => {
//     switch (s.actionType) {
//       case 'video_call':
//       case 'dynamic_page':
//         return router.push({ pathname: '/service/[slug]', params: { slug: s.slug } });

//       case 'external_link':
//         return router.push({ pathname: '/web-page', params: { url: s.url, title: s.title } });

//       case 'native_screen':
//         // admin types a route path such as /hospitals
//         return router.push(s.screen.startsWith('/') ? s.screen : `/${s.screen}`);
//     }
//   };

//   return (
//     <View style={styles.wrapper}>
//       <Text style={styles.title}>Our Services</Text>

//       {error ? (
//         <TouchableOpacity onPress={load} style={styles.center}>
//           <Text style={styles.errorText}>Could not load services. Tap to retry.</Text>
//         </TouchableOpacity>
//       ) : !services ? (
//         <ActivityIndicator style={styles.center} />
//       ) : (
//         <View style={styles.grid}>
//           {services.map((s) => (
//             <TouchableOpacity key={s._id} style={styles.tile} onPress={() => open(s)}>
//               {s.iconUrl ? (
//                 <Image source={{ uri: s.iconUrl }} style={styles.iconImage} />
//               ) : (
//                 <Icon name={ICON_MAP[s.iconKey] || 'apps'} size={32} color="#087BC1" />
//               )}
//               <Text style={styles.label} numberOfLines={2}>{s.title}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: { paddingHorizontal: 12, paddingTop: 12 },
//   title: { fontSize: 16, fontWeight: '700', color: '#172B4D', marginBottom: 10 },
//   grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
//   tile: {
//     width: '31%', aspectRatio: 1, backgroundColor: '#fff', borderRadius: 12,
//     borderWidth: 1, borderColor: '#E8EDF4', alignItems: 'center', justifyContent: 'center',
//     marginBottom: 10, padding: 6,
//   },
//   iconImage: { width: 32, height: 32 },
//   label: { marginTop: 6, fontSize: 12, textAlign: 'center', color: '#172B4D' },
//   center: { padding: 24, alignItems: 'center' },
//   errorText: { color: '#C83E49', fontSize: 13 },
// });








import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { API, ICON_MAP, showImage } from '../../config/api';

export default function OurServices() {
  const router = useRouter();
  const [services, setServices] = useState(null);
  const [error, setError] = useState(false);

  const load = useCallback(() => {
    setError(false);
    fetch(`${API}/services`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openDetail = (s) =>
    router.push({ pathname: '/service/[slug]', params: { slug: s.slug } });

  const open = (s) => {
    switch (s.actionType) {
      case 'whatsapp':
      case 'video_call':
      case 'dynamic_page':
        return openDetail(s);

      case 'external_link':
        if (!s.url) return;
        return router.push({ pathname: '/web-page', params: { url: s.url, title: s.title } });

      case 'native_screen':
        if (!s.screen) return;
        return router.push(s.screen.startsWith('/') ? s.screen : `/${s.screen}`);

      default:
        return openDetail(s);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Our Services</Text>

      {error ? (
        <TouchableOpacity onPress={load} style={styles.center}>
          <Text style={styles.errorText}>Could not load services. Tap to retry.</Text>
        </TouchableOpacity>
      ) : !services ? (
        <ActivityIndicator style={styles.center} />
      ) : (
        <View style={styles.grid}>
          {services.map((s) => (
            <TouchableOpacity key={s._id} style={styles.tile} onPress={() => open(s)}>
              {s.iconUrl ? (
                <Image source={{ uri: showImage(s.iconUrl) }} style={styles.iconImage} />
              ) : (
                <Icon name={ICON_MAP[s.iconKey] || 'apps'} size={32} color="#087BC1" />
              )}
              <Text style={styles.label} numberOfLines={2}>{s.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 12, paddingTop: 12 },
  title: { fontSize: 16, fontWeight: '700', color: '#172B4D', marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tile: {
    width: '31%', aspectRatio: 1, backgroundColor: '#fff', borderRadius: 12,
    borderWidth: 1, borderColor: '#E8EDF4', alignItems: 'center', justifyContent: 'center',
    marginBottom: 10, padding: 6,
  },
  iconImage: { width: 32, height: 32 },
  label: { marginTop: 6, fontSize: 12, textAlign: 'center', color: '#172B4D' },
  center: { padding: 24, alignItems: 'center' },
  errorText: { color: '#C83E49', fontSize: 13 },
});