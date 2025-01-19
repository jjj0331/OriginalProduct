//CSRを宣言
'use client';

//【各種関数をインポート】
import React, { useEffect, useContext, useState } from 'react';//状態を管理する関数
import { useParams } from 'next/navigation';//URLのidを取得
import { fetchData,  postData } from '../../services/fetch';
import {sendToChatGPT } from '../../services/chatgpt';
import { TokenContext } from '../../context/TokenContext';//token管理
import Loading  from '../../Components/Loading/page';

const Study = () => {
//---------------------------------------------------------------------------
  //【各種変数宣言】
  //Tokenを取得
  const { accessToken } = useContext(TokenContext);
  //対象ガイドのデータ
  const [datas, setDatas] = useState([]);
  //選択されたタスクを管理
  const [selectedTask, setSelectedTask] = useState(null);
  //選択されたタスクのクエストを管理
  const [selectedDetailTask, setSelectedDetailTask] = useState(null);
  //フォームに入力された内容を管理
  const [inputText, setInputText] = useState('');
  //ChatGPTとの会話履歴を格納
  const [chatHistory, setChatHistory] = useState([]); 
  //error内容を格納を管理
  const [error, setError] = useState(null);
  //ページのidを取得および格納
  const { id } = useParams();
  //Task表示
  const [flg,setFlg]=useState(true);

//---------------------------------------------------------------------------
  //【初回レンダリング時のガイドラインデータの取得】
  const fetchGuidelineDetails = async () => {
    try {
      const data = await fetchData(`/userguidelines/${id}`, {}, accessToken);
      setDatas(data); 
    } catch (error) {
      console.error('ガイドラインの取得中にエラーが発生しました', error.response?.data?.message || error.message);
      setError('ガイドラインの取得に失敗しました。');
    }
  };

  //useEffectにて,id, accessTokenを管理し
  //fetchGuidelineDetails関数の実行タイミングを管理
  useEffect(() => {
    if (id && accessToken) {
      fetchGuidelineDetails();
    }
  }, [id, accessToken]);

//---------------------------------------------------------------------------
 // 【タスク完了処理】
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

//---------------------------------------------------------------------------
  // 【フォーム送信処理】
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      const userMessage = { role: 'user', content: inputText };
      setChatHistory(prev => [...prev, userMessage]);
  
      // ChatGPT APIへのリクエスト（chatHistoryも渡す）
      const response = await sendToChatGPT(inputText, selectedDetailTask.detail_task_title, selectedDetailTask.detail_task_description, chatHistory);
      
      //responseをchatHistoryに格納
      const gptMessage = { role: 'assistant', content: response };
      //配列の追加
      setChatHistory(prev => [...prev, gptMessage]);

      //入力フォームを初期化
      setInputText('');
  
      // 会話履歴の全体の文字数を計算
      const totalChatLength = chatHistory.reduce((acc, message) => acc + message.content.length, 0);
  
      // 5000文字を超えた場合の処理
      if (totalChatLength > 5000) {
        const confirmReset = confirm('会話履歴が5000文字を超えました。リセットしますか？');
        if (confirmReset) {
          setChatHistory([]);  // 会話履歴をリセット
        }
      }
  
      if (response === 'クエストクリア') {
        const confirmEndTask = confirm('クエストクリアしました、このタスクを終了させますか？');
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

  if (!datas) {
    return <Loading />;
  }
  return (
    <div>
      {flg ? (
        <div className="w-2/5 p-3 mx-auto text-center mt-8">
          <h1 className="text-3xl mb-6 text-black">
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
                  className="text-xl mx-auto text-center block hover:underline p-2 rounded-lg bg-blue-200 hover:bg-blue-300 text-blue-800 transition-all"
                >
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
                          setFlg(false);
                        }}
                        className={`mx-auto text-center block p-2 mt-1 rounded-lg transition-all hover:bg-orange-400
                          ${
                            detail_task.status
                              ? "bg-gray-400 text-gray-700"
                              : "bg-white text-blue-600 border border-blue-400"
                          } 
                          ${
                            selectedDetailTask?.detail_task_id === detail_task.detail_task_id
                              ? "font-bold bg-blue-300"
                              : ""
                          }`}
                      >
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
      ) : (

        <div className="w-10/12 mx-auto min-h-screen p-2 relative">
          
  
          {selectedDetailTask ? (
            <>
              <button className="p-2 w-full bg-blue-500 text-white mx-auto  rounded-lg hover:bg-blue-600 transition-all" onClick={() => setFlg(true)}>Qusetを変更する</button>

              <div>  
                <h1 className="mt-4 border-b-2 border-black text-2xl text-black">
                  Quest:
                  <i className="font-bold text-blue-600 px-4">
                    {selectedDetailTask.detail_task_title}
                  </i>
                </h1>

                

                
                <div className="mb-4 mt-6">
                  {chatHistory.map((message, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg mb-4 ${
                        message.role === "user"
                          ? "text-right bg-blue-100"
                          : "text-left bg-gray-100"
                      }`}
                    >
                      <span className="block">{message.content}</span>
                    </div>
                  ))}
                </div>
              </div>
  
              <form
                onSubmit={handleSubmit}
                className="fixed bottom-0 right-0 w-full mb-2 px-32 border-blue-300 flex items-center"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="ここに入力してください"
                  className="flex-grow p-2 border-2 border-blue-300 rounded-lg"
                />
                <button
                  type="submit"
                  className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                  送信
                </button>
                <button
                  type="button"
                  className="ml-1 p-3 bg-gray-300 border rounded-lg border-black"
                  onClick={handleCompleteClick}
                >
                  完了
                </button>
              </form>
            </>
          ) : (
            <p className="text-blue-700 mt-2">タスクまたは詳細タスクを選択してください。</p>
          )}
        </div>
      )}
    </div>
  );
  
}

export default Study;