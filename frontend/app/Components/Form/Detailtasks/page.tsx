'use client';
import { useEffect, useState } from 'react';

const Detailsform = ({ prop, closeDetail }) => {
  const [items, setItems] = useState([{ detailtitle: '', detailcontent: '' }]);
  const [details, setDetails] = useState({ detailtitle: '', detailcontent: '' });
  const adddetails=function(){
    const newDetail={ detailtitle: '', detailcontent: '' }
    setItems([...items, newDetail]);
  };
  
    return (
      <div className='fixed inset-0 bg-main_color overflow-y-auto'>
        
        <form className="w-2/3 mx-auto mt-16 border-2 border-black rounded shadow-lg px-4 py-4">
          <h1>詳細作成フォーム</h1>
          {items.map((item, index) => (
          <div className='border border-red-700'>
            <div className="mb-4 flex justify-center w-full space-x-2 items-center">
                      <label className="w-1/6 block text-gray-700 text-right">詳細タイトル</label>
                      <input type="text" name="detailtitle" className="w-3/4 border px-4 py-2"/>
            </div>
            <div className="mb-4 flex justify-center w-full space-x-2 items-center">
                      <label className="w-1/6 block text-gray-700 text-right">詳細内容</label>
                      <textarea name="detailcontent" className="w-3/4 border px-4 py-2"/>
                      <button type="button" 
                        className='px-4 py-2 bg-blue-400 text-white rounded'>削除
                      </button>
            </div>
          </div>
          ))}

          <div className='flex justify-between mx-6'>
            <button type="button" className='ml-32 mt-4 px-4 py-2 bg-orange-400 text-white rounded'
            onClick={adddetails}>詳細追加
            </button>
            <button type="button" className='mt-4 px-4 py-2 bg-red-500 text-white rounded'
            onClick={closeDetail}>閉じる
            </button>
          </div>


        </form>

        
      </div>
    );
  }
  
  export default Detailsform;
  