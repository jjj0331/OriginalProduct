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

  // ガイドラインデータの取得
  const fetchGuidelineDetails = async () => {
    try {
      const data = await fetchData(`/userguidelines/${id}`, {}, accessToken);
      setDatas(data); // データをstateに設定
      return data; // データを返す
    } catch (error) {
      console.error('ガイドラインの取得中にエラーが発生しました', error.response?.data?.message || error.message);
      setError('ガイドラインの取得に失敗しました。');
    }
  };

  useEffect(() => {
    if (id && accessToken) {
      fetchGuidelineDetails();
    }
  }, [id, accessToken]);

  // タスク完了処理
  const completeTask = async (detailTaskId) => {
    try {
      await postData(`/completetask/${detailTaskId}`, {}, accessToken);
      const updatedData = await fetchGuidelineDetails(); // データ再取得
      const updatedTask = updatedData.tasks
        .flatMap(task => task.detail_tasks)
        .find(detailTask => detailTask.detail_task_id === detailTaskId);
      
      if (updatedTask) {
        setSelectedDetailTask(updatedTask); // 最新データで更新
      }

    } catch (error) {
      console.error('タスク完了情報の送信中にエラーが発生しました:', error);
      setError('タスク完了に失敗しました。');
    }
  };

  // フォーム送信処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userMessage = { role: 'user', content: inputText };
      setChatHistory(prev => [...prev, userMessage]);

      const response = await sendToChatGPT(inputText, selectedDetailTask.detail_task_title, selectedDetailTask.detail_task_description);
      const gptMessage = { role: 'assistant', content: response };
      setChatHistory(prev => [...prev, userMessage, gptMessage]);

      setInputText('');

      if (response === 'クエストクリア') {
        const confirmEndTask = confirm('このタスクを終了させますか？');
        if (confirmEndTask) {
          await completeTask(selectedDetailTask.detail_task_id);  
          alert('タスクが完了しました！');
        }
      }
    } catch (error) {
      console.error('ChatGPT APIの呼び出し中にエラーが発生しました', error);
      setError('ChatGPTとの通信中にエラーが発生しました。');
    }
  };

  // タスク手動完了ボタンの処理
  const handleCompleteClick = async () => {
    if (selectedDetailTask) {
      const confirmEndTask = confirm('このタスクを終了させますか？');
      if (confirmEndTask) {
        await completeTask(selectedDetailTask.detail_task_id);
        alert('タスクが完了しました！');
      }
    } else {
      alert('詳細タスクが選択されていません。');
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-grow w-1/5 p-3 border-black border-r-4">
        <h1 className="text-xl mb-6 text-black">
          学習内容: {datas.guideline_title}
        </h1>

        {datas.tasks && datas.tasks.length > 0 ? (
          datas.tasks.map((task, index) => (
            <div key={index} className="mb-4">
              <button 
                onClick={() => {
                  setSelectedTask(task);
                  setSelectedDetailTask(null);
                  setChatHistory([]);
                }}
                className="block hover:underline p-2 rounded-lg bg-blue-200 hover:bg-blue-300 text-blue-800 transition-all">
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
                        ${detail_task.status ? 'bg-gray-400 text-gray-700' : 'bg-white text-blue-600 border border-blue-400'} 
                        ${selectedDetailTask?.detail_task_id === detail_task.detail_task_id ? 'font-bold bg-blue-300' : ''}`}>
                      - {detail_task.detail_task_title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-blue-700">タスクが見つかりません。</p>
        )}
      </div>

      <div className="flex flex-col w-4/5 min-h-screen p-6 relative">
        {selectedDetailTask ? (
          <>
            <div className="py-4 flex-grow overflow-y-auto">
              <h1 className="border-b-2 border-black text-2xl text-black">Quest: 
                <i className="font-bold text-blue-600 px-4">{selectedDetailTask.detail_task_title}</i>
              </h1>
              <div className="mb-4 mt-6">
                {chatHistory.map((message, index) => (
                  <div key={index} className={`p-3 rounded-lg mb-4 ${message.role === 'user' ? 'text-right bg-blue-100' : 'text-left bg-gray-100'}`}>
                    <span className="block">{message.content}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="fixed bottom-0 right-0 w-4/5 mb-2 px-12 border-blue-300 flex items-center">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="ここに入力してください" 
                className="flex-grow p-2 border-2 border-blue-300 rounded-lg" 
              />
              <button type="submit" className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                送信
              </button>
              <button 
                type="button" 
                className='ml-1 p-3 bg-gray-300 border rounded-lg border-black'
                onClick={handleCompleteClick}>
                  完了
              </button>
            </form>
          </>
        ) : (
          <p className="text-blue-700 mt-2">タスクまたは詳細タスクを選択してください。</p>
        )}
      </div>
    </div>
  );
}

export default Study;
