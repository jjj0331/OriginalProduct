import React, { useState } from 'react';

const TaskCarousel = ({
  datas,
  selectedTask,
  setSelectedTask,
  setSelectedDetailTask,
  setChatHistory,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!datas.tasks || datas.tasks.length === 0) {
    return <p className="text-blue-700">タスクが見つかりません。</p>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === datas.tasks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? datas.tasks.length - 1 : prevIndex - 1
    );
  };

  const currentTask = datas.tasks[currentIndex];

  return (
    <div className="flex-grow w-1/5 p-3 border-black border-r-4">
        <h1 className="text-xl mb-6 text-black">
          学習内容: {datas.guideline_title}
        </h1>

        {datas.tasks && datas.tasks.length > 0 ? (
          datas.tasks.map((task, index) => (
            <div key={index} className="mb-4">
              <button 
                onClick={() => {
                  setSelectedTask(task);
                  setSelectedDetailTask(null);
                  setChatHistory([]);
                }}
                className="block hover:underline p-2 rounded-lg bg-blue-200 hover:bg-blue-300 text-blue-800 transition-all">
                {index + 1}: {task.task_title}
              </button>

              {selectedTask?.task_id === task.task_id && task.detail_tasks && (
                <div className="pl-4 mt-2">
                  {task.detail_tasks.map((detail_task, detailIndex) => (
                    <button 
                      key={detailIndex}
                      onClick={() => {
                        setSelectedDetailTask(detail_task);
                        setChatHistory([]);
                      }}
                      className={`block p-2 mt-1 rounded-lg transition-all 
                        ${detail_task.status ? 'bg-gray-400 text-gray-700' : 'bg-white text-blue-600 border border-blue-400'} 
                        ${selectedDetailTask?.detail_task_id === detail_task.detail_task_id ? 'font-bold bg-blue-300' : ''}`}>
                      - {detail_task.detail_task_title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-blue-700">タスクが見つかりません。</p>
        )}
      </div>
  );
};

export default TaskCarousel;
