'use client';
import { useEffect, useState } from 'react';

const Detailsform = ({ closeDetail, todo, index, updateTodoDetails }) => {
  const [items, setItems] = useState([{ detailtitle: '', detailcontent: '', _destroy: false }]);

  useEffect(() => {
    if (todo && todo.detail_tasks && todo.detail_tasks.length > 0) {
      setItems(todo.detail_tasks.map(detail => ({
        ...detail,
        _destroy: false, 
      })));
    }
  }, [todo]);

  const addDetails = () => {
    const newDetail = { detailtitle: '', detailcontent: '', _destroy: false };
    setItems([...items, newDetail]);
  };

  const removeDetails = (index) => {
    const newItems = [...items];
    if (newItems[index].id) {
      newItems[index]._destroy = true; 
    } else {
      newItems.splice(index, 1);
    }
    setItems(newItems);
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
    updateTodoDetails(index, items); // 入力内容を保存
    closeDetail(); // フォームを閉じる
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto flex justify-center items-center'>
      <form className="bg-white w-full max-w-lg mx-auto mt-16 border-2 border-gray-300 rounded shadow-lg px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">クエスト作成フォーム</h1>
        {items.filter(item => !item._destroy).map((item, idx) => (
          <div className='mb-4' key={idx}>
            <div className="mb-4 flex items-center">
              <label className="w-1/4 block text-gray-700 text-right mr-2">
              クエスト</label>
              <input 
                type="text" 
                name="detailtitle" 
                className="flex-grow border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={item.detailtitle}
                onChange={(e) => handleDetailTitleChange(idx, e.target.value)}
              />
            </div>
            <div className="mb-4 flex items-start">
              <label className="w-1/4 block text-gray-700 text-right mr-2 mt-1">答え</label>
              <textarea 
                name="detailcontent" 
                className="flex-grow border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={item.detailcontent}
                onChange={(e) => handleDetailContentChange(idx, e.target.value)}
              />
              <button 
                type="button" 
                className='ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'
                onClick={() => removeDetails(idx)}
              >
                削除
              </button>
            </div>
          </div>
        ))}

        <div className='flex justify-between mt-6'>
          <button 
            type="button" 
            className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            onClick={addDetails}
          >＋</button>

          <button 
            type="button" 
            className='px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500'
            onClick={handleSaveAndClose} // 「閉じる」をクリックすると内容が保存される
          >閉じる</button>
        </div>
      </form>
    </div>
  );
}

export default Detailsform;
