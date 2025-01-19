'use client';
import React, { useEffect, useState } from 'react';
import { fetchData } from './services/fetch';
import Card    from "./Components/Cards/page";
import Serch   from "./Components/Serch/page";
import Loading from "./Components/Loading/page";
import Welcome   from "./Components/Welcome/page";

// Cookieを取得する関数
export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Cookieを設定する関数
export function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

export default function Home() {
  // // 初回ログインフラグ
  const [flg, setFlg] = useState(false);

  // 初回レンダリング時にCookieを確認
  useEffect(() => {
    const flgCookie = getCookie('flg');
    if (!flgCookie) {
      setFlg(true); // 初回ログインと判定
      setCookie('flg', 'true', 365); // Cookieを365日間保存
    }
  }, []);
  // const flg=false;


  // 検索フォームに打ち込まれた内容を管理
  const [inputdata, setInputdata] = useState("");
  // 表示するデータ(ガイドライン)
  const [datas, setDatas] = useState([]);
  // エラー管理
  const [error, setError] = useState(null);
  // ローディング状態管理
  const [loading, setLoading] = useState(false);

  // Serchに渡す関数
  const getInputValue = (data) => {
    setInputdata(data);
  };

  // API
  let retryCount = 0;
  const handleApiRequest = async (endpoint, params = {}) => {
    setLoading(true); // ローディング開始
    
    try {
      const data = await fetchData(endpoint, params);
      setDatas(data);
      setError(null); // エラーをリセット
    } catch (error) {
      if (retryCount < 3) {
        retryCount++;
        setTimeout(() => handleApiRequest(endpoint, params), 3000);
      } else {
        setError("データの取得に失敗しました。");
      }
    } finally {
      setLoading(false); // ローディング終了
    }
  };

  // 初回レンダリング時にすべてのガイドラインを取得
  useEffect(() => {
    handleApiRequest('/guidelines/all');
  }, []);

  // inputdataが変化した場合(inputdataの内容でAPIが変化)
  useEffect(() => {
    if (inputdata) {
      handleApiRequest('/guidelines/search', { query: inputdata });
    } else {
      handleApiRequest('/guidelines/all');
    }
  }, [inputdata]);

  return (
    flg?(<Welcome/>):(
    <main>
      <Serch getInputValue={getInputValue} />
      {loading ? (<Loading /> /* ローディング中*/ ) 
       : error ? (<div className="error">{error}</div> /*エラー表示*/) 
       : (
          <div>
            <div className="mt-4 mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              {datas.map((data, index) => (
                <Card key={index} data={data} flg={1} />
              ))}
            </div>
          </div>
        )}
    </main>)
  );
}
