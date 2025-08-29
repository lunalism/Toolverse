import React from 'react';
import Link from 'next/link';
import { TOOL_CATEGORIES } from '@/constants/tool-categories';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-800">
      {/* 왼쪽: 서비스 이름 */}
      <div className="flex-1">
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Toolverse</h1>
        </Link>
      </div>

      {/* 중앙: 메뉴 */}
      <nav className="flex-1 hidden md:flex justify-center">
        <ul className="flex space-x-6">
          {/* TOOL_CATEGORIES 배열을 순회하며 메뉴 항목 생성 */}
          {TOOL_CATEGORIES.map((category) => (
            <li key={category.id}>
              {/* 클릭 시 해당 id를 가진 섹션으로 스크롤하는 링크 */}
              <Link href={`/#${category.id}`} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 오른쪽: 다크 모드 토글 (임시) */}
      <div className="flex-1 flex justify-end">
        <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-900 dark:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;