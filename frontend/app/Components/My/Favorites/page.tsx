'use client';
import React, { useContext, useEffect, useState } from 'react';
import Card from "../../Cards/page";
import { TokenContext } from '../../../context/TokenContext';
import { fetchData } from '../../../services/fetch';

export default function MyFavorites() {
  const { accessToken } = useContext(TokenContext);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (accessToken) {
          const data = await fetchData('/current_user/favoriteguidelines', {
            headers: { Authorization: ` ${accessToken}` }
          });
          setDatas(data.data); 
        } else {
          console.error('アクセストークンがありません。');
        }
      } catch (error) {
        console.error('ユーザーのお気に入りデータの取得中にエラーが発生しました', error);
      }
    };

    fetchFavorites();
  }, [accessToken]);

  return (
    <main>
      <div className="mt-4 mx-4 grid grid-cols-6 gap-4">
        {datas.map((data, index) => (
          <Card key={index} data={data} flg={2} />
        ))}
      </div>
    </main>
  );
}
