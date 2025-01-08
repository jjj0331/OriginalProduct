import React from 'react';

const ChatArea = ({
  selectedDetailTask,
  chatHistory,
  setChatHistory,
  inputText,
  setInputText,
  handleCompleteTask,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ChatGPT APIとの通信処理など（省略可能）
  };

  return (
    <div className="flex flex-col w-4/5 min-h-screen p-6 relative">
      {selectedDetailTask ? (
        <>
          <div className="py-4 flex-grow overflow-y-auto">
            <h1 className="border-b-2 border-black text-2xl text-black">
              Quest:
              <i className="font-bold text-blue-600 px-4">{selectedDetailTask.detail_task_title}</i>
            </h1>
            <div className="mb-4 mt-6">
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg mb-4 ${
                    message.role === 'user' ? 'text-right bg-blue-100' : 'text-left bg-gray-100'
                  }`}
                >
                  <span className="block">{message.content}</span>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="fixed bottom-0 right-0 w-4/5 mb-2 px-12 border-blue-300 flex items-center"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="ここに入力してください"
              className="flex-grow p-2 border-2 border-blue-300 rounded-lg"
            />
            <button type="submit" className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
              送信
            </button>
            <button
              type="button"
              className="ml-1 p-3 bg-gray-300 border rounded-lg border-black"
              onClick={() => handleCompleteTask(selectedDetailTask.detail_task_id)}
            >
              完了
            </button>
          </form>
        </>
      ) : (
        <p className="text-blue-700 mt-2">タスクまたは詳細タスクを選択してください。</p>
      )}
    </div>
  );
};

export default ChatArea;
