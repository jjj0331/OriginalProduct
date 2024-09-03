"use client";
import React, { useState } from 'react';
const Serch = ({ getInputValue }) => {//引数にgetInputValue関数を受け取る

  //inputValueを管理
  const [inputValue, setInputValue] = useState('');
  
  //inputの内容が変更されると発火し、入力された内容をinputValueに格納
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };
  //検索ボタンが押された場合、親より受け取ったgetInputValue関数を発火
  const handleSubmit = (e) => {
    e.preventDefault(); 
    getInputValue(inputValue);
  };

  return (
    <div>
      <form id="form1" action="" className="flex justify-center h-14 mt-5" >
        <input
          id="sbox1"
          name="s"
          type="text"
          placeholder="キーワードを入力"
          className="w-6/12 px-4 py-2 bg-white border-none outline-none rounded-l-md"
          value={inputValue}
          //onChangeはイベントハンドラーでinputの内容が変更したら発火
          onChange={handleChange}
        />
        <input
          id="sbtn1"
          type="submit"
          value="検索"
          className="w-16 bg-blue-700 text-white text-lg cursor-pointer rounded-r-md hover:bg-blue-300"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default Serch;
