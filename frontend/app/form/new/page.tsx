'use client';

import { useEffect, useState } from 'react';

const Form = () => {
  const [isDetailVisible, setDetailVisible] = useState(false);
  const [details, setDetails] = useState({ title: '', content: '' });
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  function addlist() {
    const newItem = {
      todo: '',
      details: { title: '', content: '' }
    };
    setItems([...items, newItem]);
  }

  function showlist(index) {
    setCurrentIndex(index);
    setDetails(items[index].details);
    setDetailVisible(true);
  }

  function closelist() {
    const updatedItems = items.map((item, index) => (
      index === currentIndex
        ? { ...item, details: details }
        : item
    ));
    setItems(updatedItems);
    setDetailVisible(false);
  }

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleTodoChange = (index, value) => {
    const updatedItems = items.map((item, i) => (
      i === index
        ? { ...item, todo: value }
        : item
    ));
    setItems(updatedItems);
  };

  return (
    <div className='mx-auto w-6/12 mt-6'>
      {isDetailVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h1 className="text-xl font-bold mb-4">詳細</h1>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">詳細タイトル</label>
                <input
                  type="text"
                  name="title"
                  value={details.title}
                  onChange={handleDetailChange}
                  className="w-full border px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">詳細内容</label>
                <textarea
                  name="content"
                  value={details.content}
                  onChange={handleDetailChange}
                  className="w-full border px-4 py-2"
                  rows="4"
                ></textarea>
              </div>
              <button type="button" onClick={closelist} className='mt-4 px-4 py-2 bg-red-500 text-white rounded'>
                閉じる
              </button>
            </form>
          </div>
        </div>
      )}
      <div id="open" className={isDetailVisible ? 'pointer-events-none' : ''}>
        <div className='w-full'>
          <label className='mt-4 font-bold mr-4'>タイトル</label>
          <input
            type="text"
            className="w-full border px-4 py-2"
          />
        </div>

        <div className='w-full mt-4'>
          <label className='mt-4 font-bold mr-4'>概要</label>
          <input
            type="text"
            className="w-full border px-4 py-2"
          />
        </div>

        <div className='w-full mt-4'>
          <label className='mt-4 font-bold mr-4'>Todolist</label>

          <div className="w-full" id="target">
            {items.map((item, index) => (
              <div key={index} className="w-full flex items-center mb-2 mt-2">
                <input
                  type="text"
                  className="w-11/12 border py-2"
                  value={item.todo}
                  onChange={(e) => handleTodoChange(index, e.target.value)}
                />
                <button
                  className='w-1/12 py-2 bg-slate-300 font-bold'
                  onClick={() => showlist(index)}
                >
                  詳細
                </button>
              </div>
            ))}
          </div>

          <button className='mt-1 font-bold px-2 py-1 rounded-md bg-blue-700 text-white' onClick={addlist}>
            追加
          </button>
        </div>

        <div className='w-full mt-4'>
          <label className='mt-4 font-bold mr-4'>補足</label>
          <input
            type="text"
            className="w-full border px-4 py-4"
          />
        </div>

        <button className='px-4 py-2 border-2 rounded-lg bg-blue-700 text-white font-bold mt-1'>
          登録
        </button>
      </div>
    </div>
  )
}

export default Form;
