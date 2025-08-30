import Link from 'next/link';
import { TOOL_CATEGORIES } from '@/constants/tool-categories';
import { TOOLS } from '@/constants/tools';
import ToolCard from '@/components/main/ToolCard'; // 경로 확인해줘!

export default function Home() {
  // isNew가 true인 툴을 먼저 가져와
  const newTools = TOOLS.filter(tool => tool.isNew);
  // isNew가 false인 툴을 가져와
  const otherTools = TOOLS.filter(tool => !tool.isNew);

  // newTools를 먼저 배치하고, 그 다음에 otherTools를 배치
  // 그리고 총 6개까지만 보이도록 잘라내기
  const visibleTools = [...newTools, ...otherTools].slice(0, 6);

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
        {visibleTools.map((tool) => (
          <ToolCard
            key={tool.id}
            id={tool.id}
            name={tool.name}
            description={tool.description}
            icon={tool.icon}
            isNew={tool.isNew} // isNew props를 제대로 넘겨줘야 해!
          />
        ))}
      </div>
    </section>
  );
}