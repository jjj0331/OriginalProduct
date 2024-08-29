'use client';
import React, { useContext, useEffect, useState } from 'react';
import Card from "../../Cards/page";
import { TokenContext } from '../../../context/TokenContext';
import { fetchData } from '../../../services/fetch';

export default function MyGuidlines() {
  const { accessToken } = useContext(TokenContext);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchGuidelines = async () => {
      try {
        if (accessToken) {
          const data = await fetchData('/current_user/guidelines',{ }
            ,accessToken);
          setDatas(data.data); 
          console.log(data);
        } else {
          console.error('アクセストークンがありません。');
        }
      } catch (error) {
        console.error('ユーザーの作成したデータの取得中にエラーが発生しました', error);
      }
    };

    fetchGuidelines();
  }, [accessToken]);

  return (
    <main>
      <div className="mt-4 mx-4 grid grid-cols-6 gap-4">
        {datas.map((data, index) => (
          <Card key={index} data={data} flg={3} />
        ))}
      </div>
    </main>
  );
}
