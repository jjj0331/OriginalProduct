'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { TokenContext } from '../../context/TokenContext';
import { fetchData, postData } from '../../services/fetch'; // 共通のAPIクライアントを使用

const Carddetail = () => {
  const { accessToken } = useContext(TokenContext);
  const [datas, setDatas] = useState({});
  const { id } = useParams();

  const AddMyFavorite = async () => {
    try {
      await postData(`/userguidelines/${id}`,{} ,accessToken);
      alert("Mylistに追加しました");
    } catch (error) {
      alert("Mylistへの追加に失敗しました");
      console.error('Mylistへの追加中にエラーが発生しました', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const fetchGuidelineDetails = async () => {
      try {
        const data = await fetchData(`/guidelines/${id}`);
        setDatas(data);
        console.log(data);
      } catch (error) {
        console.error('ガイドラインの取得中にエラーが発生しました', error.response?.data?.message || error.message);
      }
    };

    fetchGuidelineDetails();
  }, [id]);

  return (
    <div className='bg-white mt-4 w-2/3 mx-auto border-2 border-black rounded-lg px-4 py-4'>
      <h1 className='border-b-2 border-black'>タイトル: <i className='font-bold'>{datas.title}</i></h1>
      <h1 className='border-b-2 border-black mt-4 mb-6'>概要: <i className='font-bold'>{datas.description}</i></h1>

      {datas.tasks && datas.tasks.map((task, index) => (
        <div key={index}>
          <h2 className='pl-6 mt-2'>{index + 1}: <i className='font-bold'>{task.title}</i></h2>
          {task.detail_tasks && task.detail_tasks.map((detail_task, detailIndex) => (
            <h3 className='pl-12' key={detailIndex}> - {detail_task.title}</h3>
          ))}
        </div>
      ))}

      <Link href="/">
        <button className='mt-6 px-4 py-2 bg-gray-300 border rounded-lg'>
          戻る
        </button>
      </Link>

      <button onClick={AddMyFavorite} className='ml-4 mt-6 px-4 py-2 bg-orange-300 border rounded-lg'>
        Mylistに追加
      </button>
    </div>
  );
}

export default Carddetail;
