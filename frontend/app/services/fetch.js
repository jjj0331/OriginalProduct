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

// 履歴をChatGPTに送って要約してもらう関数
export const summarizeChatHistory = async (chatHistory) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { 
            role: 'system', 
            content: '次の会話を要約してください。重要なポイントだけ残してください。'
          },
          { 
            role: 'user', 
            content: chatHistory.map(msg => msg.content).join(' ')
          }
        ],
        max_tokens: 200,  // 要約にはもう少し多めのトークンを設定
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
    console.error('Error in summarizeChatHistory:', error);
    console.error('Response data:', error.response?.data);
    throw error;
  }
};


// ChatGPT APIと通信する関数
export const sendToChatGPT = async (inputText, detailTaskTitle, detailTaskDescription, chatHistory) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  let summarizedChatHistory = '';

  // もしchatHistoryが長い場合、過去のメッセージを要約
  if (chatHistory.length > 10) {
    summarizedChatHistory = await summarizeChatHistory(chatHistory);
  } else {
    summarizedChatHistory = chatHistory.map(msg => msg.content).join(' ');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { 
            role: 'system', 
            content: `あなたは、与えられたタスクに関する正確なフィードバックを行うアシスタントです。特に指定がない限り、日本語で応答してください。`
          },
          { 
            role: 'user', 
            content: `
              タスク: ${detailTaskTitle}
              タスクの答え: ${detailTaskDescription}

              過去の会話の要約: ${summarizedChatHistory}

              私の回答: ${inputText}

              ${inputText}が${detailTaskDescription}の内容がおおよそ一致しており、
              ${detailTaskTitle}の内容を理解してい場合は
              「クエストクリア」のみを返答してください。
        

              判定する際は${summarizedChatHistory}も考慮して判定してください。
              ${summarizedChatHistory}は過去のあなたとの会話の内容を要約したものです。

              もし一部が間違っている場合、簡潔に（30文字以内）で修正または改善のアドバイスを提供してください。
              判断が難しい場合や内容が不明確な場合は「[別の回答をしてください]」と返答してください。
              ${inputText}が一文字など回答になっていないので気を付けて
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


