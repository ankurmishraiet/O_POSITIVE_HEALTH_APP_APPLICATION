import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // communityService.js wala same base URL

export const fetchConditions = async (limit) => {
  const res = await axios.get(`${BASE_URL}/conditions`, {
    params: limit ? { limit } : {},
  });
  return res.data;
};

export const fetchCondition = async (slug) => {
  const res = await axios.get(`${BASE_URL}/conditions/${slug}`);
  return res.data;
};