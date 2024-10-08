"use client";

import React, { useContext, useState, useEffect } from 'react';
import { TokenContext } from '../../../context/TokenContext';
import { postData, fetchData } from '../../../services/fetch';

export default function PersonalSettings() {
  const { accessToken } = useContext(TokenContext);
  const [goal, setGoal] = useState<string>(''); // goalを文字列として扱う

  // レンダリング時のデータ取得
  useEffect(() => {
    const fetchPersonalSettings = async () => {
      try {
        const data = await fetchData(`/personalsettings`, {}, accessToken);      
        if (data) {
          setGoal(data);  // データが存在する場合、setGoalで状態を更新
        } else {
          setGoal('ガイドラインデータが存在しません');
        }
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    };

    fetchPersonalSettings();
  }, [accessToken]);

  // 個人設定を更新する関数
  const updatePersonalSettings = async () => {
    try {
      const data = { personal_settings: { goal } };
      
      const response = await postData(`/personalsettings`, data, accessToken);  // postDataを使ってPOSTリクエストを送信
      alert('個人設定が更新されました');
    } catch (error) {
      alert('個人設定の更新に失敗しました');
    }
  };

  // 変更時に文字列として状態を更新
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(e.target.value);
  };

  return (
    <div>
      <label className='mt-4 font-bold mr-4'>タイトル</label>
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
    </div>
  );
}
