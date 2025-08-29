import Link from 'next/link';
import React from 'react';

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const ToolCard = ({ id, name, description, icon }: ToolCardProps) => {
  return (
    <Link href={`/${id}`}>
      <div className="p-6 h-full min-h-30 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col items-center text-center">
        {/* 이모티콘 추가 */}
        <span className="text-4xl mb-4">{icon}</span>
        <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </Link>
  );
};

export default ToolCard;