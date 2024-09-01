import axios from 'axios';

const apiClient = axios.create({

  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:3001',
  timeout: 2000,
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
export const sendToChatGPT = async (inputText, detailTaskTitle, detailTaskDescription) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { 
            role: 'system', 
            content: `あなたは、与えられたタスクに関する正確なフィードバックを行うアシスタントです。特に指定がない限り、日本語で応答してください。`
          },
          { 
            role: 'user', 
            content: `
              タスク: ${detailTaskTitle}
              説明: ${detailTaskDescription}
              
              私の回答: ${inputText}
              
              この回答がタスクの説明と完全に一致している場合は、「999」とだけ返答してください。 
              一致していない場合、簡潔に（30文字以内）で修正または改善のアドバイスを提供してください。 
              判断が難しい場合は「[別の回答をしてください]」と返答してください。
            `
          }
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

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error in sendToChatGPT:', error);
    console.error('Response data:', error.response?.data);
    throw error;
  }
};
