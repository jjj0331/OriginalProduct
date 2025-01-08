"use client";

import React, { useContext, useState, useEffect } from 'react';
import { TokenContext } from '../../../context/TokenContext';
import { postData, fetchData } from '../../../services/fetch';
import { advicefromChatGPT  } from '../../../services/chatgpt';
import Loading from "../../Loading/page";
export default function PersonalSettings() {
  const { accessToken } = useContext(TokenContext);
  const [goal, setGoal] = useState<string>(''); // goalを文字列として扱う
  const [advice, setAdvice] = useState('設定を更新ボタンを押すとChatGPTからアドバイスが得られます');

  // データ取得のための関数
  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        const [goalData] = await Promise.all([
          fetchData('/personalsettings', {}, accessToken)
        ]);
  
        if (goalData) {
          setGoal(goalData);
        } else {
          setGoal('ガイドラインデータが存在しません');
        }
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    };
  
    fetchPersonalData();
  }, [accessToken]);
  

  const fetchAdvice = async (goal) => {
    try {
      const advice = await advicefromChatGPT(goal);
      setAdvice(advice);
    } catch (error) {
      alert('アドバイスの取得に失敗しました');
    }
  };
  
  // updatePersonalSettings 関数
  const updatePersonalSettings = async () => {
    try {
      const data = { personal_settings: { goal } };
      await postData('/personalsettings', data, accessToken);
      alert('個人設定が更新されました');
      setAdvice(null);
      await fetchAdvice(goal);
    } catch (error) {
      alert('個人設定の更新に失敗しました');
    }
  };
  

  // 入力の変更を処理する関数
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(e.target.value);
  };

  return (
    <div>
      <label className='mt-4 font-bold mr-4'>目標</label>
      <input
        type="text"
        className="w-full border px-4 py-2"
        value={goal} // goalを文字列として使用
        onChange={handleInputChange} // 変更時に文字列として状態を更新
      />
      <br />
      <button onClick={updatePersonalSettings} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        設定を更新
      </button>
      <br />
      <br />
      <label className='mt-4 font-bold mr-4'>ChatGPTからのアドバイス</label><br />
      {advice ? (<i>{advice}</i>) : (<Loading />)}
      <br />
    </div>
  );
}
