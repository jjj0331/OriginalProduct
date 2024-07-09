"use client";
import React, { useContext, useState } from 'react';
import { TokenContext } from '../context/TokenContext';
import  MyFavorites  from '../Components/My/Favorites/page';
import Form from '../../app/Components/Form/page';
import MyGuidlines from '../Components/My/Guidlines/page';
const Guidlines = () => {
  const { loginuser_id } = useContext(TokenContext);
  const [activeIndex, setActiveIndex] = useState(1);

  const changeShow = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className='mt-6 w-full px-4 mx-auto'> 
      <ul className='flex gap-0 bg-main_color'>
        <li 
          className={`px-6 py-2 ${activeIndex === 1 ? 'bg-red-200' : 'bg-main_color'}`}
          onClick={() => changeShow(1)}>お気に入り
        </li>
        <li 
          className={`px-6 py-2 ${activeIndex === 2 ? 'bg-main_color' : 'bg-main_color'}`}
          onClick={() => changeShow(2)}>新規作成
        </li>
        <li 
          className={`px-6 py-2 ${activeIndex === 3 ? 'bg-blue-200' : 'bg-main_color'}`}
          onClick={() => changeShow(3)}>編集
        </li>
      </ul>

      <div className='relative overflow-hidden'>
        {activeIndex === 1 && (
          <div className='bg-red-200 h-full'>
            <MyFavorites />
          </div>
        )}
        {activeIndex === 2 && (
          <div className='bg-main_color h-full'>
            <Form/>
          </div>
        )}
        {activeIndex === 3 && (
          <div className='bg-blue-200 h-full'>
            <MyGuidlines/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Guidlines;
