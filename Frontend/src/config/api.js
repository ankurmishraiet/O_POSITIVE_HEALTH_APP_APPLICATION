import Constants from 'expo-constants';

const host = Constants.expoConfig?.hostUri?.split(':')[0] || 'localhost';

export const BASE_URL = 'http://' + host + ':5000/api';

export const showImage = (url) => {
  if (!url) return null;
  return url.startsWith('/') ? 'http://' + host + ':5000' + url : url;
};

// ---- NEW: used by the Services feature ----

// Alias so the service screens can import { API }
export const API = BASE_URL;

// Maps the icon name chosen in the admin dashboard to an app icon
export const ICON_MAP = {
  doctor: 'doctor',
  records: 'file-document-outline',
  opinion: 'account-check-outline',
  loan: 'cash-multiple',
  insurance: 'shield-check-outline',
  community: 'account-group',
  heart: 'heart-pulse',
  pharmacy: 'pill',
  lab: 'flask-outline',
  ambulance: 'ambulance',
  apps: 'apps',
};