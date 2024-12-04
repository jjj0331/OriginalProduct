"use client";

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { TokenContext } from './context/TokenContext';

const Header = () => {

  //accessTokenを呼び出す
  const { accessToken } = useContext(TokenContext);

  //ハンバーガーメニューのボタンの変数(isOpen)とアクション(toggleMenu,closeMenu)を管理
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className='flex justify-between items-center border-b-2 border-black py-2 h-16 px-4'>

      {/* ヘッダーのタイトル部分 */}
      <div className='text-xl sm:text-2xl font-bold'>
           <div className='flex justify-between items-center'> 
              <p>みんなのガイドライン</p>
              <img 
                className="opacity-90 h-12 object-contain" 
                  src="/Guidelines.png" 
                  alt="Background" />
           </div>   
      </div>
      
      {/* 640px以下の場合、ハンバーガメニューに切り替える */}
      <div className='sm:hidden'>
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? (
            <span className="text-2xl text-gray-900 dark:text-white">×</span>
          ) : (
            <img
              src="/bars_24.svg"
              alt="Menu"
              className="w-6 h-6"
            />
          )}
        </button>
      </div>
      
      {/* メニュー部分 */}
      <div className={`absolute top-16 left-0 w-full z-50 sm:relative sm:top-0 sm:left-0 sm:w-auto flex-col sm:flex sm:flex-row sm:items-center sm:space-x-5 bg-white dark:bg-gray-800 sm:bg-transparent ${isOpen ? 'flex bg-gray-200' : 'hidden'}`}>
        
          <Link href="/" className='block sm:inline-block hover:bg-selected-bg my-2 sm:my-0 py-2 px-4 rounded-lg' onClick={closeMenu} >
            ホーム
          </Link>

        {accessToken ? (
          // ログイン中の表示
          <div className='flex'>
            <Link href="/mypage" className='block font-bold sm:inline-block border-2 rounded-lg my-2 sm:my-0 py-2 px-2 bg-orange-400 ' onClick={closeMenu}>
              <span>マイページ</span>
            </Link>

            <a href="/" className='block sm:inline-block border-2 rounded-lg my-2 sm:my-0 py-2 px-2 bg-red-500 font-bold items-center mr-4'>
              <span className='text-white'>ログアウト</span>
            </a>
          </div>

        ) : (
          <Link href="/login" className='block sm:inline-block border-2 rounded-lg hover:bg-selected-bg my-2 sm:my-0 py-2 px-4 font-bold' onClick={closeMenu}>
            <span className='ml-2'>ログイン</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
