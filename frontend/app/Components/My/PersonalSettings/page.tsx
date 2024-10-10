"use client";

import React, { useContext, useState, useEffect } from 'react';
import { TokenContext } from '../../../context/TokenContext';
import { postData, fetchData } from '../../../services/fetch';
import { advicefromChatGPT  } from '../../../services/chatgpt';

export default function PersonalSettings() {
  const { accessToken } = useContext(TokenContext);
  const [goal, setGoal] = useState<string>(''); // goalを文字列として扱う
  const [completedQuest, setCompletedQuest] = useState();
  const [advice, setAdvice] = useState('');

  // データ取得のための関数
  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        // 両方のデータを同時に取得する
        const [goalData, questData] = await Promise.all([
          fetchData('/personalsettings', {}, accessToken),
          // fetchData('/current_user/ok/guidelines', {}, accessToken)
        ]);
  
        // 目標データが存在する場合は状態を更新、存在しない場合はデフォルトのメッセージを設定
        if (goalData) {
          setGoal(goalData);
        } else {
          setGoal('ガイドラインデータが存在しません');
        }
  
        // 完了したクエストデータを設定
        if (questData) {
          setCompletedQuest(questData);
        } else {
          console.warn('完了したクエストデータが存在しません');
        }
  
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    };
  
    // データ取得を実行
    fetchPersonalData();
  }, [accessToken]);
  

  // アドバイスを更新する
  useEffect(() => {
    if (goal && completedQuest) {
      const newAdvice = advicefromChatGPT(goal, completedQuest);
      setAdvice(newAdvice);
    }
  }, [goal, completedQuest]);

  // 個人設定を更新する関数
  const updatePersonalSettings = async () => {
    try {
      const data = { personal_settings: { goal } };
      await postData('/personalsettings', data, accessToken);
      alert('個人設定が更新されました');
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
      <label className='mt-4 font-bold mr-4'>ChatGPTからのアドバイス</label>
      <i>{advice}</i>
      <br />
    </div>
  );
}
