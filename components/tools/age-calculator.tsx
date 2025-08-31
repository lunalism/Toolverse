// src/components/tools/age-calculator.tsx

"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AgeCalculator() {
    const [birthdate, setBirthdate] = useState('');
    const [age, setAge] = useState<string | null>(null);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">나이 계산기</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* 입력 섹션 */}
                    <div className="md:w-1/2 flex flex-col gap-4">
                        <Label htmlFor="birthdate">생년월일</Label>
                        <Input
                        id="birthdate"
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        />
                    </div>

                    {/* 결과 섹션 */}
                    <div className="md:w-1/2 flex items-center justify-center p-6 border rounded-md">
                        {age !== null ? (
                            <p className="text-2xl font-bold">{age}</p>
                        ) : (
                            <p className="text-muted-foreground">생년월일을 입력해주세요.</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}