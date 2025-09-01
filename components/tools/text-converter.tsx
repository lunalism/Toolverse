// src/components/tools/text-converter.tsx

"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function TextConverter() {
  const [text, setText] = useState('');

  // 텍스트를 대문자로 변환하는 함수
  const handleUppercase = () => {
    setText(text.toUpperCase());
  };

  // 텍스트를 소문자로 변환하는 함수
  const handleLowercase = () => {
    setText(text.toLowerCase());
  };
  
  // 마크다운 형식으로 변환하는 함수 (예시: 제목 추가)
  const handleMarkdown = () => {
    const markdownText = `# ${text}\n\n이것은 변환된 마크다운 텍스트입니다.`;
    setText(markdownText);
  };

  // 공백을 제거하는 함수
  const handleRemoveSpaces = () => {
    setText(text.replace(/\s/g, ''));
  };

  // 줄바꿈을 제거하는 함수
  const handleRemoveNewlines = () => {
    setText(text.replace(/\n/g, ' '));
  };
  
  // 텍스트를 지우는 함수
  const handleClearText = () => {
    setText('');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">텍스트 변환기</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Textarea
            placeholder="변환할 텍스트를 입력하세요."
            className="h-[400px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleUppercase}>대문자로</Button>
            <Button onClick={handleLowercase}>소문자로</Button>
            <Button onClick={handleMarkdown}>마크다운으로</Button>
            <Button variant="outline" onClick={handleRemoveSpaces}>공백 제거</Button>
            <Button variant="outline" onClick={handleRemoveNewlines}>줄바꿈 제거</Button>
            <Button variant="secondary" onClick={handleClearText}>텍스트 지우기</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}