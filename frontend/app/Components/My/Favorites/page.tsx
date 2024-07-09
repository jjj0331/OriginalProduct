'use client';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Card from "../../Cards/page";
import { TokenContext } from '../../../context/TokenContext';

export default function MyFavorites() {
  const { accessToken } = useContext(TokenContext);
  const [datas,setDatas]=useState([]); 

  useEffect(()=>{
    const catchdatas=async()=>{
      try{
        const response = await axios.get(`http://127.0.0.1:3001/current_user/favariteguidelines`, 
          {headers: {'Authorization': `${accessToken}`}} 
        );
        setDatas(response.data.data);
       
      }catch(error){
        console.error('ユーザーの作成したデータの取得中にエラーが発生しました', error);
      }
    }
    catchdatas()
  },[]);

  
  return (
    <main>
      
      <div className="mt-4 mx-4 grid grid-cols-6 gap-4">
      {datas.map((data, index) => (
          <Card key={index} data={data} flg={2}/>
        ))}
      </div>
      
    </main>
  );
}
