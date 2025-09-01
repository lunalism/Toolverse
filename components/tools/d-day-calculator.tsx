// src/components/tools/d-day-calculator.tsx

"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';

export function DDayCalculator() {
    const [targetDate, setTargetDate] = useState<Date | undefined>(undefined);
    const [dDayResult, setDDayResult] = useState<string | null>(null);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">디데이 계산기</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* 입력 섹션 */}
                    <div className="md:w-1/2 flex flex-col gap-4">
                        <Label htmlFor="target-date">목표 날짜</Label>
                        <DatePicker date={targetDate} setDate={setTargetDate} />
                    </div>

                    {/* 결과 섹션 */}
                    <div className="md:w-1/2 flex items-center justify-center p-6 border rounded-md min-h-[150px]">
                        {dDayResult !== null ? (
                            <p className="text-2xl font-bold">{dDayResult}</p>
                        ) : (
                            <p className="text-muted-foreground">날짜를 선택해주세요.</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}