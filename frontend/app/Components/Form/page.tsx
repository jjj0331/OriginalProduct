'use client';
import Detailsform from '@/app/Components/Form/Detailtasks/page';
import { useContext, useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { TokenContext } from '../../context/TokenContext';
const Form = () => {
 
  const { accessToken } = useContext(TokenContext);
  console.log(accessToken);
  const [isDetailVisible, setDetailVisible] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);
  const [todos, setTodos] = useState([{ title: '', content: '', detail_tasks: [] }]);
  const [guidelineTitle, setGuidelineTitle] = useState('');
  const [guidelineDescription, setGuidelineDescription] = useState('');
  

  const router = useRouter();
  
  const addTodos = () => {
    const newTodo = { title: '', content: '', detail_tasks: [] };
    setTodos([...todos, newTodo]);
  };
  
  const removeItem = (index) => {
    const newTodos = todos.filter((todo, i) => i !== index);
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
    console.log(todos);
  };

  const Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

      const response = await axios.post('http://127.0.0.1:3001/guidelines/new', 
        { guideline },
        {headers: {'Authorization': `${accessToken}`}} 
      );
      alert("投稿できました");
      router.push('/');

    } catch (error) {
      console.error('投稿に失敗しました', error);
    }
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
              <label className='mt-4 font-bold mr-4'>Todolist</label>

              {todos.map((todo, index) => (
                <div className="w-full" id="target" key={index}>
                  <div className="flex items-center gap-1 mb-2 mt-1">
                    <i>{index}</i>
                    <input 
                      type="text" 
                      className="w-10/12 border py-2 rounded-lg"
                      value={todo.title}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                    />
                    <button onClick={() => showDetail(index)} className='px-2 py-2 border-2 rounded-lg bg-blue-700 text-white font-bold'>
                      詳細
                    </button>
                    <button onClick={() => removeItem(index)} className='px-2 py-2 border-2 rounded-lg bg-red-700 text-white font-bold'>
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={addTodos} type="button" className='mt-1 font-bold px-2 py-2 rounded-md bg-blue-700 text-white'>
              追加
            </button>

            <button type="submit" className='px-2 py-2 border-2 rounded-lg bg-blue-700 text-white font-bold mt-1'>
              登録
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Form;