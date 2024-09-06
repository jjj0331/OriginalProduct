'use client';
import React, { useEffect, useState } from 'react';
import { fetchData } from './services/fetch';
import Card from "./Components/Cards/page";
import Serch from "./Components/Serch/page";

export default function Home() {
  //検索フォームに打ち込まれた内容を管理
  const [inputdata, setInputdate] = useState("");
  //表示するデータ(ガイドライン)
  const [datas, setDatas] = useState([]);
  //エラー管理
  const [error, setError] = useState(null);

  //Serchに渡す関数
  const getInputValue = (data) => {
    setInputdate(data);
  };
  
  //APIの記述が単調になるため作成
  const handleApiRequest = async (endpoint, params = {}) => {
    try {
      const data = await fetchData(endpoint, params);
      setDatas(data);
    } catch (error) {
      setError("データの取得に失敗しました。");
      setTimeout(() => handleApiRequest('/guidelines/all'), 3000); 
    }
  };

  //画面がレンダリングされた最初はすべてのガイドラインを取得
  useEffect(() => {
    handleApiRequest('/guidelines/all');
  }, []);

  //inputdataが変化した場合(inputdataの内容でAPIが変化)
  useEffect(() => {
    if (inputdata) {
      handleApiRequest('/guidelines/search', { query: inputdata });
    } else {
      handleApiRequest('/guidelines/all');
    }
  }, [inputdata]);

  return (
    <main>
      <Serch getInputValue={getInputValue} />
      <div className="mt-4 mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {datas.map((data, index) => (
          <Card key={index} data={data} flg={1} />
        ))}
      </div>
    </main>
  );
}

