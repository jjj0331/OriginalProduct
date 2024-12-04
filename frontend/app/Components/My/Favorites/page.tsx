'use client';

import React, { useContext, useEffect, useState } from 'react';
import Card from "../../Cards/page";
import { TokenContext } from '../../../context/TokenContext';
import { fetchData } from '../../../services/fetch';
import Loading  from '../../Loading/page';

export default function MyFavorites() {

  //アクセストークンを管理
  const { accessToken } = useContext(TokenContext);
  //表示データを管理
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (accessToken) {
          
          const data = await fetchData('/current_user/favoriteguidelines', {}, accessToken );
          console.log('Fetched data:', data);
          setDatas(data); 
        } else {
          console.error('アクセストークンがありません。');
        }
      } catch (error) {
        console.error('ユーザーのお気に入りデータの取得中にエラーが発生しました', error);
      }
    };
  
    fetchFavorites();
  }, [accessToken]);


  if (!datas) {
    return <Loading />;
  }
  
  return (
    <main>
      <div className="mt-4 mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {datas.map((data, index) => (
          <Card key={index} data={data} flg={2} />
        ))}
      </div>
    </main>
  );
}
