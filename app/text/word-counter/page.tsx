'use client'; // 클라이언트 컴포넌트로 선언

import React, { useState, useEffect, useMemo } from 'react';

const WordCounterPage = () => {
    const [text, setText] = useState('');
    const [includeSpaces, setIncludeSpaces] = useState(true);

    // 글자수 계산 (공백 포함/제외)
    const charCount = useMemo(() => {
        if (includeSpaces) {
            return text.length;
        }
        return text.replace(/\s/g, '').length;
    }, [text, includeSpaces]);

    // 단어수 계산
    const wordCount = useMemo(() => {
        const words = text.trim().split(/\s+/);
        return text.trim() === '' ? 0 : words.length;
    }, [text]);

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">글자수/단어수 계산기</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                <textarea
                className="w-full h-48 p-4 text-lg border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="여기에 텍스트를 입력하세요..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <span className="text-gray-600 dark:text-gray-400">글자수: </span>
                        <span className="font-bold text-gray-900 dark:text-white">{charCount}</span>
                    </div>
                    <div>
                        <span className="text-gray-600 dark:text-gray-400">단어수: </span>
                        <span className="font-bold text-gray-900 dark:text-white">{wordCount}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={includeSpaces}
                        onChange={(e) => setIncludeSpaces(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-500 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">공백 포함</span>
                </label>
            </div>
        </div>
    );
};

export default WordCounterPage;