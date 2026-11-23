import axios from "axios";
import { BASE_URL } from "../config/api";

// Appointment request backend ko bhejta hai (phone par bhi chalega)
export const bookAppointment = async (payload) => {
  const res = await axios.post(`${BASE_URL}/appointments`, payload);
  return res.data;
};