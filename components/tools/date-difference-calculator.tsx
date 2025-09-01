// src/components/tools/date-difference-calculator.tsx

"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';

export function DateDifferenceCalculator() {
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">날짜 차이 계산기</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* 시작 날짜 입력 섹션 */}
                    <div className="md:w-1/2 flex flex-col gap-4">
                        <Label htmlFor="start-date">시작 날짜</Label>
                        <DatePicker date={startDate} setDate={setStartDate} />
                    </div>

                    {/* 종료 날짜 입력 섹션 */}
                    <div className="md:w-1/2 flex flex-col gap-4">
                        <Label htmlFor="end-date">종료 날짜</Label>
                        <DatePicker date={endDate} setDate={setEndDate} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}