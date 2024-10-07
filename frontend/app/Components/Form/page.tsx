'use client';
import React, { useContext, useState } from 'react';
import Detailsform from '@/app/Components/Form/Detailtasks/page';
import { useRouter } from 'next/navigation';
import { TokenContext } from '../../context/TokenContext';
import { postData } from '../../services/fetch';

const Form = () => {
  const { accessToken } = useContext(TokenContext);

  //サブフォームの表示・非表示の変数を管理
  const [isDetailVisible, setDetailVisible] = useState(false);
  //現在選択しているTodoのidを管理
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);
  //メインフォームに記入された内容を管理1
  const [todos, setTodos] = useState([{ title: '', content: '', detail_tasks: [] }]);
  //メインフォームに記入された内容を管理2(ガイドラインのタイトル)
  const [guidelineTitle, setGuidelineTitle] = useState('');
  //メインフォームに記入された内容を管理3(ガイドラインの概要)
  const [guidelineDescription, setGuidelineDescription] = useState('');
  //画面遷移のためにuseRouterをオブジェクト化
  const router = useRouter();

  //Todosに新たにTodoを追加
  const addTodos = () => {
    setTodos([...todos, { title: '', content: '', detail_tasks: [] }]);
  };
  //Todosから対象のTodoを削除
  const removeItem = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  //Todosから対象のTodoのTitleを更新
  const handleTitleChange = (index, newTitle) => {
    const newTodos = [...todos];
    newTodos[index].title = newTitle;
    setTodos(newTodos);
  };
  //Todosから対象のTodoのcontentを更新
  const handleContentChange = (index, newContent) => {
    const newTodos = [...todos];
    newTodos[index].content = newContent;
    setTodos(newTodos);
  };

  //サブフォームの表示およびその対象のTodoのindex
  const showDetail = (index) => {
    setCurrentTodoIndex(index);
    setDetailVisible(true);
  };
  //サブフォームの非表示
  const closeDetail = () => {
    setDetailVisible(false);
    setCurrentTodoIndex(null);
  };
  //サブフォームに渡す関数(detail_tasksを更新)
  const updateTodoDetails = (index, details) => {
    const newTodos = [...todos];
    newTodos[index].detail_tasks = details;
    setTodos(newTodos);
  };

  //[登録]が押された後の動作
  const Submit = async (e) => {
    //ページの遷移を止める
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

              // バリデーションチェック: 各Todoの詳細タスクのタイトルと内容
              const hasEmptyDetails = todos.some(todo => {
                if (todo.detail_tasks.length === 0) {
                  alert("すべてのTodolistには最低一つのクエストを設定してください。");
                  return true;
                }
                return todo.detail_tasks.some(detail => !detail.detailtitle?.trim() || !detail.detailcontent?.trim());
              });
    
              if (hasEmptyDetails) {
                alert("すべてのクエストには内容と回答を入力してください。");
                return;
              }

    //ガイドラインの内容を登録するためにデータを整形
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
      //Railsのバックエンドに、フォームデータとtokenを送信する
      await postData('/guidelines/new', { guideline }, accessToken);  
      alert("投稿できました");
      router.push('/');
    } catch (error) {
      console.error('投稿に失敗しました', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className='mx-auto w-full sm:w-10/12 md:w-8/12 lg:w-8/12 xl:w-8/12 mt-6'>
      {/* isDetailVisibleがTrue及び対象のTodoが定まったいる場合、
      サブフォームを表示 */}
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
