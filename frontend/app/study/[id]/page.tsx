'use client';
import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchData, sendToChatGPT, postData } from '../../services/fetch';
import { TokenContext } from '../../context/TokenContext';

const Study = () => {
  const { accessToken } = useContext(TokenContext);
  const [datas, setDatas] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDetailTask, setSelectedDetailTask] = useState(null);
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]); 
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchGuidelineDetails = async () => {
      try {
        const data = await fetchData(`/userguidelines/${id}`, {}, accessToken);
        console.log('Fetched data:', data);
        setDatas(data); // データ全体を設定
      } catch (error) {
        console.error('ガイドラインの取得中にエラーが発生しました', error.response?.data?.message || error.message);
        setError('ガイドラインの取得に失敗しました。');
      }
    };

    if (id && accessToken) {
      fetchGuidelineDetails();
    }
  }, [id, accessToken]);

  const completeTask = async (detailTaskId) => {
    try {
      const response = await postData(`/completetask/${detailTaskId}`, {}, accessToken);
      console.log('タスク完了情報が送信されました:', response);
      
      await fetchGuidelineDetails(); // 更新後にデータを再取得
    } catch (error) {
      console.error('タスク完了情報の送信中にエラーが発生しました:', error);
      setError('タスク完了に失敗しました。');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userMessage = { role: 'user', content: inputText };
      setChatHistory([...chatHistory, userMessage]);

      const response = await sendToChatGPT(inputText, selectedDetailTask.detail_task_title, selectedDetailTask.detail_task_description);
      const gptMessage = { role: 'assistant', content: response };
      setChatHistory([...chatHistory, userMessage, gptMessage]);

      setInputText('');

      if (response === '999') {
        const confirmEndTask = confirm('このタスクを終了させますか？');
        if (confirmEndTask) {
          alert('タスクが完了しました！');
          await completeTask(selectedDetailTask.detail_task_id);  
        }
      }
    } catch (error) {
      console.error('ChatGPT APIの呼び出し中にエラーが発生しました', error);
      setError('ChatGPTとの通信中にエラーが発生しました。');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/6 bg-gray-200 p-4">
        <h1 className="font-bold text-xl mb-4">学習内容: {datas.guideline_title}</h1>
        {datas.tasks && datas.tasks.length > 0 ? (
          datas.tasks.map((task, index) => (
            <div key={index} className="mb-2">
              <button 
                onClick={() => {
                  setSelectedTask(task);
                  setSelectedDetailTask(null);
                  setChatHistory([]);
                }}
                className={`block hover:underline p-2`}>
                {index + 1}: {task.task_title}
              </button>
              {selectedTask?.task_id === task.task_id && task.detail_tasks && (
                <div className="pl-4 mt-2">
                  {task.detail_tasks.map((detail_task, detailIndex) => (
                    <button 
                      key={detailIndex}
                      onClick={() => {
                        setSelectedDetailTask(detail_task);
                        setChatHistory([]);
                      }}
                      className={`block hover:underline pl-2 p-1 
                        ${detail_task.status ? 'bg-gray-400' : 'text-blue-500'} 
                        ${selectedDetailTask?.detail_task_id === detail_task.detail_task_id ? 'font-bold' : ''}`}>
                      - {detail_task.detail_task_title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>タスクが見つかりません。</p>
        )}
      </div>

      <div className="flex flex-col w-5/6 bg-white h-full">
        {selectedDetailTask ? (
          <>
            <div className="py-2 flex-grow overflow-y-auto">
              <h1 className="border-b-2 border-black text-2xl">クエスト: 
                <i className="font-bold">{selectedDetailTask.detail_task_title}</i>
              </h1>

              <div className="mb-4">
                {chatHistory.map((message, index) => (
                  <div key={index} className={`p-2 rounded-md mb-2 ${message.role === 'user' ? 'text-right bg-blue-100' : 'text-left bg-gray-100'}`}>
                    <span className="block">{message.content}</span>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="mt-4 p-2 text-red-500">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-gray-200 p-2 border-t-2 border-black flex items-center" style={{ position: 'sticky', bottom: 0 }}>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="ここに入力してください" 
                className="flex-grow p-2 border-2 border-black rounded-md mr-2" 
              />
              <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">送信</button>
            </form>
          </>
        ) : selectedTask ? (
          <div>
            <h1 className="border-b-2 border-black">タスクのタイトル: 
              <i className="font-bold">{selectedTask.task_title}</i>
            </h1>
            
            <h1 className="border-b-2 border-black mt-4 mb-6">タスクの説明: 
              <i className="font-bold">{selectedTask.task_description}</i>
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
