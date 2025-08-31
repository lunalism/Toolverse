// src/components/tools/qr-generator.tsx

"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function QrGenerator() {
    const [inputValue, setInputValue] = useState('');

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">QR 코드 생성기</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* 입력 섹션 */}
                    <div className="md:w-1/2 flex flex-col gap-4">
                        <Input
                        type="text"
                        placeholder="QR 코드로 만들 텍스트나 URL을 입력하세요."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        />
                        <Button>생성</Button>
                    </div>
                    {/* QR 코드 표시 섹션 */}
                    <div className="md:w-1/2 flex items-center justify-center border border-dashed rounded-md p-6">
                        <p className="text-muted-foreground">여기에 QR 코드가 표시됩니다.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}