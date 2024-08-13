import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:3001',
  timeout: 1000,
});

export const fetchData = async (endpoint, token = null) => {
  try {
    const config = token
      ? { headers: { 'Authorization': `Bearer ${token}` } }
      : {};
    const response = await apiClient.get(endpoint, config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

export const postData = async (endpoint, data = {}, token = null) => {
  try {
    const config = token
      ? { headers: { 'Authorization': `Bearer ${token}` } }
      : {};
    const response = await apiClient.post(endpoint, data, config);
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    throw error;
  }
};
