'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchData, sendToChatGPT } from '../../services/fetch';

const Study = () => {
  const [datas, setDatas] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDetailTask, setSelectedDetailTask] = useState(null);
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]); // チャット履歴を管理
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchGuidelineDetails = async () => {
      try {
        const data = await fetchData(`/guidelines/${id}`);
        setDatas(data);
        console.log(data);
      } catch (error) {
        console.error('ガイドラインの取得中にエラーが発生しました', error.response?.data?.message || error.message);
        setError('ガイドラインの取得に失敗しました。');
      }
    };

    fetchGuidelineDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);  // エラー状態をリセット
    try {
      const userMessage = { role: 'user', content: inputText };
      setChatHistory([...chatHistory, userMessage]); // ユーザーのメッセージを履歴に追加
      
      const response = await sendToChatGPT(inputText, selectedDetailTask.title);
      const gptMessage = { role: 'assistant', content: response };
      setChatHistory([...chatHistory, userMessage, gptMessage]); // ChatGPTの応答を履歴に追加
      
      setInputText(''); // フォームをリセット

      if (response === '1') {
        alert('タスクが完了しました！');
        // ここでタスク完了処理を追加できます
      }
    } catch (error) {
      console.error('ChatGPT APIの呼び出し中にエラーが発生しました', error);
      setError('ChatGPTとの通信中にエラーが発生しました。');
    }
  };

  return (
    <div className="flex h-screen">
      {/* サイドナビゲーション */}
      <div className="w-1/6 bg-gray-200 p-4">
        <h1 className="font-bold text-xl mb-4">学習内容</h1>
        {datas.tasks && datas.tasks.map((task, index) => (
          <div key={index} className="mb-2">
            <button 
              onClick={() => {
                setSelectedTask(task);
                setSelectedDetailTask(null);
                setChatHistory([]); // タスクを選択するたびにチャット履歴をリセット
              }}
              className={`block text-blue-500 hover:underline ${selectedTask === task ? 'font-bold' : ''}`}>
              {index + 1}: {task.title}
            </button>
            {selectedTask === task && task.detail_tasks && (
              <div className="pl-4 mt-2">
                {task.detail_tasks.map((detail_task, detailIndex) => (
                  <button 
                    key={detailIndex}
                    onClick={() => {
                      setSelectedDetailTask(detail_task);
                      setChatHistory([]); // 詳細タスクを選択するたびにチャット履歴をリセット
                    }}
                    className={`block text-blue-400 hover:underline pl-2 ${selectedDetailTask === detail_task ? 'font-bold' : ''}`}>
                    - {detail_task.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* メインコンテンツ */}
      <div className="flex flex-col w-5/6 p-4 bg-white h-full">
        {selectedDetailTask ? (
          <>
            <div className="flex-grow overflow-y-auto">
              <h1 className="border-b-2 border-black">詳細タスクのタイトル: 
                <i className="font-bold">{selectedDetailTask.title}</i>
              </h1>
              
              <h1 className="border-b-2 border-black mt-4 mb-6">詳細タスクの説明: 
                <i className="font-bold">{selectedDetailTask.description}</i>
              </h1>

              {/* チャット履歴 */}
              <div className="mb-4">
                {chatHistory.map((message, index) => (
                  <div key={index} className={`p-2 rounded-md mb-2 ${message.role === 'user' ? 'text-right bg-blue-100' : 'text-left bg-gray-100'}`}>
                    <span className="block">{message.content}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* エラーメッセージの表示 */}
            {error && (
              <div className="mt-4 p-2 text-red-500">
                {error}
              </div>
            )}

            {/* 入力フォーム */}
            <form onSubmit={handleSubmit} className="bg-gray-200 p-2 border-t-2 border-black">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="ここに入力してください" 
                className="w-full p-2 border-2 border-black rounded-md" 
              />
              <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-md w-full">送信</button>
            </form>
          </>
        ) : selectedTask ? (
          <div>
            <h1 className="border-b-2 border-black">タスクのタイトル: 
              <i className="font-bold">{selectedTask.title}</i>
            </h1>
            
            <h1 className="border-b-2 border-black mt-4 mb-6">タスクの説明: 
              <i className="font-bold">{selectedTask.description}</i>
            </h1>
          </div>
        ) : (
          <p>タスクまたは詳細タスクを選択してください。</p>
        )}
      </div>
    </div>
  );
}

export default Study;
