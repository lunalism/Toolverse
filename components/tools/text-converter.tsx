// src/components/tools/text-converter.tsx

"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner"; // Sonner 라이브러리 import

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

    // 문장의 첫 글자를 대문자로 변환하는 함수 (수정된 로직)
    const handleSentenceCase = () => {
        let sentenceCaseText = text.toLowerCase();
        
        // 텍스트의 첫 글자, 줄바꿈 뒤의 글자, 그리고 .?! 뒤의 글자를 모두 대문자로 바꿉니다.
        sentenceCaseText = sentenceCaseText.replace(/(^|\n|[.?!]\s+)(\w)/g, (match, p1, p2) => {
            return p1 + p2.toUpperCase();
        });
        
        setText(sentenceCaseText);
    };
    
    // 단어의 첫 글자를 대문자로 변환하는 함수
    const handleTitleCase = () => {
        const titleCaseText = text.toLowerCase().split(' ').map(word => {
        if (word.length > 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
        }).join(' ');
        setText(titleCaseText);
    };
    
    // 마크다운 형식으로 변환하는 함수
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
    
    // 텍스트를 클립보드에 복사하는 함수
    const handleCopy = () => {
        if (!text) {
            toast("복사 오류", {
                description: "복사할 텍스트가 없습니다.",
                duration: 3000,
                position: 'top-center'
            });
            return;
        }
        
        navigator.clipboard.writeText(text)
        .then(() => {
            toast("복사 완료!", {
                description: "클립보드에 텍스트가 복사되었습니다.",
                duration: 3000,
                position: 'top-center'
            });
        });
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
                        className="h-[600px]"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div className="flex flex-wrap gap-2">
                        <Button onClick={handleUppercase}>대문자로</Button>
                        <Button onClick={handleLowercase}>소문자로</Button>
                        <Button onClick={handleSentenceCase}>문장 첫 글자 대문자로</Button>
                        <Button onClick={handleTitleCase}>단어 첫 글자 대문자로</Button>
                        <Button onClick={handleMarkdown}>마크다운으로</Button>
                        <Button variant="outline" onClick={handleRemoveSpaces}>공백 제거</Button>
                        <Button variant="outline" onClick={handleRemoveNewlines}>줄바꿈 제거</Button>
                        <Button variant="outline" onClick={handleCopy}>복사하기</Button>
                        <Button variant="secondary" onClick={handleClearText}>텍스트 지우기</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}