import Link from 'next/link';
import React from 'react';

interface ToolCardProps {
  // id: string; // 더 이상 id는 필요 없음
  name: string;
  description: string;
  icon: string;
  isNew?: boolean;
  path: string; // path 속성 추가
}

const ToolCard = ({ name, description, icon, isNew, path }: ToolCardProps) => {
  return (
    <Link href={path}>
      <div className="relative p-6 h-full min-h-30 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col items-center text-center">
        {isNew && (
          <span className="absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white bg-blue-500 rounded-full">
            NEW
          </span>
        )}
        <span className="text-4xl mb-4">{icon}</span>
        <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </Link>
  );
};

export default ToolCard;