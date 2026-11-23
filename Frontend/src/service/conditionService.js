import axios from "axios";
import { BASE_URL } from "../config/api";

// Home ke Conditions ki list laata hai (phone par bhi chalega)
export const fetchConditions = async (limit) => {
  const res = await axios.get(`${BASE_URL}/conditions`, {
    params: limit ? { limit } : {},
  });
  return res.data;
};

// Ek condition ki detail slug se
export const fetchCondition = async (slug) => {
  const res = await axios.get(`${BASE_URL}/conditions/${slug}`);
  return res.data;
};