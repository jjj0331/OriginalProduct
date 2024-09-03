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
    <div className="flex h-screen bg-yellow-50">
      <div className="w-1/5 bg-orange-100 p-6 border-orange-300 border-r-2 rounded-lg shadow-lg">
        <h1 className="font-bold text-xl mb-6 text-orange-800">学習内容: {datas.guideline_title}</h1>
        {datas.tasks && datas.tasks.length > 0 ? (
          datas.tasks.map((task, index) => (
            <div key={index} className="mb-4">
              <button 
                onClick={() => {
                  setSelectedTask(task);
                  setSelectedDetailTask(null);
                  setChatHistory([]);
                }}
                className={`block hover:underline p-2 rounded-lg bg-orange-200 hover:bg-orange-300 text-orange-800 transition-all`}>
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
                      className={`block p-2 mt-1 rounded-lg transition-all 
                        ${detail_task.status ? 'bg-gray-400 text-gray-700' : 'bg-white text-orange-600 border border-orange-400'} 
                        ${selectedDetailTask?.detail_task_id === detail_task.detail_task_id ? 'font-bold bg-orange-300' : ''}`}>
                      - {detail_task.detail_task_title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-orange-700">タスクが見つかりません。</p>
        )}
      </div>

      <div className="flex flex-col w-5/6 bg-white h-full rounded-lg shadow-lg p-6">
        {selectedDetailTask ? (
          <>
            <div className="py-4 flex-grow overflow-y-auto">
              <h1 className="border-b-2  text-2xl text-orange-800">クエスト: 
                <i className="font-bold">{selectedDetailTask.detail_task_title}</i>
              </h1>

              <div className="mb-4 mt-6">
                {chatHistory.map((message, index) => (
                  <div key={index} className={`p-3 rounded-lg mb-4 ${message.role === 'user' ? 'text-right bg-blue-100' : 'text-left bg-gray-100'}`}>
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

            <form onSubmit={handleSubmit} className="bg-orange-200 p-3 border-t-2 border-orange-300 flex items-center rounded-lg">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="ここに入力してください" 
                className="flex-grow p-2 border-2 border-orange-300 rounded-lg mr-4" 
              />
              <button type="submit" className="p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all">送信</button>
            </form>
          </>
        ) : selectedTask ? (
          <div>
            <h1 className="border-b-2 border-orange-300 text-2xl text-orange-800">タスクのタイトル: 
              <i className="font-bold">{selectedTask.task_title}</i>
            </h1>
            
            <h1 className="border-b-2 border-orange-300 mt-4 mb-6 text-orange-700">タスクの説明: 
              <i className="font-bold">{selectedTask.task_description}</i>
            </h1>
          </div>
        ) : (
          <p className="text-orange-700">タスクまたは詳細タスクを選択してください。</p>
        )}
      </div>
    </div>
  );
}

export default Study;
