// src/components/tools/text-comparator.tsx

"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export function TextComparator() {
  const router = useRouter();

  // 텍스트 상태를 빈 문자열로 초기화합니다.
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  // 컴포넌트가 브라우저에 마운트된 후에 localStorage에서 값을 불러옵니다.
  useEffect(() => {
    const storedText1 = localStorage.getItem('text1');
    const storedText2 = localStorage.getItem('text2');

    if (storedText1) {
      setText1(storedText1);
    }
    if (storedText2) {
      setText2(storedText2);
    }
  }, []); // 마운트 시 한 번만 실행되도록 빈 배열을 전달합니다.

  // 텍스트가 변경될 때마다 localStorage에 저장합니다.
  useEffect(() => {
    localStorage.setItem('text1', text1);
  }, [text1]);

  useEffect(() => {
    localStorage.setItem('text2', text2);
  }, [text2]);
  
  const handleCompareClick = () => {
    if (!text1.trim() || !text2.trim()) {
      alert("비교할 텍스트를 입력해주세요.");
      return;
    }
    router.push('/tools/text/text-comparator/results');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">글자 비교</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-6">
        <Textarea
          placeholder="첫 번째 텍스트를 입력하세요."
          className="h-[600px] md:w-1/2"
          value={text1}
          onChange={(e) => setText1(e.target.value)}
        />
        <Textarea
          placeholder="두 번째 텍스트를 입력하세요."
          className="h-[600px] md:w-1/2"
          value={text2}
          onChange={(e) => setText2(e.target.value)}
        />
      </CardContent>
      <div className="flex justify-center p-6">
        <Button size="lg" onClick={handleCompareClick}>
          비교하기
        </Button>
      </div>
    </Card>
  );
}