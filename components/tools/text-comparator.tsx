// src/components/tools/text-comparator.tsx

"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'; // <-- useRouter import

export function TextComparator() {
  const router = useRouter(); // <-- 라우터 훅 초기화
  
  // 텍스트 상태 관리
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  // 페이지 로딩 시 localStorage의 이전 값들을 제거하여 초기 상태를 보장합니다.
  useEffect(() => {
    localStorage.removeItem('text1');
    localStorage.removeItem('text2');
  }, []);

  // '비교하기' 버튼 클릭 핸들러
  const handleCompareClick = () => {
    // 텍스트가 모두 비어있으면 동작하지 않습니다.
    if (!text1.trim() || !text2.trim()) {
      alert("비교할 텍스트를 입력해주세요.");
      return;
    }
    
    // localStorage에 텍스트를 저장합니다.
    localStorage.setItem('text1', text1);
    localStorage.setItem('text2', text2);
    
    // 결과 페이지로 이동합니다.
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

      {/* 비교 결과 영역은 새로운 페이지에서 보여줄 것이므로 제거합니다. */}
    </Card>
  );
}