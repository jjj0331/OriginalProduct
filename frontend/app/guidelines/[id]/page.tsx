'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const Carddetail = () => {
    const [datas,setDatas]=useState([]);

    //URLからidを取得 
    const { id } = useParams();

    useEffect(()=>{
        const catchdatas=async()=>{
            try{
            const response = await axios.get(`http://127.0.0.1:3001/guidelines/${id}`);
            setDatas(response.data);
            console.log(response.data);
            }catch(error){
            console.error('データ取得の際にエラーが発生しました', error);
            }
        }
        catchdatas()
        },[]);

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
      <button className='mt-6 px-4 py-2 bg-gray-300 border rounded-lg'>
        <Link href="/">戻る</Link>
      </button>

      <button className='ml-4 mt-6 px-4 py-2 bg-orange-300 border rounded-lg'>
        <Link href="/">Mylistに追加</Link>
      </button>
    </div>
  );
}

export default Carddetail;
