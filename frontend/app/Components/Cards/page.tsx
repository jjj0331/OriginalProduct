import React from 'react'
import Link from 'next/link';

const Card = ({ data }) => {
  const { description, title } = data;

  return (
    <div className="flex flex-grow h-full">
      <div className="relative w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"> 
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
        <Link href={`/guidelines/${data.id}/edit`} className="absolute bottom-2 right-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
          Read more →
        </Link>
      </div>
    </div>
  );
}

export default Card;
