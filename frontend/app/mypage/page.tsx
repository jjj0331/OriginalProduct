"use client";

import React, { useContext, useState } from 'react';
import { TokenContext } from '../context/TokenContext';
import MyFavorites from      '../Components/My/Favorites/page';
import Form from             '../../app/Components/Form/page';
import MyGuidlines from      '../Components/My/Guidlines/page';
import PersonalSettings from '../Components/My/PersonalSettings/page';

const MyPage = () => {
  //ログインユーザのidを管理
  const { loginuser_id } = useContext(TokenContext);
  //現在選択しているタブ番号を管理
  const [activeIndex, setActiveIndex] = useState(1);
  
  //選択しているタブ番号を更新する関数
  const changeShow = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className='mt-6 w-full px-12 mx-auto'> 

      <div className="p-4"> 
        <ul className='flex gap-0 rounded-t-lg overflow-hidden'>
          {/* Loopでli要素を作成:CSS条件付きかつ、onClick関数もついている */}
          {['お気に入り', '新規作成', '編集','個人設定'].map((label, index) => (
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
          {activeIndex === 4 && (
            <div>
              <PersonalSettings />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
