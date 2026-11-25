import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config/api"; // adjust if your config folder is elsewhere

/**
 * Sends feedback to the backend.
 * Logged-in users: the token is sent so the server knows who sent it.
 * Guests: no token, saved as "Guest".
 *
 * Throws an error shaped like axios errors ({ response: { data: { message } } })
 * so CommunityScreen's errorMessage() helper works unchanged.
 */
export const submitFeedback = async ({ rating, message }) => {
  const token = await AsyncStorage.getItem("token");

  const res = await fetch(BASE_URL + "/community/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ rating, message }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.message || "Request failed");
    err.response = { data };
    throw err;
  }

  return data;
};