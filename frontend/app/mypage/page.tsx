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
        <ul className='flex gap-0 rounded-t-lg overflow-hidden'>
          {['お気に入り', '新規作成', '編集'].map((label, index) => (
            <li 
              key={index}
              className={`px-4 sm:px-6 py-2 cursor-pointer text-xs sm:text-sm md:text-base ${
                activeIndex === index + 1 
                  ? 'border-t-4 border-l-4 border-r-4 border-black bg-orange-400  relative top-[1px] rounded-t-lg' 
                  : 'border-b-4 border-black'
              }`}
              onClick={() => changeShow(index + 1)}
            >
              {label}
            </li>
          ))}
        </ul>

        <div className='p-4 border-4 border-black rounded-b-lg mt-[-4px]'> 
          {activeIndex === 1 && (
            <div>
              <MyFavorites />
            </div>
          )}
          {activeIndex === 2 && (
            <div>
              <Form />
            </div>
          )}
          {activeIndex === 3 && (
            <div>
              <MyGuidlines />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <a href="/" className='block sm:inline-block border-2 rounded-lg my-2 sm:my-0 py-2 px-4 bg-red-500 font-bold flex items-center mr-4'>
          <i className="fa-solid fa-user"></i>
          <span className='ml-2 text-white'>ログアウト</span>
        </a>
      </div>
    </div>
  );
}

export default Guidlines;
