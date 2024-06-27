'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "./Components/Cards/page";
import Serch from "./Components/Serch/page";

export default function Home() {

  const [datas,setDatas]=useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://127.0.0.1:3001/guidelines/all');
      setDatas(response.data);
    } catch (error) {
      console.error('ログインの際にエラーが発生しました', error);
      if (axios.isAxiosError(error)) {
        console.error('AxiosError message:', error.message);
      }
    }
  };
  
  return (
    <main>
      <Serch/>
      <div className="mt-4 mx-4 grid grid-cols-4 gap-4">
        {datas.map((data,index)=>(
          <Card key={index} data={data} />
        ) )}
      </div>
      
    </main>
  );
}
