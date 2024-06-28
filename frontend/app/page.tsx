'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "./Components/Cards/page";
import Serch from "./Components/Serch/page";

export default function Home() {

  const [datas,setDatas]=useState([]); 

  useEffect(()=>{
    const catchdatas=async()=>{
      try{
        const response=await axios.get('http://127.0.0.1:3001/guidelines/all');
        setDatas(response.data);
        console.log(response.data);
      }catch(error){
        console.error('ログインの際にエラーが発生しました', error);
      }
    }
    catchdatas()
  },[]);

  
  return (
    <main>
      <Serch/>
      <div className="mt-4 mx-4 grid grid-cols-6 gap-4">
      {datas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
      
    </main>
  );
}
