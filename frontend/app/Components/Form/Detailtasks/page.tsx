'use client';
import { useEffect, useState } from 'react';

const Detailsform = ({ closeDetail, todo, index, updateTodoDetails }) => {
  const [items, setItems] = useState([{ detailtitle: '', detailcontent: '' }]);

  useEffect(() => {
    if (todo && todo.detail_tasks) {
      setItems(todo.detail_tasks);
    }
  }, [todo]);

  const addDetails = () => {
    const newDetail = { detailtitle: '', detailcontent: '' };
    setItems([...items, newDetail]);
  };

  const removeDetails = (index) => {
    const newDetails = items.filter((item, i) => i !== index);
    setItems(newDetails);
  };

  const handleDetailTitleChange = (index, newTitle) => {
    const newItems = [...items];
    newItems[index].detailtitle = newTitle;
    setItems(newItems);
  };

  const handleDetailContentChange = (index, newContent) => {
    const newItems = [...items];
    newItems[index].detailcontent = newContent;
    setItems(newItems);
  };

  const handleSaveAndClose = () => {
    updateTodoDetails(index, items);
    closeDetail();
  };

  return (
    <div className='fixed inset-0 bg-main_color overflow-y-auto'>
      <form className="w-2/3 mx-auto mt-16 border-2 border-black rounded shadow-lg px-4 py-4">
        <h1>詳細作成フォーム</h1>
        {items.map((item, idx) => (
          <div className='border border-red-700' key={idx}>
            <div className="mb-4 flex justify-center w-full space-x-2 items-center">
              <label className="w-1/6 block text-gray-700 text-right">詳細タイトル</label>
              <input 
                type="text" 
                name="detailtitle" 
                className="w-3/4 border px-4 py-2"
                value={item.detailtitle}
                onChange={(e) => handleDetailTitleChange(idx, e.target.value)}
              />
            </div>
            <div className="mb-4 flex justify-center w-full space-x-2 items-center">
              <label className="w-1/6 block text-gray-700 text-right">詳細内容</label>
              <textarea 
                name="detailcontent" 
                className="w-3/4 border px-4 py-2"
                value={item.detailcontent}
                onChange={(e) => handleDetailContentChange(idx, e.target.value)}
              />
              <button 
                type="button" 
                className='px-4 py-2 bg-blue-400 text-white rounded' 
                onClick={() => removeDetails(idx)}
              >
                削除
              </button>
            </div>
          </div>
        ))}

        <div className='flex justify-between mx-6'>
          <button 
            type="button" 
            className='ml-32 mt-4 px-4 py-2 bg-orange-400 text-white rounded'
            onClick={addDetails}
          >
            詳細追加
          </button>
          <button 
            type="button" 
            className='mt-4 px-4 py-2 bg-blue-700 text-white rounded'
            onClick={handleSaveAndClose}
          >
            保存
          </button>
          <button 
            type="button" 
            className='mt-4 px-4 py-2 bg-red-500 text-white rounded'
            onClick={closeDetail}
          >
            閉じる
          </button>
        </div>
      </form>
    </div>
  );
}

export default Detailsform;
