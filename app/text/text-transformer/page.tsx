'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Shadcn UI Button 컴포넌트

const TextTransformerPage = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');

    // 모두 대문자로
    const toUpperCase = () => {
        setOutputText(inputText.toUpperCase());
    };

    // 모두 소문자로
    const toLowerCase = () => {
        setOutputText(inputText.toLowerCase());
    };

    // 문장 첫 글자만 대문자로 (센텐스 케이스)
    const toSentenceCase = () => {
        if (!inputText.trim()) {
          setOutputText('');
          return;
        }
      
        // 1. 전체 텍스트를 소문자로 변환
        let transformedText = inputText.toLowerCase();
      
        // 2. 문장의 첫 글자를 대문자로 변경 (정규식 사용)
        // 마침표, 물음표, 느낌표, 또는 줄바꿈 문자 뒤에 오는 첫 번째 글자(\p{L})를 찾음
        transformedText = transformedText.replace(/(?:[.?!]|\n|\r)\s*\p{L}/gu, (match) => {
          return match.toUpperCase();
        });
      
        // 3. 텍스트의 첫 글자도 대문자로 변경 (텍스트가 문장으로 시작하지 않을 수 있으므로)
        transformedText = transformedText.charAt(0).toUpperCase() + transformedText.slice(1);
      
        setOutputText(transformedText);
    };

    // 줄바꿈 제거
    const removeLineBreaks = () => {
        setOutputText(inputText.replace(/(\r\n|\n|\r)/gm, ' '));
    };

    // 공백 제거
    const removeSpaces = () => {
        setOutputText(inputText.replace(/\s/g, ''));
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">텍스트 변환기</h1>

            <div className="flex flex-wrap justify-center gap-4">
                <Button onClick={toUpperCase}>모두 대문자로</Button>
                <Button onClick={toLowerCase}>모두 소문자로</Button>
                <Button onClick={toSentenceCase}>문장 첫 글자만 대문자로</Button>
                <Button onClick={removeLineBreaks}>줄바꿈 제거</Button>
                <Button onClick={removeSpaces}>공백 제거</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
                {/* 입력 영역 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col">
                    <h2 className="text-xl font-semibold mb-4 dark:text-white">입력 텍스트</h2>
                    <textarea
                        className="flex-grow w-full h-100 p-4 text-lg border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        placeholder="여기에 텍스트를 입력하세요..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </div>

                {/* 결과 영역 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col">
                    <h2 className="text-xl font-semibold mb-4 dark:text-white">결과 텍스트</h2>
                    <textarea
                        className="flex-grow w-full h-100 p-4 text-lg border rounded-lg resize-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        readOnly
                        value={outputText}
                    />
                </div>
            </div>

            
        </div>
    );
};

export default TextTransformerPage;