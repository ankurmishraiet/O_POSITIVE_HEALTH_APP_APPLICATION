import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config/api";

// Login token ho to header mein lagao, guest ke liye khali
const authHeaders = async () => {
  const token = await AsyncStorage.getItem("token");
  return token ? { Authorization: "Bearer " + token } : {};
};

// Appointment request backend ko bhejta hai (phone par bhi chalega)
export const bookAppointment = async (payload) => {
  const headers = await authHeaders();
  const res = await axios.post(`${BASE_URL}/appointments`, payload, { headers });
  return res.data;
};

// Logged-in user ki apni requests (My Appointments ke liye)
export const fetchMyAppointments = async () => {
  const headers = await authHeaders();
  const res = await axios.get(`${BASE_URL}/appointments/my`, { headers });
  return res.data;
};