import axios from 'axios';

//エンドポイントの設定
const gptClient = axios.create({
  baseURL: `https://api.openai.com/v1/chat/completions`,
  timeout: 10000,
});

//【開発メモ：ChatGPTのAPIについて】
//APIからの回答については以下のように加工するとAIの回答のみ取得できる
//response.data.choices[0].message.content.trim();

// 履歴をChatGPTに送って要約してもらう関数
export const summarizeChatHistory = async (chatHistory) => {
  //ChatGPTのAPIキーはenvに格納
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  try {
    const response = await gptClient.post(
      ``,//post関数の第一引数はエンドポイントだが指定済みのため空白
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
    //ChatGPT空の回答の中からAIによる要約部分のみ返り値として返す
    return response.data.choices[0].message.content.trim();

  } 
  catch (error) {
    console.error('Error in summarizeChatHistory:', error);
    console.error('Response data:', error.response?.data);
    throw error;
  }
};

// sendToChatGPT：ChatGPT APIと通信する関数
//【開発メモ】
//引数1：inputText(ユーザーの回答)
//引数2：detailTaskTitle(クエストの内容)
//引数3：detailTaskDescription(クエストの回答およびポイント)
//引数4:chatHistory(ChatGPTとの会話履歴)

export const sendToChatGPT = async (
  inputText, detailTaskTitle, detailTaskDescription, chatHistory) => {
  
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  let summarizedChatHistory = '';

  // もしchatHistoryが長い場合、過去のメッセージを要約
  if (chatHistory.length > 10) {
    summarizedChatHistory = await summarizeChatHistory(chatHistory);
  } else {
    summarizedChatHistory = chatHistory.map(msg => msg.content).join(' ');
  }

  try {
    const response = await gptClient.post(
      '',
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

              ${inputText}が${detailTaskTitle}に対する${detailTaskDescription}
              という答えにおおよそ一致している場合は
              「クエストクリア」のみを返答してください。
        

              判定する際は${summarizedChatHistory}も考慮して判定してください。
              ${summarizedChatHistory}は過去のあなたとの会話の内容を要約したものです。

              もし一部が間違っている場合、簡潔に（30文字以内）で修正または改善のアドバイスを提供してください。
              判断が難しい場合や内容が不明確な場合は「[別の回答をしてください]」と返答してください。
              ${inputText}が一文字など回答になっていないので気を付けて
            `
          }
        ],
        max_tokens: 1000,
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

// 目標設定するための関数
export const advicefromChatGPT = async (goal, retries = 2) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  try {
    const response = await gptClient.post(
      '',
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
              目標：${goal}
              目標に対して学習すべき内容を500文字以内でアドバイスしてください。
            `
          }
        ],
        max_tokens: 500,
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
    // エラーがタイムアウトで再試行回数が残っている場合
    if (error.code === 'ECONNABORTED' && retries > 0) {
      console.warn('Timeout occurred, retrying...', { retriesLeft: retries - 1 });
      return await advicefromChatGPT(goal, retries - 1);
    }

    // 再試行回数が尽きた場合
    console.error('Error in advicefromChatGPT:', error.message, error.response?.data || 'No response data');
    return "ChatGPTからデータを取得できませんでした。";
  }
};
