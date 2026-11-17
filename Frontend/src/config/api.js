import Constants from 'expo-constants';

const host = Constants.expoConfig?.hostUri?.split(':')[0] || 'localhost';

export const BASE_URL = 'http://' + host + ':5000/api';