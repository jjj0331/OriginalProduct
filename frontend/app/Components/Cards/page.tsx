import React from 'react'
import Link from 'next/link';

const Card = ({ data ,flg}) => {//引数にdata,flgを受け取る
  //ガイドラインの概要とタイトルを受け取る
  const { description, title } = data;

  return (
    <div className="flex flex-grow h-48">
      <div className="relative w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"> 
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden text-ellipsis whitespace-nowrap">
          {title.length > 15 ? `${title.slice(0, 12)}...` : title}
        </h5>

        <p className="mt-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
        {description.slice(0, 16)}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
          {description.length > 16 ? `${description.slice(16)}` : ''}
        </p>
        
        {/* flgの内容でLink先が変更 */}
        {flg === 1 ? (
          <Link href={`/guidelines/${data.id}`} className="absolute bottom-2 right-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
            詳細を見る →
          </Link>
        ) : flg === 2 ? (
          <Link href={`/study/${data.id}`} className="absolute bottom-2 right-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
            学習する →
          </Link>
        ) : flg === 3 ? (
          <Link href={`/guidelines/${data.id}/edit`} className="absolute bottom-2 right-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
            編集する →
          </Link>
        ) : null}  
      </div>
    </div>
  );
}

export default Card;
