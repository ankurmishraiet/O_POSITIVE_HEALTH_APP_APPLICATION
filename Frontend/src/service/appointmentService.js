import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // conditionService.js wala same base URL

export const bookAppointment = async (payload) => {
  const res = await axios.post(`${BASE_URL}/appointments`, payload);
  return res.data;
};