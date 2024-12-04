'use client';
import React, { useEffect, useState } from 'react';
import { fetchData } from './services/fetch';
import Card    from "./Components/Cards/page";
import Serch   from "./Components/Serch/page";
import Loading from "./Components/Loading/page";
import Welcome   from "./Components/Welcome/page";

export default function Home() {
  //初回レンダリングの際に説明のポップアップを表示のFLG
  const [flg,setFlg]=useState(true);

  const ChangeFlg=()=>{
  
    setFlg(false);
  };
  
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
    flg?(<Welcome onClose={ChangeFlg}/>):(
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
