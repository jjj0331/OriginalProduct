'use client';
import Detailsform from '@/app/Components/Form/Detailtasks/page';
import { useState } from 'react';

const Form = () => {
  const [isDetailVisible, setDetailVisible] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);
  const [todos, setTodos] = useState([{ title: '', content: '' }]);

  const showDetail = (index) => {
    setCurrentTodoIndex(index);
    setDetailVisible(true);
  };

  const closeDetail = () => {
    setDetailVisible(false);
    setCurrentTodoIndex(null);
  };

  const addTodos = () => {
    const newTodo = { title: '', content: '' };
    setTodos([...todos, newTodo]);
  };

  const updateTodoDetails = (index, detailTitle, detailContent) => {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], title: detailTitle, content: detailContent };
    setTodos(newTodos);
  };

  return (
    <div className='mx-auto w-6/12 mt-6'>
      {isDetailVisible && currentTodoIndex !== null ? (
        <Detailsform
          closeDetail={closeDetail}
          todo={todos[currentTodoIndex]}
          index={currentTodoIndex}
          updateTodoDetails={updateTodoDetails}
        />
      ) : (
        <div id="open">
          <div className='w-full'>
            <label className='mt-4 font-bold mr-4'>タイトル</label>
            <input type="text" className="w-full border px-4 py-2" />
          </div>

          <div className='w-full mt-4'>
            <label className='mt-4 font-bold mr-4'>概要</label>
            <input type="text" className="w-full border px-4 py-2" />
          </div>

          <div className='w-full mt-4'>
            <label className='mt-4 font-bold mr-4'>Todolist</label>
            {todos.map((todo, index) => (
              <div className="w-full" id="target" key={index}>
                <div className="w-full flex items-center mb-2 mt-2">
                  <input type="text" className="w-11/12 border py-2" value={todo.title} readOnly />
                  <button onClick={() => showDetail(index)} className='w-1/12 py-2 bg-slate-300 font-bold'>
                    詳細
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button onClick={addTodos} className='mt-1 font-bold px-2 py-1 rounded-md bg-blue-700 text-white'>
            追加
          </button>

          <div className='w-full mt-4'>
            <label className='mt-4 font-bold mr-4'>補足</label>
            <input type="text" className="w-full border px-4 py-4" />
          </div>

          <button className='px-4 py-2 border-2 rounded-lg bg-blue-700 text-white font-bold mt-1'>
            登録
          </button>
        </div>
      )}
    </div>
  );
}

export default Form;
