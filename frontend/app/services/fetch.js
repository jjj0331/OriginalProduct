import axios from 'axios';

const apiClient = axios.create({

  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:3001',
  timeout: 1000,
});

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
    
    // POSTリクエストにdataとconfigを正しく渡す
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


// ChatGPT APIと通信する関数
export const sendToChatGPT = async (inputText, detailTaskTitle) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // 正しいモデル名を指定
        messages: [
          { role: 'system', content: 'あなたは日本語のみでコミュニケーションを行います。' },
          { role: 'user', content: `
            ${detailTaskTitle}について勉強しています。
            以下の内容が正しいのか判断し、正しい場合は「1」のみを回答して。【回答】${inputText}` }
        ],
        max_tokens: 100,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content.trim(); // 正しくレスポンスを返す
  } catch (error) {
    console.error('Error in sendToChatGPT:', error); // error全体を表示
    console.error('Response data:', error.response?.data); // responseの中身を確認
    throw error;
  }
};

