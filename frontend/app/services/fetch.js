import axios from 'axios';

//エンドポイントの設定
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:3001',
  timeout: 2000,
});

//【開発メモ】
//fetchData,postData,deleteData関数について
//基本的な構成は同じで、引数を3つ受け取り
//tokenのある・なしで条件分岐している
//エラー発生時は、コンソールログにエラー内容とエンドポイントが表示される

export const fetchData = async (endpoint, params = {}, token = null) => {
  try {
    const config = token
      ? { headers: { 'Authorization': `Bearer ${token}` }, params }
      : { params };

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

export const deleteData = async (endpoint, token = null) => {
  try {
    const config = token
      ? { headers: { 'Authorization': `Bearer ${token}` } }
      : {};

    const response = await apiClient.delete(endpoint, config);
    return response;
  } catch (error) {
    console.error(`Error deleting data at ${endpoint}:`, error);
    throw error;
  }
};


