import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-center border-b-2 
    border-black box-content py-2 h-10 px-4 '>
      <div className='text-2xl font-bold'>
          みんなのガイドライン
      </div>

      <div className='space-x-5 flex'>
        <a href="/" className='hover:bg-selected-bg my-0 py-2 px-4 rounded-lg'>
          ホーム
        </a>
        <a href="/form/new" className='hover:bg-selected-bg my-0 py-2 px-4 rounded-lg'>
          記事の投稿
        </a>
        <a href="#info" className='hover:bg-selected-bg my-0 py-2 px-4 rounded-lg'>
          修正依頼
        </a>
        <a href="/login" className='border-2 rounded-lg hover:bg-selected-bg my-0 py-2 px-4 font-bold flex items-center'>
          <button className='flex items-center'>
            <i className="fa-solid fa-user"></i>
            <span className='ml-2'>ログイン</span>
          </button>
        </a>
      </div>

    </div>
  )
}

export default Header