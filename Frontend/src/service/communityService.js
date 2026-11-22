// services/communityService.js
// Install once:  npx expo install @react-native-async-storage/async-storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

const AUTHOR_KEY = "community_author_id";
let cachedId = null;

const makeId = () =>
  `u_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;

// Identifies this user/device so "My questions" and likes work for guests.
// If you have a logged-in user, return their userId here instead.
export const getAuthorId = async () => {
  if (cachedId) return cachedId;

  try {
    let id = await AsyncStorage.getItem(AUTHOR_KEY);
    if (!id) {
      id = makeId();
      await AsyncStorage.setItem(AUTHOR_KEY, id);
    }
    cachedId = id;
  } catch (e) {
    cachedId = makeId(); // storage unavailable: works for this session only
  }

  return cachedId;
};

export const fetchQuestions = async ({ tab = "feed", category, page = 1 } = {}) => {
  const authorId = await getAuthorId();
  const { data } = await api.get("/community/questions", {
    params: {
      tab,
      page,
      authorId,
      category: category && category !== "All" ? category : undefined,
    },
  });
  return data;
};

export const fetchQuestion = async (id) => {
  const authorId = await getAuthorId();
  const { data } = await api.get(`/community/questions/${id}`, {
    params: { authorId },
  });
  return data;
};

export const askQuestion = async ({ category, question, authorName }) => {
  const authorId = await getAuthorId();
  const { data } = await api.post("/community/questions", {
    authorId,
    authorName,
    category,
    question,
  });
  return data;
};

export const answerQuestion = async (id, { text, authorName }) => {
  const authorId = await getAuthorId();
  const { data } = await api.post(`/community/questions/${id}/answers`, {
    authorId,
    authorName,
    text,
  });
  return data;
};

export const toggleHelpful = async (id) => {
  const authorId = await getAuthorId();
  const { data } = await api.post(`/community/questions/${id}/helpful`, {
    authorId,
  });
  return data;
};

export const toggleAnswerLike = async (questionId, answerId) => {
  const authorId = await getAuthorId();
  const { data } = await api.post(
    `/community/questions/${questionId}/answers/${answerId}/like`,
    { authorId }
  );
  return data;
};