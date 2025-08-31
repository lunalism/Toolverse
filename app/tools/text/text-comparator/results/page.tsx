// src/components/tools/text-comparator/results/page.tsx

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import * as Diff from 'diff-match-patch';

export default function TextComparatorResultsPage() {
  const router = useRouter();
  const [diffResult, setDiffResult] = useState<Diff.Diff[]>([]);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  useEffect(() => {
    const storedText1 = localStorage.getItem('text1') || '';
    const storedText2 = localStorage.getItem('text2') || '';
    
    if (storedText1 && storedText2) {
      setText1(storedText1);
      setText2(storedText2);
      
      const dmp = new Diff.diff_match_patch();
      const diffs = dmp.diff_main(storedText1, storedText2);
      dmp.diff_cleanupSemantic(diffs);
      setDiffResult(diffs);
    } else {
      router.replace('/tools/text/text-comparator');
    }
  }, [router]);
  
  const handleGoBack = () => {
    router.back();
  };
  
  const handleStartOver = () => {
    // localStorage를 초기화합니다.
    localStorage.removeItem('text1');
    localStorage.removeItem('text2');
    router.push('/tools/text/text-comparator');
  };

  return (
    <div className="container py-10 max-w-5xl mx-auto">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">비교 결과</CardTitle>
          <div className="flex items-center space-x-4 text-sm font-semibold">
            <div className="flex items-center space-x-1">
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              <span>삭제됨</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>추가됨</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-mono text-base leading-relaxed">
              {diffResult.map((part, index) => {
                const text = part[1];
                const type = part[0];
                return (
                  <span key={index} className={
                    type === 1
                      ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
                      : type === -1
                      ? "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200 line-through"
                      : "text-foreground"
                  }>
                    {text}
                  </span>
                );
              })}
            </pre>
          </div>
        </CardContent>
        <div className="flex justify-center gap-4 p-6">
          <Button variant="outline" onClick={handleGoBack}>
            돌아가기
          </Button>
          <Button onClick={handleStartOver}>
            처음으로
          </Button>
        </div>
      </Card>
    </div>
  );
}