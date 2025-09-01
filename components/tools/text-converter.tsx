// src/components/tools/text-converter.tsx

"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function TextConverter() {
    const [text, setText] = useState('');

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
                        <Button>대문자로</Button>
                        <Button>소문자로</Button>
                        <Button>마크다운으로</Button>
                        <Button variant="outline">공백 제거</Button>
                        <Button variant="outline">줄바꿈 제거</Button>
                        <Button variant="secondary">텍스트 지우기</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}