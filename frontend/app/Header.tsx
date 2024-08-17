"use client";
import React, { useContext } from 'react'
import Link from 'next/link';
import { TokenContext } from './context/TokenContext';


const Header = () => {
  const { accessToken } = useContext(TokenContext);

  return (
    <div className='flex justify-between items-center border-b-2 
    border-black box-content py-2 h-10 px-4 '>
      <div className='text-2xl font-bold'>
          みんなのガイドライン
      </div>
      
      <div className='space-x-5 flex'>
      <Link href="/"className='hover:bg-selected-bg my-0 py-2 px-4 rounded-lg'>
          ホーム
      </Link>

      <Link href="/" className='hover:bg-selected-bg my-0 py-2 px-4 rounded-lg'>
        はじめに
      </Link>

      {accessToken?(
        <Link href="/mypage"  className='border-2 rounded-lg my-0 py-2 px-4 bg-orange-400 font-bold flex items-center'>
          <button className='flex items-center'>
            <i className="fa-solid fa-user"></i>
            <span className='ml-2'>MyPage</span>
          </button>
        </Link>
      ):(
      <a href="/login" className='border-2 rounded-lg hover:bg-selected-bg my-0 py-2 px-4 font-bold flex items-center'>
        <button className='flex items-center'>
          <i className="fa-solid fa-user"></i>
          <span className='ml-2'>ログイン</span>
        </button>
      </a>
      )}

      </div>

    </div>
  )
}

export default Header