import Link from 'next/link';
import { TOOL_CATEGORIES } from '@/constants/tool-categories';

export default function Home() {
  return (
    <section className="text-center my-16">
      <h2 className="text-5xl font-extrabold text-gray-900 mb-4 dark:text-white">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Toolverse
        </span>에 오신 것을 환영합니다!
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
        당신의 모든 작업을 위한 가장 간단하고 효율적인 온라인 도구 모음입니다.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {TOOL_CATEGORIES.map((category) => (
          <Link key={category.id} href={`/${category.id}`}>
            <div className="p-8 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 dark:text-white">{category.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">여기에 {category.name}에 대한 간단한 설명을 추가할 예정입니다.</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}