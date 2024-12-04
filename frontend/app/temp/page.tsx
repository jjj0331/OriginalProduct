'use client';
import React from 'react';
import './Loading.css'; // スタイルシートを読み込む

const temp = () => {
  return (
  <div>
    
    <div className="spinner-box">
      <h1 className='text-center font-bold text-4xl'>Loading...</h1>
      <div className="blue-orbit leo"></div>
      <div className="green-orbit leo"></div>
      <div className="red-orbit leo"></div>
      <div className="white-orbit w1 leo"></div>
      <div className="white-orbit w2 leo"></div>
      <div className="white-orbit w3 leo"></div>
    </div>
  </div>

  );
};

export default temp;
