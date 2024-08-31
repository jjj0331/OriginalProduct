'use client';
import React, { useContext, useState } from 'react';
import Detailsform from '@/app/Components/Form/Detailtasks/page';
import { useRouter } from 'next/navigation';
import { TokenContext } from '../../context/TokenContext';
import { postData } from '../../services/fetch';

const Form = () => {
  const { accessToken } = useContext(TokenContext);
  const [isDetailVisible, setDetailVisible] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);
  const [todos, setTodos] = useState([{ title: '', content: '', detail_tasks: [] }]);
  const [guidelineTitle, setGuidelineTitle] = useState('');
  const [guidelineDescription, setGuidelineDescription] = useState('');
  const router = useRouter();

  const addTodos = () => {
    setTodos([...todos, { title: '', content: '', detail_tasks: [] }]);
  };

  const removeItem = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const showDetail = (index) => {
    setCurrentTodoIndex(index);
    setDetailVisible(true);
  };

  const closeDetail = () => {
    setDetailVisible(false);
    setCurrentTodoIndex(null);
  };

  const handleTitleChange = (index, newTitle) => {
    const newTodos = [...todos];
    newTodos[index].title = newTitle;
    setTodos(newTodos);
  };

  const handleContentChange = (index, newContent) => {
    const newTodos = [...todos];
    newTodos[index].content = newContent;
    setTodos(newTodos);
  };

  const updateTodoDetails = (index, details) => {
    const newTodos = [...todos];
    newTodos[index].detail_tasks = details;
    setTodos(newTodos);
  };

  const Submit = async (e) => {
    e.preventDefault();

    // バリデーションチェック
    if (!guidelineTitle.trim()) {
      alert("ガイドラインのタイトルを入力してください。");
      return;
    }

    if (!guidelineDescription.trim()) {
      alert("ガイドラインの概要を入力してください。");
      return;
    }

    if (todos.some(todo => !todo.title.trim())) {
      alert("すべてのTodolistにタイトルを入力してください。");
      return;
    }

    try {
      const guideline = {
        title: guidelineTitle,
        description: guidelineDescription,
        tasks_attributes: todos.map(todo => ({
          title: todo.title,
          description: todo.content,
          detail_tasks_attributes: todo.detail_tasks.map(detail => ({
            title: detail.detailtitle,
            description: detail.detailcontent,
          }))
        }))
      };

      await postData('/guidelines/new', { guideline }, accessToken);  
      alert("投稿できました");
      router.push('/');
    } catch (error) {
      console.error('投稿に失敗しました', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className='mx-auto w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mt-6'>
      {isDetailVisible && currentTodoIndex !== null ? (
        <Detailsform
          closeDetail={closeDetail}
          todo={todos[currentTodoIndex]}
          index={currentTodoIndex}
          updateTodoDetails={updateTodoDetails}
        />
      ) : (
        <form onSubmit={Submit}>
          <div id="open">
            <div className='w-full'>
              <label className='mt-4 font-bold mr-4'>タイトル</label>
              <input 
                type="text" 
                className="w-full border px-4 py-2"
                value={guidelineTitle}
                onChange={(e) => setGuidelineTitle(e.target.value)}
              />
            </div>

            <div className='w-full mt-4'>
              <label className='mt-4 font-bold mr-4'>概要</label>
              <input 
                type="text" 
                className="w-full border px-4 py-2"
                value={guidelineDescription}
                onChange={(e) => setGuidelineDescription(e.target.value)}
              />
            </div>

            <div className='w-full mt-4'>
              <label className='mt-4 font-bold mr-4'>タスク</label>
              {todos.map((todo, index) => (
                <div className="w-full" id="target" key={index}>
                  <div className="flex items-center gap-2 mb-2 mt-1">
                    <input 
                      type="text" 
                      className="flex-grow border py-2 rounded-lg"
                      value={todo.title}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                    />
                    <button 
                      type="button" 
                      onClick={() => showDetail(index)} 
                      className='flex-shrink-0 px-2 py-2 border-2 rounded-lg bg-blue-700 text-white font-bold'
                    >
                      詳細
                    </button>
                    <button 
                      type="button" 
                      onClick={() => removeItem(index)} 
                      className='flex-shrink-0 px-2 py-2 border-2 rounded-lg bg-red-700 text-white font-bold'
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              type="button" 
              onClick={addTodos} 
              className='mt-1 font-bold px-2 py-2 rounded-md bg-blue-700 text-white'
            >
              ＋
            </button>
          </div>

          {/* 登録ボタンをフォームの最後に配置 */}
          <div className='flex justify-center mt-6'>
            <button 
              type="submit" 
              className='px-6 py-3 border-2 rounded-lg bg-green-600 text-white font-bold'
            >
              登録
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Form;
