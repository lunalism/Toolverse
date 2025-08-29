import Header from '@/components/main/Header';
import Footer from '@/components/main/Footer';
import { TOOL_CATEGORIES } from '@/constants/tool-categories';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-8">
        <div className="text-center my-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 dark:text-white">
            Toolverse에 오신 것을 환영합니다!
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            당신의 모든 작업을 위한 가장 간단한 도구 모음입니다.
          </p>
        </div>

        {/* 툴 카테고리 섹션 */}
        {TOOL_CATEGORIES.map((category) => (
          <section key={category.id} id={category.id} className="my-12 py-8 border-b dark:border-gray-700">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 dark:text-white">{category.name}</h3>
            {/* 여기에 해당 카테고리의 툴 목록이 들어갈 공간입니다 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                <p className="text-gray-800 dark:text-gray-200">여기에 {category.name} 관련 툴 컴포넌트가 들어갑니다.</p>
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}