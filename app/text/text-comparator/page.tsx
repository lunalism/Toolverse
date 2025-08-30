'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import * as diff from 'diff-match-patch';

// Helper 함수: 라이브러리를 사용해 두 줄의 차이점을 분석하고 강조
const highlightDifferences = (text1: string, text2: string) => {
  const dmp = new diff.diff_match_patch();
  const diffs = dmp.diff_main(text1, text2);
  dmp.diff_cleanupSemantic(diffs);

  const originalWords: React.ReactNode[] = [];
  const changedWords: React.ReactNode[] = [];

  diffs.forEach(part => {
    const type = part[0]; // -1: 삭제, 0: 동일, 1: 추가
    const value = part[1];

    if (type === diff.DIFF_DELETE) { // 원본에만 있는 내용 (삭제)
      originalWords.push(
        <span key={`del-${Math.random()}`} className="font-bold text-red-600 dark:text-red-400">
          {value}
        </span>
      );
    } else if (type === diff.DIFF_INSERT) { // 변경본에만 있는 내용 (추가)
      changedWords.push(
        <span key={`add-${Math.random()}`} className="font-bold text-blue-600 dark:text-blue-400">
          {value}
        </span>
      );
    } else { // 동일한 내용
      originalWords.push(
        <span key={`same1-${Math.random()}`}>{value}</span>
      );
      changedWords.push(
        <span key={`same2-${Math.random()}`}>{value}</span>
      );
    }
  });

  return { original: originalWords, changed: changedWords };
};

const TextComparatorPage = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [result, setResult] = useState<{ original: React.ReactNode, changed: React.ReactNode } | null>(null);

  const compareTexts = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLength = Math.max(lines1.length, lines2.length);

    const originalOutput: React.ReactNode[] = [];
    const changedOutput: React.ReactNode[] = [];

    for (let i = 0; i < maxLength; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';

      const comparisonResult = highlightDifferences(line1, line2);

      originalOutput.push(
        <div key={`orig-${i}`} className="my-1 p-2 border-l-2 border-red-300 dark:border-red-700">
          <p className="text-gray-900 dark:text-white inline">{comparisonResult.original}</p>
        </div>
      );
      changedOutput.push(
        <div key={`changed-${i}`} className="my-1 p-2 border-l-2 border-blue-300 dark:border-blue-700">
          <p className="text-gray-900 dark:text-white inline">{comparisonResult.changed}</p>
        </div>
      );
    }

    setResult({ original: originalOutput, changed: changedOutput });
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">텍스트 비교 도구</h1>
      
      {/* 입력 영역 */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">원본 텍스트</h2>
          <textarea
            className="flex-grow w-full h-64 p-4 text-lg border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="첫 번째 텍스트를 입력하세요..."
            value={text1}
            onChange={(e) => setText1(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">비교할 텍스트</h2>
          <textarea
            className="flex-grow w-full h-64 p-4 text-lg border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="두 번째 텍스트를 입력하세요..."
            value={text2}
            onChange={(e) => setText2(e.target.value)}
          />
        </div>
      </div>
      
      {/* 비교 버튼 */}
      <div className="flex justify-center mt-8">
        <Button onClick={compareTexts}>비교하기</Button>
      </div>

      {/* 결과 영역 */}
      {result && (
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">비교 결과</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
              <span className="font-bold text-red-600 dark:text-red-400">원본</span>
              {result.original}
            </div>
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
              <span className="font-bold text-blue-600 dark:text-blue-400">변경</span>
              {result.changed}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextComparatorPage;