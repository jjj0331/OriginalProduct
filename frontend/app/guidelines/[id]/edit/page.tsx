'use client';
import Detailsform from '@/app/Components/Form/Detailtasks/page';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TokenContext } from '../../../context/TokenContext';
import { useParams } from 'next/navigation';
import { fetchData, postData,deleteData  } from '@/app/services/fetch';
import Link from 'next/link';

const Form = () => {
  const { accessToken } = useContext(TokenContext);
  const { id } = useParams();

  const [isDetailVisible, setDetailVisible] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);
  const [todos, setTodos] = useState([]);
  const [guidelineTitle, setGuidelineTitle] = useState('');
  const [guidelineDescription, setGuidelineDescription] = useState('');
  const router = useRouter();
  

  const addTodos = () => {
    const newTodo = { title: '', content: '', detail_tasks: [], _destroy: false };
    setTodos([...todos, newTodo]);
  };

  const removeItem = (index) => {
    const newTodos = [...todos];
    if (newTodos[index].id) {
      newTodos[index]._destroy = true; // Mark the item for deletion
    } else {
      newTodos.splice(index, 1); // Remove the item if it doesn't have an ID (new item not yet saved)
    }
    setTodos(newTodos);
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

  const Submit = async (e: React.FormEvent<HTMLFormElement>) => {
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
          id: todo.id, // Include ID for existing items
          title: todo.title,
          description: todo.content,
          _destroy: todo._destroy, // Include _destroy flag
          detail_tasks_attributes: todo.detail_tasks.map(detail => ({
            id: detail.id, // Include ID for existing items
            title: detail.detailtitle,
            description: detail.detailcontent,
            _destroy: detail._destroy // Include _destroy flag
          }))
        }))
      };

      const response = await postData(`/guidelines/${id}/edit`,  guideline , accessToken);
      alert("更新できました");
      router.push('/');

    } catch (error) {
      console.error('投稿に失敗しました', error);
    }
  };

  useEffect(() => {
    const catchdatas = async () => {
      try {
        const guidelineData = await fetchData(`/guidelines/${id}`, {},accessToken);
        setGuidelineTitle(guidelineData.title);
        setGuidelineDescription(guidelineData.description);
        setTodos(guidelineData.tasks.map(task => ({
          id: task.id,
          title: task.title,
          content: task.description,
          _destroy: false, // Initialize _destroy flag
          detail_tasks: task.detail_tasks.map(detail => ({
            id: detail.id,
            detailtitle: detail.title,
            detailcontent: detail.description,
            _destroy: false // Initialize _destroy flag
          }))
        })));
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    };

    catchdatas();
  }, [id]);

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (window.confirm("本当にこのガイドラインを削除しますか？")) {
      try {
        const response = await deleteData(`/guidelines/${id}`, accessToken);
        console.log('Delete response:', response);  // 追加してレスポンスを確認
        if (response.status === 200 || response.message === "Guideline successfully deleted") {  // ステータスコードか、成功メッセージを確認
          alert("ガイドラインが正常に削除されました");
          router.push('/');
        } else {
          alert("ガイドラインの削除に失敗しました");
        }
      } catch (error) {
        console.error('データの削除に失敗しました', error);
        alert("ガイドラインの削除中にエラーが発生しました");
      }
    }
  };

  return (
    <div className='mx-auto w-10/12 mt-6'>
  {isDetailVisible && currentTodoIndex !== null ? (
    <Detailsform
      closeDetail={closeDetail}
      todo={todos[currentTodoIndex]}
      index={currentTodoIndex}
      updateTodoDetails={updateTodoDetails}
    />
  ) : (

    <form onSubmit={Submit}>
    <Link href="/mypage" className='my-8 block mb-8 text-blue-400 font-bold text-xl'>
      ←戻る
    </Link>
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
          {todos.filter(todo => !todo._destroy).map((todo, index) => (
            <div className="w-full" id="target" key={index}>
              <div className="flex items-center gap-1 mb-2 mt-1">
                <i>{index + 1}</i>
                <input 
                  type="text" 
                  className="flex-grow border py-2 rounded-lg"
                  value={todo.title}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={() => showDetail(index)} 
                  className='px-2 py-2 border-2 rounded-lg bg-blue-700 text-white font-bold'
                >
                  詳細
                </button>
                <button 
                  type="button" 
                  onClick={() => removeItem(index)} 
                  className='px-2 py-2 border-2 rounded-lg bg-red-700 text-white font-bold'
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
          追加
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
        <button type="button" onClick={handleDelete} className='px-4 py-2 bg-red-500 border rounded-lg text-white'>
        削除
      </button>
      </div>
    </form>
  )}
</div>

  );
}

export default Form;
