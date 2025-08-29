import { TOOL_CATEGORIES } from '@/constants/tool-categories';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const currentCategory = TOOL_CATEGORIES.find(
    (category) => category.id === params.category
  );

  if (!currentCategory) {
    // 404 페이지를 보여줄 수도 있습니다.
    return <div>해당 카테고리가 없습니다.</div>;
  }

  return (
    <div className="text-center my-16">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        {currentCategory.name}
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        여기에 {currentCategory.name}에 속한 툴들이 표시될 예정입니다.
      </p>
    </div>
  );
}