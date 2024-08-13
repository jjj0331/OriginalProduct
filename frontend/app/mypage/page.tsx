"use client";
import React, { useContext, useState } from 'react';
import { TokenContext } from '../context/TokenContext';
import MyFavorites from '../Components/My/Favorites/page';
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
      <div className="p-4">
        <ul className='flex gap-0 bg-main_color rounded-t-lg overflow-hidden'>
          <li 
            className={`px-6 py-2 cursor-pointer ${activeIndex === 1 ? 'bg-red-200' : 'bg-main_color'}`}
            onClick={() => changeShow(1)}>お気に入り
          </li>
          <li 
            className={`px-6 py-2 cursor-pointer ${activeIndex === 2 ? 'bg-green-200' : 'bg-main_color'}`}
            onClick={() => changeShow(2)}>新規作成
          </li>
          <li 
            className={`px-6 py-2 cursor-pointer ${activeIndex === 3 ? 'bg-blue-200' : 'bg-main_color'}`}
            onClick={() => changeShow(3)}>編集
          </li>
        </ul>

        <div className='relative overflow-hidden rounded-b-lg border-t-0'>
          {activeIndex === 1 && (
            <div className='bg-red-200 h-full p-4'>
              <MyFavorites />
            </div>
          )}
          {activeIndex === 2 && (
            <div className='bg-green-200 h-full p-4'>
              <Form/>
            </div>
          )}
          {activeIndex === 3 && (
            <div className='bg-blue-200 h-full p-4'>
              <MyGuidlines/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Guidlines;
